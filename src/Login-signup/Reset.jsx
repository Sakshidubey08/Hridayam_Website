import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';
import '../Signup.css';
import '../Home.css';

const Reset = () => {
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [otpVerified, setOtpVerified] = useState(false); // To track OTP validation
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [timer, setTimer] = useState(60); // OTP expiration timer
    const navigate = useNavigate();

    useEffect(() => {
        // Timer for OTP expiration
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer(timer - 1);
            }, 1000);

            return () => clearInterval(interval);
        } else {
            setError('OTP expired. Please request a new one.');
        }
    }, [timer]);

    // Handle OTP submission
    const handleOtpSubmit = async (e) => {
      e.preventDefault();
      try {
          const response = await axios.post('https://api.hirdayam.com/api/verifyresettoken', {
              reset_token: otp.trim() // Make sure to trim the token in case of extra spaces
          });
  
          console.log('OTP Verification API response:', response.data); // Log the full response for clarity
  
          if (response.data.status) {
              setOtpVerified(true); // OTP is valid, show new password field
              setError('');
              setSuccess('OTP verified. You can now set a new password.');
          } else {
              setError(response.data.message || 'Invalid OTP. Please try again.');
          }
      } catch (error) {
          console.error('Error verifying OTP:', error);
          setError('Failed to verify OTP.');
      }
  };
  
    // Handle New Password submission
    const handlePasswordSubmit = async (e) => {
        const userId = localStorage.getItem('user_id'); // Retrieve the user_id from localStorage

        e.preventDefault();
        try {
            const response = await axios.post('https://api.hirdayam.com/api/resetPassword', {
                password: newPassword,
                user_id: userId, 
                // Retrieve the user_id from localStorage

            });

            if (response.data.status) {
                setSuccess('Password has been reset successfully!');
                setError('');
                setTimeout(() => {
                    navigate('/login'); // Redirect to login after success
                }, 2000);
            } else {
                setError('Failed to reset password. Please try again.');
            }
        } catch (error) {
            console.error('Error resetting password:', error.message);
            setError('Error resetting password.');
        }
    };

    return (
      <>
      <Header/>
      <div className="login-form-container mt-24 md:mt-10 mx-3 md:m-auto">
            <h2 className='login-heading'>Reset Your Password</h2>

            {!otpVerified ? (
                <>
                    <form onSubmit={handleOtpSubmit}>
                        <div className="input-container">
                            <input
                                type="text"
                                placeholder="Enter OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="login-button">Verify OTP</button>
                    </form>
                    <p>OTP expires in {timer} seconds.</p>
                </>
            ) : (
                <form onSubmit={handlePasswordSubmit}>
                    <div className="input-container">
                        <input
                            type="password"
                            placeholder="Enter New Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="login-button">Reset Password</button>
                </form>
            )}

            {error && <p className="error-text">{error}</p>}
            {success && <p className="success-text">{success}</p>}
        </div>
        </>
    );
};

export default Reset;
