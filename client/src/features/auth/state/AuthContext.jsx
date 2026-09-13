import React, { createContext, useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { authApi } from '../api/authApi';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('niyam_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState(() => localStorage.getItem('niyam_token') || null);
  const [isLoading, setIsLoading] = useState(true);

  // Validate session on app initialization
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('niyam_token');
      if (storedToken) {
        try {
          const res = await authApi.getMe();
          if (res.success && res.user) {
            setUser(res.user);
            localStorage.setItem('niyam_user', JSON.stringify(res.user));
          }
        } catch {
          // getMe failed — apiClient will auto-refresh; if that also fails it redirects to /login
          localStorage.removeItem('niyam_token');
          localStorage.removeItem('niyam_user');
          setUser(null);
          setToken(null);
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = async (credentials) => {
    try {
      const data = await authApi.login(credentials);
      // Server now returns `accessToken` (not `token`)
      if (data.accessToken && data.user) {
        localStorage.setItem('niyam_token', data.accessToken);
        localStorage.setItem('niyam_user', JSON.stringify(data.user));
        setToken(data.accessToken);
        setUser(data.user);
        toast.success(`Welcome back, ${data.user.name}!`);
        return { success: true };
      }
      return { success: false, message: 'Invalid response from server' };
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed. Please check your credentials.';
      toast.error(message);
      return { success: false, message };
    }
  };

  const register = async (userData) => {
    try {
      const data = await authApi.register(userData);
      // Server now returns `accessToken` (not `token`)
      if (data.accessToken && data.user) {
        localStorage.setItem('niyam_token', data.accessToken);
        localStorage.setItem('niyam_user', JSON.stringify(data.user));
        setToken(data.accessToken);
        setUser(data.user);
        toast.success('Account created successfully! Welcome to Niyam.');
        return { success: true };
      }
      return { success: false, message: 'Invalid response from server' };
    } catch (err) {
      const message = err.response?.data?.message || 'Registration failed. Please try again.';
      toast.error(message);
      return { success: false, message };
    }
  };

  const logout = useCallback(async () => {
    try {
      await authApi.logout(); // Clears the httpOnly refresh token cookie on the server
    } catch {
      // Best-effort — still clear local state even if request fails
    }
    localStorage.removeItem('niyam_token');
    localStorage.removeItem('niyam_user');
    setToken(null);
    setUser(null);
    toast.success('Logged out successfully');
  }, []);

  const value = {
    user,
    token,
    isAuthenticated: Boolean(token && user),
    isLoading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
