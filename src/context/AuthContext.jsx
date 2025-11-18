import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import apiClient from '../api/client';

export const AuthContext = createContext(null);

const storageKey = 'bbrothersrome.auth';

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => {
    const stored = localStorage.getItem(storageKey);
    return stored ? JSON.parse(stored) : { token: null, user: null };
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(auth));
  }, [auth]);

  const login = useCallback(async (payload) => {
    const { data } = await apiClient.post('/auth/login', payload);
    setAuth({ token: data.token, user: data.user });
    return data;
  }, []);

  const register = useCallback(async (payload) => {
    const { data } = await apiClient.post('/auth/register', payload);
    setAuth({ token: data.token, user: data.user });
    return data;
  }, []);

  const logout = useCallback(() => {
    setAuth({ token: null, user: null });
  }, []);

  const value = useMemo(() => ({ ...auth, login, register, logout }), [auth, login, logout, register]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
