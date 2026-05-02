import React from 'react';
import { useAuth } from '../context/AuthContext';

const Attendance = () => {
  const { user } = useAuth();

  return (
    <div style={{ padding: '24px' }}>
      <h1 style={{ color: '#1f2937', marginBottom: '24px' }}>
        {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)} Attendance
      </h1>
      <div style={{ background: 'white', borderRadius: '18px', padding: '24px', boxShadow: '0 10px 30px rgba(15, 23, 42, 0.08)' }}>
        <p style={{ color: '#334155', lineHeight: '1.7' }}>
          Attendance tracking will be available here soon. For now, use the dashboard to review current student progress.
        </p>
      </div>
    </div>
  );
};

export default Attendance;
