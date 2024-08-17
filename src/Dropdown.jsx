import React, { useState } from 'react';
import './Dropdown.css'
import { Link } from 'react-router-dom';

import icon2 from './images/icon2.png';
function App() {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleIconClick = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div>
      <div onClick={handleIconClick}>
      <img 
    src={icon2} 
    alt="icon" 
    className="image" 
    style={{ cursor: 'pointer' }} 
  />
      </div>

      {showDropdown && (
        <div className="dropdown1">
          <div className="dropdown-item1">Welcome</div>
          <p className="dropdown-item6">To access account and manage order</p>
          <button className="dropdown-item2"> <Link to="/login" className="dropdown-link1">Login</Link> / 
          <Link to="/signup" className="dropdown-link">Signup</Link></button>
          <br/>          <br/>

          <Link to="/editprofile" className="dropdown-item3">Visit Profile</Link>
          <br/>
          <Link to="/wishlist" className="dropdown-item4">My Wishlist</Link>
          <br/>
          <Link to="/my-orders" className="dropdown-item5">My Orders</Link>
        </div>
      )}
    </div>
  );
}

export default App;