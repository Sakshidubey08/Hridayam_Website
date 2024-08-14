import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Home.css';
import Header from '../Header';
import '../Signup.css';
import { useAuth } from '../store/auth';
import Footer from '../Footer';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { storeTokenInLS } = useAuth();
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('https://hridayam.dasoclothings.in/api/login', {
        email,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      console.log('Login successful with data:', response.data);
      
      storeTokenInLS(response.data.data.token);

      setSuccess('Login successful!');
      setError('');
      
     
      navigate('/');
      
      setEmail('');
      setPassword('');
    } catch (error) {
      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        console.error('Error response headers:', error.response.headers);
        setError(`Login failed: ${error.response.data.message || 'Unknown error'}`);
      } else if (error.request) {
        console.error('Error request:', error.request);
        setError('Login failed: No response from server.');
      } else {
        console.error('Error message:', error.message);
        setError('Login failed: ' + error.message);
      }
      setSuccess('');
    }
  };

  return (
    <>
      <Header />
      <div className="login-form-container">
        <h2 className="login-heading">Login</h2>
        <h2 className="login-heading1">Please login using account details below.</h2>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-container">
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email Address"
              required
            />
          </div>
          <div className="input-container">
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <span className="forgot-password">
              <Link to="/forget">Forgot Password?</Link>
            </span>
          </div>
          <div className="button-container">
            <button type="submit" className="login-button">Login</button>
          </div>
          <h1 type="button" className="create-account">
            <Link to="/signup">Create Account</Link>
          </h1>
        </form>
        {error && <p className="error-text">{error}</p>}
        {success && <p className="success-text">{success}</p>}
      </div>
      <Footer/>
    </>
  );
};

export default Login;
