import React from 'react';


const LoginForm = ({ onRegister }) => {
  
  const handleForgotPassword = () => {
    alert("Redirecting to the password recovery page...");
  };

  return (
    <div className="login-container">
      <h2>Login to your Account</h2>
      <form>
        <div className="form-group">
          <label htmlFor="idNumber">ID Number</label>
          <input type="text" id="idNumber" placeholder="Enter your ID number" />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Enter your password" />
        </div>

        <div className="form-options">
          <label>
            <input type="checkbox" /> Remember Me
          </label>
          <button type="button" className="forgot-btn" onClick={handleForgotPassword}>
            Forgot Password?
          </button>
        </div>

        <div className="form-buttons">
          <button type="submit" className="login-btn">LOGIN</button>
        
          <button type="button" className="register-btn" onClick={onRegister}>
            REGISTER
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;