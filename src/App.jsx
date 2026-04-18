import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import './App.css';

import Dashboard from './pages/Dashboard';
import AddGrades from './pages/admin/AddGrades';
import ManageUsers from './pages/admin/ManageUsers';
import GenerateReport from './pages/shared/GenerateReport';
import StudentLogin from './pages/StudentLogin';
import AdminLogin from './pages/AdminLogin';
import TeacherLogin from './pages/TeacherLogin';
import RegisterForm from './components/RegisterForm';
import Sidebar from './components/Sidebar';

const AppRoutes = () => {
  const { user } = useAuth();

  // Show login pages if not authenticated
  const navigate = useNavigate();

  if (!user) {
    return (
      <Routes>
        <Route path="/student" element={<StudentLogin />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/teacher" element={<TeacherLogin />} />
        <Route path="/register" element={<RegisterForm onBackToLogin={() => navigate('/student')} />} />
        <Route path="*" element={<Navigate to="/student" />} />
      </Routes>
    );
  }

  // Show dashboard and admin pages if authenticated
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <main style={{ flex: 1, backgroundColor: '#f0f2f5' }}>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-grades" element={user?.role !== 'student' ? <AddGrades /> : <Navigate to="/dashboard" />} />
          <Route path="/manage-users" element={user?.role === 'admin' ? <ManageUsers /> : <Navigate to="/dashboard" />} />
          <Route path="/generate-report" element={<GenerateReport />} />
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </main>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <AppRoutes />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;