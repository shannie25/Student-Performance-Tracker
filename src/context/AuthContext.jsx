import React, { createContext, useState, useContext } from 'react';
import { USERS as INITIAL_USERS, GRADES as INITIAL_GRADES } from '../data/MockData';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users] = useState(INITIAL_USERS);
  const [grades] = useState(INITIAL_GRADES);

  const login = (identifier, password, role) => {
    const foundUser = users.find((u) => {
      if (role === 'student') {
        // Students login with ID only
        return u.id.toString() === identifier.toString() && u.password === password && u.role === 'student';
      } else if (role === 'teacher') {
        // Teachers login with email only
        return u.email.toLowerCase() === identifier.toLowerCase() && u.password === password && u.role === 'teacher';
      } else if (role === 'admin') {
        // Admin login with email only
        return u.email.toLowerCase() === identifier.toLowerCase() && u.password === password && u.role === 'admin';
      }
      return false;
    });
    if (foundUser) { setUser(foundUser); return true; }
    return false;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, users, grades, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);