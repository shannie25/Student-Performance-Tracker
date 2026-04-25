import React, { createContext, useEffect, useState, useContext } from 'react';

const AuthContext = createContext();
const API_BASE_URL = 'http://localhost:5000/api';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadAppData = async () => {
    try {
      setLoading(true);
      setError('');

      const [usersResponse, gradesResponse] = await Promise.all([
        fetch(`${API_BASE_URL}/users`),
        fetch(`${API_BASE_URL}/grades`),
      ]);

      if (!usersResponse.ok || !gradesResponse.ok) {
        throw new Error('Failed to load application data');
      }

      const [usersData, gradesData] = await Promise.all([
        usersResponse.json(),
        gradesResponse.json(),
      ]);

      setUsers(usersData);
      setGrades(gradesData);
    } catch (err) {
      setError(err.message || 'Unable to connect to the server');
      setUsers([]);
      setGrades([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAppData();
  }, []);

  const login = async (identifier, password, role) => {
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, password, role }),
      });

      if (!response.ok) {
        return false;
      }

      const loggedInUser = await response.json();
      setUser(loggedInUser);
      return true;
    } catch (_err) {
      setError('Unable to reach the server');
      return false;
    }
  };

  const addGrade = async (gradeData) => {
    const response = await fetch(`${API_BASE_URL}/grades`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(gradeData),
    });

    if (!response.ok) {
      throw new Error('Failed to save grade');
    }

    const savedGrade = await response.json();
    setGrades((currentGrades) => [savedGrade, ...currentGrades]);
    return savedGrade;
  };

  const register = async (registrationData) => {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(registrationData),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || 'Registration failed');
    }

    setUsers((currentUsers) => [...currentUsers, responseData]);
    return responseData;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, users, grades, loading, error, login, logout, addGrade, register, reloadData: loadAppData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
