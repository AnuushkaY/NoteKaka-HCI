import React, { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import VoiceReadAloudBar from './VoiceReadAloudBar';

function SchemeCard({ scheme }) {
  const { translate, currentLanguage } = useContext(LanguageContext);

  const categoryNames = {
    farmer: currentLanguage === 'hi' ? 'किसान कल्याण' : 'Farmers',
    student: currentLanguage === 'hi' ? 'विद्यार्थी व शिक्षा' : 'Students',
    women: currentLanguage === 'hi' ? 'महिला व बालिका' : 'Women',
    senior: currentLanguage === 'hi' ? 'बुज़ुर्ग व पेंशन' : 'Elders & Pension',
    business: currentLanguage === 'hi' ? 'छोटा कारोबार' : 'Small Business',
    general: currentLanguage === 'hi' ? 'सभी नागरिकों के लिए' : 'General Public'
  };

  const schemeAudio = `${scheme.name}. ${scheme.description}. Benefits: ${scheme.benefits}. Eligibility: ${scheme.eligibility.join(', ')}`;

  return (
    <article className="scheme-card card" aria-labelledby={`scheme-title-${scheme.id}`}>
      <div className="scheme-card-header">
        <div className="scheme-category-badge">
          {categoryNames[scheme.category] || scheme.category}
        </div>
        <VoiceReadAloudBar textToRead={schemeAudio} />
      </div>

      <h3 id={`scheme-title-${scheme.id}`} className="scheme-title">
        {scheme.name}
      </h3>

      <p className="scheme-description">
        {scheme.description}
      </p>

      {/* What it helps with */}
      <div className="scheme-benefit-highlight">
        <span className="benefit-icon" aria-hidden="true">🎁</span>
        <div>
          <strong>{currentLanguage === 'hi' ? 'क्या लाभ मिलता है?' : 'What it helps with:'}</strong>
          <p>{scheme.benefits}</p>
        </div>
      </div>

      {/* Plain Language Eligibility */}
      <div className="scheme-section">
        <h4>✅ {translate('Eligibility')}</h4>
        <ul className="scheme-checklist">
          {scheme.eligibility.map((item, idx) => (
            <li key={idx} className="checklist-item">
              <span className="check-bullet" aria-hidden="true">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Required Documents Checklist */}
      <div className="scheme-section">
        <h4>📋 {translate('Documents Needed')}</h4>
        <div className="document-tags-wrap">
          {scheme.documents.map((doc, idx) => (
            <span key={idx} className="doc-pill-tag">
              📄 {doc}
            </span>
          ))}
        </div>
      </div>

      {/* Simple Next Step */}
      <div className="scheme-next-step-box">
        <span className="step-pin-icon" aria-hidden="true">📍</span>
        <div>
          <strong>{translate('Next Step')}:</strong>
          <p>
            {currentLanguage === 'hi'
              ? 'उपरोक्त कागज़ात लेकर अपने गाँव के CSC (कॉमन सर्विस सेंटर) या बैंक शाखा जाएं।'
              : 'Carry the listed documents to your nearest Common Service Center (CSC) or bank branch.'}
          </p>
        </div>
      </div>

      {/* Official Government Portal Link */}
      <div className="scheme-card-footer">
        {scheme.website ? (
          <a
            href={`https://${scheme.website}`}
            target="_blank"
            rel="noopener noreferrer"
            className="button button-outline button-small official-portal-link"
            aria-label={`Visit official government website for ${scheme.name} (opens in new tab)`}
          >
            <span>🌐 {scheme.website}</span>
            <span aria-hidden="true">↗</span>
          </a>
        ) : (
          <span className="portal-note">Official Gram Panchayat Scheme</span>
        )}
      </div>
    </article>
  );
}

export default SchemeCard;