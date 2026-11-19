import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LanguageContext } from '../context/LanguageContext';
import { UserContext } from '../context/UserContext';
import VoiceReadAloudBar from '../components/VoiceReadAloudBar';
import '../styles/Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();
  const { translate, currentLanguage } = useContext(LanguageContext);
  const { user, personalityTest, completedLessons } = useContext(UserContext);

  const learnerRole = personalityTest?.role || user?.role || 'learner';

  const roleNameMap = {
    student: currentLanguage === 'hi' ? 'विद्यार्थी साथी' : 'Student',
    farmer: currentLanguage === 'hi' ? 'किसान साथी' : 'Farmer',
    shopkeeper: currentLanguage === 'hi' ? 'दुकानदार साथी' : 'Shopkeeper',
    homemaker: currentLanguage === 'hi' ? 'गृह-संचालक साथी' : 'Homemaker',
    worker: currentLanguage === 'hi' ? 'मेहनतकश साथी' : 'Worker',
    learner: currentLanguage === 'hi' ? 'साथी' : 'Friend'
  };

  const roleGreeting = roleNameMap[learnerRole] || roleNameMap.learner;

  const coreModules = [
    {
      id: 'basics',
      titleKey: 'Money Basics',
      descKey: 'Money Basics Desc',
      icon: '🌱',
      tag: currentLanguage === 'hi' ? 'शुरुआती पाठ' : 'Basics',
      path: '/stories',
      color: 'sage'
    },
    {
      id: 'savings',
      titleKey: 'Saving Money',
      descKey: 'Saving Money Desc',
      icon: '🏺',
      tag: currentLanguage === 'hi' ? 'दैनिक बचत' : 'Savings Habit',
      path: '/stories',
      color: 'forest'
    },
    {
      id: 'upi',
      titleKey: 'UPI & Digital Payments',
      descKey: 'UPI & Digital Payments Desc',
      icon: '📱',
      tag: currentLanguage === 'hi' ? 'अभ्यास सिमुलेटर' : 'Live Practice',
      path: '/payments',
      color: 'terracotta'
    },
    {
      id: 'scams',
      titleKey: 'Avoiding Scams',
      descKey: 'Avoiding Scams Desc',
      icon: '🛡️',
      tag: currentLanguage === 'hi' ? 'सुरक्षा नियम' : 'Safety First',
      path: '/payments',
      color: 'gold'
    },
    {
      id: 'budgeting',
      titleKey: 'Budgeting',
      descKey: 'Budgeting Desc',
      icon: '📊',
      tag: currentLanguage === 'hi' ? 'घरेलू टूल' : 'Interactive Tool',
      path: '/budget',
      color: 'forest'
    },
    {
      id: 'schemes',
      titleKey: 'Government Schemes Card',
      descKey: 'Government Schemes Desc',
      icon: '🏛️',
      tag: currentLanguage === 'hi' ? 'मुफ़्त सहायता' : 'Verified Schemes',
      path: '/schemes',
      color: 'sage'
    }
  ];

  const dashboardAudioText = currentLanguage === 'hi'
    ? `नमस्ते ${roleGreeting}! नोटकाका डैशबोर्ड में आपका स्वागत है। यहाँ 6 मुख्य विषय हैं: पैसे की बुनियादी समझ, रोज़ की बचत, सुरक्षित UPI अभ्यास, धोखाधड़ी से बचाव, मासिक बजट और सरकारी योजनाएं। कोई भी पाठ चुनकर सीखना शुरू करें।`
    : `Welcome ${roleGreeting}! This is your learning home. Explore our 6 essential topics: Money basics, saving habits, safe UPI simulator, scam awareness, budgeting tool, and verified government schemes.`;

  return (
    <div className="dashboard" id="main-content-anchor" role="region" aria-label="Learning Dashboard">
      {/* Friendly Reassurance Strip */}
      <div className="simulation-watermark-banner">
        <span className="banner-icon" aria-hidden="true">🌱</span>
        <div>
          <strong>{translate('Simulation Notice')}</strong>
          <span style={{ display: 'block', fontSize: '0.85rem' }}>
            {currentLanguage === 'hi'
              ? 'यहाँ आप बेझिझक प्रयोग कर सकते हैं। सीखने में कोई असली पैसा नहीं लगता।'
              : 'Feel free to explore and practice safely. No real bank accounts or money are involved.'}
          </span>
        </div>
      </div>

      {/* Top Welcome Header */}
      <div className="dashboard-welcome-card card">
        <div className="welcome-header-content">
          <div className="welcome-avatar-col">
            <span className="avatar-emoji" aria-hidden="true">🙏</span>
          </div>
          <div className="welcome-text-col">
            <h1>
              {translate('Welcome Learner')} ({roleGreeting})
            </h1>
            <p className="welcome-support-note">
              {currentLanguage === 'hi'
                ? 'आज आप क्या नया सीखना चाहते हैं? नीचे से कोई भी विषय चुनें।'
                : 'What would you like to explore today? Pick any topic below at your own pace.'}
            </p>
          </div>
          <div className="welcome-audio-col">
            <VoiceReadAloudBar textToRead={dashboardAudioText} />
          </div>
        </div>

        {/* Learning Effort Progress */}
        <div className="learning-effort-strip">
          <div className="effort-badge">
            <span className="badge-icon" aria-hidden="true">✨</span>
            <span className="badge-text">
              {completedLessons.length > 0
                ? `${completedLessons.length} ${currentLanguage === 'hi' ? 'पाठ पूरे किए' : 'lessons completed'}`
                : currentLanguage === 'hi' ? 'नया सफर शुरू हुआ' : 'Just started learning'}
            </span>
          </div>
          <div className="effort-encouragement">
            <span>
              {currentLanguage === 'hi'
                ? 'सीखने की हर छोटी कोशिश आपके परिवार के लिए सुरक्षा बनती है।'
                : 'Every small concept you learn builds confidence for you and your family.'}
            </span>
          </div>
        </div>
      </div>

      {/* NoteKaka Daily Wisdom Card */}
      <div className="daily-wisdom-card card">
        <div className="wisdom-header">
          <span className="wisdom-lamp-icon" aria-hidden="true">💡</span>
          <h3>{translate('Daily Wisdom')}</h3>
        </div>
        <blockquote className="wisdom-quote">
          {translate('Daily Wisdom Quote')}
        </blockquote>
      </div>

      {/* Continue Learning Prompt */}
      <section className="continue-learning-section" aria-labelledby="continue-heading">
        <div className="continue-card card">
          <div className="continue-info">
            <span className="continue-badge" aria-hidden="true">🎯 {translate('Continue Learning')}</span>
            <h2 id="continue-heading">
              {currentLanguage === 'hi'
                ? 'राम सिंह किसान की बचत कहानी (Harvest Savings)'
                : 'Ram Singh’s Harvest Savings Story'}
            </h2>
            <p>
              {currentLanguage === 'hi'
                ? 'फसल बिकने के बाद बीज और त्यौहार के खर्च का सही संतुलन कैसे बनाएं?'
                : 'How to save for next season’s seeds before spending on festival wants.'}
            </p>
          </div>
          <button
            type="button"
            className="button button-primary button-large continue-cta-btn"
            onClick={() => navigate('/stories')}
          >
            <span>{translate('Resume Lesson')}</span>
          </button>
        </div>
      </section>

      {/* 6 Core Learning Cards */}
      <section className="modules-section" aria-labelledby="modules-heading">
        <div className="section-title-row">
          <h2 id="modules-heading" className="section-title">
            {translate('Explore Topics')}
          </h2>
          <span className="section-subtitle">
            {currentLanguage === 'hi' ? '6 महत्वपूर्ण विषय' : '6 Core Modules'}
          </span>
        </div>

        <div className="modules-grid-six">
          {coreModules.map((module) => (
            <div
              key={module.id}
              className={`module-action-card card color-${module.color}`}
              onClick={() => navigate(module.path)}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => e.key === 'Enter' && navigate(module.path)}
              aria-label={`${translate(module.titleKey)}: ${translate(module.descKey)}`}
            >
              <div className="module-card-top">
                <span className="module-emoji-icon" aria-hidden="true">{module.icon}</span>
                <span className="module-pill-tag">{module.tag}</span>
              </div>
              <h3 className="module-card-title">{translate(module.titleKey)}</h3>
              <p className="module-card-desc">{translate(module.descKey)}</p>
              <div className="module-card-footer">
                <span className="start-link-text">
                  {currentLanguage === 'hi' ? 'शुरू करें →' : 'Start →'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Direct Interactive Sandboxes Callout */}
      <section className="sandboxes-banner-card card">
        <div className="sandbox-content">
          <div className="sandbox-badge">
            <span aria-hidden="true">🛠️</span>
            <span>{translate('Practice Simulator Banner')}</span>
          </div>
          <h3>{translate('Practice Simulator Banner Desc')}</h3>
        </div>
        <div className="sandbox-buttons">
          <button
            type="button"
            className="button button-primary"
            onClick={() => navigate('/payments')}
          >
            <span>📱 {translate('Practice UPI')}</span>
          </button>
          <button
            type="button"
            className="button button-secondary"
            onClick={() => navigate('/budget')}
          >
            <span>💰 {translate('Budget Tool')}</span>
          </button>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;