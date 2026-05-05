import React from 'react';
import { useAuth } from '../context/AuthContext';
import './StudentGrades.css';

const StudentGrades = () => {
  const { user, grades } = useAuth();

  const studentGrades = grades.filter((grade) => grade.studentId === user.id);
  const mockGrades = [
    { id: 1, subject: 'Advanced Typography', score: 95, feedback: 'Excellent' },
    { id: 2, subject: 'Digital Interface Design', score: 89, feedback: 'Improve design' },
    { id: 3, subject: 'HCI', score: 92, feedback: 'Great Analysis' },
    { id: 4, subject: 'Computer Programming 2', score: 88, feedback: 'Great Analysis' },
  ];

  const displayGrades = studentGrades.length > 0 ? studentGrades : mockGrades;
  const averageScore = displayGrades.reduce((total, grade) => total + (grade.score || 0), 0) / displayGrades.length;
  const cumulativeGpa = (averageScore / 25).toFixed(1);
  const activeSubjects = new Set(displayGrades.map((grade) => grade.subject)).size;

  const getLetterGrade = (score = 0) => {
    if (score >= 94) return 'A';
    if (score >= 90) return 'A-';
    if (score >= 87) return 'B+';
    if (score >= 80) return 'B';
    return 'C+';
  };

  return (
    <div className="grades-page">
      <div className="grades-toolbar">
        <h1>My Grades</h1>

        <div className="grades-filters">
          <label>
            <span>School Year</span>
            <select defaultValue="2024-2024">
              <option value="2024-2024">2024-2024</option>
              <option value="2023-2024">2023-2024</option>
            </select>
          </label>
          <label>
            <span>Semester</span>
            <select defaultValue="Spring">
              <option value="Spring">Spring</option>
              <option value="Fall">Fall</option>
            </select>
          </label>
        </div>
      </div>

      <div className="grades-content-grid">
        <main className="grades-main">
          <div className="grades-stats">
            <section className="grade-stat-card">
              <h2>Cumulative GPA</h2>
              <p>{cumulativeGpa}</p>
            </section>
            <section className="grade-stat-card">
              <h2>Active Subjects</h2>
              <p>{activeSubjects}</p>
            </section>
            <section className="grade-stat-card status-card">
              <h2>Academic Status</h2>
              <p>Passed</p>
            </section>
          </div>

          <section className="grades-table-card">
            <table className="student-grades-table">
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Score</th>
                  <th>Grade</th>
                  <th>Feedback</th>
                </tr>
              </thead>
              <tbody>
                {displayGrades.map((grade) => (
                  <tr key={grade.id}>
                    <td>{grade.subject}</td>
                    <td>{grade.score}</td>
                    <td>
                      <span>{getLetterGrade(grade.score)}</span>
                    </td>
                    <td>{grade.feedback || 'No feedback yet'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section className="academic-journey">
            <h2>Academic Journey</h2>
            <div className="journey-list">
              <article>
                <small>Fall 2023</small>
                <strong>First Semester</strong>
                <b>3.7</b>
              </article>
              <article>
                <small>Spring 2024</small>
                <strong>Second Semester</strong>
                <b>3.8</b>
              </article>
            </div>
          </section>
        </main>

        <aside className="grades-side">
          <section className="subject-detail-card">
            <h2>Subject: HCI</h2>
            <div className="activity-table">
              <div>
                <span>Activity</span>
                <span>Score</span>
              </div>
              <div>
                <span>Quiz1</span>
                <strong>20/20</strong>
              </div>
              <div>
                <span>Quiz2</span>
                <strong>18/20</strong>
              </div>
              <div>
                <span>Midterm Exam</span>
                <strong>45/50</strong>
              </div>
              <div>
                <span>Final Exam</span>
                <strong>92/100</strong>
              </div>
            </div>

            <div className="teacher-note">
              <h3>Teacher Feedback</h3>
              <p>"Outstanding performance. Keep it up! Your problem solving skills in trigonometry have shown significant growth this term."</p>
            </div>
          </section>

          <div className="grades-actions">
            <button className="download-report-btn" type="button">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <path d="M14 2v6h6M9 15h6M12 12v6" />
              </svg>
              Download Report PDF
            </button>
            <button className="print-report-btn" type="button">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                <path d="M6 14h12v8H6z" />
              </svg>
              Print Report
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default StudentGrades;
