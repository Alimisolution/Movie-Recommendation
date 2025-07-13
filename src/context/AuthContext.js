import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

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

  // Mock users for demo purposes
  const mockUsers = [
    {
      id: 1,
      email: 'admin@movie.com',
      password: 'admin123',
      name: 'Admin User',
      role: 'admin',
      avatar: 'https://via.placeholder.com/150/667eea/ffffff?text=A',
      preferences: ['Action', 'Drama', 'Sci-Fi']
    },
    {
      id: 2,
      email: 'user@movie.com',
      password: 'user123',
      name: 'John Doe',
      role: 'user',
      avatar: 'https://via.placeholder.com/150/764ba2/ffffff?text=J',
      preferences: ['Comedy', 'Romance', 'Thriller']
    }
  ];

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
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user = mockUsers.find(u => u.email === email && u.password === password);
      
      if (user) {
        const { password: _, ...userWithoutPassword } = user;
        setCurrentUser(userWithoutPassword);
        localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
        toast.success(`Welcome back, ${user.name}!`);
        return { success: true };
      } else {
        toast.error('Invalid email or password');
        return { success: false, error: 'Invalid credentials' };
      }
    } catch (error) {
      toast.error('Login failed. Please try again.');
      return { success: false, error: error.message };
    }
  };

  const register = async (name, email, password) => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user already exists
      const existingUser = mockUsers.find(u => u.email === email);
      if (existingUser) {
        toast.error('User with this email already exists');
        return { success: false, error: 'User already exists' };
      }

      // Create new user
      const newUser = {
        id: mockUsers.length + 1,
        name,
        email,
        password,
        role: 'user',
        avatar: `https://via.placeholder.com/150/667eea/ffffff?text=${name.charAt(0)}`,
        preferences: []
      };

      const { password: _, ...userWithoutPassword } = newUser;
      setCurrentUser(userWithoutPassword);
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
      toast.success('Registration successful! Welcome to Movie Rec!');
      return { success: true };
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

  const value = {
    currentUser,
    login,
    register,
    logout,
    updateProfile,
    updatePreferences,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 