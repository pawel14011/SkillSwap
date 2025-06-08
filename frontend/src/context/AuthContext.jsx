import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import api from '../api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 > Date.now()) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            // Pobieramy pełne dane użytkownika po odświeżeniu
            // W poprzedniej wersji było samo `id`, teraz pobierzemy resztę
            api.get('/users/profile').then(res => {
                setUser({...res.data, token});
            }).catch(() => {
                // Jeśli token jest ok, ale profilu nie ma, wyloguj
                localStorage.removeItem('token');
                setUser(null);
            });
        } else {
            localStorage.removeItem('token');
        }
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    localStorage.setItem('token', userData.token);
    api.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;