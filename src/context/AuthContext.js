import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const API_BASE = 'https://movierecommender-i9ne.onrender.com/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: email, password })
      });
      const data = await response.json();
      if (response.ok && data.token) {
        // Save token and user info
        const user = { email, token: data.token, role: 'user' };
        setCurrentUser(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
        toast.success(`Welcome back!`);
        return { success: true };
      } else {
        toast.error(data.message || 'Invalid email or password');
        return { success: false, error: data.message || 'Invalid credentials' };
      }
    } catch (error) {
      toast.error('Login failed. Please try again.');
      return { success: false, error: error.message };
    }
  };

  const register = async (name, email, password) => {
    try {
      const response = await fetch(`${API_BASE}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: email, password })
      });
      const data = await response.json();
      if (response.ok) {
        toast.success('Registration successful! Please log in.');
        return { success: true };
      } else {
        toast.error(data.message || 'Registration failed');
        return { success: false, error: data.message || 'Registration failed' };
      }
    } catch (error) {
      toast.error('Registration failed. Please try again.');
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    toast.success('Logged out successfully');
  };

  // Profile and preferences remain local for user
  const updateProfile = (updates) => {
    if (currentUser) {
      const updatedUser = { ...currentUser, ...updates };
      setCurrentUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      toast.success('Profile updated successfully');
    }
  };

  const updatePreferences = (preferences) => {
    if (currentUser) {
      const updatedUser = { ...currentUser, preferences };
      setCurrentUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      toast.success('Preferences updated successfully');
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, loading, login, register, logout, updateProfile, updatePreferences }}>
      {children}
    </AuthContext.Provider>
  );
}; 