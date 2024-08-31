import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Home.css';
import Header from '../Header';
import '../Signup.css';
import { useAuth } from '../store/auth';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { storeTokenInLS } = useAuth();
  const handlePhoneChange = (e) => {
    const { value } = e.target;
    const numericValue = value.replace(/\D/g, '');
    setPhone(numericValue);
  };

  useEffect(() => {
    
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          throw new Error('No token found in localStorage.');
        }

        const response = await axios.get('https://api.hirdayam.com/api/getUserprofile', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });

        console.log('Full response data:', response);
        console.log('User profile data:', response.data);

        
        const { name, email, phone, _id } = response.data.data;

        if (!_id) {
          throw new Error('User ID (_id) is missing in the response data.');
        }

        
        localStorage.setItem('user_id', _id);

        setName(name);
        setEmail(email);
        setPhone(phone);

        console.log('Stored user_id:', localStorage.getItem('user_id'));
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setError('Failed to fetch user profile. Please check your credentials.');
      }
    };

    fetchUserProfile();
  }, [storeTokenInLS]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('user_id'); // Retrieve the user_id from localStorage
      
      if (!token) {
        throw new Error('No token found in localStorage.');
      }
      
      if (!userId) {
        throw new Error('No user_id found in localStorage.');
      }

      const response = await axios.put('https://api.hirdayam.com/api/updateUserprofile', {
        user_id: userId, 
        name,
        phone,
        email
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      console.log('Profile update response:', response.data);
      setSuccess('Profile updated successfully.');
      setError('');
    } catch (error) {
      console.error('Error during profile update:', error);
      
      if (error.response) {
        console.log('Error response data:', error.response.data);
        console.log('Error response status:', error.response.status);
        console.log('Error response headers:', error.response.headers);
        setError(error.response.data.message || 'Profile update failed. Please check your details and try again.');
      } else {
        setError('Profile update failed. Please check your details and try again.');
      }

      setSuccess('');
    }
  };
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token from localStorage
    navigate('/login'); // Navigate to the login page
  };
  return (
    <>
      <Header />
      <div className="login-form-container mt-24 md:mt-3 ">
        <h2 className="login-heading">Edit Profile</h2>
        <br />
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-container">
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="input-container">
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
          <div className="input-container">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="button-container">
            <button type="submit" className="login-button">Submit</button>
          </div>
          <div className="button-container">
            <button onClick={handleLogout} type="submit" className="login-button">Logout</button>
          </div>
        </form>
        {error && <p className="error-text">{error}</p>}
        {success && <p className="success-text">{success}</p>}
      </div>
    </>
  );
};

export default EditProfile;
