import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { LanguageContext } from '../context/LanguageContext';
import VoiceReadAloudBar from '../components/VoiceReadAloudBar';
import '../styles/Auth.css';

function Signup() {
  const navigate = useNavigate();
  const { user, signup, logout } = useContext(UserContext);
  const { translate, currentLanguage } = useContext(LanguageContext);

  const [name, setName] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('farmer');
  const [preferredMode, setPreferredMode] = useState('both');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const readAloudText = currentLanguage === 'hi'
    ? 'नोटकाका में नया खाता बनाएं। अपना नाम, मोबाइल नंबर या यूज़रनेम, और अपनी भूमिका चुनें जैसे किसान, दुकानदार, या विद्यार्थी। फिर पासवर्ड बनाकर खाता बनाएं बटन दबाएं। आपका खाता इसी फ़ोन में सुरक्षित रहेगा।'
    : 'Create a new account on NoteKaka. Enter your name, mobile number or username, choose your role like farmer, shopkeeper, or student, set a password, and tap Create Account. Your account will be safely stored on this device.';

  const roles = [
    { id: 'farmer', label: translate('Role Farmer') || 'Farmer', icon: '🌾' },
    { id: 'shopkeeper', label: translate('Role Shopkeeper') || 'Shopkeeper', icon: '🏪' },
    { id: 'student', label: translate('Role Student') || 'Student', icon: '🎓' },
    { id: 'homemaker', label: translate('Role Homemaker') || 'Homemaker', icon: '👩‍🍳' },
    { id: 'worker', label: translate('Role Worker') || 'Daily Earner', icon: '👷' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!name.trim()) {
      setErrorMessage(
        currentLanguage === 'hi'
          ? 'कृपया अपना पूरा नाम लिखें।'
          : 'Please enter your full name.'
      );
      return;
    }

    if (!identifier.trim() || identifier.trim().length < 3) {
      setErrorMessage(
        currentLanguage === 'hi'
          ? 'कृपया कम से कम 3 अक्षरों का यूज़रनेम या 10 अंकों का मोबाइल नंबर दर्ज करें।'
          : 'Please enter a username (at least 3 characters) or a 10-digit mobile number.'
      );
      return;
    }

    if (!password || password.length < 4) {
      setErrorMessage(
        currentLanguage === 'hi'
          ? 'पासवर्ड कम से कम 4 अक्षरों का होना चाहिए।'
          : 'Password must be at least 4 characters long.'
      );
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage(
        currentLanguage === 'hi'
          ? 'दोनों पासवर्ड मेल नहीं खा रहे हैं। कृपया दोबारा जांचें।'
          : 'Passwords do not match. Please re-enter.'
      );
      return;
    }

    const result = signup({
      name,
      identifier,
      password,
      role,
      preferredMode
    });

    if (result.success) {
      setSuccessMessage(
        currentLanguage === 'hi'
          ? `बधाई हो ${result.user.name}! आपका खाता बन गया है और लोकल स्टोरेज में सहेज दिया गया है।`
          : `Congratulations ${result.user.name}! Your account has been created and saved in LocalStorage.`
      );
      setTimeout(() => {
        navigate('/dashboard', { replace: true });
      }, 900);
    } else {
      setErrorMessage(result.message);
    }
  };

  // If already logged in
  if (user) {
    return (
      <div className="auth-page">
        <div className="auth-card already-logged-in-box">
          <div className="auth-icon-badge" aria-hidden="true">🌱</div>
          <h1 className="auth-title">{translate('Welcome Back')}</h1>
          <p className="auth-subtitle">{translate('Logged In As')}</p>
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
      <div className="auth-card" role="region" aria-labelledby="signup-heading">
        <div className="auth-header">
          <div className="auth-icon-badge" aria-hidden="true">✨</div>
          <h1 id="signup-heading" className="auth-title">
            {translate('Create Account')}
          </h1>
          <p className="auth-subtitle">
            {translate('Signup Subtitle')}
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
          {/* Full Name */}
          <div className="form-group">
            <label htmlFor="signup-name" className="form-label">
              <span>{translate('Full Name')}</span>
              <span className="req-star" aria-hidden="true">*</span>
            </label>
            <input
              id="signup-name"
              type="text"
              className="form-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={translate('Full Name Placeholder')}
              required
              autoComplete="name"
              aria-required="true"
            />
          </div>

          {/* Username or Mobile */}
          <div className="form-group">
            <label htmlFor="signup-identifier" className="form-label">
              <span>{translate('Mobile or Username')}</span>
              <span className="req-star" aria-hidden="true">*</span>
            </label>
            <input
              id="signup-identifier"
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

          {/* Role Selection */}
          <div className="form-group">
            <label className="form-label">
              <span>{translate('Your Work / Role')}</span>
              <span className="req-star" aria-hidden="true">*</span>
            </label>
            <div className="role-options-grid" role="radiogroup" aria-label={translate('Your Work / Role')}>
              {roles.map((r) => {
                const isSelected = role === r.id;
                return (
                  <div
                    key={r.id}
                    role="radio"
                    aria-checked={isSelected}
                    tabIndex={0}
                    className={`role-option-card ${isSelected ? 'selected' : ''}`}
                    onClick={() => setRole(r.id)}
                    onKeyDown={(e) => {
                      if (e.key === ' ' || e.key === 'Enter') {
                        e.preventDefault();
                        setRole(r.id);
                      }
                    }}
                  >
                    <span className="role-option-icon" aria-hidden="true">{r.icon}</span>
                    <span className="role-option-label">{r.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Preferred Learning Mode */}
          <div className="form-group">
            <label className="form-label">
              <span>{translate('Preferred Learning Mode')}</span>
            </label>
            <div className="role-options-grid" role="radiogroup" aria-label={translate('Preferred Learning Mode')}>
              {[
                { id: 'both', label: translate('Mode Both') || 'Read & Listen', icon: '🎧' },
                { id: 'read', label: translate('Mode Read') || 'Read Text', icon: '📖' },
                { id: 'listen', label: translate('Mode Listen') || 'Listen Audio', icon: '🔊' }
              ].map((m) => {
                const isSelected = preferredMode === m.id;
                return (
                  <div
                    key={m.id}
                    role="radio"
                    aria-checked={isSelected}
                    tabIndex={0}
                    className={`role-option-card ${isSelected ? 'selected' : ''}`}
                    onClick={() => setPreferredMode(m.id)}
                    onKeyDown={(e) => {
                      if (e.key === ' ' || e.key === 'Enter') {
                        e.preventDefault();
                        setPreferredMode(m.id);
                      }
                    }}
                  >
                    <span className="role-option-icon" aria-hidden="true">{m.icon}</span>
                    <span className="role-option-label">{m.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Password */}
          <div className="form-group">
            <label htmlFor="signup-password" className="form-label">
              <span>{translate('Password')}</span>
              <span className="req-star" aria-hidden="true">*</span>
            </label>
            <div className="password-input-wrapper">
              <input
                id="signup-password"
                type={showPassword ? 'text' : 'password'}
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={translate('Password Placeholder')}
                required
                autoComplete="new-password"
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

          {/* Confirm Password */}
          <div className="form-group">
            <label htmlFor="signup-confirm-password" className="form-label">
              <span>{translate('Confirm Password')}</span>
              <span className="req-star" aria-hidden="true">*</span>
            </label>
            <input
              id="signup-confirm-password"
              type={showPassword ? 'text' : 'password'}
              className="form-input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder={translate('Confirm Password Placeholder')}
              required
              autoComplete="new-password"
              aria-required="true"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="button button-primary button-large auth-submit-btn"
          >
            <span>{translate('Sign Up Now')}</span>
            <span aria-hidden="true">→</span>
          </button>
        </form>

        {/* Footer Link to Login */}
        <div className="auth-footer">
          <span>{translate('Already have an account?')}</span>
          <Link to="/login" className="auth-link">
            {translate('Login Now')}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
