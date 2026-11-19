import React, { useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { LanguageContext } from '../context/LanguageContext';
import VoiceReadAloudBar from '../components/VoiceReadAloudBar';
import '../styles/Auth.css';

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, login, logout } = useContext(UserContext);
  const { translate, currentLanguage } = useContext(LanguageContext);

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const from = location.state?.from?.pathname || '/dashboard';

  const readAloudText = currentLanguage === 'hi'
    ? 'नोटकाका में लॉगिन करें। अपना यूज़रनेम या 10 अंकों का मोबाइल नंबर और पासवर्ड दर्ज करें। यदि आपके पास खाता नहीं है तो नीचे साइन अप लिंक पर क्लिक करें।'
    : 'Log in to NoteKaka. Enter your username or 10-digit mobile number and password. If you do not have an account, click the Sign Up link below.';

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!identifier.trim()) {
      setErrorMessage(
        currentLanguage === 'hi'
          ? 'कृपया यूज़रनेम या मोबाइल नंबर दर्ज करें।'
          : 'Please enter your username or mobile number.'
      );
      return;
    }

    if (!password) {
      setErrorMessage(
        currentLanguage === 'hi'
          ? 'कृपया पासवर्ड दर्ज करें।'
          : 'Please enter your password.'
      );
      return;
    }

    const result = login({ identifier, password });

    if (result.success) {
      setSuccessMessage(
        currentLanguage === 'hi'
          ? `नमस्ते ${result.user.name || ''}! लॉगिन सफल रहा।`
          : `Welcome back, ${result.user.name || ''}! Login successful.`
      );
      setTimeout(() => {
        navigate(from, { replace: true });
      }, 700);
    } else {
      setErrorMessage(result.message);
    }
  };

  // If already logged in, show comfortable status
  if (user) {
    return (
      <div className="auth-page">
        <div className="auth-card already-logged-in-box">
          <div className="auth-icon-badge" aria-hidden="true">🌱</div>
          <h1 className="auth-title">{translate('Welcome Back')}</h1>
          <p className="auth-subtitle">
            {translate('Logged In As')}
          </p>
          <div className="user-badge-large">
            <span>👤</span>
            <span>{user.name || user.username}</span>
            {user.role && <span style={{ fontSize: '0.85rem', opacity: 0.85 }}>({user.role})</span>}
          </div>

          <div className="logged-in-actions">
            <button
              type="button"
              className="button button-primary button-large"
              onClick={() => navigate('/dashboard')}
            >
              <span>{translate('Go to Dashboard')}</span>
            </button>
            <button
              type="button"
              className="button button-outline"
              onClick={logout}
            >
              <span>{translate('Switch Account')}</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page" id="main-content-anchor">
      <div className="auth-card" role="region" aria-labelledby="login-heading">
        <div className="auth-header">
          <div className="auth-icon-badge" aria-hidden="true">🔑</div>
          <h1 id="login-heading" className="auth-title">
            {translate('Login')}
          </h1>
          <p className="auth-subtitle">
            {translate('Login Subtitle')}
          </p>
          <div className="auth-audio-bar">
            <VoiceReadAloudBar textToRead={readAloudText} />
          </div>
        </div>

        {errorMessage && (
          <div className="auth-alert auth-alert-error" role="alert">
            <span aria-hidden="true">⚠️</span>
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="auth-alert auth-alert-success" role="status">
            <span aria-hidden="true">✅</span>
            <span>{successMessage}</span>
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="login-identifier" className="form-label">
              <span>{translate('Mobile or Username')}</span>
              <span className="req-star" aria-hidden="true">*</span>
            </label>
            <input
              id="login-identifier"
              type="text"
              className="form-input"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder={translate('Mobile or Username Placeholder')}
              required
              autoComplete="username"
              aria-required="true"
            />
          </div>

          <div className="form-group">
            <label htmlFor="login-password" className="form-label">
              <span>{translate('Password')}</span>
              <span className="req-star" aria-hidden="true">*</span>
            </label>
            <div className="password-input-wrapper">
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={translate('Password Placeholder')}
                required
                autoComplete="current-password"
                aria-required="true"
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? translate('Hide Password') : translate('Show Password')}
                title={showPassword ? translate('Hide Password') : translate('Show Password')}
              >
                <span aria-hidden="true">{showPassword ? '🙈' : '👁️'}</span>
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="button button-primary button-large auth-submit-btn"
          >
            <span>{translate('Login Now')}</span>
            <span aria-hidden="true">→</span>
          </button>
        </form>

        {/* Footer Link to Signup */}
        <div className="auth-footer">
          <span>{translate("Don't have an account?")}</span>
          <Link to="/signup" className="auth-link">
            {translate('Sign Up Now')}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
