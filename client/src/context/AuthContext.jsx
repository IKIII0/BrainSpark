import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = () => {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (credentials) => {
    setLoading(true);
    try {
      const response = await authService.login(credentials.email, credentials.password);
      
      const userData = {
        id: response.id || 1,
        email: response.email || credentials.email,
        name: response.nama_user || credentials.email.split('@')[0],
        avatar: `https://ui-avatars.com/api/?name=${response.nama_user || credentials.email.split('@')[0]}&background=3b82f6&color=fff`,
        nim: response.nim || credentials?.nim || '',
        university: response.universitas || credentials?.university || '',
        no_hp: response.no_hp || credentials?.no_hp || '',
        joinDate: new Date().toISOString(),
        isAdmin: response.isAdmin || false
      };

      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      
      return response;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      const response = await authService.register(userData);
      return response;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
    isAuthenticated: !!user,
    isAdmin: user?.isAdmin || false // Use backend isAdmin flag
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
