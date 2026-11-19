import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AccessibilityProvider } from './context/AccessibilityContext';
import { LanguageProvider } from './context/LanguageContext';
import { UserProvider } from './context/UserContext';
import { VoiceProvider } from './context/VoiceContext';
import Header from './components/Header';
import Footer from './components/Footer';

// Pages & Components
import LandingPage from './pages/LandingPage';
import PersonalityTest from './pages/PersonalityTest';
import Dashboard from './pages/Dashboard';
import StoryLearning from './pages/StoryLearning';
import DigitalPayments from './pages/DigitalPayments';
import BudgetSimulator from './components/BudgetSimulator';
import SchemesPage from './pages/SchemesPage';
import AICoach from './pages/AICoach';
import HelpPage from './pages/HelpPage';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
    <Router>
      <AccessibilityProvider>
        <LanguageProvider>
          <UserProvider>
            <VoiceProvider>
              <div className="app">
                <Header />
                <main className="main-content" id="main-content-anchor">
                  <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/test" element={<PersonalityTest />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/stories" element={<StoryLearning />} />
                    <Route path="/payments" element={<DigitalPayments />} />
                    <Route path="/budget" element={<BudgetSimulator />} />
                    <Route path="/schemes" element={<SchemesPage />} />
                    <Route path="/coach" element={<AICoach />} />
                    <Route path="/help" element={<HelpPage />} />
                  </Routes>
                </main>
                <Footer />
              </div>
            </VoiceProvider>
          </UserProvider>
        </LanguageProvider>
      </AccessibilityProvider>
    </Router>
  );
}

export default App;