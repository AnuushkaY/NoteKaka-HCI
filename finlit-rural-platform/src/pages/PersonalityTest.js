import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LanguageContext } from '../context/LanguageContext';
import { UserContext } from '../context/UserContext';
import VoiceReadAloudBar from '../components/VoiceReadAloudBar';
import '../styles/PersonalityTest.css';

function PersonalityTest() {
  const navigate = useNavigate();
  const { translate, currentLanguage } = useContext(LanguageContext);
  const { updatePersonalityTest, updateUser } = useContext(UserContext);

  const [currentStep, setCurrentStep] = useState(0);
  const [selectedRole, setSelectedRole] = useState('farmer');
  const [selectedGoal, setSelectedGoal] = useState('saving');
  const [selectedMode, setSelectedMode] = useState('both');
  const [isCompleted, setIsCompleted] = useState(false);

  const questions = [
    {
      id: 'role',
      title: translate('Question 1'),
      helpText: currentLanguage === 'hi'
        ? 'ताकि हम आपकी रोज़मर्रा की ज़रूरतों से जुड़े उदाहरण दे सकें।'
        : 'So we can show examples matching your everyday work and routine.',
      options: [
        { id: 'student', label: translate('Role Student'), desc: translate('Role Student Desc'), icon: '🎓' },
        { id: 'farmer', label: translate('Role Farmer'), desc: translate('Role Farmer Desc'), icon: '🌾' },
        { id: 'shopkeeper', label: translate('Role Shopkeeper'), desc: translate('Role Shopkeeper Desc'), icon: '🏪' },
        { id: 'homemaker', label: translate('Role Homemaker'), desc: translate('Role Homemaker Desc'), icon: '👩‍🍳' },
        { id: 'worker', label: translate('Role Worker'), desc: translate('Role Worker Desc'), icon: '👷' }
      ],
      selected: selectedRole,
      setter: setSelectedRole
    },
    {
      id: 'goal',
      title: translate('Question 2'),
      helpText: currentLanguage === 'hi'
        ? 'हम इसी विषय के पाठ सबसे पहले आपके डैशबोर्ड पर रखेंगे।'
        : 'We will feature this topic right at the top of your learning dashboard.',
      options: [
        { id: 'saving', label: translate('Topic Saving'), desc: currentLanguage === 'hi' ? 'कम आमदनी में भी रोज़ छोटी बचत करना' : 'Saving small amounts regularly without stress', icon: '🏺' },
        { id: 'upi', label: translate('Topic UPI'), desc: currentLanguage === 'hi' ? 'दुकान पर QR स्कैन व मोबाइल से सुरक्षित लेन-देन' : 'QR code payments and phone transfers', icon: '📱' },
        { id: 'banking', label: translate('Topic Banking'), desc: currentLanguage === 'hi' ? 'बैंक खाता खोलना, पासबुक और सही इस्तेमाल' : 'Opening and safely using a bank account', icon: '🏦' },
        { id: 'scams', label: translate('Topic Scams'), desc: currentLanguage === 'hi' ? 'फ़र्ज़ी फोन कॉल और OTP चुराने वालों से बचना' : 'Protecting your money from fake callers and fraud', icon: '🛡️' },
        { id: 'schemes', label: translate('Topic Schemes'), desc: currentLanguage === 'hi' ? 'सरकारी आर्थिक सहायता व किसान-पेंशन योजनाएं' : 'Welfare schemes, scholarships, and farmer benefits', icon: '📋' }
      ],
      selected: selectedGoal,
      setter: setSelectedGoal
    },
    {
      id: 'mode',
      title: translate('Question 3'),
      helpText: currentLanguage === 'hi'
        ? 'आप जब चाहें स्क्रीन पर आवाज़ बटन से इसे बदल सकते हैं।'
        : 'You can change this anytime with the read-aloud buttons.',
      options: [
        { id: 'read', label: translate('Mode Read'), desc: currentLanguage === 'hi' ? 'बड़े और साफ़ अक्षरों में स्क्रीन पर पढ़कर' : 'Clear, comfortable text on screen', icon: '📖' },
        { id: 'listen', label: translate('Mode Listen'), desc: currentLanguage === 'hi' ? 'बोलकर समझाने वाली आवाज़ सुनकर' : 'Voice audio reading the instructions aloud', icon: '🔊' },
        { id: 'both', label: translate('Mode Both'), desc: currentLanguage === 'hi' ? 'पढ़ना और सुनना दोनों साथ-साथ' : 'Read comfortably and listen when you want', icon: '🎧' }
      ],
      selected: selectedMode,
      setter: setSelectedMode
    }
  ];

  const currentQ = questions[currentStep];

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleFinish();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleFinish = () => {
    const preferences = {
      role: selectedRole,
      goal: selectedGoal,
      mode: selectedMode,
      completedAt: new Date().toISOString()
    };
    updatePersonalityTest(preferences);
    updateUser({ role: selectedRole, preferredMode: selectedMode });
    setIsCompleted(true);
  };

  const handleSkip = () => {
    navigate('/dashboard');
  };

  if (isCompleted) {
    const roleObj = questions[0].options.find(o => o.id === selectedRole);
    const goalObj = questions[1].options.find(o => o.id === selectedGoal);

    return (
      <div className="personality-test setup-flow card" role="region" aria-label="Setup Complete">
        <div className="setup-success-card">
          <div className="success-icon" aria-hidden="true">🎉</div>
          <h2>
            {currentLanguage === 'hi'
              ? 'आपकी पसंद सहेज ली गई है!'
              : 'Your Learning Preferences Are Ready!'}
          </h2>
          <p className="success-subtitle">
            {currentLanguage === 'hi'
              ? 'हमने आपके लिए आसान और काम के पाठ तैयार कर दिए हैं।'
              : 'We have customized your dashboard based on what matters most to you.'}
          </p>

          <div className="selected-summary-box">
            <div className="summary-pill">
              <span className="pill-label">{currentLanguage === 'hi' ? 'आपकी भूमिका' : 'Your Focus'}:</span>
              <strong>{roleObj ? roleObj.label : selectedRole}</strong>
            </div>
            <div className="summary-pill">
              <span className="pill-label">{currentLanguage === 'hi' ? 'प्राथमिक विषय' : 'First Topic'}:</span>
              <strong>{goalObj ? goalObj.label : selectedGoal}</strong>
            </div>
          </div>

          <div className="respectful-reassurance">
            <p>
              {currentLanguage === 'hi'
                ? 'याद रखें: नोटकाका में कोई परीक्षा या नंबर नहीं हैं। आप अपनी गति से बिना किसी दबाव के सीख सकते हैं।'
                : 'NoteKaka has no tests or marks. You can learn comfortably at your own speed with zero pressure.'}
            </p>
          </div>

          <button
            type="button"
            className="button button-primary button-large"
            onClick={() => navigate('/dashboard')}
          >
            <span>{translate('Save & Continue')}</span>
          </button>
        </div>
      </div>
    );
  }

  const readText = `${currentQ.title}. ${currentQ.helpText}`;

  return (
    <div className="personality-test setup-flow card" role="region" aria-label="Learner Setup">
      {/* Header with Skip Option */}
      <div className="setup-header">
        <div className="setup-header-text">
          <h1>{translate('Learner Setup Title')}</h1>
          <p className="subtitle">{translate('Learner Setup Subtitle')}</p>
        </div>
        <button
          type="button"
          className="button button-soft button-small skip-btn"
          onClick={handleSkip}
          aria-label="Skip setup and go directly to dashboard"
        >
          {translate('Skip to Dashboard')}
        </button>
      </div>

      {/* Progress Indicator */}
      <div className="setup-progress-container" aria-label={`Step ${currentStep + 1} of ${questions.length}`}>
        <div className="progress-info-bar">
          <span className="step-counter">
            {currentLanguage === 'hi' ? `कदम ${currentStep + 1} / 3` : `Step ${currentStep + 1} of 3`}
          </span>
          <span className="step-topic">{currentQ.title}</span>
        </div>
        <div className="step-dots-row" aria-hidden="true">
          {questions.map((_, idx) => (
            <div
              key={idx}
              className={`step-dot ${idx === currentStep ? 'active' : ''} ${idx < currentStep ? 'completed' : ''}`}
            ></div>
          ))}
        </div>
      </div>

      <div className="audio-helper-row">
        <VoiceReadAloudBar textToRead={readText} />
      </div>

      {/* Question & Options */}
      <fieldset className="question-fieldset">
        <legend className="question-legend">
          <span className="legend-title">{currentQ.title}</span>
          <span className="legend-help">{currentQ.helpText}</span>
        </legend>

        <div className="options-selection-grid">
          {currentQ.options.map((opt) => {
            const isSelected = currentQ.selected === opt.id;
            return (
              <label
                key={opt.id}
                className={`setup-option-card ${isSelected ? 'selected' : ''}`}
              >
                <input
                  type="radio"
                  name={currentQ.id}
                  value={opt.id}
                  checked={isSelected}
                  onChange={() => currentQ.setter(opt.id)}
                  className="sr-only"
                />
                <div className="option-icon" aria-hidden="true">{opt.icon}</div>
                <div className="option-text-group">
                  <div className="option-main-label">{opt.label}</div>
                  <div className="option-sub-desc">{opt.desc}</div>
                </div>
                <div className="selection-radio-indicator" aria-hidden="true">
                  {isSelected ? '✓' : ''}
                </div>
              </label>
            );
          })}
        </div>
      </fieldset>

      {/* Navigation Buttons */}
      <div className="setup-footer-nav">
        {currentStep > 0 ? (
          <button
            type="button"
            className="button button-outline"
            onClick={handlePrevious}
          >
            {translate('Previous')}
          </button>
        ) : (
          <div></div>
        )}

        <button
          type="button"
          className="button button-primary"
          onClick={handleNext}
        >
          {currentStep === questions.length - 1
            ? translate('Save & Continue')
            : translate('Next')}
        </button>
      </div>
    </div>
  );
}

export default PersonalityTest;