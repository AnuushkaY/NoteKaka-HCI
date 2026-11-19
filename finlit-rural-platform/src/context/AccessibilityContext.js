import React, { createContext, useState, useEffect } from 'react';

export const AccessibilityContext = createContext();

export const AccessibilityProvider = ({ children }) => {
  const [fontSize, setFontSize] = useState(() => {
    return localStorage.getItem('notekaka_font_size') || 'normal';
  });

  const [highContrast, setHighContrast] = useState(() => {
    return localStorage.getItem('notekaka_high_contrast') === 'true';
  });

  const [guidedMode, setGuidedMode] = useState(() => {
    return localStorage.getItem('notekaka_guided_mode') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('notekaka_font_size', fontSize);
    document.documentElement.setAttribute('data-font-size', fontSize);
  }, [fontSize]);

  useEffect(() => {
    localStorage.setItem('notekaka_high_contrast', highContrast.toString());
    if (highContrast) {
      document.documentElement.setAttribute('data-theme', 'high-contrast');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [highContrast]);

  useEffect(() => {
    localStorage.setItem('notekaka_guided_mode', guidedMode.toString());
  }, [guidedMode]);

  const toggleFontSize = () => {
    setFontSize(prev => (prev === 'normal' ? 'large' : 'normal'));
  };

  const toggleHighContrast = () => {
    setHighContrast(prev => !prev);
  };

  const toggleGuidedMode = () => {
    setGuidedMode(prev => !prev);
  };

  return (
    <AccessibilityContext.Provider
      value={{
        fontSize,
        highContrast,
        guidedMode,
        setFontSize,
        setHighContrast,
        toggleFontSize,
        toggleHighContrast,
        toggleGuidedMode,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};
