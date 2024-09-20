import React, { useContext,useEffect, useState } from 'react'
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
import { Link, useNavigate } from 'react-router-dom';
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
import { CartContext } from './CartContext'
import axios from 'axios'
const Header = () => {
  const navigate = useNavigate();
  const { searchinput, handlesearch } = useContext(CartContext);
  const [searchinput2, setsearchinput2] = useState("");
  const [latestcoupon,setlatestcoupon]=useState("");
  const [searchdatatext,setsearchdatatext]=useState("");
  const clipboard = useClipboard({
    copiedTimeout: 9000,
  }

  );
  const handleSearch = (text) => {
    fetchsearchdatalist();
    setsearchinput2(text.target.value);
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      // Navigate to the 'All Products' page, passing search text as query param
      navigate(`/all-products?search=${searchinput2}`);
    }
  };

  useEffect(() => {

    const fetchData = async () =>{
      try {
        const response = await fetch('https://api.hirdayam.com/api/getcategoryuser');
        const result = await response.json();
        if (result.status) {
          // Map the API data to the desired format for Swiper
          const categories = result.data.map(category => ({
            id: category._id,
            heading: category.name,
            image: category.image,
          }));
          setMenuItems(categories);
        } else {
          console.error('Failed to fetch categories:', result.message);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchData();
    getcouponforuser();
  }, []);
  const [menuItems, setMenuItems] = useState([]);
  const [subcategories, setSubcategories] = useState({}); // Store subcategories by category ID
  const [dropdownOpen, setDropdownOpen] = useState(null); // Track which dropdown is open
  const handleHeadingClick = async (categoryId) => {
    setDropdownOpen(prev => (prev === categoryId ? null : categoryId)); // Toggle dropdown
    if (!subcategories[categoryId]) {
      try {
        const response = await fetch(`https://api.hirdayam.com/api/getSubCategoryByCategory?category_id=${categoryId}`);
        const result = await response.json();
        if (result.status) {
          setSubcategories(prev => ({
            ...prev,
            [categoryId]: result.data // Ensure this is an array of subcategory objects
          }));
        } else {
          console.error('Failed to fetch subcategories:', result.message);
        }
      } catch (error) {
        console.error('Error fetching subcategories:', error);
      }
    }
  };

  const handleSubcategoryClick = async (subCategoryId) => {
    navigate(`/sub-category-products/${subCategoryId}`); // Navigate to products page
  };


  const getcouponforuser = async () => {
    try {
        const response = await axios.get('https://api.hirdayam.com/api/getlatestcouponalways', {
            headers: {
                // 'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${token}`
            }
        });
        if (response && response.data && response.data.data) {
        let coupondata=response.data;
  
          setlatestcoupon(coupondata);
        
        
      
        console.log('Addres get success:', response.data);
        }
       
    } catch (error) {
        console.error('Error during couopnlistfor user submission:', error);

        if (error.response) {
            console.error('Server couponlistforuser responded with:', error.response.data);
            // setError(`Address submission failed: ${error.response.data.message || 'Unknown error'}`);
        } else {
            // setError('Address submission failed. Please try again.');
        }
    }
};

const fetchsearchdatalist = async () => {
  try {
      const response = await axios.get(`https://api.hirdayam.com/api/universalSearch?search_key=${searchinput2}`, {
          headers: {
              // 'Content-Type': 'application/json',
              // 'Authorization': `Bearer ${token}`
          }
      });
      if (response && response.data && response.data.data) {
      let searchhdata=response.data;

        setsearchdatatext(searchhdata);
      
      
    
      console.log('searchdaralist success:', response.data);
      }
     
  } catch (error){
      console.error('Error during searchdaralist user submission:', error);

      if (error.response) {
          console.error('searchdartalist:', error.response.data);
          // setError(`Address submission failed: ${error.response.data.message || 'Unknown error'}`);
      } else {
          // setError('Address submission failed. Please try again.');
      }
  }
};


// useEffect(() => {
//   fetchsearchdatalist();
// }, [])


  return (
    <>
      <div className='home-container'>
        <div className="blue-background">
          <div className="images-container">
          <a href='https://in.pinterest.com/' target='_blank' rel='noopener noreferrer'> <img src={pinterest} alt="Image 1" className="image"/></a> 
            {/* <img src={instagram} alt="Image 2" className="image"/> */}
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
  <img src={instagram} alt="Instagram" className="image" />
</a>

        <a href='https://www.facebook.com/' target='_blank' rel='noopener noreferrer'>   <img src={facebook} alt="Image 3" className="image"/></a> 
        <a href='https://x.com/' target='_blank' rel='noopener noreferrer'>       <img src={XLogo} alt="Image 4" className="image"/></a> 
          </div>
          <div style={{ color: ' #F3F3F3', fontFamily: 'Poppins',fontSize:'14px' }} className="center-text">
            Free Shipping On All Orders Over Rs 499
          </div>
          <div className="locate-store">
            <img src={location} alt="Locate Icon" className="icon" />
            <span className='locate'>Locate Store</span>
          </div>
        </div>

        <div className="navbar-container">
          <div className="hamburger-container">

            <div className="drawer z-50">
              <input id="my-drawer" type="checkbox" className="drawer-toggle" />
              <div className="drawer-content">
                {/* Page content here */}
                <label htmlFor="my-drawer" className=" drawer-button btn m-0 p-0 border-none "> <FaBars className="hamburger-icon   absolute left-1" /> {/* Hamburger icon */}</label>
              </div>
              <div className="drawer-side">
                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className=" bg-base-200  rounded-r-[2rem] text-base-content min-h-full w-72">
                  {/* Sidebar content here */}
                  <div className='flex  items-center px-4 justify-between bg-[#8A9DDD4D]/30 p-0 m-0 h-16 rounded-tr-[2rem]'>
                    <img src={logo} alt="Logo" className="logo" />
                    <div className='bg-black/40 text-white flex items-center justify-center rounded-full h-6 w-6 text-center drawer-overlay'>
                      <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay">x</label>
                    </div>
                  </div>

                  <div className='p-4'>
                    <img className=' rounded-md' src={latestcoupon&&latestcoupon.data?latestcoupon.data.image||"id not found":coming_soon}></img>
                    {/* <div>{latestcoupon&&latestcoupon.data?latestcoupon.data._id||"id not found":"dfd"}</div> */}
                  </div>
                  <div className='flex px-4 py-3'>
                    <div style={{ backgroundImage: `url(${couponsvg2})` }} className=' flex   items-center gap-3 justify-center bg-contain   bg-no-repeat h-16 w-9/12  '>
                      <div className='bg-gray-400 p-2 rounded-md'>
                        <img width={"20px"} src={couponsvg3}></img>
                      </div>
                      <div className='text-[10px]'>
                        <p className='font-bold'>Hirdayam Fashion</p>
                        <p>Redeem Coupon Save ₹200</p>
                      </div>
                    </div>
                    <div className=' bg-contain mb-2 bg-no-repeat bg-center w-4/12 items-center justify-center flex text-center' style={{ backgroundImage: `url(${couponsvg1})` }}>
                      <span className=' text-[8px] text-nowrap'>use code<br></br>
                        <input ref={clipboard.target} value={`${clipboard.copied ? 'Copied' : latestcoupon&&latestcoupon.data?latestcoupon.data.code:"dfd"}`} onClick={clipboard.copy} readOnly className="text-[8px] p-1 w-10 text-center  outline-none rounded-md cursor-copy bg-blue-900 text-white"></input>
                      </span>

                    </div>
                    
                  </div>
                  {/* <div className=' h-1 w-full  my-2 rounded-r-md dropdownline  bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'></div> */}
                  <Link to={"/Morecoupon"}>  <p className=' text-xs mx-5 underline cursor-pointer'>View more coupon</p></Link>

                  
                  <div> <div className=' bg-contain bg-fixed bg-left-top overflow-scroll bg-no-repeat w-full px-3 h-96' style={{ backgroundImage: `url(${dropdown_background})` }}>

                    {/* <img src={dropdown_background}></img> */}
                    {

                    menuItems.map((item,index)=>{

                    return(
                          
                    <details key={item._id} tabIndex={index} className="collapse full text-gray-500  collapse-arrow ">
                    
                      <summary onMouseEnter={() => handleHeadingClick(item.id)} className="collapse-title text-md font-bold "><sapn className="text-blue-800">{item.heading}</sapn></summary>
                      <div className="collapse-content text-black leading-10">
                      {dropdownOpen === item.id && subcategories[item.id] && (
              <div className="dropdown15">
                {subcategories[item.id].map((subCategory) =>(
                  <div
                    key={subCategory._id}
                    className=""
                    onClick={() => handleSubcategoryClick(subCategory._id)}
                  >
                    {subCategory.name}
                  </div>
                ))}
              </div>
            )}
                      </div>
                    </details>
                    )
                    })
                    }
              
             <div class="menu-headin text-blue-800 font-bold ml-4 mb-3">Acrylic Photoframe</div>

        
                  
                    <div className='ml-4 text-blue-800 font-bold'>Contact us</div>
                  </div>





                  </div>
                  <div className='bg-gray-200 gap-2 p-4  w-full my-10 flex items-center justify-center text-blue-800'>
                    <img src={mapsvg}></img>
                    Locate Store

                  </div>
                  <div className='flex  items-center justify-center gap-4 my-4'>
                    <img src={pinterestblue} alt="Image 1" className="image" />

                    <img src={instagramblue} alt="Image 2" className="image" />
                    <img src={facebookblue} alt="Image 3" className="image" />
                    <img src={XLogoblue} alt="Image 4" className="image" />
                  </div>





                </ul>

              </div>
            </div>
          </div>
          <Link to='/' className="logo-container">
            <img src={logo} alt="Logo" className="logo" />
          </Link>
         

          <div className="dropdown dropdown-bottom search-container hidden md:flex mr-[-130px] md:mr-0">
  {/* <div tabIndex={0} role="button" className="btn m-1">Click</div> */}
  <div tabIndex={0} role="button"  className="w-full flex  items-center justify-between">
            <img onClick={()=>{navigate(`/all-products?search=${searchinput2}`)}}  src={search} alt="Search Icon" className="search-icon" />
            
            <input
              onChange={handleSearch} // Call handleSearch on text input change
              onKeyPress={handleKeyPress} // Call handleKeyPress on key press
              type="search"
              className="search-input"
              placeholder="Search product..." />
              
              
          </div>
  <ul tabIndex={0} className={`${searchdatatext&&searchdatatext.data?(searchdatatext.data.catelogs.length<1&&searchdatatext.data.categories.length<1&&searchdatatext.data.products.length<1?"hidden":"block"):""} ${searchinput2.length==0?"hidden":"block"} dropdown-content  my-2 mr-10 menu bg-base-100 overflow-y-scroll h-96 scrollbar-none2  rounded-box  z-[5000] w-3/5 shadow`}>
  {/* <div>{searchdatatext&&searchdatatext.data?searchdatatext.data.products[0].name:"df"}</div>   */}
  <div className={`${searchdatatext&&searchdatatext.data?(searchdatatext.data.products.length<1?"hidden":"block"):""} ml-3 font-semibold`}>
  Products

  </div>
  
    {
       
      searchdatatext&&searchdatatext.data?searchdatatext.data.products.map((item,index)=>{
          return(
            <div key={index} onClick={()=>{navigate(`/similar/${item._id}`)}}>
            <li className=''>

            <a>
            <img className='h-9 w-9  object-contain ' src={item.image||"not fount"}></img>

            {item.name}</a></li>
            </div>
          )
      }):(<div className=' gap-3' >
      <li ><a className=' skeleton h-8 my-1'></a></li>
      <li ><a className=' skeleton h-8 my-1'></a></li>
      <li><a className=' skeleton h-8 my-1'></a></li>
      <li><a className=' skeleton h-8 my-1'></a></li>
      </div>)
    }

    <div className={`${searchdatatext&&searchdatatext.data?(searchdatatext.data.categories.length<1?"hidden":"block"):""} ml-3 font-semibold`}>Categories</div>
    {
       
      searchdatatext&&searchdatatext.data?searchdatatext.data.categories.map((item,index)=>{
          return(
            <div key={index} onClick={()=>{navigate(`/sub-category-products/${item._id}`)}} >
            <li className=''>

            <a>
            <img className='h-9 w-9  object-contain ' src={item.image||"not fount"}></img>

            {item.name}</a></li>
            </div>
          )
      }):(<div className=' gap-3' >
      <li ><a className=' skeleton h-8 my-1'></a></li>
      <li ><a className=' skeleton h-8 my-1'></a></li>
      <li><a className=' skeleton h-8 my-1'></a></li>
      <li><a className=' skeleton h-8 my-1'></a></li>
      </div>)
    }
   
    <div className={`${searchdatatext&&searchdatatext.data?(searchdatatext.data.catelogs.length<1?"hidden":"block"):""} ml-3 font-semibold`}>Catalog</div>

    {
      searchdatatext&&searchdatatext.data?searchdatatext.data.catelogs.map((item,index)=>{
          return(
            <div key={index} onClick={()=>{navigate(`/catalog/${item._id}`)}} >
            <li className=''>

            <a>
            <img className='h-9 w-9 object-contain' src={item.image||"not fount"}></img>

            {item.title}</a></li>
            </div>
          )
      }):(<div className=' gap-3' >
      <li ><a className=' skeleton h-8 my-1'></a></li>
      <li ><a className=' skeleton h-8 my-1'></a></li>
      <li><a className=' skeleton h-8 my-1'></a></li>
      <li><a className=' skeleton h-8 my-1'></a></li>
      </div>)
    }
  </ul>
</div>
         
          <div className="nav-img ml-1 gap-4  md:ml-0">
            <Link to='/wishlist'>
              <div className='heart-black'>
                <img src={heart} alt="heart" className="image" />
              </div>
              <div className='heart-white  '>
                <img src={heart_white} alt="heart" className="image  p-1" />
              </div>
            </Link>
            <Dropdown />
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