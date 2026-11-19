import React, { useContext } from 'react';
import { createRoot } from 'react-dom/client';
import { act } from 'react';
import App from './App';
import { UserProvider, UserContext } from './context/UserContext';

global.IS_REACT_ACT_ENVIRONMENT = true;

describe('NoteKaka Application & Authentication Tests', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders NoteKaka application without crashing', () => {
    const div = document.createElement('div');
    const root = createRoot(div);
    act(() => {
      root.render(<App />);
    });
    act(() => {
      root.unmount();
    });
  });

  it('initializes demo users in localStorage', () => {
    let contextValue;
    function Consumer() {
      contextValue = useContext(UserContext);
      return null;
    }

    const div = document.createElement('div');
    const root = createRoot(div);
    act(() => {
      root.render(
        <UserProvider>
          <Consumer />
        </UserProvider>
      );
    });

    const registered = JSON.parse(localStorage.getItem('finlit_registered_users'));
    expect(registered).toBeTruthy();
    expect(registered.length).toBeGreaterThanOrEqual(1);
    expect(registered[0].username).toBe('ramesh');

    act(() => {
      root.unmount();
    });
  });

  it('allows signup with localStorage persistence', () => {
    let contextValue;
    function Consumer() {
      contextValue = useContext(UserContext);
      return null;
    }

    const div = document.createElement('div');
    const root = createRoot(div);
    act(() => {
      root.render(
        <UserProvider>
          <Consumer />
        </UserProvider>
      );
    });

    // Test signup
    let signupRes;
    act(() => {
      signupRes = contextValue.signup({
        name: 'Anita Verma',
        identifier: 'anita',
        password: 'securePassword123',
        role: 'shopkeeper',
        preferredMode: 'both'
      });
    });

    expect(signupRes.success).toBe(true);
    expect(signupRes.user.name).toBe('Anita Verma');

    // Verify localStorage has updated
    const savedUser = JSON.parse(localStorage.getItem('finlit_user'));
    expect(savedUser.username).toBe('anita');

    const registered = JSON.parse(localStorage.getItem('finlit_registered_users'));
    const anitaRecord = registered.find(u => u.username === 'anita');
    expect(anitaRecord).toBeTruthy();
    expect(anitaRecord.role).toBe('shopkeeper');

    act(() => {
      root.unmount();
    });
  });

  it('allows login with demo credentials and handles incorrect passwords', () => {
    let contextValue;
    function Consumer() {
      contextValue = useContext(UserContext);
      return null;
    }

    const div = document.createElement('div');
    const root = createRoot(div);
    act(() => {
      root.render(
        <UserProvider>
          <Consumer />
        </UserProvider>
      );
    });

    // Failed login: wrong password
    let failedRes;
    act(() => {
      failedRes = contextValue.login({
        identifier: 'ramesh',
        password: 'wrongpassword'
      });
    });
    expect(failedRes.success).toBe(false);

    // Successful login: correct credentials
    let successRes;
    act(() => {
      successRes = contextValue.login({
        identifier: 'ramesh',
        password: 'password123'
      });
    });
    expect(successRes.success).toBe(true);
    expect(successRes.user.username).toBe('ramesh');

    // Check localStorage
    const saved = JSON.parse(localStorage.getItem('finlit_user'));
    expect(saved.username).toBe('ramesh');

    // Test logout
    act(() => {
      contextValue.logout();
    });
    expect(localStorage.getItem('finlit_user')).toBeNull();

    act(() => {
      root.unmount();
    });
  });
});
