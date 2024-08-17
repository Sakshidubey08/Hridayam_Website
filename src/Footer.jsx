import React from 'react';
import Frame from './images/image 7365.png';
import './Footer.css';
import { NavLink } from 'react-router-dom';
function Footer() {
    return (
        
        <footer className="footer1">
            <div className="container6">
                <div className="footer-section1">
                    <img className="footer-logo1" src={Frame} alt="Logo" />
                    <p className="footer-description1">
                        Hridayam combines passion and innovation to bring real to customers' business
                    </p>
                </div>
                <div className="footer-section1">
                    <h4 className="footer-title1">Contact</h4>
                    <div className="footer-contact1">
                        <i className="fas fa-map-marker-alt1"></i>
                        <p className="footer-address1">
                            B-405 Anmol Space Baikunth Dham,<br />
                            Khajrana Main Road<br />
                            Indore 452018
                        </p>
                    </div>
                </div>
                <div className="footer-section1">
                    <h4 className="footer-title1">Company</h4>
                    <ul className="footer-links1">
        <li>
          <NavLink to="/all-products" className="footer-link1">All Products</NavLink>
        </li>
        <li>
          <NavLink to="/about-us" className="footer-link1">About Us</NavLink>
        </li>
        <li>
          <NavLink to="/contact-us" className="footer-link1">Contact Us</NavLink>
        </li>
        <li>
          <NavLink to="/terms-and-conditions" className="footer-link1">Terms And Conditions</NavLink>
        </li>
        <li>
          <NavLink to="/privacy-policy" className="footer-link1">Privacy Policy</NavLink>
        </li>
        <li>
          <NavLink to="/refer-policy" className="footer-link1">Refer Policy</NavLink>
        </li>
      </ul>
                </div>
                <div className="footer-section1">
                    <h4 className="footer-title1">Help</h4>
                    <ul className="footer-links1">
                        <li><a href="mailto:Lorem@gmail.com" className="footer-link1">Lorem@gmail.com</a></li>
                        <li><a href="#" className="footer-link1">FAQ</a></li>
                    </ul>
                </div>
                <div className="footer-section1">
                    <h4 className="footer-title1">Product Categories</h4>
                    <ul className="footer-links1">
                        <li><a href="#" className="footer-link1">Acrylic Painting </a></li>
                        <li><a href="#" className="footer-link1">Laptop Bags</a></li>
                        <li><a href="#" className="footer-link1">Bottles</a></li>
                        <li><a href="#" className="footer-link1">Note Books</a></li>
                        <li><a href="#" className="footer-link1">T-Shirt</a></li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom1">
                <p>© 2024 All rights reserved by Bellway Infotech</p>
            </div>
        </footer>
    );
}

export default Footer;
