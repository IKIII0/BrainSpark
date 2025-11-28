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

export function getAuth() {
  return useContext(AuthContext);
}

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
      console.log('Auth response:', response);
      
      // Handle admin login
      if (response.isAdmin) {
        const userData = {
          id: 'admin',
          email: response.email,
          name: response.nama || 'Administrator',
          avatar: `https://ui-avatars.com/api/?name=Administrator&background=3b82f6&color=fff`,
          isAdmin: true
        };
        
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        return response;
      }
      
      // Handle regular user login
      const userData = {
        id: response.id,
        email: response.email,
        name: response.nama_user || credentials.email.split('@')[0],
        avatar: `https://ui-avatars.com/api/?name=${response.nama_user || credentials.email.split('@')[0]}&background=3b82f6&color=fff`,
        nim: response.nim || '',
        university: response.universitas || '',
        no_hp: response.no_hp || '',
        joinDate: new Date().toISOString(),
        isAdmin: false
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
