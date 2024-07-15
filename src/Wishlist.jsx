import React, { useContext } from 'react';
import { CartContext } from './CartContext';
import { FaTrash } from 'react-icons/fa'; // Import trash icon from react-icons/fa
import './Wishlist.css'; // Import your CSS file
import pinterest from './images/PinterestLogo.png';
import instagram from './images/InstagramLogo.png';
import facebook from './images/FacebookLogo.png';
import XLogo from './images/XLogo.png';
import location from './images/location.png';
import logo from './images/hridayam logo.png';
import search from './images/search.png';
import heart from './images/Heart.png';
import icon2 from './images/icon2.png';
import icon3 from './images/icon3.png';
import { Link } from 'react-router-dom';

import './Home.css'
const WishlistPage = () => {
  const { wishlistItems, removeFromWishlist, updateQuantity1 } = useContext(CartContext);

  const handleIncrement = (productId) => {
    const item = wishlistItems.find(item => item.id === productId);
    if (item) {
      updateQuantity1(productId, item.quantity + 1);
    }
  };

  const handleDecrement = (productId) => {
    const item = wishlistItems.find(item => item.id === productId);
    if (item && item.quantity > 1) {
      updateQuantity1(productId, item.quantity - 1);
    }
  };

  return (
    <>
    <div className="home-container">
        <div className="blue-background">
          <div className="images-container">
            <img src={pinterest} alt="Image 1" className="image" />
            <img src={instagram} alt="Image 2" className="image" />
            <img src={facebook} alt="Image 3" className="image" />
            <img src={XLogo} alt="Image 4" className="image" />
          </div>
          <div className="center-text">
            Free Shipping On All Us Orders Over Rs 499
          </div>
          <div className="locate-store">
            <img src={location} alt="Locate Icon" className="icon" />
            <span className='locate'>Locate Store</span>
          </div>
        </div>
      </div>
      <div className="navbar-container">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <div className="search-container">
          <img src={search} alt="Search Icon" className="search-icon" />
          <input type="text" className="search-input" placeholder="Search product..." />
        </div>
        <div className="nav-img">
          <img src={heart} alt="heart" className="image" />
          <Link to='/profile'>
            <img src={icon2} alt="icon" className="image" />
          </Link>
          <img src={icon3} alt="icon 3" className="image" />
        </div>
      </div>
    <div className="wishlist-page">
    

      {wishlistItems.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <table className="wishlist-table">
          <thead>
            <tr>
              <th>Select</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Product Image</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {wishlistItems.map(item => (
              <tr key={item.id}>
                <td><input type="checkbox" /></td>
                <td>{item.name}</td>
                <td>&#8377;{item.price}</td>
                <td>
                  <button onClick={() => handleDecrement(item.id)}>-</button>
                  {item.quantity}
                  <button onClick={() => handleIncrement(item.id)}>+</button>
                </td>
                <td>&#8377;{item.price * item.quantity}</td>
                <td><img src={item.image} alt={item.name} /></td>
                <td>
                  <button onClick={() => removeFromWishlist(item.id)}>
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    </>
  );
};

export default WishlistPage;
