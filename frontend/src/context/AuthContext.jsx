import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

const API_URL = 'http://localhost:5000/api/auth';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('meditravel_token'));
  const [loading, setLoading] = useState(true);

  // Set axios defaults when token changes
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  // Load user on mount if token exists
  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          const res = await axios.get(`${API_URL}/me`);
          setUser(res.data);
        } catch {
          // Token is invalid/expired
          localStorage.removeItem('meditravel_token');
          setToken(null);
          setUser(null);
        }
      }
      setLoading(false);
    };
    loadUser();
  }, []);

  const login = async (email, password) => {
    const res = await axios.post(`${API_URL}/login`, { email, password });
    const { token: newToken, ...userData } = res.data;
    localStorage.setItem('meditravel_token', newToken);
    setToken(newToken);
    setUser(userData);
    return userData;
  };

  const signup = async (fullName, email, password) => {
    const res = await axios.post(`${API_URL}/signup`, { fullName, email, password });
    const { token: newToken, ...userData } = res.data;
    localStorage.setItem('meditravel_token', newToken);
    setToken(newToken);
    setUser(userData);
    return userData;
  };

  const googleAuth = async (credential) => {
    const res = await axios.post(`${API_URL}/google`, { credential });
    const { token: newToken, ...userData } = res.data;
    localStorage.setItem('meditravel_token', newToken);
    setToken(newToken);
    setUser(userData);
    return userData;
  };

  const logout = () => {
    localStorage.removeItem('meditravel_token');
    setToken(null);
    setUser(null);
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      loading,
      isAuthenticated: !!user,
      login,
      signup,
      googleAuth,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export default AuthContext;
