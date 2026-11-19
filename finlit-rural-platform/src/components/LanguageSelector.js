import React, { useContext, useState, useRef, useEffect } from 'react';
import { LanguageContext } from '../context/LanguageContext';

function LanguageSelector() {
  const { currentLanguage, availableLanguages, changeLanguage } = useContext(LanguageContext);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentLangObj = availableLanguages.find(l => l.code === currentLanguage) || availableLanguages[0];

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (lang) => {
    if (lang.status === 'ready') {
      changeLanguage(lang.code);
      setIsOpen(false);
    }
  };

  return (
    <div className="language-selector" ref={dropdownRef}>
      <button
        type="button"
        className="language-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label="Select language"
      >
        <span className="language-icon" aria-hidden="true">🌐</span>
        <span className="language-code">{currentLangObj.nativeName}</span>
        <span className="dropdown-arrow" aria-hidden="true">{isOpen ? '▲' : '▼'}</span>
      </button>

      {isOpen && (
        <div className="language-dropdown" role="listbox" aria-label="Available languages">
          <div className="language-dropdown-header">
            <small>Select Language / भाषा चुनें</small>
          </div>
          {availableLanguages.map((lang) => {
            const isReady = lang.status === 'ready';
            const isSelected = currentLanguage === lang.code;

            return (
              <button
                key={lang.code}
                type="button"
                className={`language-option ${isSelected ? 'active' : ''} ${!isReady ? 'disabled' : ''}`}
                onClick={() => handleSelect(lang)}
                disabled={!isReady}
                role="option"
                aria-selected={isSelected}
              >
                <div className="option-text">
                  <span className="option-native">{lang.nativeName}</span>
                  <span className="option-name">{lang.name}</span>
                </div>
                {isReady ? (
                  isSelected && <span className="check-mark" aria-hidden="true">✓</span>
                ) : (
                  <span className="badge-coming-soon">Coming Soon</span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default LanguageSelector;