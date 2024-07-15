import React from 'react';
import { Link } from 'react-router-dom';
import '../Home.css';
import Header from '../Header';
import '../Signup.css'

const Login = () => {
  return (
    <>
      <Header/>
      <div className="login-form-container">
        <h2 className="login-heading">Login</h2>
        <h2 className="login-heading1">Please login using account details bellow.</h2>

        <form className="login-form">
          <div className="input-container">
            
            <input type="email" id="email" name="email" placeholder="Enter Email Address" required />
          </div>
          <div className="input-container">
           
            <input type="password" id="password" name="password" placeholder="Password" required />
            <span className="forgot-password">
              <Link to="/forgot-password">Forgot Password?</Link>
            </span>
          </div>
          <div className="button-container">
            <button type="submit" className="login-button">Login</button>
          </div>
          <button type="button" className="create-account-button">
              <Link to="/signup">Create Account</Link>
            </button>
        </form>
      </div>
    </>
  );
}

export default Login;
