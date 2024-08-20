import React from 'react'
import './Header.css'
import pinterest from './images/PinterestLogo.png'
import instagram from './images/InstagramLogo.png'
import facebook from './images/FacebookLogo.png'
import XLogo from './images/XLogo.png'
import location from './images/location.png'
import logo from './images/image 7365.png'
import search from './images/search.png'
import heart from './images/Heart.png'
import heart_white from "./images/heart-white.png"

import icon2 from './images/icon2.png'
import icon3 from './images/icon3.png'
import icon3_white from './images/cart-white.png'
import { Link } from 'react-router-dom';
import Dropdown from './Dropdown'
import { FaBars } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons'; // Use this if thin is not available

const Header = () => {
  
  return (
    <>
       <div className='home-container'>
        <div className="blue-background" >
          <div className="images-container">
            <img src={pinterest} alt="Image 1" className="image"/>
            <img src={instagram} alt="Image 2" className="image" />
            <img src={facebook} alt="Image 3" className="image" />
            <img src={XLogo} alt="Image 4" className="image" />
          </div>
          <div style={{color:' #F3F3F3'}}  className="center-text">
            Free Shipping On All Us Orders Over Rs 499
          </div>
          <div className="locate-store">
            <img src={location} alt="Locate Icon" className="icon" />
            <span className='locate'>Locate Store</span>
          </div>
        </div>
      
      <div className="navbar-container">
      <div className="hamburger-container">
      <FaBars className="hamburger-icon absolute left-1 mr-[220px]"/> {/* Hamburger icon */}
    </div>
        <Link to='/' className="logo-container">
          <img src={logo} alt="Logo" className="logo"/>
        </Link>
        <div className="search-container mr-[-90px] md:mr-0">
          <img src={search} alt="Search Icon" className="search-icon"/>
          <input type="text" className="search-input" placeholder="Search product..." />
        </div>
        <div className="nav-img ml-28 md:ml-0">
          <Link to='/wishlist'>
            <div className='heart-black'>
            <img  src={heart} alt="heart" className="image"/>
            </div>
            <div className='heart-white'>
            <img src={heart_white} alt="heart" className="image"/>
             </div>
          </Link>
          
          <Dropdown/>
            <Link to='/cart'>
            <div className='cart-black'>
          <img src={icon3} alt="icon 3" className="image" />
        </div> 
        <div className='cart-white'>
          <img src={icon3_white} alt="icon 3" className="image" />
        </div> 
         </Link>
         

        </div>
      </div>
      </div>

    </>
  )
}

export default Header