import React from 'react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user, grades, users } = useAuth();

  const studentGrades = user.role === 'student' 
    ? grades.filter(g => g.studentId === user.id) 
    : grades;

  return (
    <div>
      <h1>{user.role.charAt(0).toUpperCase() + user.role.slice(1)} Dashboard</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px', background: 'white' }}>
        <thead>
          <tr style={{ background: '#f4f4f4', textAlign: 'left' }}>
            {user.role !== 'student' && <th style={{ padding: '10px', border: '1px solid #ddd' }}>Student</th>}
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Subject</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Score</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Feedback</th>
          </tr>
        </thead>
        <tbody>
          {studentGrades.map((g) => (
            <tr key={g.id}>
              {user.role !== 'student' && <td style={{ padding: '10px', border: '1px solid #ddd' }}>{users.find(u => u.id === g.studentId)?.name}</td>}
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{g.subject}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{g.score}%</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{g.feedback}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;