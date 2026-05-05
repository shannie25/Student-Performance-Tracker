import React from 'react';
import './Attendance.css';

const Attendance = () => {
  const trendMonths = [
    { month: 'Sep', present: 76, late: 8 },
    { month: 'Oct', present: 94, late: 3 },
    { month: 'Nov', present: 68, late: 10 },
    { month: 'Dec', present: 100, late: 0 },
    { month: 'Jan', present: 97, late: 9 },
  ];

  const calendarDays = [
    { day: 30, muted: true },
    { day: 31, muted: true },
    { day: 1, type: 'present' },
    { day: 2, type: 'present' },
    { day: 3, type: 'present' },
    { day: 4 },
    { day: 5 },
    { day: 6, type: 'present' },
    { day: 7, type: 'present' },
    { day: 8, type: 'present' },
    { day: 9, type: 'present' },
    { day: 10, type: 'present' },
    { day: 11 },
    { day: 12 },
    { day: 13, type: 'absent' },
    { day: 14, type: 'late' },
    { day: 15, type: 'present' },
    { day: 16, type: 'present' },
    { day: 17, type: 'present' },
  ];

  const monthlySummary = [
    { month: 'January', present: 20, absent: 1, late: 0, status: 'Good' },
    { month: 'December', present: 18, absent: 2, late: 1, status: 'Good' },
    { month: 'November', present: 22, absent: 0, late: 0, status: 'Perfect' },
  ];

  const dailyRecords = [
    { date: 'JAN 10', type: 'Present', detail: 'Status: On time', tone: 'present' },
    { date: 'JAN 13', type: 'Absent', detail: 'Status: Medical leave', tone: 'absent' },
    { date: 'JAN 08', type: 'Late', detail: 'Arrived at 09:15', tone: 'late' },
  ];

  return (
    <div className="attendance-page">
      <div className="attendance-toolbar">
        <h1>Attendance</h1>

        <div className="attendance-filters">
          <label>
            <span>Semester</span>
            <select defaultValue="Spring">
              <option value="Spring">Spring</option>
              <option value="Fall">Fall</option>
            </select>
          </label>
          <label>
            <span>Year</span>
            <select defaultValue="2024-2024">
              <option value="2024-2024">2024-2024</option>
              <option value="2023-2024">2023-2024</option>
            </select>
          </label>
        </div>
      </div>

      <div className="attendance-stats">
        <section className="attendance-stat-card">
          <h2>Total Days</h2>
          <p>100</p>
        </section>
        <section className="attendance-stat-card">
          <h2>Present</h2>
          <p>92</p>
        </section>
        <section className="attendance-stat-card">
          <h2>Absent</h2>
          <p className="danger">8</p>
        </section>
        <section className="attendance-stat-card rate-card">
          <h2>Attendance Rate</h2>
          <p>92%</p>
        </section>
      </div>

      <div className="attendance-grid">
        <main className="attendance-main">
          <section className="trend-card">
            <div className="trend-header">
              <h2>Attendance Trends</h2>
              <div className="trend-legend">
                <span><b className="present-dot" />Present</span>
                <span><b className="late-dot" />Late</span>
              </div>
            </div>

            <div className="trend-chart" aria-label="Attendance trends by month">
              {trendMonths.map((item) => (
                <div className="trend-column" key={item.month}>
                  <div className="bar-track">
                    <span className="late-bar" style={{ height: `${item.late}%` }} />
                    <span className="present-bar" style={{ height: `${item.present}%` }} />
                  </div>
                  <small>{item.month}</small>
                </div>
              ))}
            </div>
          </section>

          <section className="monthly-summary-card">
            <h2>Monthly Summary</h2>
            <table>
              <thead>
                <tr>
                  <th>Month</th>
                  <th>Present</th>
                  <th>Absent</th>
                  <th>Late</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {monthlySummary.map((item) => (
                  <tr key={item.month}>
                    <td>{item.month}</td>
                    <td>{item.present}</td>
                    <td>{item.absent}</td>
                    <td>{item.late}</td>
                    <td>
                      <span className={item.status === 'Perfect' ? 'perfect-status' : ''}>{item.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </main>

        <aside className="attendance-side">
          <section className="calendar-card">
            <div className="calendar-header">
              <h2>January 2025</h2>
              <div>
                <button type="button" aria-label="Previous month">
                  <svg viewBox="0 0 24 24"><path d="m15 18-6-6 6-6" /></svg>
                </button>
                <button type="button" aria-label="Next month">
                  <svg viewBox="0 0 24 24"><path d="m9 18 6-6-6-6" /></svg>
                </button>
              </div>
            </div>

            <div className="calendar-weekdays">
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
                <span key={`${day}-${index}`}>{day}</span>
              ))}
            </div>

            <div className="calendar-grid">
              {calendarDays.map((day, index) => (
                <span key={`${day.day}-${index}`} className={`${day.type || ''} ${day.muted ? 'muted' : ''}`}>
                  {day.day}
                </span>
              ))}
            </div>

            <div className="calendar-legend">
              <span><b className="present-dot" />Present (P)</span>
              <span><b className="absent-dot" />Absent (A)</span>
              <span><b className="late-dot" />Late (L)</span>
            </div>
          </section>

          <section className="daily-records">
            <h2>Daily Records</h2>
            <div className="daily-record-list">
              {dailyRecords.map((record) => (
                <article key={`${record.date}-${record.type}`}>
                  <time>{record.date}</time>
                  <div>
                    <strong>{record.type}</strong>
                    <span>{record.detail}</span>
                  </div>
                  <b className={record.tone}>
                    {record.tone === 'present' ? '✓' : record.tone === 'absent' ? '!' : 'L'}
                  </b>
                </article>
              ))}
            </div>
            <button className="detailed-log-btn" type="button">View Detailed Log</button>
          </section>
        </aside>
      </div>

      <div className="attendance-actions">
        <button className="attendance-print-btn" type="button">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
            <path d="M6 14h12v8H6z" />
          </svg>
          Print
        </button>
        <button className="attendance-download-btn" type="button">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 3v12M7 10l5 5 5-5M5 21h14" />
          </svg>
          Download Attendance Report
        </button>
      </div>
    </div>
  );
};

export default Attendance;
