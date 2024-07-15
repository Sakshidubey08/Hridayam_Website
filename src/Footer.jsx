import React from 'react';
import Frame from './images/image 7365.png';
import './Footer.css';

function Footer() {
    return (
        
        <footer className="footer">
            <div className="container">
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
                        <li><a href="#" className="footer-link">About Us</a></li>
                        <li><a href="#" className="footer-link">Contact Us</a></li>
                        <li><a href="#" className="footer-link">Terms And Condition</a></li>
                        <li><a href="#" className="footer-link">Privacy Policy</a></li>
                        <li><a href="#" className="footer-link">Refer Policy</a></li>
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
