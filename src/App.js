import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import Header from './components/Header.jsx';
import LoginForm from './components/LoginForm.jsx';
import RegisterForm from './components/RegisterForm.jsx';
import Layout from './common/Layout.jsx';
import studentIcons from './assets/icon.png'; 

const AppRoutes = () => {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route path="/" element={
        <>
          <Header title="Student's Performance Tracker" />
          <Layout leftImage={studentIcons} showImage={true}>
            <LoginForm onRegister={() => navigate('/register')} />
          </Layout>
        </>
      } />
      <Route path="/register" element={
        <>
          <Header title="Register to ClassIQ" />
          <Layout showImage={false}>
            <RegisterForm onBackToLogin={() => navigate('/')} />
          </Layout>
        </>
      } />
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <div className="App">
        <AppRoutes />
      </div>
    </Router>
  );
}

export default App;