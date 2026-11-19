import React, { useState, useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import SchemeCard from '../components/SchemeCard';
import { schemes } from '../data/schemes';
import VoiceReadAloudBar from '../components/VoiceReadAloudBar';
import '../styles/SchemesPage.css';

function SchemesPage() {
  const { translate, currentLanguage } = useContext(LanguageContext);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: translate('Category All'), icon: '📋' },
    { id: 'farmer', label: translate('Category Farmers'), icon: '🌾' },
    { id: 'student', label: translate('Category Students'), icon: '🎓' },
    { id: 'women', label: translate('Category Women'), icon: '👩‍👧' },
    { id: 'senior', label: translate('Category Senior'), icon: '👵' },
    { id: 'business', label: translate('Category Business'), icon: '🏪' }
  ];

  const filteredSchemes = schemes.filter(scheme => {
    const matchesCategory = selectedCategory === 'all' || scheme.category === selectedCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchesQuery = !query ||
      scheme.name.toLowerCase().includes(query) ||
      scheme.description.toLowerCase().includes(query) ||
      scheme.benefits.toLowerCase().includes(query);

    return matchesCategory && matchesQuery;
  });

  const pageAudio = currentLanguage === 'hi'
    ? 'सरकारी कल्याणकारी योजनाएं। किसानों, विद्यार्थियों, महिलाओं और बुजुर्गों के लिए सत्यापित सरकारी आर्थिक सहायता। किसी को भी आवेदन के लिए पैसे न दें, सरकारी योजनाएं निःशुल्क होती हैं।'
    : 'Verified government welfare schemes for farmers, students, women, and elders. All government applications are free of cost.';

  return (
    <div className="schemes-page" id="main-content-anchor" role="region" aria-label="Government Schemes Directory">
      {/* Official Government Data Transparency Banner */}
      <div className="simulation-watermark-banner">
        <span className="banner-icon" aria-hidden="true">🏛️</span>
        <div>
          <strong>
            {currentLanguage === 'hi'
              ? 'सत्यापित आधिकारिक जानकारी (Official Government Data)'
              : 'Verified Official Information'}
          </strong>
          <p style={{ margin: 0, fontSize: '0.85rem' }}>
            {currentLanguage === 'hi'
              ? 'यहाँ दी गई योजनाएं सीधे आधिकारिक सरकारी पोर्टलों से ली गई हैं। किसी भी बिचौलिए को पैसे न दें, सरकारी योजनाओं में आवेदन निःशुल्क होता है।'
              : 'Details linked directly to official government portals. NoteKaka never collects private IDs or charges fees.'}
          </p>
        </div>
      </div>

      {/* Hero Header */}
      <div className="schemes-hero-card card">
        <div className="schemes-hero-text">
          <h1>{translate('Government Schemes Title')}</h1>
          <p className="subtitle">{translate('Government Schemes Subtitle')}</p>
        </div>
        <VoiceReadAloudBar textToRead={pageAudio} />
      </div>

      {/* Search & Category Filter Bar */}
      <div className="schemes-filters-box card">
        <div className="search-bar-row">
          <label htmlFor="scheme-search-input" className="sr-only">
            Search schemes
          </label>
          <input
            id="scheme-search-input"
            type="search"
            placeholder={
              currentLanguage === 'hi'
                ? '🔍 योजना का नाम या लाभ खोजें (जैसे: किसान, पेंशन, छात्रवृत्ति)...'
                : '🔍 Search by scheme name or benefit (e.g. Kisan, Pension, Mudra)...'
            }
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="schemes-search-field"
          />
        </div>

        <div className="categories-pill-list" role="tablist" aria-label="Scheme Categories">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={selectedCategory === cat.id}
              className={`cat-pill-button ${selectedCategory === cat.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              <span aria-hidden="true">{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Schemes List Grid */}
      <div className="schemes-grid-container">
        {filteredSchemes.length > 0 ? (
          <div className="schemes-cards-grid">
            {filteredSchemes.map((scheme) => (
              <SchemeCard key={scheme.id} scheme={scheme} />
            ))}
          </div>
        ) : (
          <div className="no-schemes-card card">
            <span className="no-result-icon" aria-hidden="true">🔍</span>
            <h3>{currentLanguage === 'hi' ? 'कोई योजना नहीं मिली' : 'No matching schemes found'}</h3>
            <p>
              {currentLanguage === 'hi'
                ? 'कृपया अलग शब्द खोजें या "सभी योजनाएं" पर क्लिक करें।'
                : 'Try searching with different keywords or reset your category filter.'}
            </p>
            <button
              type="button"
              className="button button-outline"
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
            >
              ↺ {currentLanguage === 'hi' ? 'सभी योजनाएं देखें' : 'Show All Schemes'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SchemesPage;