import React from 'react';

const RegisterForm = ({ onBackToLogin }) => {
  return (
    <div className="register-container">
      <form>

        <div className="form-row">
          <div className="form-group">
            <label>First Name</label>
            <input type="text" />
          </div>
          <div className="form-group">
            <label>Middle Name</label>
            <input type="text" />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input type="text" />
          </div>
        </div>

        
        <div className="form-row-wide">
          <div className="form-group">
            <label>Student ID</label>
            <input type="text" />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" />
          </div>
        </div>

        <div className="form-row" style={{ gridTemplateColumns: '1fr 1fr' }}>
          <div className="form-group">
            <label>Password</label>
            <input type="password" />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input type="password" />
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button type="submit" className="login-btn">CREATE ACCOUNT</button>
          <button type="button" className="forgot-btn" onClick={onBackToLogin} style={{ display: 'block', margin: '10px auto' }}>
            Back to Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;