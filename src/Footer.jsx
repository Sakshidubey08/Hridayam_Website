import React from 'react';
import Frame from './images/image 7365.png';
import './Footer.css';
import { NavLink } from 'react-router-dom';
function Footer() {
    return (
        
        <footer className="footer">
            <div className="container1">
                <div className="footer-section">
                    <img className="footer-logo" src={Frame} alt="Logo" />
                    <p className="footer-description">
                        Hridayam combines passion and innovation to bring real to customers' business
                    </p>
                </div>
                <div className="footer-section">
                    <h4 className="footer-title">Contact</h4>
                    <div className="footer-contact">
                        <i className="fas fa-map-marker-alt"></i>
                        <p className="footer-address">
                            B-405 Anmol Space Baikunth Dham,<br />
                            Khajrana Main Road<br />
                            Indore 452018
                        </p>
                    </div>
                </div>
                <div className="footer-section">
                    <h4 className="footer-title">Company</h4>
                    <ul className="footer-links">
        <li>
          <NavLink to="/all-products" className="footer-link">All Products</NavLink>
        </li>
        <li>
          <NavLink to="/about-us" className="footer-link">About Us</NavLink>
        </li>
        <li>
          <NavLink to="/contact-us" className="footer-link">Contact Us</NavLink>
        </li>
        <li>
          <NavLink to="/terms-and-conditions" className="footer-link">Terms And Conditions</NavLink>
        </li>
        <li>
          <NavLink to="/privacy-policy" className="footer-link">Privacy Policy</NavLink>
        </li>
        <li>
          <NavLink to="/refer-policy" className="footer-link">Refer Policy</NavLink>
        </li>
      </ul>
                </div>
                <div className="footer-section">
                    <h4 className="footer-title">Help</h4>
                    <ul className="footer-links">
                        <li><a href="mailto:Lorem@gmail.com" className="footer-link">Lorem@gmail.com</a></li>
                        <li><a href="#" className="footer-link">FAQ</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4 className="footer-title">Product Categories</h4>
                    <ul className="footer-links">
                        <li><a href="#" className="footer-link">Acrylic Painting </a></li>
                        <li><a href="#" className="footer-link">Laptop Bags</a></li>
                        <li><a href="#" className="footer-link">Bottles</a></li>
                        <li><a href="#" className="footer-link">Note Books</a></li>
                        <li><a href="#" className="footer-link">T-Shirt</a></li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <p>© 2024 All rights reserved by Bellway Infotech</p>
            </div>
        </footer>
    );
}

export default Footer;
