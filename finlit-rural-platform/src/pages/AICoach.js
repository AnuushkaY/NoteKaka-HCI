import React, { useState, useContext, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LanguageContext } from '../context/LanguageContext';
import { VoiceContext } from '../context/VoiceContext';
import '../styles/AICoach.css';

function AICoach() {
  const navigate = useNavigate();
  const { currentLanguage } = useContext(LanguageContext);
  const { speakText } = useContext(VoiceContext);

  const initialGreeting = currentLanguage === 'hi'
    ? 'नमस्ते! मैं नोटकाका हूँ। पैसे, बचत, बैंक खाता या UPI से जुड़ा कोई भी सवाल बेझिझक पूछें। यहाँ कोई गलत सवाल नहीं होता!'
    : 'Namaste! I am NoteKaka. Feel free to ask any question about daily savings, bank accounts, or UPI payments without fear.';

  const [messages, setMessages] = useState([
    { id: 1, text: initialGreeting, sender: 'ai', timestamp: new Date() }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const quickQuestions = currentLanguage === 'hi' ? [
    'रोज़ ₹30 से ₹50 की बचत कैसे शुरू करें?',
    'दुकान पर UPI से भुगतान करते समय क्या ध्यान रखें?',
    'क्या पैसे पाने के लिए कभी PIN डालना पड़ता है?',
    'PM किसान सम्मान निधि के लिए क्या कागज़ात चाहिए?',
    'साहूकार के ऊंचे ब्याज़ से कैसे बचें?'
  ] : [
    'How can I save ₹30 to ₹50 daily?',
    'What should I check before paying at a shop using UPI?',
    'Do I ever need to enter a PIN to receive money?',
    'What documents are needed for PM Kisan scheme?',
    'How can I avoid high-interest debt traps?'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const generateAnswer = (userQuery) => {
    const q = userQuery.toLowerCase();

    // Risk / Fraud detection
    if (q.includes('pin') && (q.includes('receive') || q.includes('paane') || q.includes('pana') || q.includes('milega'))) {
      return currentLanguage === 'hi'
        ? '⚠️ बिल्कुल नहीं! याद रखें: पैसे पाने के लिए कभी भी UPI PIN दर्ज नहीं किया जाता। यदि कोई कहे कि "पैसे पाने के लिए पिन दर्ज करें", तो वह ठगी कर रहा है। तुरंत फोन काट दें!'
        : '⚠️ NEVER! You NEVER enter a UPI PIN to receive money. If someone says you must enter your PIN to claim money, it is 100% a fraud attempt. Hang up immediately!';
    }

    if (q.includes('save') || q.includes('saving') || q.includes('बचत')) {
      return currentLanguage === 'hi'
        ? 'दैनिक बचत का सबसे आसान नियम: "पहले बचत, फिर खर्च।" सुबह उठते ही ₹20 या ₹50 की राशि मिट्टी की गुल्लक या बैंक खाते में अलग रख दें। महीने में यह ₹1,000 और साल में ₹12,000 बन जाएगी!'
        : 'The simplest habit is to "Save first, spend what remains." Put away ₹20 or ₹50 first thing in the morning into a piggy bank or bank account. Over a year, this creates a ₹12,000 emergency safety cushion!';
    }

    if (q.includes('upi') || q.includes('payment') || q.includes('दुकान') || q.includes('qr')) {
      return currentLanguage === 'hi'
        ? 'दुकान पर UPI का नियम: 1) QR कोड स्कैन करने के बाद स्क्रीन पर दुकानदार का नाम ज़रूर पढ़ें। 2) बिल की राशि मिलाकर ही अपना 4 या 6 अंकों का गुप्त पिन दर्ज करें। 3) भुगतान के बाद स्क्रीन पर हरा टिक (✓) देखकर दुकानदार को दिखाएं।'
        : 'Golden rule for shop UPI: 1) After scanning QR, verify the recipient name on your screen. 2) Enter your secret PIN only when you confirm the amount. 3) Show the green checkmark confirmation screen to the shopkeeper.';
    }

    if (q.includes('kisan') || q.includes('किसान') || q.includes('scheme') || q.includes('योजना')) {
      return currentLanguage === 'hi'
        ? 'PM किसान सम्मान निधि के लिए 4 मुख्य कागज़ात चाहिए: 1) आधार कार्ड 2) आधार से जुड़ा बैंक खाता (DBT चालू) 3) ज़मीन के कागज़ात (खतौनी) 4) मोबाइल नंबर। अपने गाँव के CSC केंद्र पर निःशुल्क या निर्धारित शुल्क पर ऑनलाइन फॉर्म भरें।'
        : 'For PM Kisan: 1) Aadhaar card 2) Bank account linked to Aadhaar (with DBT enabled) 3) Land records (Khasra/Khatauni) 4) Active mobile number. Visit your nearest CSC to apply.';
    }

    if (q.includes('loan') || q.includes('कर्ज') || q.includes('ब्याज')) {
      return currentLanguage === 'hi'
        ? 'साहूकार 3% से 5% प्रति माह (यानी 36% से 60% सालाना) मांगते हैं, जिससे निकलना बहुत कठिन होता है। बैंक या किसान क्रेडिट कार्ड (KCC) पर केवल 4% से 7% सालाना ब्याज़ लगता है। हमेशा बैंक मित्र या सरकारी बैंक से ही कर्ज़ लें।'
        : 'Local informal moneylenders often charge 36% to 60% yearly interest. Bank loans and Kisan Credit Cards (KCC) charge only 4% to 7% annual interest. Always prefer formal banks or authorized Bank Mitras.';
    }

    return currentLanguage === 'hi'
      ? `आपने बहुत अच्छा सवाल पूछा है। नोटकाका का सरल सुझाव: पैसों के मामले में कभी जल्दबाज़ी में फैसला न लें। अपने किसी भरोसेमंद परिजन या गाँव के बैंक मित्र से मिलकर बात करें। आप हमारे 'मदद व हेल्पलाइन' पेज पर जाकर अधिकृत नंबर भी देख सकते हैं।`
      : `Thank you for asking. NoteKaka’s friendly advice: Never make financial decisions under rush or pressure. Consult a trusted family member or visit your local Bank Mitra for personalized help.`;
  };

  const handleSend = () => {
    if (!inputText.trim()) return;

    const query = inputText.trim();
    const userMsg = {
      id: Date.now(),
      text: query,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const response = generateAnswer(query);
      const aiMsg = {
        id: Date.now() + 1,
        text: response,
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
      speakText(response, currentLanguage === 'hi' ? 'hi-IN' : 'en-IN');
    }, 600);
  };

  const handleQuickClick = (qText) => {
    setInputText(qText);
  };

  return (
    <div className="ai-coach-page" id="main-content-anchor" role="region" aria-label="NoteKaka Conversational Assistant">
      {/* Simulation Reassurance Banner */}
      <div className="simulation-watermark-banner">
        <span className="banner-icon" aria-hidden="true">🌱</span>
        <div>
          <strong>NoteKaka Educational Guidance:</strong>
          <span style={{ display: 'block', fontSize: '0.85rem' }}>
            {currentLanguage === 'hi'
              ? 'यह एक शैक्षिक साथी है। नोटकाका कभी कोई पासवर्ड या बैंक खाते की गोपनीय जानकारी नहीं मांगता।'
              : 'This is an educational companion. NoteKaka never asks for passwords, OTPs, or private bank credentials.'}
          </span>
        </div>
      </div>

      <div className="coach-wrapper card">
        <div className="coach-top-header">
          <div className="coach-info">
            <span className="coach-avatar" aria-hidden="true">🌱</span>
            <div>
              <h2>{currentLanguage === 'hi' ? 'नोटकाका से पूछें' : 'Ask NoteKaka'}</h2>
              <span className="coach-status-tag">
                ● {currentLanguage === 'hi' ? 'मदद के लिए उपलब्ध' : 'Always Ready to Help'}
              </span>
            </div>
          </div>
          <button
            type="button"
            className="button button-soft button-small"
            onClick={() => navigate('/help')}
          >
            📞 {currentLanguage === 'hi' ? 'सरकारी हेल्पलाइन देखें' : 'Helplines'}
          </button>
        </div>

        {/* Chat Messages Log */}
        <div className="chat-messages-container" aria-live="polite">
          {messages.map((msg) => (
            <div key={msg.id} className={`chat-bubble ${msg.sender}`}>
              <div className="bubble-header">
                <span className="bubble-sender-name">
                  {msg.sender === 'ai' ? '🌱 NoteKaka' : '👤 You'}
                </span>
                <span className="bubble-time">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <p className="bubble-text">{msg.text}</p>
              {msg.sender === 'ai' && (
                <button
                  type="button"
                  className="read-msg-btn"
                  onClick={() => speakText(msg.text, currentLanguage === 'hi' ? 'hi-IN' : 'en-IN')}
                  aria-label="Read this message aloud"
                  title="Read aloud"
                >
                  🔊
                </button>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="chat-bubble ai typing">
              <span>नोटकाका सोच रहे हैं...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Question Chips */}
        <div className="quick-questions-strip">
          <span className="quick-label">
            {currentLanguage === 'hi' ? 'आम सवाल:' : 'Quick Questions:'}
          </span>
          <div className="quick-chips-wrap">
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                type="button"
                className="chip-btn"
                onClick={() => handleQuickClick(q)}
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="chat-input-bar">
          <label htmlFor="chat-input-field" className="sr-only">
            Ask NoteKaka a question
          </label>
          <input
            id="chat-input-field"
            type="text"
            placeholder={
              currentLanguage === 'hi'
                ? 'अपना सवाल यहाँ लिखें (जैसे: रोज़ बचत कैसे करें?)...'
                : 'Type your question here (e.g. How to save ₹50 daily?)...'
            }
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            className="chat-text-input"
          />
          <button
            type="button"
            className="button button-primary chat-send-btn"
            onClick={handleSend}
            disabled={!inputText.trim()}
          >
            <span>{currentLanguage === 'hi' ? 'पूछें' : 'Ask'}</span>
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default AICoach;