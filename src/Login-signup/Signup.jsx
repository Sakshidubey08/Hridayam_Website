import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Home.css';
import Header from '../Header';
import '../Signup.css';

const SignupForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Signup submitted with data:', {
      firstName,
      lastName,
      city,
      address,
      email,
      password,
    });
  };

  return (
    <>
      <Header />
      <div className="signup-form">
        <h2>Signup</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
              required
            />
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
              required
            />
          </div>
          <div className="form-row">
            <input
              type="text"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City"
            />
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Address"
            />
          </div>
          <div className="form-row">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </div>
          <div className="form-row">
            <button type="submit" className="signup-button">Signup</button>
          </div>
        </form>
        <p className="center-text">Already Registered? <Link to="/login">Login</Link></p>
      </div>
    </>
  );
};

export default SignupForm;
