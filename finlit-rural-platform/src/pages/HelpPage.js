import React, { useState, useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import VoiceReadAloudBar from '../components/VoiceReadAloudBar';
import '../styles/HelpPage.css';

function HelpPage() {
  const { translate, currentLanguage } = useContext(LanguageContext);
  const [activeFaq, setActiveFaq] = useState(null);

  // Verified Official National Toll-Free Helplines in India
  const verifiedHelplines = [
    {
      name: translate('Cyber Crime Helpline'),
      number: '1930',
      timing: '24x7 Toll-Free',
      purpose: currentLanguage === 'hi'
        ? 'यदि UPI या बैंक से कोई ठगी या फ्रॉड हो जाए, तो 2 घंटे के भीतर इस नंबर पर फोन करें ताकि पैसा रोका जा सके।'
        : 'Official Government of India cybercrime fraud reporting helpline to freeze unauthorized transactions.',
      badge: '🚨 Urgent'
    },
    {
      name: translate('RBI Banking Ombudsman'),
      number: '14440',
      timing: 'Working Days • Toll-Free',
      purpose: currentLanguage === 'hi'
        ? 'बैंक से जुड़ी शिकायत या समाधान न मिलने पर भारतीय रिज़र्व बैंक (RBI) की आधिकारिक हेल्पलाइन।'
        : 'Reserve Bank of India official banking grievance and awareness helpline.',
      badge: '🏦 Banking'
    },
    {
      name: translate('Consumer Helpline'),
      number: '1915',
      timing: 'All Days 8 AM - 8 PM',
      purpose: currentLanguage === 'hi'
        ? 'दुकानदार या किसी सेवा द्वारा गलत वसूली या धोखाधड़ी की शिकायत के लिए।'
        : 'National Consumer Disputes Redressal Helpline by Dept of Consumer Affairs.',
      badge: '⚖️ Consumer'
    },
    {
      name: translate('Aadhaar Helpline'),
      number: '1947',
      timing: '24x7 Toll-Free',
      purpose: currentLanguage === 'hi'
        ? 'आधार कार्ड में नाम, पता या मोबाइल नंबर जुड़वाने संबंधी जानकारी के लिए।'
        : 'Official UIDAI citizen helpline for Aadhaar updates and verification.',
      badge: '🆔 Identity'
    },
    {
      name: translate('Kisan Call Center'),
      number: '1800-180-1551',
      timing: '6 AM - 10 PM Everyday',
      purpose: currentLanguage === 'hi'
        ? 'फसल बीमा, बीज, खाद व सरकारी किसान योजनाओं की मुफ़्त विशेषज्ञ सलाह।'
        : 'Ministry of Agriculture toll-free helpline providing farmer guidance in local languages.',
      badge: '🌾 Farmers'
    }
  ];

  // Plain language financial glossary
  const financialGlossary = [
    {
      term: currentLanguage === 'hi' ? 'UPI PIN (यूपीआई पिन)' : 'UPI PIN',
      definition: currentLanguage === 'hi'
        ? 'यह आपके एटीएम पिन की तरह 4 या 6 अंकों का गुप्त पासवर्ड होता है। इसे केवल आप जानते हैं। पैसे भेजने के समय ही इसे अपने मोबाइल में दर्ज किया जाता है। किसी को कभी न बताएं।'
        : 'A 4 or 6-digit secret code you create on your phone. You only enter it when YOU want to SEND money. Never share it with anyone.'
    },
    {
      term: 'OTP (One Time Password)',
      definition: currentLanguage === 'hi'
        ? 'बैंक से SMS पर आने वाला 6 अंकों का एक बार इस्तेमाल होने वाला कोड। यह साबित करता है कि खाता आपका ही है। इसे किसी भी कॉलर या अनजान व्यक्ति को कभी न बताएं।'
        : 'A 6-digit single-use code sent to your phone. It acts as an electronic signature. Never read it out to phone callers.'
    },
    {
      term: currentLanguage === 'hi' ? 'Bank Mitra (बैंक मित्र / BC)' : 'Bank Mitra (Business Correspondent)',
      definition: currentLanguage === 'hi'
        ? 'बैंक द्वारा गाँव या पंचायत में अधिकृत किया गया स्थानीय प्रतिनिधि, जो अंगूठा लगाकर पैसे निकालने, जमा करने और पेंशन देने का काम करता है।'
        : 'An authorized representative in rural villages who provides basic banking, cash deposits, and pension payouts using biometric devices.'
    },
    {
      term: currentLanguage === 'hi' ? 'DBT (प्रत्यक्ष लाभ अंतरण)' : 'DBT (Direct Benefit Transfer)',
      definition: currentLanguage === 'hi'
        ? 'सरकारी योजना (जैसे पीएम किसान या छात्रवृत्ति) का पैसा बिना किसी बिचौलिए के सीधे आपके बैंक खाते में जमा होना।'
        : 'Government subsidies and scheme funds transferred directly into your Aadhaar-linked bank account without middlemen.'
    },
    {
      term: currentLanguage === 'hi' ? 'Passbook Entry (पासबुक एंट्री)' : 'Passbook Entry',
      definition: currentLanguage === 'hi'
        ? 'बैंक की छोटी डायरी में छपे हुए लेन-देन का रिकॉर्ड। इसमें दिखता है कि कितना पैसा आया और कितना निकला।'
        : 'A physical booklet recording your account deposits, withdrawals, and current available balance.'
    }
  ];

  const faqs = [
    {
      q: currentLanguage === 'hi' ? 'क्या नोटकाका पर सीखने के लिए पैसे देने होते हैं?' : 'Does NoteKaka charge any fee?',
      a: currentLanguage === 'hi'
        ? 'बिल्कुल नहीं! नोटकाका 100% मुफ़्त और सुरक्षित है। यहाँ कोई असली पैसा नहीं लगता और न ही कोई बैंक विवरण मांगा जाता है।'
        : 'No, NoteKaka is completely free and educational. No real money or bank account information is ever collected.'
    },
    {
      q: currentLanguage === 'hi' ? 'यदि गाँव में बैंक शाखा दूर हो तो क्या करें?' : 'What if the bank branch is far from my village?',
      a: currentLanguage === 'hi'
        ? 'अपनी ग्राम पंचायत भवन या नज़दीकी CSC केंद्र जाएं और वहां उपलब्ध "बैंक मित्र" (Business Correspondent) से मिलें। वे बायोमेट्रिक मशीन से आपके गाँव में ही पैसे निकालने और जमा करने में मदद करते हैं।'
        : 'Visit your local Panchayat Bhavan or Common Service Center (CSC) to find an authorized Bank Mitra who can handle deposits and withdrawals.'
    },
    {
      q: currentLanguage === 'hi' ? 'गलत खाते में UPI से पैसे चले जाएं तो क्या करें?' : 'What if I send a UPI payment to the wrong person by mistake?',
      a: currentLanguage === 'hi'
        ? 'तुरंत अपने UPI ऐप की "Help / Support" में जाकर उस लेन-देन पर "Wrong Transfer" की शिकायत दर्ज करें, और अपनी बैंक शाखा में जाकर UTR नंबर के साथ लिखित सूचना दें।'
        : 'Immediately file a dispute inside your UPI app support section and visit your home bank branch with the transaction reference ID (UTR).'
    }
  ];

  const helpAudio = currentLanguage === 'hi'
    ? 'मदद, सरकारी हेल्पलाइन व वित्तीय शब्दकोश। किसी भी आपातकाल या ठगी के लिए राष्ट्रीय हेल्पलाइन 1930 पर कॉल करें।'
    : 'Help and verified government helplines. For fraud emergencies, dial national helpline 1930.';

  return (
    <div className="help-page" id="main-content-anchor" role="region" aria-label="Help and Support Directory">
      {/* Transparency Banner */}
      <div className="simulation-watermark-banner">
        <span className="banner-icon" aria-hidden="true">📞</span>
        <div>
          <strong>
            {currentLanguage === 'hi'
              ? 'सत्यापित राष्ट्रीय हेल्पलाइन (Verified Official Helplines)'
              : 'Verified National Helplines Only'}
          </strong>
          <p style={{ margin: 0, fontSize: '0.85rem' }}>
            {currentLanguage === 'hi'
              ? 'यहाँ केवल भारत सरकार और भारतीय रिज़र्व बैंक की अधिकृत राष्ट्रीय टोल-फ्री हेल्पलाइन दी गई हैं।'
              : 'Only verified Government of India and RBI official toll-free helplines are listed.'}
          </p>
        </div>
      </div>

      {/* Hero Header */}
      <div className="help-hero-card card">
        <div className="help-hero-text">
          <h1>{translate('Help Page Title')}</h1>
          <p className="subtitle">{translate('Help Page Subtitle')}</p>
        </div>
        <VoiceReadAloudBar textToRead={helpAudio} />
      </div>

      {/* Section 1: Verified National Helplines */}
      <section className="helpline-section" aria-labelledby="helplines-heading">
        <div className="section-title-wrap">
          <h2 id="helplines-heading">
            {translate('National Helplines')}
          </h2>
          <span className="sub">
            {currentLanguage === 'hi'
              ? 'सीधे अपने फोन से इन टोल-फ्री नंबरों पर कॉल करें'
              : 'Official emergency numbers accessible from any mobile or landline'}
          </span>
        </div>

        <div className="helplines-grid">
          {verifiedHelplines.map((item, idx) => (
            <div key={idx} className="helpline-card card">
              <div className="helpline-top">
                <span className="helpline-badge">{item.badge}</span>
                <span className="helpline-timing">{item.timing}</span>
              </div>
              <h3 className="helpline-name">{item.name}</h3>
              <p className="helpline-purpose">{item.purpose}</p>

              <div className="helpline-call-row">
                <a
                  href={`tel:${item.number.replace(/-/g, '')}`}
                  className="button button-primary button-large call-now-btn"
                  aria-label={`Call ${item.name} at ${item.number}`}
                >
                  <span aria-hidden="true">📞</span>
                  <span>{item.number}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: In-Person Human Assistance in Rural Villages */}
      <section className="in-person-guidance-section" aria-labelledby="in-person-heading">
        <div className="in-person-card card">
          <div className="in-person-icon" aria-hidden="true">🏛️</div>
          <div className="in-person-content">
            <h2 id="in-person-heading">{translate('Bank Mitra Help')}</h2>
            <p className="in-person-desc">{translate('Bank Mitra Help Desc')}</p>

            <div className="authorized-roles-grid">
              <div className="role-box">
                <h4>1. बैंक मित्र (Bank Mitra / BC)</h4>
                <p>{currentLanguage === 'hi' ? 'पंचायत या सीएससी में फिंगरप्रिंट मशीन से पैसे निकालना, जमा करना व पेंशन देना।' : 'Authorized village kiosk handling small withdrawals, deposits, and pensions.'}</p>
              </div>
              <div className="role-box">
                <h4>2. CSC (कॉमन सर्विस सेंटर)</h4>
                <p>{currentLanguage === 'hi' ? 'पीएम किसान, आधार व सरकारी योजनाओं के ऑनलाइन फॉर्म निःशुल्क या निर्धारित शुल्क पर भरना।' : 'Government citizen center for filling official welfare and scheme forms.'}</p>
              </div>
              <div className="role-box">
                <h4>3. डाकघर शाखा (Post Office)</h4>
                <p>{currentLanguage === 'hi' ? 'डाकिया (Postman) से घर बैठे डाकघर बचत बैंक व सुकन्या समृद्धि खाता खोलना।' : 'India Post Payments Bank doorstep services and savings schemes.'}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Plain Language Financial Dictionary */}
      <section className="dictionary-section" aria-labelledby="glossary-heading">
        <div className="section-title-wrap">
          <h2 id="glossary-heading">{translate('Financial Dictionary')}</h2>
          <span className="sub">
            {currentLanguage === 'hi'
              ? 'कठिन और उलझन भरे बैंक शब्दों का आसान मतलब'
              : 'Everyday explanations for banking and digital payment terms'}
          </span>
        </div>

        <div className="glossary-grid">
          {financialGlossary.map((entry, idx) => (
            <div key={idx} className="glossary-card card">
              <h3 className="glossary-term">📖 {entry.term}</h3>
              <p className="glossary-def">{entry.definition}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4: Frequently Asked Questions */}
      <section className="faqs-section" aria-labelledby="faqs-heading">
        <div className="section-title-wrap">
          <h2 id="faqs-heading">
            {currentLanguage === 'hi' ? 'अक्सर पूछे जाने वाले सवाल (FAQs)' : 'Frequently Asked Questions'}
          </h2>
        </div>

        <div className="faqs-accordion">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div key={idx} className="faq-card card">
                <button
                  type="button"
                  className="faq-question-btn"
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                >
                  <span className="faq-q-text">{faq.q}</span>
                  <span className="faq-toggle-icon" aria-hidden="true">{isOpen ? '▲' : '▼'}</span>
                </button>
                {isOpen && (
                  <div className="faq-answer-body">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default HelpPage;