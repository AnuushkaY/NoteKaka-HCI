import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../context/LanguageContext';

function Footer() {
  const { translate } = useContext(LanguageContext);

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-content">
        <div className="footer-section brand-summary">
          <div className="footer-logo">
            <span className="logo-icon" aria-hidden="true">🌱</span>
            <h3>NoteKaka</h3>
          </div>
          <p className="footer-purpose">
            {translate('Learn money safely, in your language.')}
          </p>
          <div className="simulation-badge">
            <span className="badge-icon" aria-hidden="true">🛡️</span>
            <span>100% Free Educational Practice • No Real Money</span>
          </div>
        </div>

        <div className="footer-section">
          <h4>{translate('Stories')} & {translate('Practice UPI')}</h4>
          <ul className="footer-links">
            <li>
              <Link to="/stories">{translate('Stories')}</Link>
            </li>
            <li>
              <Link to="/payments">{translate('Practice UPI')}</Link>
            </li>
            <li>
              <Link to="/budget">{translate('Budget Tool')}</Link>
            </li>
            <li>
              <Link to="/schemes">{translate('Government Schemes')}</Link>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>{translate('Help & Helplines')}</h4>
          <ul className="footer-links">
            <li>
              <Link to="/help">{translate('Help Page Title')}</Link>
            </li>
            <li>
              <Link to="/coach">{translate('AI Coach')}</Link>
            </li>
            <li>
              <a href="tel:1930" className="helpline-link">
                🚨 Cybercrime: <strong>1930</strong>
              </a>
            </li>
            <li>
              <a href="tel:14440" className="helpline-link">
                🏦 RBI Sachet: <strong>14440</strong>
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-section guidance-note">
          <h4>सुरक्षा एवं पारदर्शिता (Safety & Trust)</h4>
          <p className="disclaimer-text">
            नोटकाका पर किसी भी वास्तविक बैंक खाते, OTP या असली पैसे का लेन-देन नहीं होता। यह मंच केवल सीखने और समझने के लिए बनाया गया है।
          </p>
        </div>
      </div>

      <div className="footer-bottom-bar">
        <p className="copyright-note">
          © {new Date().getFullYear()} NoteKaka • Empowering villages with safe financial literacy.
        </p>
      </div>
    </footer>
  );
}

export default Footer;