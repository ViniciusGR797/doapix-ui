import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { destroyCookie, setCookie, parseCookies } from 'nookies';
import Router from 'next/router';

interface User {
  id: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (id: string, email: string, password: string) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const login = (id: string, email: string, token: string) => {
    setUser({ id, email });
    localStorage.setItem('user', JSON.stringify({ id, email }));

    setToken(token);
    setCookie(undefined, '@nextauth.token', token, {
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
    });
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    destroyCookie(undefined, '@nextauth.token')
    Router.push('/')
  };

  const isAuthenticated = () => {
    return !!user && !!token;
  };

  useEffect(() => {
    const { token: savedToken } = parseCookies();
    const userFromStorage = localStorage.getItem('user');
    if (userFromStorage && savedToken) {
      setUser(JSON.parse(userFromStorage));
      setToken(savedToken);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};
