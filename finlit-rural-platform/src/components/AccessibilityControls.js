import React, { useContext } from 'react';
import { AccessibilityContext } from '../context/AccessibilityContext';
import { LanguageContext } from '../context/LanguageContext';

function AccessibilityControls() {
  const {
    fontSize,
    highContrast,
    toggleFontSize,
    toggleHighContrast,
  } = useContext(AccessibilityContext);

  const { translate } = useContext(LanguageContext);

  return (
    <div className="a11y-toolbar" role="group" aria-label="Accessibility settings">
      {/* Font Size Toggle */}
      <button
        type="button"
        className={`a11y-btn ${fontSize === 'large' ? 'active' : ''}`}
        onClick={toggleFontSize}
        aria-pressed={fontSize === 'large'}
        title="Toggle between normal and large text size"
      >
        <span aria-hidden="true" style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>A+</span>
        <span>
          {fontSize === 'large'
            ? translate('Large')
            : translate('Normal')}
        </span>
      </button>

      {/* High Contrast Toggle */}
      <button
        type="button"
        className={`a11y-btn ${highContrast ? 'active' : ''}`}
        onClick={toggleHighContrast}
        aria-pressed={highContrast}
        title="Toggle high-contrast accessible mode"
      >
        <span aria-hidden="true">🌓</span>
        <span>{translate('High Contrast')}</span>
      </button>
    </div>
  );
}

export default AccessibilityControls;
