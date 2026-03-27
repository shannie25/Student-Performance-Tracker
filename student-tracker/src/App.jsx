import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AddGrades from './pages/admin/AddGrades';
import ManageUsers from './pages/admin/ManageUsers';
import GenerateReport from './pages/shared/GenerateReport';
import Sidebar from './components/Sidebar';

const AppContent = () => {
  const { user } = useAuth();

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {user && <Sidebar />}
      <main style={{ flex: 1, backgroundColor: '#f0f2f5' }}>
        <Routes>
          <Route path="/admin" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
          <Route path="/teacher" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
          <Route path="/student" element={!user ? <Login /> : <Navigate to="/dashboard" />} />

          <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/" />} />
          <Route path="/add-grades" element={user?.role !== 'student' ? <AddGrades /> : <Navigate to="/" />} />
          <Route path="/manage-users" element={user?.role === 'admin' ? <ManageUsers /> : <Navigate to="/" />} />
          <Route path="/generate-report" element={user ? <GenerateReport /> : <Navigate to="/" />} />

          <Route path="/" element={<Navigate to="/student" />} />
        </Routes>
      </main>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;