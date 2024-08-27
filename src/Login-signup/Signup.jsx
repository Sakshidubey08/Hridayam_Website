import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import '../Home.css';
import Header from '../Header';
import '../Signup.css';

const SignupForm = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const validateName = (name) => /^[A-Za-z][A-Za-z\s]*$/.test(name);
  const validatePhone = (phone) => /^[0-9]{10,15}$/.test(phone);
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

  const handlePhoneChange = (e) => {
    const { value } = e.target;
    const numericValue = value.replace(/\D/g, '');
    setPhone(numericValue);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateName(name)) {
      setError('Name must contain only letters and cannot start with a space.');
      return;
    }

    if (!validatePhone(phone)) {
      setError('Phone number must be a valid number between 10 to 15 digits.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Email must be in a valid format.');
      return;
    }

    if (!validatePassword(password)) {
      setError('Password must be at least 8 characters long, include at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.');
      return;
    }

    try {
      const response = await axios.post('https://hridayam.dasoclothings.in/api/signup', {
        name,
        phone,
        email,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      console.log('Signup successful with data:', response.data);
      setSuccess('Signup successful!');
      setError('');
      
      // Redirect to home page upon successful signup
      navigate('/');
      
      setName('');
      setPhone('');
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error('Error during signup:', error.message);
      setError('Signup failed. Please try again.');
      setSuccess('');
    }
  };

  return (
    <>
      <Header />
      <div className="signup-form mt-28 md:mt-10 ">
        <h2 className="signup">Signup</h2>
        <h2 className="signup-heading1">Please register using account details below.</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              required
            />
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={handlePhoneChange}
              placeholder="Phone"
              required
              autoComplete="off"
            />
          </div>
          <div className="form-row">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Id"
              required
            />
            
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
              <span
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
              
              </span>
            
          </div>
          <div className="form-row">
            <button type="submit" className="signup-button">Signup</button>
          </div>
        </form>
        {error && <p className="error-text">{error}</p>}
        {success && <p className="success-text">{success}</p>}
        <p className="center-text">Already Registered? <Link to="/login">Login</Link></p>
      </div>
    </>
  );
};

export default SignupForm;
