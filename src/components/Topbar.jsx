import React from 'react';

const Topbar = () => {
  return (
    <header className="topbar">
      <div className="topbar-search">
        <span className="topbar-search-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d="m21 21-4.35-4.35" />
            <circle cx="11" cy="11" r="7" />
          </svg>
        </span>
        <input
          type="text"
          placeholder="Search academic records..."
          aria-label="Search academic records"
        />
      </div>

      <div className="topbar-actions" aria-label="Dashboard shortcuts">
        <button type="button" aria-label="Notifications">
          <svg viewBox="0 0 24 24">
            <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 7h18s-3 0-3-7" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
        </button>
        <button type="button" aria-label="Calendar">
          <svg viewBox="0 0 24 24">
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <path d="M16 2v4M8 2v4M3 10h18" />
          </svg>
        </button>
        <button type="button" aria-label="Messages">
          <svg viewBox="0 0 24 24">
            <path d="M21 15a4 4 0 0 1-4 4H7l-4 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Topbar;
