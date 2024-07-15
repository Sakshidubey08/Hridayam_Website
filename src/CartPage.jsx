import React, { useContext } from 'react';
import { CartContext } from './CartContext';
import { FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './CartPage.css';
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
import Footer from './Footer';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);

  const handleIncrement = (productId) => {
    const item = cartItems.find(item => item.id === productId);
    updateQuantity(productId, item.quantity + 1);
  };

  const handleDecrement = (productId) => {
    const item = cartItems.find(item => item.id === productId);
    if (item.quantity > 1) {
      updateQuantity(productId, item.quantity - 1);
    }
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    // Add any other calculations for the total price, like tax or discounts, if applicable
    return subtotal;
  };

  if (cartItems.length === 0) {
    return <div>Your cart is empty</div>;
  }

  return (
    <>
      <div className="home-container">
        <div className="blue-background">
          <div className="images-container">
            <img src={pinterest} alt="Pinterest" className="image" />
            <img src={instagram} alt="Instagram" className="image" />
            <img src={facebook} alt="Facebook" className="image" />
            <img src={XLogo} alt="XLogo" className="image" />
          </div>
          <div className="center-text">
            Free Shipping On All Us Orders Over Rs 499
          </div>
          <div className="locate-store">
            <img src={location} alt="Locate Icon" className="icon" />
            <span className="locate">Locate Store</span>
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
          <Link to="/profile">
            <img src={icon2} alt="icon" className="image" />
          </Link>
          <img src={icon3} alt="icon 3" className="image" />
        </div>
      </div>
      <div className="cart-container">
        <table className="cart-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map(item => (
              <tr key={item.id}>
                <td>
                  <div
                    className="cart-item-image"
                    style={item.id.endsWith('_product1') ? {
                      width: `${item.borderSize.split(' ')[0] * 10}px`,
                      height: `${item.borderSize.split(' ')[2] * 10}px`,
                      border: `5px solid ${item.borderColor}`,
                    } : {}}
                  >
                    <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%' }} />
                  </div>
                  {item.name}
                </td>
                <td>&#8377;{item.price}</td>
                <td>
                  <button onClick={() => handleDecrement(item.id)}>-</button>
                  {item.quantity}
                  <button onClick={() => handleIncrement(item.id)}>+</button>
                </td>
                <td>&#8377;{item.price * item.quantity}</td>
                <td>
                  <button onClick={() => removeFromCart(item.id)}>
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="cart-summary">
        <h2 className="cart-total">Cart Total</h2>
        <div className="summary-box">
          <div className="summary-item1">
            <span>Subtotal</span>
            <span>&#8377;{calculateSubtotal()}</span>
          </div>
          <hr />
          <div className="summary-item2">
            <span>Total</span>
            <span>&#8377;{calculateTotal()}</span>
          </div>
        </div>
        <Link to="/checkout">
          <button className="proceed-checkout-btn">Proceed to Checkout</button>
        </Link>
      </div>
      <Footer />
    </>
  );
};

export default CartPage;
