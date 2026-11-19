import React, { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LanguageContext } from '../context/LanguageContext';
import { UserContext } from '../context/UserContext';
import VoiceReadAloudBar from '../components/VoiceReadAloudBar';
import '../styles/LandingPage.css';

function LandingPage() {
  const navigate = useNavigate();
  const { translate, currentLanguage } = useContext(LanguageContext);
  const { user } = useContext(UserContext);

  const heroReadText = currentLanguage === 'hi'
    ? 'नोटकाका में आपका स्वागत है। पैसे की समझ सीखें, बिना डर और अपनी भाषा में। बिना किसी पैसे के जोखिम के, बैंकिंग, यूपीआई और बचत की सही समझ हासिल करें। सभी अभ्यास काल्पनिक पैसे से होते हैं।'
    : 'Welcome to NoteKaka. Learn money safely, in your language. Practice banking, UPI payments, and budgeting without fear or real financial risk. 100% free and safe educational simulation.';

  const features = [
    {
      icon: '🌱',
      titleKey: 'Made for Everyday People',
      descKey: 'Made for Everyday People Desc'
    },
    {
      icon: '📖',
      titleKey: 'Step-by-Step Stories',
      descKey: 'Step-by-Step Stories Desc'
    },
    {
      icon: '📱',
      titleKey: 'Safe UPI Sandbox',
      descKey: 'Safe UPI Sandbox Desc'
    },
    {
      icon: '🏛️',
      titleKey: 'Clear Government Schemes',
      descKey: 'Clear Government Schemes Desc'
    }
  ];

  return (
    <div className="landing-page" id="main-content-anchor">
      {/* Reassurance Banner */}
      <div className="safety-reassurance-strip" role="status">
        <span className="strip-icon" aria-hidden="true">🛡️</span>
        <span className="strip-text">{translate('No Real Money Reassurance')}</span>
      </div>

      {/* Hero Section */}
      <section className="welcome-hero-card" aria-labelledby="welcome-hero-title">
        <div className="welcome-hero-content">
          <div className="welcome-badge">
            <span className="welcome-emoji" aria-hidden="true">🙏</span>
            <span className="welcome-tag">{translate('Namaste!')}</span>
          </div>

          <h1 id="welcome-hero-title" className="welcome-headline">
            {translate('Learn money safely, in your language.')}
          </h1>

          <p className="welcome-subtext">
            {translate('NoteKaka Tagline')}
          </p>

          <div className="welcome-actions">
            <button
              type="button"
              className="button button-primary button-large"
              onClick={() => navigate('/test')}
            >
              <span>{translate('Start Learning')}</span>
              <span aria-hidden="true">→</span>
            </button>

            <button
              type="button"
              className="button button-outline button-large"
              onClick={() => navigate('/dashboard')}
            >
              <span>{translate('Explore without signing in')}</span>
            </button>
          </div>

          {!user ? (
            <div className="welcome-auth-row">
              <span className="auth-hint-text">
                {currentLanguage === 'hi'
                  ? 'अपनी सीखने की प्रगति सहेजने के लिए:'
                  : 'To save your learning progress on this device:'}
              </span>
              <Link to="/signup" className="auth-inline-link">
                <strong>{translate('Sign Up')}</strong>
              </Link>
              <span className="auth-dot">•</span>
              <Link to="/login" className="auth-inline-link">
                <strong>{translate('Login')}</strong>
              </Link>
            </div>
          ) : (
            <div className="welcome-auth-row">
              <span>{translate('Logged In As')}:</span>
              <strong style={{ color: 'var(--color-primary)' }}>👤 {user.name}</strong>
              <span className="auth-dot">•</span>
              <Link to="/dashboard" className="auth-inline-link">
                <strong>{translate('Go to Dashboard')}</strong>
              </Link>
            </div>
          )}

          <div className="welcome-audio-row">
            <VoiceReadAloudBar textToRead={heroReadText} />
          </div>
        </div>

        {/* Friendly Everyday Visual Card */}
        <div className="welcome-visual-card" aria-hidden="true">
          <div className="everyday-scene">
            <div className="scene-badge">
              <span className="scene-icon">🌾</span>
              <span>गाँव व कस्बे का साथी</span>
            </div>

            <div className="scene-illustrations">
              <div className="illus-item">
                <span className="illus-emoji">🏺</span>
                <span className="illus-label">मिट्टी की गुल्लक (Safe Savings)</span>
              </div>
              <div className="illus-item">
                <span className="illus-emoji">🏪</span>
                <span className="illus-label">दुकान पर UPI (Shop QR)</span>
              </div>
              <div className="illus-item">
                <span className="illus-emoji">📋</span>
                <span className="illus-label">सरकारी सहायता (Schemes)</span>
              </div>
            </div>

            <div className="scene-quote">
              <p>“कोई गलती होने का डर नहीं, क्योंकि यहाँ सीखने में कोई असली पैसा नहीं लगता।”</p>
            </div>
          </div>
        </div>
      </section>

      {/* Value Pillars Section */}
      <section className="features-section" aria-labelledby="features-heading">
        <h2 id="features-heading" className="section-title">
          {currentLanguage === 'hi' ? 'नोटकाका आपके लिए क्यों सरल है?' : 'How NoteKaka Helps You Learn'}
        </h2>

        <div className="features-grid">
          {features.map((item, idx) => (
            <div key={idx} className="feature-card">
              <div className="feature-icon" aria-hidden="true">{item.icon}</div>
              <h3>{translate(item.titleKey)}</h3>
              <p>{translate(item.descKey)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Direct Activities */}
      <section className="interactive-quick-entry-section" aria-labelledby="quick-start-heading">
        <h2 id="quick-start-heading" className="section-title">
          {currentLanguage === 'hi' ? 'सीधे अभ्यास करें (Choose an Activity)' : 'Try a Practice Activity'}
        </h2>

        <div className="quick-activity-cards">
          <div
            className="activity-card"
            onClick={() => navigate('/stories')}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => e.key === 'Enter' && navigate('/stories')}
          >
            <div className="activity-icon" aria-hidden="true">📖</div>
            <div className="activity-details">
              <h3>{currentLanguage === 'hi' ? 'कहानियों से सीखें' : 'Story-Based Decisions'}</h3>
              <p>{currentLanguage === 'hi' ? 'राम सिंह किसान और आशा दर्जी की कहानियों में सही फैसले लें।' : 'Relatable stories with real choices and zero judgment.'}</p>
              <span className="activity-link-text">{translate('Next')}</span>
            </div>
          </div>

          <div
            className="activity-card"
            onClick={() => navigate('/payments')}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => e.key === 'Enter' && navigate('/payments')}
          >
            <div className="activity-icon" aria-hidden="true">📱</div>
            <div className="activity-details">
              <h3>{currentLanguage === 'hi' ? 'UPI अभ्यास सिमुलेटर' : 'UPI Payment Simulator'}</h3>
              <p>{currentLanguage === 'hi' ? 'काल्पनिक दुकान पर QR स्कैन करें और सुरक्षित पिन डालना सीखें।' : 'Practice scanning QR codes and checking recipient names safely.'}</p>
              <span className="activity-link-text">{translate('Next')}</span>
            </div>
          </div>

          <div
            className="activity-card"
            onClick={() => navigate('/budget')}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => e.key === 'Enter' && navigate('/budget')}
          >
            <div className="activity-icon" aria-hidden="true">💰</div>
            <div className="activity-details">
              <h3>{currentLanguage === 'hi' ? 'घरेलू बजट टूल' : 'Monthly Budget Tool'}</h3>
              <p>{currentLanguage === 'hi' ? 'अपनी आमदनी व खर्च के अनुसार देखें कि हर महीने कितनी बचत संभव है।' : 'See how small daily changes build a strong emergency fund.'}</p>
              <span className="activity-link-text">{translate('Next')}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;