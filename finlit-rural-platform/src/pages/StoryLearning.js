import React, { useState, useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import { UserContext } from '../context/UserContext';
import { stories } from '../data/stories';
import VoiceReadAloudBar from '../components/VoiceReadAloudBar';
import '../styles/StoryLearning.css';

function StoryLearning() {
  const { translate, currentLanguage } = useContext(LanguageContext);
  const { completeLesson } = useContext(UserContext);

  const [selectedStory, setSelectedStory] = useState(null);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleSelectStory = (story) => {
    setSelectedStory(story);
    setCurrentStepIdx(0);
    setSelectedChoice(null);
    setShowFeedback(false);
    setIsCompleted(false);
  };

  const handleBackToOverview = () => {
    setSelectedStory(null);
    setCurrentStepIdx(0);
    setSelectedChoice(null);
    setShowFeedback(false);
    setIsCompleted(false);
  };

  const handleChoice = (choice) => {
    setSelectedChoice(choice);
    setShowFeedback(true);
  };

  const handleRetryChoice = () => {
    setSelectedChoice(null);
    setShowFeedback(false);
  };

  const handleNextStep = () => {
    if (currentStepIdx < selectedStory.steps.length - 1) {
      setCurrentStepIdx(prev => prev + 1);
      setSelectedChoice(null);
      setShowFeedback(false);
    } else {
      setIsCompleted(true);
      completeLesson(`story_${selectedStory.id}`);
    }
  };

  // Story Overview screen
  if (!selectedStory) {
    return (
      <div className="story-learning overview" id="main-content-anchor" role="region" aria-label="Stories Overview">
        <div className="simulation-watermark-banner">
          <span className="banner-icon" aria-hidden="true">🌱</span>
          <div>
            <strong>{translate('Simulation Notice')}</strong>
            <p style={{ margin: 0, fontSize: '0.85rem' }}>
              {currentLanguage === 'hi'
                ? 'कहानियों में लिए गए फैसलों से कोई असली नुकसान नहीं होता। यहाँ आप सीखने के लिए स्वतंत्र हैं।'
                : 'Every story is a safe learning scenario. No real financial risk is involved.'}
            </p>
          </div>
        </div>

        <div className="stories-hero-card card">
          <div className="stories-hero-text">
            <h1>{currentLanguage === 'hi' ? 'कहानियों से सीखें (Story Learning)' : 'Learn Money Through Stories'}</h1>
            <p className="subtitle">
              {currentLanguage === 'hi'
                ? 'गाँव और कस्बों की जानी-पहचानी ज़िंदगियों से जुड़े प्रसंग। आप किरदार के लिए फैसले लें और उनके परिणाम समझें।'
                : 'Everyday situations faced by farmers, shopkeepers, and students. Make safe decisions and understand real consequences.'}
            </p>
          </div>
          <VoiceReadAloudBar
            textToRead={
              currentLanguage === 'hi'
                ? 'कहानियों से सीखें। गाँव और कस्बों की जानी-पहचानी ज़िंदगियों से जुड़े प्रसंग। आप किरदार के लिए फैसले लें और उनके परिणाम समझें।'
                : 'Learn through stories. Make choices in relatable everyday situations with zero risk.'
            }
          />
        </div>

        {/* Stories Grid */}
        <div className="stories-grid-list">
          {stories.map((story) => (
            <div
              key={story.id}
              className="story-card card"
              onClick={() => handleSelectStory(story)}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => e.key === 'Enter' && handleSelectStory(story)}
              aria-label={`Open story: ${story.title}`}
            >
              <div className="story-card-top">
                <span className="character-avatar" aria-hidden="true">{story.icon}</span>
                <span className="story-duration-tag">⏱️ {story.duration}</span>
              </div>
              <h3 className="story-title">{story.title}</h3>
              <p className="story-desc">{story.description}</p>

              <div className="story-meta-tags">
                <span className="meta-tag">👤 {story.character}</span>
                <span className="meta-tag">📍 {story.location}</span>
                <span className="meta-tag">🎯 {story.steps.length} {currentLanguage === 'hi' ? 'कदम' : 'decisions'}</span>
              </div>

              <div className="story-action-row">
                <span className="start-btn-label">
                  {currentLanguage === 'hi' ? 'कहानी शुरू करें →' : 'Start Story →'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Active Story Step
  const stepData = selectedStory.steps[currentStepIdx];
  const stepNumber = currentStepIdx + 1;
  const totalSteps = selectedStory.steps.length;

  const stepAudioText = `${selectedStory.title}. ${currentLanguage === 'hi' ? `कदम ${stepNumber} / ${totalSteps}` : `Step ${stepNumber} of ${totalSteps}`}. ${stepData.situation}`;

  return (
    <div className="story-learning active-story card" id="main-content-anchor" role="region" aria-label="Story Lesson">
      {/* Top Header & Navigation */}
      <div className="active-story-top-bar">
        <button
          type="button"
          className="button button-soft button-small"
          onClick={handleBackToOverview}
          aria-label="Back to all stories"
        >
          ← {currentLanguage === 'hi' ? 'सभी कहानियाँ' : 'All Stories'}
        </button>

        <div className="step-progress-badge">
          <span>{currentLanguage === 'hi' ? `कदम ${stepNumber} / ${totalSteps}` : `Step ${stepNumber} of ${totalSteps}`}</span>
        </div>

        <VoiceReadAloudBar textToRead={stepAudioText} />
      </div>

      {/* Progress Track */}
      <div className="story-progress-bar-wrap" aria-hidden="true">
        <div
          className="story-progress-fill"
          style={{ width: `${(stepNumber / totalSteps) * 100}%` }}
        ></div>
      </div>

      {/* Story Banner */}
      <div className="character-banner">
        <span className="character-icon-large" aria-hidden="true">{selectedStory.icon}</span>
        <div className="character-info">
          <h2>{selectedStory.title}</h2>
          <p className="character-meta">{selectedStory.character} • {selectedStory.location}</p>
        </div>
      </div>

      {!isCompleted ? (
        <div className="story-step-content">
          {/* Situation Box */}
          <div className="situation-box">
            <div className="situation-badge">
              <span aria-hidden="true">📌</span>
              <span>{currentLanguage === 'hi' ? 'वर्तमान स्थिति (Situation)' : 'Current Situation'}</span>
            </div>
            <p className="situation-text">{stepData.situation}</p>
          </div>

          {/* Decision Prompt */}
          <div className="choices-prompt-area">
            <h3>
              {currentLanguage === 'hi'
                ? `${selectedStory.character.split(' ')[0]} को क्या करना चाहिए?`
                : `What should ${selectedStory.character.split(' ')[0]} do?`}
            </h3>

            {!showFeedback ? (
              <div className="choices-button-grid" role="group" aria-label="Decision Options">
                {stepData.choices.map((choice, index) => (
                  <button
                    key={index}
                    type="button"
                    className="choice-action-button"
                    onClick={() => handleChoice(choice)}
                  >
                    <span className="choice-number">{index + 1}</span>
                    <div className="choice-text-col">
                      <span className="choice-main-title">{choice.text}</span>
                      <span className="choice-reason-hint">{choice.reason}</span>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              /* Immediate Supportive Feedback Box */
              <div
                className={`feedback-box ${selectedChoice.isGood ? 'good-choice' : 'learning-opportunity'}`}
                role="status"
              >
                <div className="feedback-header">
                  <span className="feedback-emoji" aria-hidden="true">
                    {selectedChoice.isGood ? '✅' : '💡'}
                  </span>
                  <h4>
                    {selectedChoice.isGood
                      ? (currentLanguage === 'hi' ? 'बहुत समझदारी भरा फैसला!' : 'Thoughtful Choice!')
                      : (currentLanguage === 'hi' ? 'यह भी एक आम सोच है, पर ज़रा समझें:' : 'Here is what happens in this situation:')}
                  </h4>
                </div>

                <div className="feedback-consequence">
                  <p><strong>{currentLanguage === 'hi' ? 'नतीजा (Consequence):' : 'Consequence:'}</strong> {selectedChoice.consequence}</p>
                </div>

                <div className="feedback-actions-row">
                  {!selectedChoice.isGood && (
                    <button
                      type="button"
                      className="button button-outline"
                      onClick={handleRetryChoice}
                    >
                      ↺ {currentLanguage === 'hi' ? 'दूसरा विकल्प आज़माएं' : 'Try Another Choice'}
                    </button>
                  )}

                  <button
                    type="button"
                    className="button button-primary"
                    onClick={handleNextStep}
                  >
                    {stepNumber < totalSteps
                      ? (currentLanguage === 'hi' ? 'अगला कदम समझें →' : 'Next Step →')
                      : (currentLanguage === 'hi' ? 'कहानी पूरी करें →' : 'Complete Story →')}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Completion Summary Screen */
        <div className="story-completion-card">
          <div className="completion-icon" aria-hidden="true">🎉</div>
          <h2>
            {currentLanguage === 'hi' ? 'कहानी पूरी हुई!' : 'Story Completed!'}
          </h2>
          <p className="completion-sub">
            {currentLanguage === 'hi'
              ? `आपने "${selectedStory.title}" के सभी कदम सफलतापूर्वक समझे।`
              : `You have successfully completed "${selectedStory.title}".`}
          </p>

          <div className="key-takeaways-card">
            <h3>📖 {currentLanguage === 'hi' ? 'इस कहानी की मुख्य सीखें:' : 'Key Lessons from this Story:'}</h3>
            <ul className="takeaways-list">
              {selectedStory.keyLessons.map((lesson, idx) => (
                <li key={idx} className="takeaway-item">
                  <span className="bullet-leaf" aria-hidden="true">🌱</span>
                  <span>{lesson}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="completion-buttons-row">
            <button
              type="button"
              className="button button-primary button-large"
              onClick={handleBackToOverview}
            >
              <span>{currentLanguage === 'hi' ? 'अन्य कहानियाँ देखें' : 'Explore Other Stories'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default StoryLearning;