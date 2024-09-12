// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
// import '../Home.css';
// import Header from '../Header';
// import '../Signup.css';

// const SignupForm = () => {
//   const [name, setName] = useState('');
//   const [phone, setPhone] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate(); // Initialize useNavigate

//   const validateName = (name) => /^[A-Za-z][A-Za-z\s]*$/.test(name);
//   const validatePhone = (phone) => /^[0-9]{10,15}$/.test(phone);
//   const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
//   const validatePassword = (password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

//   const handlePhoneChange = (e) => {
//     const { value } = e.target;
//     const numericValue = value.replace(/\D/g, '');
//     setPhone(numericValue);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!validateName(name)) {
//       setError('Name must contain only letters and cannot start with a space.');
//       return;
//     }

//     if (!validatePhone(phone)) {
//       setError('Phone number must be a valid number between 10 to 15 digits.');
//       return;
//     }

//     if (!validateEmail(email)) {
//       setError('Email must be in a valid format.');
//       return;
//     }

//     if (!validatePassword(password)) {
//       setError('Password must be at least 8 characters long, include at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.');
//       return;
//     }

//     try {
//       const response = await axios.post('https://api.hirdayam.com/api/signup', {
//         name,
//         phone,
//         email,
//         password,
//       }, {
//         headers: {
//           'Content-Type': 'application/json',
//         }
//       });
      
//       console.log('Signup successful with data:', response.data);
//       setSuccess('Signup successful!');
//       setError('');
      
//       // Redirect to home page upon successful signup
//       navigate('/');
      
//       setName('');
//       setPhone('');
//       setEmail('');
//       setPassword('');
//     } catch (error) {
//       console.error('Error during signup:', error.message);
//       setError('Signup failed. Please try again.');
//       setSuccess('');
//     }
//   };

//   return (
//     <>
//       <Header />
//       <div className="signup-form mt-28 md:mt-10 ">
//         <h2 className="signup">Signup</h2>
//         <h2 className="signup-heading1">Please register using account details below.</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="form-row">
//             <input
//               type="text"
//               id="name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               placeholder="Name"
//               required
//             />
//             <input
//               type="text"
//               id="phone"
//               value={phone}
//               onChange={handlePhoneChange}
//               placeholder="Phone"
//               required
//               autoComplete="off"
//             />
//           </div>
//           <div className="form-row">
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Email Id"
//               required
//             />
            
//               <input
//                 type={showPassword ? 'text' : 'password'}
//                 id="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="Password"
//                 required
//               />
//               <span
//                 className="toggle-password"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
              
//               </span>
            
//           </div>
//           <div className="form-row">
//             <button type="submit" className="signup-button">Signup</button>
//           </div>
//         </form>
//         {error && <p className="error-text">{error}</p>}
//         {success && <p className="success-text">{success}</p>}
//         <p className="center-text">Already Registered? <Link to="/login">Login</Link></p>
//       </div>
//     </>
//   );
// };

// export default SignupForm;
// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import '../Home.css';
// import Header from '../Header';
// import '../Signup.css';

// const SignupForm = () => {
//   const [name, setName] = useState('');
//   const [phone, setPhone] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate(); // Initialize useNavigate

//   const validateName = (name) => /^[A-Za-z][A-Za-z\s]*$/.test(name);
//   const validatePhone = (phone) => /^[0-9]{10,15}$/.test(phone);
//   const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,6}$/.test(email);
//   const validatePassword = (password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

//   const handlePhoneChange = (e) => {
//     const { value } = e.target;
//     const numericValue = value.replace(/\D/g, '');
//     setPhone(numericValue);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     // Clear previous errors
//     setError('');

//     // Validate fields before making API request
//     if (!validateName(name)) {
//       setError('Invalid name. Name must contain only letters and cannot start with a space.');
//       return;
//     }

//     if (!validatePhone(phone)) {
//       setError('Invalid phone number. Phone number must be a valid number between 10 to 15 digits.');
//       return;
//     }

//     if (!validateEmail(email)) {
//       setError('Invalid email format.');
//       return;
//     }

//     if (!validatePassword(password)) {
//       setError('Password must be at least 8 characters long and include 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.');
//       return;
//     }

//     // Proceed to API call if all validations pass
//     try {
//       const response = await axios.post('https://api.hirdayam.com/api/signup', {
//         name,
//         phone,
//         email,
//         password,
//       }, {
//         headers: {
//           'Content-Type': 'application/json',
//         }
//       });

//       console.log('Signup successful with data:', response.data);
//       setSuccess('Signup successful!');
//       setError('');

//       // Redirect to home page upon successful signup
//       navigate('/');

//       // Clear form fields after successful signup
//       setName('');
//       setPhone('');
//       setEmail('');
//       setPassword('');
//     } catch (error) {
//       console.error('Error during signup:', error.message);
//       setError('Signup failed. Please try again.');
//       setSuccess('');
//     }
//   };

