import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Home.css';
import Header from '../Header';
import '../Signup.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate(); // Use navigate for redirection

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('https://api.hirdayam.com/api/forgetpassword', {
                email,
                password,
            });

            console.log('Login successful with data:', response.data);
            setSuccess('Password reset request successful! Check your email for OTP.');
            setError('');
            setTimeout(() => {
                navigate('/reset'); // Redirect to reset page
            }, 2000); 
        } catch (error) {
            console.error('Error during login:', error.message);
            setError('Login failed. Please check your credentials and try again.');
            setSuccess('');
        }
    };

    return (
        <>
            <Header />
            <div className="login-form-container mt-24 md:mt-10 mx-3 md:m-auto">
                <h2 className="login-heading">Reset Your Password</h2>
                <h2 className="login-heading1">We will send you email to reset your password</h2>

                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="input-container">
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <span className="cancel">
              <Link to="/login">Cancel</Link>
            </span>
                    <div className="button-container">
                        <button type="submit" className="login-button">Submit</button>
                    </div>
                    
                </form>
                {error && <p className="error-text">{error}</p>}
                {success && <p className="success-text">{success}</p>}
            </div>
        </>
    );
};

export default Login;
