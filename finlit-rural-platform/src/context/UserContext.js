import React, { createContext, useState, useEffect } from 'react';

const UserContext = createContext();

// Pre-seeded demo users for immediate testing and evaluation
const DEFAULT_DEMO_USERS = [
  {
    id: 'user_demo_farmer',
    name: 'रामेश्वर किसान (Ramesh)',
    username: 'ramesh',
    phone: '9876543210',
    password: 'password123',
    role: 'farmer',
    preferredMode: 'both',
    createdAt: '2026-01-15T10:00:00.000Z'
  },
  {
    id: 'user_demo_homemaker',
    name: 'सुनीता देवी (Sunita)',
    username: 'sunita',
    phone: '9811223344',
    password: 'password123',
    role: 'homemaker',
    preferredMode: 'listen',
    createdAt: '2026-01-20T10:00:00.000Z'
  }
];

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [personalityTest, setPersonalityTest] = useState(null);
  const [learningProgress, setLearningProgress] = useState({});
  const [streak, setStreak] = useState(0);
  const [points, setPoints] = useState(0);
  const [completedLessons, setCompletedLessons] = useState([]);

  // Initialize and get all registered users from localStorage
  const getRegisteredUsers = () => {
    try {
      const stored = localStorage.getItem('finlit_registered_users');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error reading finlit_registered_users from localStorage', e);
    }
    // Default seed if empty or invalid
    localStorage.setItem('finlit_registered_users', JSON.stringify(DEFAULT_DEMO_USERS));
    return DEFAULT_DEMO_USERS;
  };

  // Load user data from localStorage on initial load
  useEffect(() => {
    // Ensure demo users exist in localStorage
    const storedUsers = localStorage.getItem('finlit_registered_users');
    if (!storedUsers) {
      localStorage.setItem('finlit_registered_users', JSON.stringify(DEFAULT_DEMO_USERS));
    }

    const savedUser = localStorage.getItem('finlit_user');
    const savedTest = localStorage.getItem('finlit_personality_test');
    const savedProgress = localStorage.getItem('finlit_learning_progress');
    const savedStreak = localStorage.getItem('finlit_streak');
    const savedPoints = localStorage.getItem('finlit_points');
    const savedCompletedLessons = localStorage.getItem('finlit_completed_lessons');

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error('Failed to parse saved user', e);
      }
    }
    if (savedTest) {
      try {
        setPersonalityTest(JSON.parse(savedTest));
      } catch (e) {
        console.error('Failed to parse saved personality test', e);
      }
    }
    if (savedProgress) {
      try {
        setLearningProgress(JSON.parse(savedProgress));
      } catch (e) {
        console.error('Failed to parse learning progress', e);
      }
    }
    if (savedStreak) setStreak(parseInt(savedStreak) || 0);
    if (savedPoints) setPoints(parseInt(savedPoints) || 0);
    if (savedCompletedLessons) {
      try {
        setCompletedLessons(JSON.parse(savedCompletedLessons));
      } catch (e) {
        console.error('Failed to parse completed lessons', e);
      }
    }
  }, []);

  // Save active session data to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('finlit_user', JSON.stringify(user));
    }
    if (personalityTest) {
      localStorage.setItem('finlit_personality_test', JSON.stringify(personalityTest));
    }
    if (learningProgress) {
      localStorage.setItem('finlit_learning_progress', JSON.stringify(learningProgress));
    }
    localStorage.setItem('finlit_streak', streak.toString());
    localStorage.setItem('finlit_points', points.toString());
    localStorage.setItem('finlit_completed_lessons', JSON.stringify(completedLessons));
  }, [user, personalityTest, learningProgress, streak, points, completedLessons]);

  // Signup a new user and store in localStorage
  const signup = ({ name, identifier, password, role = 'farmer', preferredMode = 'both' }) => {
    if (!identifier || !identifier.trim() || !password) {
      return {
        success: false,
        message: 'यूज़रनेम/मोबाइल और पासवर्ड दोनों आवश्यक हैं (Identifier and password are required)'
      };
    }

    const users = getRegisteredUsers();
    const cleanId = identifier.trim().toLowerCase();

    // Check uniqueness against existing users
    const exists = users.some(u => 
      (u.username && u.username.toLowerCase() === cleanId) ||
      (u.phone && u.phone.toLowerCase() === cleanId)
    );

    if (exists) {
      return {
        success: false,
        message: 'इस यूज़रनेम या मोबाइल नंबर से खाता पहले से मौजूद है। कृपया लॉगिन करें। (Account already exists. Please log in.)'
      };
    }

    const isPhone = /^\d{10}$/.test(cleanId);
    const newUser = {
      id: 'usr_' + Date.now(),
      name: name && name.trim() ? name.trim() : (isPhone ? `साथी ${cleanId.slice(-4)}` : cleanId),
      username: cleanId,
      phone: isPhone ? cleanId : '',
      password: password,
      role: role || 'farmer',
      preferredMode: preferredMode || 'both',
      createdAt: new Date().toISOString()
    };

    // Save updated list in localStorage
    const updatedUsers = [...users, newUser];
    localStorage.setItem('finlit_registered_users', JSON.stringify(updatedUsers));

    // Log the user in
    setUser(newUser);
    localStorage.setItem('finlit_user', JSON.stringify(newUser));

    // Set initial preferences
    const defaultPref = {
      role: newUser.role,
      goal: 'saving',
      mode: newUser.preferredMode,
      completedAt: new Date().toISOString()
    };
    setPersonalityTest(defaultPref);
    localStorage.setItem('finlit_personality_test', JSON.stringify(defaultPref));

    return { success: true, user: newUser };
  };

  // Login existing user from localStorage
  const login = ({ identifier, password }) => {
    if (!identifier || !identifier.trim() || !password) {
      return {
        success: false,
        message: 'कृपया यूज़रनेम/मोबाइल और पासवर्ड दर्ज करें (Please enter username/mobile and password)'
      };
    }

    const users = getRegisteredUsers();
    const cleanId = identifier.trim().toLowerCase();

    const matched = users.find(u => 
      (u.username && u.username.toLowerCase() === cleanId) ||
      (u.phone && u.phone.toLowerCase() === cleanId)
    );

    if (!matched) {
      return {
        success: false,
        message: 'यह यूज़रनेम या मोबाइल नंबर नहीं मिला। कृपया पहले साइन अप करें। (Account not found. Please sign up first.)'
      };
    }

    if (matched.password !== password) {
      return {
        success: false,
        message: 'पासवर्ड सही नहीं है। कृपया दोबारा जाँचें। (Incorrect password. Please try again.)'
      };
    }

    // Set active session in state and localStorage
    setUser(matched);
    localStorage.setItem('finlit_user', JSON.stringify(matched));

    // Restore preferences if not present
    if (!personalityTest && matched.role) {
      const pref = {
        role: matched.role,
        goal: 'saving',
        mode: matched.preferredMode || 'both',
        completedAt: matched.createdAt || new Date().toISOString()
      };
      setPersonalityTest(pref);
      localStorage.setItem('finlit_personality_test', JSON.stringify(pref));
    }

    return { success: true, user: matched };
  };

  const updateUser = (userData) => {
    setUser(prev => {
      const updated = { ...(prev || {}), ...userData };
      localStorage.setItem('finlit_user', JSON.stringify(updated));
      return updated;
    });
  };

  const updatePersonalityTest = (testResults) => {
    setPersonalityTest(testResults);
  };

  const updateLearningProgress = (lessonId, progress) => {
    setLearningProgress(prev => ({
      ...prev,
      [lessonId]: progress
    }));
  };

  const completeLesson = (lessonId, pointsEarned = 50) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons(prev => [...prev, lessonId]);
      setPoints(prev => prev + pointsEarned);
    }
    updateLearningProgress(lessonId, 100);
  };

  const updateStreak = () => {
    const lastActivity = localStorage.getItem('finlit_last_activity');
    const today = new Date().toDateString();
    
    if (lastActivity !== today) {
      setStreak(prev => prev + 1);
      localStorage.setItem('finlit_last_activity', today);
    }
  };

  const resetStreak = () => {
    setStreak(0);
    localStorage.removeItem('finlit_last_activity');
  };

  const logout = () => {
    setUser(null);
    setPersonalityTest(null);
    setLearningProgress({});
    setStreak(0);
    setPoints(0);
    setCompletedLessons([]);
    localStorage.removeItem('finlit_user');
    localStorage.removeItem('finlit_personality_test');
    localStorage.removeItem('finlit_learning_progress');
    localStorage.removeItem('finlit_streak');
    localStorage.removeItem('finlit_points');
    localStorage.removeItem('finlit_completed_lessons');
    localStorage.removeItem('finlit_last_activity');
    // Note: finlit_registered_users remains intact in localStorage so users can sign back in!
  };

  return (
    <UserContext.Provider value={{
      user,
      personalityTest,
      learningProgress,
      streak,
      points,
      completedLessons,
      updateUser,
      updatePersonalityTest,
      updateLearningProgress,
      completeLesson,
      updateStreak,
      resetStreak,
      signup,
      login,
      logout,
      getRegisteredUsers
    }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext };