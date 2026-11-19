import React, { createContext, useState, useEffect, useCallback } from 'react';

export const VoiceContext = createContext();

export const VoiceProvider = ({ children }) => {
  const [isVoiceMode, setIsVoiceMode] = useState(() => {
    return localStorage.getItem('notekaka_voice_enabled') === 'true';
  });
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentText, setCurrentText] = useState('');
  const [speechSupported, setSpeechSupported] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setSpeechSupported(true);
    }
  }, []);

  const stopSpeaking = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setIsPaused(false);
      setCurrentText('');
    }
  }, []);

  const pauseSpeaking = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window && isSpeaking) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  }, [isSpeaking]);

  const resumeSpeaking = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window && isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    }
  }, [isPaused]);

  const speakText = useCallback((text, lang = 'hi-IN') => {
    if (!text || typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();

    const cleanText = text.replace(/[*#_~`]/g, '').trim();
    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);

    // Pick appropriate voice
    const voices = window.speechSynthesis.getVoices();
    const preferredLang = lang.startsWith('hi') ? 'hi' : 'en';
    const matchingVoice = voices.find(v => v.lang.toLowerCase().startsWith(preferredLang));
    if (matchingVoice) {
      utterance.voice = matchingVoice;
    }
    utterance.lang = lang.startsWith('hi') ? 'hi-IN' : 'en-IN';
    utterance.rate = 0.88; // Slightly gentle & slower for clear comprehension
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      setIsSpeaking(true);
      setIsPaused(false);
      setCurrentText(cleanText);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
      setCurrentText('');
    };

    utterance.onerror = (e) => {
      console.warn('Speech synthesis event:', e);
      setIsSpeaking(false);
      setIsPaused(false);
    };

    window.speechSynthesis.speak(utterance);
  }, []);

  const toggleVoiceMode = () => {
    const next = !isVoiceMode;
    setIsVoiceMode(next);
    localStorage.setItem('notekaka_voice_enabled', next.toString());
    if (!next) {
      stopSpeaking();
    }
  };

  // Clean up speech on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return (
    <VoiceContext.Provider
      value={{
        isVoiceMode,
        isSpeaking,
        isPaused,
        currentText,
        speechSupported,
        toggleVoiceMode,
        speakText,
        pauseSpeaking,
        resumeSpeaking,
        stopSpeaking,
      }}
    >
      {children}
    </VoiceContext.Provider>
  );
};