//   return (
//     <>
//       <Header />
//       <div className="signup-form mt-28 md:mt-10 ">
//         <h2 className="signup">Signup</h2>
//         <h2 className="signup-heading1">Please register using account details below.</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="form-row">
//             <input
//               type="text"
//               id="name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               placeholder="Name"
//               required
//             />
//             <input
//               type="text"
//               id="phone"
//               value={phone}
//               onChange={handlePhoneChange}
//               placeholder="Phone"
//               required
//               autoComplete="off"
//             />
//           </div>
//           <div className="form-row">
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Email Id"
//               required
//             />
//             <input
//               type={showPassword ? 'text' : 'password'}
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Password"
//               required
//             />
//             <span
//               className="toggle-password"
//               onClick={() => setShowPassword(!showPassword)}
//             >
//               {/* Toggle show/hide password icon logic */}
//             </span>
//           </div>
//           <div className="form-row">
//             <button type="submit" className="signup-button">Signup</button>
//           </div>
//         </form>
//         {error && <p className="error-text">{error}</p>}
//         {success && <p className="success-text">{success}</p>}
//         <p className="center-text">Already Registered? <Link to="/login">Login</Link></p>
//       </div>
//     </>
//   );
// };

// export default SignupForm;
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
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

  const validateName = (name) => /^[A-Za-z][A-Za-z\s]{2,}$/.test(name);

  const validatePhone = (phone) => /^[0-9]{10,15}$/.test(phone);
  // const validateEmail = (email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/.test(email);
  const validateEmail = (email) => /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email);

  
  // const validatePassword = (password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
  const validatePassword = (password) => /^[a-zA-Z0-9]{8}$/.test(password);

  // const handlePhoneChange = (e) => setPhone(e.target.value.trim());
  // const handleEmailChange = (e) => setEmail(e.target.value.trim());
  const handleNameChange = (e) => {
    const value = e.target.value;
    const noLeadingSpacesValue = value.replace(/^\s+/, ''); // Remove leading spaces only
    setName(noLeadingSpacesValue);
  };
  
  const handleEmailChange = (e) => {
    const value = e.target.value;
    const noLeadingSpacesValue = value.replace(/^\s+/, ''); // Remove leading spaces only
    setEmail(noLeadingSpacesValue);
  };
  
  const handlePasswordChange = (e) => setPassword(e.target.value.trim());
  
  // const handlePhoneChange = (e) => {
  //   const { value } = e.target;
  //   const numericValue = value.replace(/\D/g, '');
  //   setPhone(numericValue);
  // };
  const handlePhoneChange = (e) => {
    const { value } = e.target;
    // Remove any non-numeric characters
    const numericValue = value.replace(/\D/g, '');
    // Trim any leading or trailing spaces
    const trimmedValue = numericValue.trim();
    // Update the phone state
    setPhone(trimmedValue);
  };
  
  // const handleSubmit = async (event) => {
  //   event.preventDefault();

  //   setError('');
  //   setSuccess('');

    
  //   if (!validateName(name)) {
  //     setError('Invalid name. Name must contain at least 3 characters and only letters and cannot start with a space.');
  //     return;
  //   }

  //   if (!validatePhone(phone)) {
  //     setError('Invalid phone number. Phone number must be a valid number between 10 to 15 digits.');
  //     return;
  //   }

  //   if (!validateEmail(email)) {
  //     setError('Invalid email format.');
  //     return;
  //   }

  //   if (!validatePassword(password)) {
  //     setError('Password must be at least 8 characters long and include 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.');
  //     return;
  //   }

  //   // Proceed to API call if all validations pass
  //   try {
  //     const response = await axios.post('https://api.hirdayam.com/api/signup', {
  //       name,
  //       phone,
  //       email,
  //       password,
  //     }, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //       }
  //     });

  //     console.log('Signup successful with data:', response.data);
  //     setSuccess('Signup successful!');
      
  //     // Redirect to home page upon successful signup
  //     navigate('/');

  //     // Clear form fields after successful signup
  //     setName('');
  //     setPhone('');
  //     setEmail('');
  //     setPassword('');
  //   } catch (error) {
  //     console.error('Error during signup:', error.message);

  //     // Check if error response has specific details
  //     if (error.response && error.response.data) {
  //       if (error.response.data.message) {
  //         setError(error.response.data.message);
  //       } else {
  //         setError('Signup failed. Please try again.');
  //       }
  //     } else {
  //       setError('Signup failed. Please try again.');
  //     }
      
  //     setSuccess('');
  //   }
  // };
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Clear previous errors
    setError('');
    
    // Validate fields before making API request
    if (!validateName(name)) {
      setError('Invalid name. Name must contain at least 3 characters and only letters.');
      return;
    }
  
    if (!validatePhone(phone)) {
      setError('Invalid phone number. Phone number must be a valid number between 10 to 15 digits.');
      return;
    }
  
    if (!validateEmail(email)) {
      setError('Invalid email format.');
      return;
    }
  
    if (!validatePassword(password)) {
      setError('Password must be at least 8 characters long.');
      return;
    }
  
    try {
      const response = await axios.post('https://api.hirdayam.com/api/signup', {
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
      alert('Your account has been successfully created.');
      navigate('/');
  
      setName('');
      setPhone('');
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error('Error during signup:', error);
  
      if (error.response && error.response.status === 409) {
        setError('This email is already registered.');
      } else if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('Signup failed. Please try again.');
      }
  
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
              // onChange={(e) => setName(e.target.value)}
              onChange={handleNameChange}

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
              // onChange={(e) => setEmail(e.target.value)}
              onChange={handleEmailChange}

              placeholder="Email Id"
              required
            />
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              // onChange={(e) => setPassword(e.target.value)}
              onChange={handlePasswordChange}

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
