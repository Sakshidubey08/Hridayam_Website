import React from 'react'
import './Header.css'
import pinterest from './images/PinterestLogo.png'
import instagram from './images/InstagramLogo.png'
import facebook from './images/FacebookLogo.png'
import XLogo from './images/XLogo.png'
import pinterestblue from './images/PinterestLogoblue.svg'
import instagramblue from './images/InstagramLogoblue.svg'
import facebookblue from './images/FacebookLogoblue.svg'
import XLogoblue from './images/XLogoblue.svg'
import location from './images/location.png'
import logo from './images/image 7365.png'
import search from './images/search.png'
import heart from './images/Heart.png'
import heart_white from "./images/heart-white.png"
import coming_soon from "./images/coming-soon.png"
import icon2 from './images/icon2.png'
import icon3 from './images/icon3.png'
import icon3_white from './images/cart-white.png'
import { Link } from 'react-router-dom';
import couponsvg1 from "./images/couponcodesvg.svg"
import couponsvg2 from "./images/couponcodesvg2.svg"
import couponsvg3 from "./images/couponcodesvg1.svg"
import dropdown_background from "./images/dropdown-background.svg"
import mapsvg from "./images/mapsvg.svg"
import Dropdown from './Dropdown'
import { FaBars } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons'; // Use this if thin is not available
import { useClipboard } from 'use-clipboard-copy';
const Header = () => {
  const clipboard = useClipboard({
    copiedTimeout: 9000, 
  }

  );
  
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
          <div style={{color:' #F3F3F3',fontFamily:'Poppins'}}  className="center-text">
            Free Shipping On All Us Orders Over Rs 499
          </div>
          <div className="locate-store">
            <img src={location} alt="Locate Icon" className="icon" />
            <span className='locate'>Locate Store</span>
          </div>
        </div>
      
      <div className="navbar-container">
      <div className="hamburger-container">
     
      <div className="drawer z-50">
  <input id="my-drawer" type="checkbox" className="drawer-toggle"/>
  <div className="drawer-content">
    {/* Page content here */}
    <label htmlFor="my-drawer" className=" drawer-button btn m-0 p-0 border-none "> <FaBars className="hamburger-icon   absolute left-1"/> {/* Hamburger icon */}</label>
  </div>
  <div className="drawer-side">
    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
    <ul className=" bg-base-200  rounded-r-[2rem] text-base-content min-h-full w-72">
      {/* Sidebar content here */}
      <div className='flex  items-center px-4 justify-between bg-[#8A9DDD4D]/30 p-0 m-0 h-16 rounded-tr-[2rem]'>
      <img src={logo} alt="Logo" className="logo"/>
      <div className='bg-black/40 text-white flex items-center justify-center rounded-full h-6 w-6 text-center drawer-overlay'>
      <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay">x</label>
      </div>
      </div>

      <div className='p-4'>
        <img  src={coming_soon}></img>
      </div>
      <div className='flex px-4 py-3'>
        <div style={{backgroundImage:`url(${couponsvg2})`}} className=' flex   items-center gap-3 justify-center bg-contain   bg-no-repeat h-16 w-9/12  '>
          <div className='bg-gray-400 p-2 rounded-md '>
          <img width={"20px"} src={couponsvg3}></img>
          </div>
          <div className='text-[10px]'>
           <p className='font-bold'>Haridayam Fashion</p>
           <p>Download App . Save ₹200</p>
          </div>
        </div>
        <div  className=' bg-contain mb-2 bg-no-repeat bg-center w-4/12 items-center justify-center flex text-center'  style={{backgroundImage:`url(${couponsvg1})`}}>
           <span className=' text-[8px] text-nowrap'>use code<br></br>
           <input ref={clipboard.target} value={`${clipboard.copied ? 'Copied' : 'App 200'}`} onClick={clipboard.copy} readOnly   className="text-[8px] p-1 w-10 text-center  outline-none rounded-md cursor-copy bg-blue-900 text-white"></input>
           </span>
           
        </div>
      </div>
      <div> <div className=' bg-contain bg-fixed bg-left-top overflow-scroll bg-no-repeat w-full px-3 h-96' style={{backgroundImage:`url(${dropdown_background})`}}>
             
              {/* <img src={dropdown_background}></img> */}
              <details tabIndex={1} className="collapse full text-gray-500  collapse-arrow ">
  <summary className="collapse-title text-md font-bold "><sapn className="text-blue-800">Corporate Gifting</sapn></summary>
  <div className="collapse-content text-black leading-10">
     <ul>
        <li>Drinkware</li>
        <li>Handbag</li>
        <li>Chocolate</li>
        <li>Backpacks</li>
        <li>Smartwatches</li>
        <li>Branded apparel</li>
     </ul>
  </div>
</details>

<details tabIndex={2} className="collapse full text-gray-500  collapse-arrow ">
  <summary className="collapse-title text-md font-bold "><span className='text-blue-800 '>Home Decoration</span></summary>
  <div className="collapse-content leading-10 text-black">
     <ul className=' list-disc'>
        <li className=' font-bold'>Home Decor</li>
        <ul>
        <li>Wall Scenery</li>
        <li>Artificial Plants</li>
        <li>Sofas</li>
        <li>Pendulum Clocks</li>
        <li>Paper Hat</li>
        <li>LED Mirror</li>
        </ul>

        <li className=' font-bold'>Kitchen Decor</li>
        <ul>
        <li>Dinnerware Sits</li>
        <li>Coasters & Trivets</li>
        <li>Curtain</li>
        <li>Pendulum Clocks</li>
       
        </ul>

        <li className=' font-bold'>Table Decor</li>
        <ul>
        <li>Decorative Boxes</li>
        <li>Desk Organizers</li>
        <li>Pen Stands</li>
        <li>Bookends</li>
        <li>Accessory Holders</li>
        </ul>

        <li className=' font-bold'>Kids Decor</li>
        <ul>
        <li>Wall Shelves</li>
        <li>Clocks</li>
        <li>Wall Art</li>
        <li>Height Chart</li>
        <li>Book Ends</li>
        <li>Picture Frames</li>
        </ul>
       
        <li className=' font-bold'>Festival Decor</li>
        <ul>
        <li>Torans</li>
        <li>Rangolis</li>
        <li>Christmas Decoration</li>
       

        
        </ul>
     </ul>
  </div>
</details>

<details tabIndex={3} className="collapse full text-gray-500  collapse-arrow ">
  <summary className="collapse-title text-md font-bold  "><sapn className="text-blue-800">Birthday Celebration</sapn></summary>
  <div className="collapse-content leading-10 text-black">
     <ul>
        <li>Baloons</li>
        <li>Happy Birthday Banner</li>
        <li>Foil Curtain</li>
        <li>Cupcake Stands</li>
        <li>Paper Hat</li>
        <li>Decoration</li>
     </ul>
  </div>
</details>

<details tabIndex={4} className="collapse w-full text-gray-500  collapse-arrow ">
  <summary className="collapse-title text-md font-bold "><span className=' text-blue-800'>Acrylic Photoframe</span></summary>
  <div className="collapse-content  leading-10 text-black">

     <ul>
    
       <li>Acrylic Photoframe</li>
       
        <li><Link to={"./Acrylic3"} className=''>Water Color Photoframe</Link></li>
        
     </ul>
  </div>
</details>
 {/* <div className='ml-4 text-blue-800 font-bold'>Contact us</div> */}
    </div>
   

    
</div>
<div className='bg-gray-200 gap-2 p-4  w-full my-10 flex items-center justify-center text-blue-800'>
<img src={mapsvg}></img>
Locate Store

</div>
<div className='flex  items-center justify-center gap-4 my-4'>
           <img src={pinterestblue} alt="Image 1" className="image"/>
            
            <img src={instagramblue} alt="Image 2" className="image" />
            <img src={facebookblue} alt="Image 3" className="image" />
            <img src={XLogoblue} alt="Image 4" className="image" />
</div>




     
    </ul>
    
  </div>
</div>
    </div>
        <Link to='/' className="logo-container">
          <img src={logo} alt="Logo" className="logo"/>
        </Link>
        <div className="search-container hidden md:flex mr-[-130px] md:mr-0">
          <img src={search} alt="Search Icon" className="search-icon"/>
          <input type="text" className="search-input" placeholder="Search product..." />
        </div>
        <div className="nav-img ml-1 gap-4  md:ml-0">
          <Link to='/wishlist'>
            <div className='heart-black'>
            <img  src={heart} alt="heart" className="image"/>
            </div>
            <div className='heart-white  '>
            <img   src={heart_white} alt="heart" className="image  p-1"/>
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