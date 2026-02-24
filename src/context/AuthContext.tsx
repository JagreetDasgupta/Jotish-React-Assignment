import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { getItem, removeItem, setItem } from '../utils/storage';
import { useToast } from './ToastContext';

type AuthContextValue = {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const AUTH_STORAGE_KEY = 'auth_is_authenticated';

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();

  useEffect(() => {
    const stored = getItem(AUTH_STORAGE_KEY);
    setIsAuthenticated(stored === 'true');
  }, []);

  const login = useCallback(async (username: string, password: string) => {
    const isValid = username === 'testuser' && password === 'Test123';

    if (isValid) {
      setIsAuthenticated(true);
      setItem(AUTH_STORAGE_KEY, 'true');
      return true;
    }

    setIsAuthenticated(false);
    removeItem(AUTH_STORAGE_KEY);
    return false;
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    removeItem(AUTH_STORAGE_KEY);
    navigate('/login', { replace: true });
    showToast('You have been logged out.', 'info');
  }, [navigate, showToast]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

