import React, { useState } from 'react';

function HelpTooltip({ term, explanation, example }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <span className="help-tooltip-container">
      <button
        type="button"
        className="help-tooltip-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label={`What does ${term} mean?`}
        title={`Click for simple explanation of ${term}`}
      >
        <span className="tooltip-term">{term}</span>
        <span className="tooltip-badge" aria-hidden="true">ℹ️</span>
      </button>

      {isOpen && (
        <span className="help-tooltip-content" role="tooltip">
          <span className="tooltip-header">
            <strong>{term}</strong>
            <button
              type="button"
              className="tooltip-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close explanation"
            >
              ✕
            </button>
          </span>
          <span className="tooltip-body">{explanation}</span>
          {example && (
            <span className="tooltip-example">
              <em>उदाहरण (Example):</em> {example}
            </span>
          )}
        </span>
      )}
    </span>
  );
}

export default HelpTooltip;
