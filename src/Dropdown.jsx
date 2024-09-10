// import React, { useState } from 'react';
// import './Dropdown.css'
// import { Link } from 'react-router-dom';

// import icon2 from './images/icon2.png';
// function App() {
//   const [showDropdown, setShowDropdown] = useState(false);

//   const handleIconClick = () => {
//     setShowDropdown(!showDropdown);
//   };

//   return (
//     <div>
//       <div onClick={handleIconClick}>
//       <img 
//     src={icon2} 
//     alt="icon" 
//     className="image" 
//     style={{ cursor: 'pointer' }} 
//   />
//       </div>

//       {showDropdown && (
//         <div className="dropdown1">
//           <div className="dropdown-item1">Welcome</div>
//           <p className="dropdown-item6">To access account and manage order</p>
//           <button className="dropdown-item2"> <Link to="/login" className="dropdown-link1">Login</Link> / 
//           <Link to="/signup" className="dropdown-link">Signup</Link></button>
//           <br/>          <br/>

//           <Link to="/editprofile" className="dropdown-item3">Visit Profile</Link>
//           <br/>
//           <Link to="/wishlist" className="dropdown-item4">My Wishlist</Link>
//           <br/>
//           <Link to="/my-orders" className="dropdown-item5">My Orders</Link>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;

// import React, { useState } from 'react';
// import './Dropdown.css';
// import { Link } from 'react-router-dom';
// import icon2 from './images/icon2.png';
// import icon2_white from './images/user-white.png';
// import { useAuth } from './store/auth';

// function Dropdown() {
//   const [showDropdown, setShowDropdown] = useState(false);
//   const { isAuthenticated } = useAuth(); // Get isAuthenticated from context

//   const handleIconClick = () => {
//     setShowDropdown(!showDropdown);
//   };

//   const handleCloseClick = () => {
//     setShowDropdown(false);
//   };

//   return (
//     <div>
//       <div onClick={handleIconClick}>
//         <div className='user-black'>
//           <img 
//             src={icon2} 
//             alt="icon" 
//             className="image" 
//             style={{ cursor: 'pointer' }} 
//           />
//         </div>
//         <div className='user-white'>
//           <img 
//             src={icon2_white} 
//             alt="icon" 
//             className="image" 
//             style={{ cursor: 'pointer'}} 
//           />
//         </div>
//       </div>

//       {showDropdown && (
//         <div className="dropdown1">
//           <div className="dropdown-header">
//             <div className="dropdown-item1">Welcome</div>
//             <span className="close-icon" onClick={handleCloseClick}>&times;</span>
//           </div>
//           <p className="dropdown-item6">To access account and manage order</p>

//           {!isAuthenticated ? (
//             <button className="dropdown-item2">
//               <Link to="/login" className="dropdown-link1">Login</Link> / 
//               <Link to="/signup" className="dropdown-link">Signup</Link>
//             </button>
//           ) : (
//             <>
//               <Link to="/editprofile" className="dropdown-item3">Visit Profile</Link>
//               <br/>
//               <Link to="/wishlist" className="dropdown-item4">My Wishlist</Link>
//               <br/>
//               <Link to="/my-orders" className="dropdown-item7">My Orders</Link>
//               <br/>
//               <Link to="/manage-address" className="dropdown-item7">Manage Address</Link>
//             </>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Dropdown;
import React, { useState } from 'react';
import './Dropdown.css';
import { Link } from 'react-router-dom';
import icon2 from './images/icon2.png';
import icon2_white from './images/user-white.png';
import { useAuth } from './store/auth';

function Dropdown() {
  const [showDropdown, setShowDropdown] = useState(false);
  const { isAuthenticated, logout } = useAuth(); // Get isAuthenticated and logout from context

  const handleIconClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleCloseClick = () => {
    setShowDropdown(false);
  };

  return (
    <div>
      <div onClick={handleIconClick}>
        <div className='user-black'>
          <img 
            src={icon2} 
            alt="icon" 
            className="image" 
            style={{ cursor: 'pointer' }} 
          />
        </div>
        <div className='user-white'>
          <img 
            src={icon2_white} 
            alt="icon" 
            className="image" 
            style={{ cursor: 'pointer'}} 
          />
        </div>
      </div>

      {showDropdown && (
        <div className="dropdown1">
          <div className="dropdown-header">
            <div className="dropdown-item1">Welcome</div>
            <span className="close-icon" onClick={handleCloseClick}>&times;</span>
          </div>
          <p className="dropdown-item6">To access account and manage order</p>

          {!isAuthenticated ? (
            <button className="dropdown-item2">
              <Link to="/login" className="dropdown-link1">Login</Link><Link to="/login"> /</Link>
              <Link to="/signup" className="dropdown-link">Signup</Link>
            </button>
          ) : (
            <>
              <Link to="/editprofile" className="dropdown-item3">Visit Profile</Link>
              <br/>
              <Link to="/wishlist" className="dropdown-item4">My Wishlist</Link>
              <br/>
              <Link to="/my-orders" className="dropdown-item7">My Orders</Link>
              <br/>
              <Link to="/manage-address" className="dropdown-item7">Manage Address</Link>
              <br/>
              <button className="dropdown-item2" onClick={logout}>Logout</button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
