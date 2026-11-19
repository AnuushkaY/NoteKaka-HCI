import React, { useState, useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import HelpTooltip from './HelpTooltip';
import VoiceReadAloudBar from './VoiceReadAloudBar';

function BudgetSimulator() {
  const { translate, currentLanguage } = useContext(LanguageContext);

  const initialBudget = {
    income: 14000,
    ration: 5000,
    workSupplies: 2500,
    education: 1800,
    health: 1200,
    personal: 1500,
  };

  const [budget, setBudget] = useState(initialBudget);

  const totalExpenses =
    Number(budget.ration) +
    Number(budget.workSupplies) +
    Number(budget.education) +
    Number(budget.health) +
    Number(budget.personal);

  const netSavings = Number(budget.income) - totalExpenses;
  const savingsRate = budget.income > 0 ? Math.round((netSavings / budget.income) * 100) : 0;

  const handleChange = (field, value) => {
    const num = Math.max(0, parseInt(value, 10) || 0);
    setBudget(prev => ({ ...prev, [field]: num }));
  };

  const handleReset = () => {
    setBudget(initialBudget);
  };

  const getEncouragingMessage = () => {
    if (netSavings > 0) {
      const yearly = netSavings * 12;
      return currentLanguage === 'hi'
        ? `बधाई हो! आप हर महीने ₹${netSavings.toLocaleString('en-IN')} बचा रहे हैं। 1 साल में यह ₹${yearly.toLocaleString('en-IN')} की सुरक्षा निधि बन जाएगी, जो बीमारी या बुरे वक्त में बिना कर्ज़ लिए आपके काम आएगी!`
        : `Well planned! You are setting aside ₹${netSavings.toLocaleString('en-IN')} each month. In 1 year, this creates a ₹${yearly.toLocaleString('en-IN')} emergency cushion so you won't need to take high-interest loans for unexpected events!`;
    } else if (netSavings === 0) {
      return currentLanguage === 'hi'
        ? 'आपकी आमदनी और खर्च बराबर हैं। किसी भी अचानक आने वाले खर्च (जैसे दवा या औज़ार मरम्मत) के लिए थोड़ा सा (जैसे ₹300-₹500) बचाना बहुत मददगार रहता है।'
        : 'Your income and expenses are evenly matched. Try adjusting small flexible expenses so you can keep at least ₹300 to ₹500 as an emergency safety net.';
    } else {
      return currentLanguage === 'hi'
        ? `सावधानी: आपका खर्च आमदनी से ₹${Math.abs(netSavings).toLocaleString('en-IN')} ज़्यादा हो रहा है। ऐसे में स्थानीय साहूकारों से कर्ज़ लेने का जोखिम बढ़ जाता है। देखें कि किस मद में थोड़ा कम खर्च किया जा सकता है।`
        : `Caution: Your planned spending exceeds your income by ₹${Math.abs(netSavings).toLocaleString('en-IN')}. This can create reliance on high-interest debt. Look at flexible areas to find small savings.`;
    }
  };

  const explanationText = `NoteKaka Budget Simulator: Monthly income ₹${budget.income}. Total expenses ₹${totalExpenses}. Net monthly savings ₹${netSavings}. ${getEncouragingMessage()}`;

  return (
    <div className="budget-simulator card" role="region" aria-label="Budget Simulator Tool">
      <div className="simulator-header-box">
        <div className="header-text-col">
          <h2>{translate('Budget Tool Title')}</h2>
          <p className="subtitle">{translate('Budget Tool Subtitle')}</p>
        </div>
        <VoiceReadAloudBar textToRead={explanationText} />
      </div>

      <div className="simulation-watermark-banner">
        <span className="banner-icon" aria-hidden="true">💡</span>
        <div>
          <strong>{translate('Simulation Notice')}</strong>
          <p style={{ margin: 0, fontSize: '0.85rem' }}>
            This tool is for learning only. No real bank accounts or money are connected.
          </p>
        </div>
      </div>

      <div className="budget-grid">
        {/* Input Column */}
        <div className="budget-inputs-card">
          <h3 className="section-title">
            <span>📥 {translate('Monthly Income')}</span>
            <HelpTooltip
              term="Monthly Earnings"
              explanation="Total cash brought home in a month from farming, daily wages, shop sales, or family contribution."
              example="₹12,000 to ₹18,000"
            />
          </h3>

          <div className="budget-input-group income-group">
            <label htmlFor="budget-income" className="input-label">
              <span>{translate('Monthly Income')}:</span>
              <span className="amount-highlight">₹{budget.income.toLocaleString('en-IN')}</span>
            </label>
            <input
              id="budget-income"
              type="range"
              min="3000"
              max="50000"
              step="500"
              value={budget.income}
              onChange={(e) => handleChange('income', e.target.value)}
              className="range-slider income-slider"
            />
          </div>

          <h3 className="section-title" style={{ marginTop: '24px' }}>
            <span>📤 मासिक घरेलू खर्च (Planned Expenses)</span>
          </h3>

          {/* Rations */}
          <div className="budget-input-group">
            <label htmlFor="budget-ration" className="input-label">
              <span>🍚 {translate('Groceries & Food')}</span>
              <span className="amount-badge">₹{budget.ration.toLocaleString('en-IN')}</span>
            </label>
            <input
              id="budget-ration"
              type="range"
              min="1000"
              max="20000"
              step="200"
              value={budget.ration}
              onChange={(e) => handleChange('ration', e.target.value)}
              className="range-slider"
            />
          </div>

          {/* Farming / Work Supplies */}
          <div className="budget-input-group">
            <label htmlFor="budget-work" className="input-label">
              <span>🌾 {translate('Farming & Work')}</span>
              <span className="amount-badge">₹{budget.workSupplies.toLocaleString('en-IN')}</span>
            </label>
            <input
              id="budget-work"
              type="range"
              min="0"
              max="15000"
              step="200"
              value={budget.workSupplies}
              onChange={(e) => handleChange('workSupplies', e.target.value)}
              className="range-slider"
            />
          </div>

          {/* Education & Children */}
          <div className="budget-input-group">
            <label htmlFor="budget-education" className="input-label">
              <span>📚 {translate('Education & Children')}</span>
              <span className="amount-badge">₹{budget.education.toLocaleString('en-IN')}</span>
            </label>
            <input
              id="budget-education"
              type="range"
              min="0"
              max="10000"
              step="100"
              value={budget.education}
              onChange={(e) => handleChange('education', e.target.value)}
              className="range-slider"
            />
          </div>

          {/* Health & Emergency */}
          <div className="budget-input-group">
            <label htmlFor="budget-health" className="input-label">
              <span>💊 {translate('Health & Emergency')}</span>
              <span className="amount-badge">₹{budget.health.toLocaleString('en-IN')}</span>
            </label>
            <input
              id="budget-health"
              type="range"
              min="0"
              max="8000"
              step="100"
              value={budget.health}
              onChange={(e) => handleChange('health', e.target.value)}
              className="range-slider"
            />
          </div>

          {/* Personal & Festival */}
          <div className="budget-input-group">
            <label htmlFor="budget-personal" className="input-label">
              <span>🎉 {translate('Personal & Festival')}</span>
              <span className="amount-badge">₹{budget.personal.toLocaleString('en-IN')}</span>
            </label>
            <input
              id="budget-personal"
              type="range"
              min="0"
              max="8000"
              step="100"
              value={budget.personal}
              onChange={(e) => handleChange('personal', e.target.value)}
              className="range-slider"
            />
          </div>

          <button
            type="button"
            className="button button-outline button-small"
            onClick={handleReset}
            style={{ marginTop: '16px' }}
          >
            ↺ {translate('Reset Values')}
          </button>
        </div>

        {/* Results & Summary Column */}
        <div className="budget-results-card">
          <h3>📊 परिणाम व विश्लेषण (Monthly Overview)</h3>

          <div className="summary-cards-row">
            <div className="summary-stat-box">
              <span className="stat-label">{translate('Total Planned Expenses')}</span>
              <span className="stat-value expense-text">₹{totalExpenses.toLocaleString('en-IN')}</span>
            </div>

            <div className={`summary-stat-box ${netSavings >= 0 ? 'positive' : 'negative'}`}>
              <span className="stat-label">{translate('Remaining for Savings')}</span>
              <span className="stat-value">
                {netSavings >= 0 ? '+' : ''}₹{netSavings.toLocaleString('en-IN')}
              </span>
              <span className="stat-meta">
                {savingsRate >= 0 ? `${savingsRate}% of earnings` : 'Over budget'}
              </span>
            </div>
          </div>

          {/* Visual Bar Breakdown */}
          <div className="budget-breakdown-bar-container" aria-label="Visual breakdown of spending and savings">
            <div className="breakdown-label">
              <span>खर्च (Expenses) vs बचत (Savings)</span>
              <span>{Math.min(100, Math.max(0, Math.round((totalExpenses / budget.income) * 100)))}% खर्च</span>
            </div>
            <div className="stacked-budget-bar">
              <div
                className="bar-segment expense-fill"
                style={{
                  width: `${Math.min(100, (totalExpenses / budget.income) * 100)}%`
                }}
                title="Planned Expenses"
              ></div>
              {netSavings > 0 && (
                <div
                  className="bar-segment savings-fill"
                  style={{
                    width: `${Math.min(100, (netSavings / budget.income) * 100)}%`
                  }}
                  title="Savings Cushion"
                ></div>
              )}
            </div>
          </div>

          {/* NoteKaka Encouraging Feedback Box */}
          <div className={`feedback-wisdom-box ${netSavings >= 0 ? 'positive' : 'caution'}`}>
            <div className="wisdom-avatar" aria-hidden="true">
              {netSavings >= 0 ? '🌱' : '⚠️'}
            </div>
            <div className="wisdom-content">
              <h4>नोटकाका की सलाह (NoteKaka’s Advice)</h4>
              <p>{getEncouragingMessage()}</p>
            </div>
          </div>

          {/* Key Rule of Thumb */}
          <div className="rule-of-thumb-box">
            <h4>💡 सरल नियम (Golden Rule)</h4>
            <p>
              "आमदनी में से पहले बचत अलग निकाल कर रखें, फिर बचे हुए पैसे से खर्च संभालें।"
              (Save first before spending, even if it is just ₹10 a day!)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BudgetSimulator;
