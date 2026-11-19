import React, { useContext } from 'react';
import { VoiceContext } from '../context/VoiceContext';
import { LanguageContext } from '../context/LanguageContext';

function VoiceReadAloudBar({ textToRead }) {
  const {
    isSpeaking,
    isPaused,
    speakText,
    pauseSpeaking,
    resumeSpeaking,
    stopSpeaking,
    speechSupported
  } = useContext(VoiceContext);

  const { currentLanguage, translate } = useContext(LanguageContext);

  if (!speechSupported) {
    return null;
  }

  const handlePlay = () => {
    if (isPaused) {
      resumeSpeaking();
    } else {
      speakText(textToRead, currentLanguage === 'hi' ? 'hi-IN' : 'en-IN');
    }
  };

  return (
    <div className="voice-read-aloud-bar" role="region" aria-label="Audio read-aloud controls">
      <div className="voice-controls-group">
        {!isSpeaking ? (
          <button
            type="button"
            className="button button-soft button-small voice-action-btn"
            onClick={handlePlay}
            aria-label={currentLanguage === 'hi' ? 'बोलकर सुनाएं' : 'Listen to this section'}
          >
            <span aria-hidden="true">🔊</span>
            <span>{translate('Voice Read-Aloud')}</span>
          </button>
        ) : (
          <div className="voice-active-actions">
            <span className="voice-pulse-indicator" aria-hidden="true">
              <span className="dot"></span>
              <span className="label">{translate('Playing Audio')}</span>
            </span>

            {isPaused ? (
              <button
                type="button"
                className="a11y-btn"
                onClick={resumeSpeaking}
                aria-label="Resume audio"
              >
                ▶ {currentLanguage === 'hi' ? 'फिर से शुरू करें' : 'Resume'}
              </button>
            ) : (
              <button
                type="button"
                className="a11y-btn"
                onClick={pauseSpeaking}
                aria-label="Pause audio"
              >
                ⏸ {currentLanguage === 'hi' ? 'रोकें' : 'Pause'}
              </button>
            )}

            <button
              type="button"
              className="a11y-btn voice-stop-btn"
              onClick={stopSpeaking}
              aria-label="Stop audio"
            >
              ⏹ {translate('Stop Audio')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default VoiceReadAloudBar;
