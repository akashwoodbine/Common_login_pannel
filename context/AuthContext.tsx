
import React, { createContext, useState, useEffect, useContext, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContextType, User } from '../types';
import { SESSION_TIMEOUT } from '../constants';

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const idleTimer = useRef<number | null>(null);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
    if (idleTimer.current) {
      clearTimeout(idleTimer.current);
    }
    navigate('/');
  }, [navigate]);
  
  const resetIdleTimer = useCallback(() => {
    if (idleTimer.current) {
      clearTimeout(idleTimer.current);
    }
    idleTimer.current = window.setTimeout(() => {
      logout();
    }, SESSION_TIMEOUT);
  }, [logout]);

  useEffect(() => {
    try {
      let storedUser = localStorage.getItem('user');
      if (!storedUser) {
        storedUser = sessionStorage.getItem('user');
      }

      if (storedUser) {
        setUser(JSON.parse(storedUser));
        resetIdleTimer();
        
        window.addEventListener('mousemove', resetIdleTimer);
        window.addEventListener('keydown', resetIdleTimer);
        window.addEventListener('scroll', resetIdleTimer);
      }
    } catch (e) {
      console.error("Failed to parse user from storage", e);
      localStorage.removeItem('user');
      sessionStorage.removeItem('user');
    } finally {
      setLoading(false);
    }

    return () => {
      if (idleTimer.current) {
        clearTimeout(idleTimer.current);
      }
      window.removeEventListener('mousemove', resetIdleTimer);
      window.removeEventListener('keydown', resetIdleTimer);
      window.removeEventListener('scroll', resetIdleTimer);
    };
  }, [resetIdleTimer]);

  const login = (userData: User, rememberMe: boolean) => {
    setUser(userData);
    if (rememberMe) {
      localStorage.setItem('user', JSON.stringify(userData));
      sessionStorage.removeItem('user');
    } else {
      sessionStorage.setItem('user', JSON.stringify(userData));
      localStorage.removeItem('user');
    }
    resetIdleTimer();
    const dashboardPath = `/dashboard/${userData.type.toLowerCase().replace(/\s+/g, '-')}`;
    navigate(dashboardPath);
  };
  
  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};