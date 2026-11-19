import React, { useState, useContext } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { LanguageContext } from '../context/LanguageContext';
import VoiceReadAloudBar from '../components/VoiceReadAloudBar';
import '../styles/DigitalPayments.css';

function DigitalPayments() {
  const { translate, currentLanguage } = useContext(LanguageContext);

  // Simulator Stages: 'select' -> 'verify' -> 'pin' -> 'success'
  const [simStage, setSimStage] = useState('select');
  const [selectedRecipient, setSelectedRecipient] = useState({
    name: 'Sharmaji Kirana Store',
    upiId: 'sharma.kirana@fictionalbank',
    amount: '85',
    type: 'shop'
  });
  const [enteredPin, setEnteredPin] = useState('');
  const [pinError, setPinError] = useState('');
  const [customUpi, setCustomUpi] = useState('');
  const [customAmount, setCustomAmount] = useState('100');
  const [activeTab, setActiveTab] = useState('simulator'); // 'simulator' | 'scambuster' | 'qrguide'

  const mockScenarios = [
    {
      id: 'kirana',
      name: 'Sharmaji Kirana Store',
      upiId: 'sharma.kirana@fictionalbank',
      amount: '85',
      type: 'shop',
      icon: '🏪',
      desc: currentLanguage === 'hi' ? 'दुकान से 2 किलो चीनी और चायपत्ती ली' : '2kg sugar and tea from local grocery'
    },
    {
      id: 'friend',
      name: 'Ramesh Patel (Friend)',
      upiId: 'ramesh.farmer@fictionalbank',
      amount: '450',
      type: 'person',
      icon: '👨‍🌾',
      desc: currentLanguage === 'hi' ? 'खाद के पैसे लौटाने के लिए' : 'Sharing cost of farm fertilizer'
    },
    {
      id: 'milk',
      name: 'Gayatri Dairy Center',
      upiId: 'dairy.village@fictionalbank',
      amount: '210',
      type: 'shop',
      icon: '🥛',
      desc: currentLanguage === 'hi' ? 'साप्ताहिक दूध का हिसाब' : 'Weekly milk payment'
    }
  ];

  const handleStartPractice = (scenario) => {
    setSelectedRecipient(scenario);
    setEnteredPin('');
    setPinError('');
    setSimStage('verify');
  };

  const handleStartCustom = () => {
    if (!customUpi.trim()) {
      alert(currentLanguage === 'hi' ? 'कृपया कोई काल्पनिक नाम दर्ज करें' : 'Please enter a practice name');
      return;
    }
    setSelectedRecipient({
      name: customUpi,
      upiId: `${customUpi.toLowerCase().replace(/\s+/g, '')}@fictionalbank`,
      amount: customAmount || '50',
      type: 'person'
    });
    setEnteredPin('');
    setPinError('');
    setSimStage('verify');
  };

  const handleKeypadPress = (val) => {
    if (enteredPin.length < 4) {
      setEnteredPin(prev => prev + val);
      setPinError('');
    }
  };

  const handleKeypadBackspace = () => {
    setEnteredPin(prev => prev.slice(0, -1));
    setPinError('');
  };

  const handleConfirmPin = () => {
    if (enteredPin.length === 4) {
      setSimStage('success');
    } else {
      setPinError(
        currentLanguage === 'hi'
          ? 'कृपया 4 अंकों का कोई भी काल्पनिक पिन दर्ज करें'
          : 'Please enter any 4-digit mock PIN to test'
      );
    }
  };

  const handleResetSimulator = () => {
    setSimStage('select');
    setEnteredPin('');
    setPinError('');
  };

  const audioIntro = currentLanguage === 'hi'
    ? 'यूपीआई भुगतान अभ्यास कक्ष। यहाँ आप बिना किसी असली पैसे के, दुकान पर भुगतान करने और क्यूआर कोड स्कैन करने का सुरक्षित अभ्यास कर सकते हैं।'
    : 'Welcome to the safe UPI practice simulator. Practice digital transfers step-by-step with zero risk of real money loss.';

  return (
    <div className="digital-payments-page" id="main-content-anchor" role="region" aria-label="Digital Payments Simulator">
      {/* Simulation Reassurance Banner */}
      <div className="simulation-watermark-banner">
        <span className="banner-icon" aria-hidden="true">🛡️</span>
        <div>
          <strong>{translate('Simulation Notice')}</strong>
          <span style={{ display: 'block', fontSize: '0.85rem' }}>
            {currentLanguage === 'hi'
              ? 'यह केवल सीखने के लिए बनाया गया अभ्यास सिमुलेटर है। कोई भी असली बैंक या पैसा नहीं जुड़ा है।'
              : 'This is a strictly educational practice simulator. No real money or bank accounts are connected.'}
          </span>
        </div>
      </div>

      {/* Top Header Card */}
      <div className="payments-hero-card card">
        <div className="hero-text-col">
          <h1>
            {currentLanguage === 'hi'
              ? 'सुरक्षित UPI भुगतान अभ्यास (Safe UPI Simulator)'
              : 'Safe UPI & Digital Payment Simulator'}
          </h1>
          <p className="subtitle">
            {currentLanguage === 'hi'
              ? 'सीखिए कि दुकान पर QR कोड स्कैन करके या मोबाइल से पैसे कैसे भेजे जाते हैं, बिना किसी असली पैसे के डर के।'
              : 'Learn how UPI payments and QR scans work step-by-step without fear of making mistakes.'}
          </p>
        </div>
        <VoiceReadAloudBar textToRead={audioIntro} />
      </div>

      {/* Navigation Tabs */}
      <div className="payments-tabs-row" role="tablist" aria-label="Payment Features">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'simulator'}
          className={`tab-pill-btn ${activeTab === 'simulator' ? 'active' : ''}`}
          onClick={() => setActiveTab('simulator')}
        >
          <span>📱 {currentLanguage === 'hi' ? 'भुगतान अभ्यास सिमुलेटर' : 'Practice Simulator'}</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'scambuster'}
          className={`tab-pill-btn ${activeTab === 'scambuster' ? 'active' : ''}`}
          onClick={() => setActiveTab('scambuster')}
        >
          <span>🛡️ {currentLanguage === 'hi' ? 'धोखाधड़ी से बचाव (Scam Buster)' : 'Scam Protection'}</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'qrguide'}
          className={`tab-pill-btn ${activeTab === 'qrguide' ? 'active' : ''}`}
          onClick={() => setActiveTab('qrguide')}
        >
          <span>🔳 {currentLanguage === 'hi' ? 'QR कोड क्या होता है?' : 'QR Code Guide'}</span>
        </button>
      </div>

      {/* TAB 1: INTERACTIVE UPI SIMULATOR */}
      {activeTab === 'simulator' && (
        <div className="simulator-tab-content">
          {/* Stage 1: Select Scenario */}
          {simStage === 'select' && (
            <div className="simulator-scenario-card card">
              <div className="scenario-intro">
                <h2>
                  {currentLanguage === 'hi'
                    ? '1. किसे भुगतान का अभ्यास करना चाहते हैं?'
                    : '1. Select a Practice Scenario'}
                </h2>
                <p>
                  {currentLanguage === 'hi'
                    ? 'नीचे दिए गए किसी भी काल्पनिक उदाहरण को चुनें:'
                    : 'Choose an everyday situation to start practicing:'}
                </p>
              </div>

              <div className="scenarios-grid">
                {mockScenarios.map((sc) => (
                  <div
                    key={sc.id}
                    className="scenario-item card"
                    onClick={() => handleStartPractice(sc)}
                    role="button"
                    tabIndex={0}
                    onKeyPress={(e) => e.key === 'Enter' && handleStartPractice(sc)}
                  >
                    <div className="scenario-top">
                      <span className="scenario-icon" aria-hidden="true">{sc.icon}</span>
                      <span className="scenario-amount">₹{sc.amount}</span>
                    </div>
                    <h3>{sc.name}</h3>
                    <p className="scenario-desc">{sc.desc}</p>
                    <div className="scenario-id-preview">
                      <code>{sc.upiId}</code>
                    </div>
                    <button type="button" className="button button-primary button-small">
                      {currentLanguage === 'hi' ? 'इस पर अभ्यास करें →' : 'Practice this →'}
                    </button>
                  </div>
                ))}
              </div>

              {/* Custom scenario input */}
              <div className="custom-practice-box">
                <h3>{currentLanguage === 'hi' ? 'या अपनी मर्ज़ी से नाम व राशि लिखें:' : 'Or enter custom practice details:'}</h3>
                <div className="custom-fields-row">
                  <input
                    type="text"
                    placeholder={currentLanguage === 'hi' ? 'दुकानदार या साथी का नाम' : 'Recipient Name (e.g. Verma Store)'}
                    value={customUpi}
                    onChange={(e) => setCustomUpi(e.target.value)}
                    className="custom-input"
                    aria-label="Practice recipient name"
                  />
                  <input
                    type="number"
                    placeholder="₹ Amount"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="custom-input amount"
                    min="1"
                    max="10000"
                    aria-label="Practice amount in rupees"
                  />
                  <button
                    type="button"
                    className="button button-secondary"
                    onClick={handleStartCustom}
                  >
                    {currentLanguage === 'hi' ? 'अभ्यास शुरू करें' : 'Start Custom Test'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Stage 2: Recipient Verification Screen */}
          {simStage === 'verify' && (
            <div className="simulator-phone-wrapper">
              <div className="mock-phone-frame card">
                <div className="phone-top-status">
                  <span>NoteKaka Pay • Practice Screen</span>
                  <span>🔋 90%</span>
                </div>

                <div className="verification-screen-body">
                  <span className="verification-avatar" aria-hidden="true">
                    {selectedRecipient.type === 'shop' ? '🏪' : '👤'}
                  </span>
                  <div className="paying-to-label">
                    {currentLanguage === 'hi' ? 'भुगतान पाने वाला (Paying To):' : 'Paying To:'}
                  </div>
                  <h2 className="recipient-name-highlight">{selectedRecipient.name}</h2>
                  <div className="recipient-id-badge">
                    <code>{selectedRecipient.upiId}</code>
                  </div>

                  {/* Golden Safety Checkbox */}
                  <div className="verification-guidance-box">
                    <span className="icon" aria-hidden="true">🔍</span>
                    <div>
                      <strong>
                        {currentLanguage === 'hi' ? 'महत्वपूर्ण नियम (Golden Rule):' : 'Important Safety Check:'}
                      </strong>
                      <p>
                        {currentLanguage === 'hi'
                          ? 'असल ज़िंदगी में पैसे भेजने से पहले हमेशा स्क्रीन पर नाम ध्यान से पढ़ें कि वह सही व्यक्ति का ही है!'
                          : 'In real life, always verify the recipient name on your screen before proceeding!'}
                      </p>
                    </div>
                  </div>

                  <div className="amount-confirm-box">
                    <span className="currency-symbol">₹</span>
                    <span className="amount-number">{selectedRecipient.amount}</span>
                  </div>

                  <div className="verification-actions">
                    <button
                      type="button"
                      className="button button-primary button-large"
                      onClick={() => setSimStage('pin')}
                    >
                      {currentLanguage === 'hi'
                        ? `₹${selectedRecipient.amount} भुगतान के लिए आगे बढ़ें →`
                        : `Proceed to Pay ₹${selectedRecipient.amount} →`}
                    </button>

                    <button
                      type="button"
                      className="button button-outline"
                      onClick={handleResetSimulator}
                    >
                      {currentLanguage === 'hi' ? 'रद्द करें / वापस जाएं' : 'Cancel & Go Back'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Stage 3: Simulated UPI PIN Entry on Numeric Keypad */}
          {simStage === 'pin' && (
            <div className="simulator-phone-wrapper">
              <div className="mock-phone-frame card">
                <div className="phone-top-status">
                  <span>सुरक्षित UPI पिन स्क्रीन (Simulated)</span>
                  <span>🔒 Safe Mode</span>
                </div>

                <div className="pin-screen-body">
                  <div className="pin-payment-meta">
                    <span>{selectedRecipient.name}</span>
                    <strong className="pin-meta-amount">₹{selectedRecipient.amount}</strong>
                  </div>

                  <h3 className="pin-title">{translate('Enter PIN')}</h3>

                  {/* Safety Warning */}
                  <div className="pin-warning-callout" role="alert">
                    <span className="warning-icon" aria-hidden="true">⚠️</span>
                    <p>{translate('PIN Warning')}</p>
                  </div>

                  {/* 4-digit PIN Dots */}
                  <div className="pin-dots-container" aria-label={`Entered ${enteredPin.length} digits`}>
                    {[0, 1, 2, 3].map((dotIdx) => (
                      <span
                        key={dotIdx}
                        className={`pin-dot ${dotIdx < enteredPin.length ? 'filled' : ''}`}
                      ></span>
                    ))}
                  </div>

                  {pinError && <p className="pin-error-text" role="alert">{pinError}</p>}

                  {/* Accessible Numeric Keypad */}
                  <div className="numeric-keypad-grid" role="group" aria-label="PIN Keypad">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((digit) => (
                      <button
                        key={digit}
                        type="button"
                        className="keypad-btn"
                        onClick={() => handleKeypadPress(digit.toString())}
                        aria-label={`Digit ${digit}`}
                      >
                        {digit}
                      </button>
                    ))}
                    <button
                      type="button"
                      className="keypad-btn action-key"
                      onClick={handleKeypadBackspace}
                      aria-label="Backspace"
                    >
                      ⌫
                    </button>
                    <button
                      type="button"
                      className="keypad-btn"
                      onClick={() => handleKeypadPress('0')}
                      aria-label="Digit 0"
                    >
                      0
                    </button>
                    <button
                      type="button"
                      className="keypad-btn action-key submit-key"
                      onClick={handleConfirmPin}
                      aria-label="Submit PIN"
                    >
                      ✓
                    </button>
                  </div>

                  <button
                    type="button"
                    className="button button-outline button-small"
                    onClick={handleResetSimulator}
                    style={{ marginTop: '16px' }}
                  >
                    ← {currentLanguage === 'hi' ? 'रद्द करें' : 'Cancel'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Stage 4: Payment Success Confirmation Screen */}
          {simStage === 'success' && (
            <div className="simulator-phone-wrapper">
              <div className="mock-phone-frame card success-mode">
                <div className="phone-top-status">
                  <span>NoteKaka Practice Success</span>
                  <span>✅ Complete</span>
                </div>

                <div className="success-screen-body">
                  <div className="success-checkmark-circle" aria-hidden="true">
                    <span>✓</span>
                  </div>

                  <h2>{translate('Simulated Payment Success')}</h2>
                  <div className="success-amount-display">
                    ₹{selectedRecipient.amount}
                  </div>

                  <p className="success-recipient-line">
                    {currentLanguage === 'hi' ? 'सफलतापूर्वक भेजा गया:' : 'Sent to:'}{' '}
                    <strong>{selectedRecipient.name}</strong>
                  </p>

                  <div className="fictional-txn-box">
                    <div className="txn-row">
                      <span>UPI Ref (काल्पनिक):</span>
                      <code>SIM-{(Math.random() * 10000000).toFixed(0)}</code>
                    </div>
                    <div className="txn-row">
                      <span>तारीख व समय:</span>
                      <span>{new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}</span>
                    </div>
                  </div>

                  {/* Explicit Non-Real Money Watermark */}
                  <div className="simulation-stamp-watermark" aria-hidden="true">
                    ★ EDUCATIONAL PRACTICE ONLY — NO ACTUAL MONEY MOVED ★
                  </div>

                  {/* Key Takeaways */}
                  <div className="success-takeaway-card">
                    <h4>💡 आज की मुख्य सीख (Key Rule Learned):</h4>
                    <ul>
                      <li>
                        {currentLanguage === 'hi'
                          ? 'पैसे भेजने के लिए ही पिन डाला जाता है, पैसे मंगाने या पाने के लिए कभी पिन नहीं डालना पड़ता!'
                          : 'You only enter a PIN to SEND money, never to RECEIVE money!'}
                      </li>
                      <li>
                        {currentLanguage === 'hi'
                          ? 'दुकानदार का नाम स्क्रीन पर जांचने के बाद ही पुष्टि करें।'
                          : 'Always double-check recipient name on screen before paying.'}
                      </li>
                    </ul>
                  </div>

                  <button
                    type="button"
                    className="button button-primary button-large"
                    onClick={handleResetSimulator}
                  >
                    <span>↺ {translate('Practice Another')}</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: SCAM BUSTER */}
      {activeTab === 'scambuster' && (
        <div className="scambuster-tab-content">
          <div className="scambuster-intro card">
            <h2>🛡️ {currentLanguage === 'hi' ? 'धोखाधड़ी व ठगी से बचाव के 4 बड़े नियम' : '4 Golden Rules to Prevent UPI Fraud'}</h2>
            <p>
              {currentLanguage === 'hi'
                ? 'ठग अक्सर जल्दबाज़ी कराकर या डर दिखाकर पैसा चुराते हैं। इन बातों को हमेशा याद रखें:'
                : 'Scammers use fear or urgency to steal money. Remember these four rules always:'}
            </p>
          </div>

          <div className="scam-rules-grid">
            <div className="scam-rule-card card do-not">
              <div className="rule-badge">❌ {currentLanguage === 'hi' ? 'कभी न करें' : 'Never Do'}</div>
              <h3>{currentLanguage === 'hi' ? 'पैसे पाने के लिए PIN न डालें' : 'Never Enter PIN to Receive Money'}</h3>
              <p>
                {currentLanguage === 'hi'
                  ? 'कोई कहे कि "मैं आपको ₹5,000 भेज रहा हूँ, आप अपना पिन डालकर स्वीकार करें" — यह 100% ठगी है! पैसे आने पर सिर्फ बैंक का SMS आता है, पिन नहीं डालना पड़ता।'
                  : 'If someone asks you to enter a PIN to "claim" money or prize, it is a scam. Money is received automatically without any PIN.'}
              </p>
            </div>

            <div className="scam-rule-card card do-not">
              <div className="rule-badge">❌ {currentLanguage === 'hi' ? 'कभी न करें' : 'Never Share'}</div>
              <h3>{currentLanguage === 'hi' ? 'OTP या पासवर्ड किसी को न बताएं' : 'Never Share OTP with Anyone'}</h3>
              <p>
                {currentLanguage === 'hi'
                  ? 'बैंक अधिकारी, बिजली विभाग या कोई भी सरकारी कर्मचारी फोन पर कभी OTP नहीं मांगता। OTP बताने का मतलब है अपने खाते की चाबी ठग को देना।'
                  : 'Bank officials or government officers will NEVER call asking for your OTP or password. Never disclose it.'}
              </p>
            </div>

            <div className="scam-rule-card card do">
              <div className="rule-badge">✅ {currentLanguage === 'hi' ? 'हमेशा करें' : 'Always Check'}</div>
              <h3>{currentLanguage === 'hi' ? 'दुकानदार का नाम देखकर ही भुगतान करें' : 'Verify Recipient Name First'}</h3>
              <p>
                {currentLanguage === 'hi'
                  ? 'QR कोड स्कैन करने के बाद स्क्रीन पर दुकानदार का नाम दिखता है। यदि नाम अनजान लगे, तो तुरंत दुकानदार से पूछें।'
                  : 'Always look at the name on screen after scanning a QR sticker before tapping pay.'}
              </p>
            </div>

            <div className="scam-rule-card card do">
              <div className="rule-badge">✅ {currentLanguage === 'hi' ? 'आपातकाल' : 'Helpline'}</div>
              <h3>{currentLanguage === 'hi' ? 'ठगी होने पर तुरंत 1930 पर कॉल करें' : 'Dial 1930 Immediately if Cheated'}</h3>
              <p>
                {currentLanguage === 'hi'
                  ? 'यदि गलती से किसी को पैसा चला जाए या ठगी हो जाए, तो 2 घंटे के भीतर राष्ट्रीय साइबर अपराध हेल्पलाइन 1930 पर कॉल करें ताकि पैसा रोका जा सके।'
                  : 'Call the Government Cybercrime Helpline 1930 within 2 hours so fraudulent transfers can be frozen.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: QR CODE GUIDE */}
      {activeTab === 'qrguide' && (
        <div className="qrguide-tab-content">
          <div className="qrguide-card card">
            <h2>🔳 {currentLanguage === 'hi' ? 'QR कोड क्या होता है और यह कैसे काम करता है?' : 'Understanding QR Codes'}</h2>
            <p>
              {currentLanguage === 'hi'
                ? 'QR कोड काले और सफ़ेद चौकोर बिंदुओं का एक चित्र होता है। इसमें दुकानदार का UPI पता छिपा होता है।'
                : 'A QR code is a pattern of dots storing the recipient’s bank UPI address so you don’t have to type long account numbers.'}
            </p>

            <div className="qr-explanation-grid">
              <div className="qr-step-box">
                <span className="step-num">1</span>
                <h4>{currentLanguage === 'hi' ? 'दुकान का QR कोड' : 'Shop QR Code'}</h4>
                <p>{currentLanguage === 'hi' ? 'दुकानदार के काउंटर पर लगा पोस्टर जिसमें उनका खाता दर्ज होता है।' : 'Mounted at counter with shop details.'}</p>
              </div>

              <div className="qr-step-box">
                <span className="step-num">2</span>
                <h4>{currentLanguage === 'hi' ? 'फ़ोन कैमरा से स्कैन' : 'Scan with App'}</h4>
                <p>{currentLanguage === 'hi' ? 'PhonePe, Google Pay या Paytm खोलकर स्कैन बटन दबाएं।' : 'Open your bank/UPI app and point camera at the code.'}</p>
              </div>

              <div className="qr-step-box">
                <span className="step-num">3</span>
                <h4>{currentLanguage === 'hi' ? 'नाम व राशि जांचें' : 'Check Details'}</h4>
                <p>{currentLanguage === 'hi' ? 'दुकानदार का नाम और सामान का सही बिल मिलाकर ही पिन दर्ज करें।' : 'Match bill amount and confirm name before entering PIN.'}</p>
              </div>
            </div>

            {/* Practice QR Demo */}
            <div className="live-qr-demo-area">
              <h3>{currentLanguage === 'hi' ? 'काल्पनिक QR कोड उदाहरण (Practice QR Code)' : 'Sample Practice QR Code'}</h3>
              <div className="demo-qr-center">
                <QRCodeSVG
                  value="upi://pay?pa=notekaka.practice@bank&pn=NoteKakaPractice&am=50&cu=INR"
                  size={180}
                  level="M"
                  includeMargin={true}
                />
                <p className="qr-caption">
                  {currentLanguage === 'hi'
                    ? 'काल्पनिक क्यूआर कोड (अभ्यास के लिए)'
                    : 'Fictional practice QR code'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DigitalPayments;