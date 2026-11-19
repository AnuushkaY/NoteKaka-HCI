import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LanguageContext } from '../context/LanguageContext';
import { UserContext } from '../context/UserContext';
import LanguageSelector from './LanguageSelector';
import AccessibilityControls from './AccessibilityControls';
import '../styles/components.css';

function Header() {
  const location = useLocation();
  const { translate } = useContext(LanguageContext);
  const { user, logout } = useContext(UserContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/stories', label: 'Stories', icon: '📖' },
    { path: '/payments', label: 'Practice UPI', icon: '📱' },
    { path: '/budget', label: 'Budget Tool', icon: '💰' },
    { path: '/schemes', label: 'Government Schemes', icon: '🏛️' },
    { path: '/coach', label: 'AI Coach', icon: '🤝' },
    { path: '/help', label: 'Help & Helplines', icon: '📞' }
  ];

  return (
    <header className="header" role="banner">
      <a href="#main-content-anchor" className="skip-link">
        Skip to main content / मुख्य सामग्री पर जाएं
      </a>

      <div className="header-top-bar">
        <div className="header-brand-container">
          <Link to="/" className="brand-link" aria-label="NoteKaka Home">
            <span className="brand-emblem" aria-hidden="true">🌱</span>
            <div className="brand-text">
              <span className="brand-title">NoteKaka</span>
              <span className="brand-sub">गाँव-कस्बों की वित्तीय समझ</span>
            </div>
          </Link>
        </div>

        <div className="header-controls">
          <AccessibilityControls />
          <LanguageSelector />

          {/* Desktop Auth Controls */}
          {user ? (
            <div className="header-auth-controls">
              <span className="header-user-tag" title={user.name}>
                <span aria-hidden="true">👤</span>
                <span>{user.name ? user.name.split(' ')[0] : 'साथी'}</span>
              </span>
              <button
                type="button"
                className="header-logout-btn"
                onClick={logout}
                title={translate('Log Out')}
              >
                <span aria-hidden="true">🚪</span>
                <span>{translate('Log Out')}</span>
              </button>
            </div>
          ) : (
            <div className="header-auth-controls">
              <Link to="/login" className="header-auth-link login-btn">
                {translate('Login')}
              </Link>
              <Link to="/signup" className="header-auth-link signup-btn">
                {translate('Sign Up')}
              </Link>
            </div>
          )}

          <button
            type="button"
            className="mobile-nav-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            <span aria-hidden="true">{mobileMenuOpen ? '✕' : '☰'}</span>
            <span className="mobile-toggle-text">Menu</span>
          </button>
        </div>
      </div>

      <nav
        className={`main-nav-bar ${mobileMenuOpen ? 'open' : ''}`}
        aria-label="Main Navigation"
      >
        <div className="nav-container">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-item ${isActive ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
                aria-current={isActive ? 'page' : undefined}
              >
                <span className="nav-icon" aria-hidden="true">{item.icon}</span>
                <span className="nav-label">{translate(item.label)}</span>
              </Link>
            );
          })}

          {/* Mobile Auth Bar */}
          <div className="mobile-auth-bar" style={{ display: 'flex', gap: '8px', padding: '10px 16px', borderTop: '1px solid var(--color-border)', width: '100%', justifyContent: 'center' }}>
            {user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontWeight: 700, color: 'var(--color-primary)' }}>👤 {user.name}</span>
                <button
                  type="button"
                  className="button button-small button-outline"
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                >
                  {translate('Log Out')}
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '10px' }}>
                <Link
                  to="/login"
                  className="button button-small button-outline"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {translate('Login')}
                </Link>
                <Link
                  to="/signup"
                  className="button button-small button-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {translate('Sign Up')}
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;