import React, { useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import html2pdf from 'html2pdf.js';
import './GenerateReport.css';

const GenerateReport = () => {
  const { user, grades } = useAuth();
  const reportRef = useRef();

  const reportData = user?.role === 'student'
    ? grades.filter((grade) => grade.studentId === user.id)
    : grades;

  const fallbackGrades = [
    { id: 1, subject: 'Math 101: Linear Algebra', instructor: 'Dr. Alan Turing', score: 95, finalGrade: 'A' },
    { id: 2, subject: 'English 202: Advanced Composition', instructor: 'Prof. Sylvia Plath', score: 89, finalGrade: 'B+' },
    { id: 3, subject: 'Science 302: Quantum Mechanics', instructor: 'Dr. Richard Feynman', score: 92, finalGrade: 'A-' },
  ];

  const gradesForReport = reportData.length > 0
    ? reportData.map((grade) => ({
        ...grade,
        instructor: grade.instructor || 'Academic Faculty',
        finalGrade: grade.finalGrade || getFinalGrade(grade.score),
      }))
    : fallbackGrades;

  const handleDownloadPDF = () => {
    const element = reportRef.current;
    const opt = {
      margin: 8,
      filename: `${user?.name || 'Student'}_Academic_Report.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };
    html2pdf().set(opt).from(element).save();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="reports-page">
      <div className="reports-header">
        <h1>Academic Reports</h1>
        <div className="reports-header-actions">
          <button type="button" className="report-print-btn" onClick={handlePrint}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
              <path d="M6 14h12v8H6z" />
            </svg>
            Print
          </button>
          <button type="button" className="report-download-btn" onClick={handleDownloadPDF}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 3v12M7 10l5 5 5-5M5 21h14" />
            </svg>
            Download PDF
          </button>
        </div>
      </div>

      <div className="reports-grid">
        <aside className="report-controls">
          <section className="generate-card">
            <h2>Generate Report</h2>

            <label>
              <span>Report Type</span>
              <select defaultValue="Full Report">
                <option>Full Report</option>
                <option>Grades Only</option>
                <option>Attendance Only</option>
              </select>
            </label>

            <div className="report-select-row">
              <label>
                <span>Semester</span>
                <select defaultValue="Spring">
                  <option>Spring</option>
                  <option>Fall</option>
                </select>
              </label>
              <label>
                <span>Year</span>
                <select defaultValue="2023 - 2024">
                  <option>2023 - 2024</option>
                  <option>2024 - 2025</option>
                </select>
              </label>
            </div>

            <fieldset>
              <legend>Format</legend>
              <label>
                <input type="radio" name="format" defaultChecked />
                PDF Document
              </label>
              <label>
                <input type="radio" name="format" />
                Excel Spreadsheet
              </label>
            </fieldset>

            <button type="button" className="generate-report-btn">Generate Report</button>
            <button type="button" className="preview-report-btn">Preview Report</button>
          </section>

          <section className="history-card">
            <div>
              <h2>Recent History</h2>
              <button type="button">View All</button>
            </div>
            <article>
              <strong>Full Report - Spring</strong>
              <span>April 20, 2024 - 1.2 MB</span>
            </article>
            <article>
              <strong>Grades - Fall</strong>
              <span>March 10, 2024 - 840 KB</span>
            </article>
          </section>
        </aside>

        <main className="report-preview-wrap">
          <section className="report-paper" ref={reportRef}>
            <div className="report-title-block">
              <div className="report-icon">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="m12 3 9 5-9 5-9-5 9-5Z" />
                  <path d="m5 10 7 4 7-4M5 14l7 4 7-4" />
                </svg>
              </div>
              <h2>Academic Summary Report</h2>
            </div>

            <div className="student-info-grid">
              <div>
                <span>Student Information</span>
                <strong>{user?.name || 'Alessa Arong'}</strong>
              </div>
              <div>
                <span>Period</span>
                <strong>Spring Semester, 2023-2024</strong>
              </div>
              <div>
                <span>Enrollment Year</span>
                <strong>BS Information Technology, 3rd Year</strong>
              </div>
              <div>
                <span>Date Generated</span>
                <strong>October, 24, 2024</strong>
              </div>
            </div>

            <section className="report-section">
              <h3>Grades Summary</h3>
              <table className="report-grades-table">
                <thead>
                  <tr>
                    <th>Subject Name</th>
                    <th>Instructor</th>
                    <th>Score</th>
                    <th>Final Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {gradesForReport.slice(0, 4).map((grade) => (
                    <tr key={grade.id}>
                      <td>{grade.subject}</td>
                      <td>{grade.instructor}</td>
                      <td>{grade.score}%</td>
                      <td><span>{grade.finalGrade}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>

            <div className="report-summary-grid">
              <section>
                <h3>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <path d="M16 2v4M8 2v4M3 10h18" />
                  </svg>
                  Attendance Summary
                </h3>
                <div className="attendance-report-box">
                  <strong>92%</strong>
                  <p><b>Present:</b> 92 Days<br /><b>Absent:</b> 8 Days<br />Consistent attendance behavior observed this term.</p>
                </div>
              </section>

              <section>
                <h3>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M21 15a4 4 0 0 1-4 4H7l-4 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
                  </svg>
                  Teacher Feedback
                </h3>
                <div className="feedback-report-box">
                  <p>"Excellent academic performance overall. Alessa demonstrates a profound understanding of mathematical concepts and consistently contributes meaningful insights during classroom discussion. Keep up the high standard of work."</p>
                  <strong>Academic Board</strong>
                  <span>Verified Certificate</span>
                </div>
              </section>
            </div>

            <footer className="report-footer">
              <span>Document security: AES-256 encrypted</span>
              <div>
                <b />
                <p><strong>Dr. Helena Vance</strong><br />University Registrar</p>
              </div>
            </footer>
          </section>
        </main>
      </div>
    </div>
  );
};

const getFinalGrade = (score = 0) => {
  if (score >= 94) return 'A';
  if (score >= 90) return 'A-';
  if (score >= 87) return 'B+';
  if (score >= 80) return 'B';
  return 'C+';
};

export default GenerateReport;
