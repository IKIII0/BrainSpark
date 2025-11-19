import { createContext, useContext, useState, useEffect } from 'react';

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

  // Simulate checking for existing session on mount
  useEffect(() => {
    const checkAuth = () => {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
      setLoading(false);
    };

    // Simulate async check
    setTimeout(checkAuth, 500);
  }, []);

  const login = async (credentials) => {
    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, accept any email with password length >= 6
      if (credentials.password.length < 6) {
        throw new Error('Kata sandi minimal 6 karakter');
      }

      // Create mock user data
      const userData = {
        id: 1,
        email: credentials.email,
        name: credentials.email.split('@')[0],
        avatar: `https://ui-avatars.com/api/?name=${credentials.email.split('@')[0]}&background=3b82f6&color=fff`,
        // accept nim if provided in credentials (useful for demos or registration flow)
        nim: credentials?.nim,
        joinDate: new Date().toISOString()
      };

      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
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
    logout,
    loading,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
