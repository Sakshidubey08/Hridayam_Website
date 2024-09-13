import { useEffect, useState } from 'react';
import Frame from './images/image 7365.png';
import './Footer.css';
import { useNavigate } from 'react-router-dom';
import Locationlogo from "./images/location.png"
import { NavLink } from 'react-router-dom';
function Footer() {
    const [menuItems, setMenuItems] = useState([]);
    const handleCategoryClick = (category_id) => {
        navigate(`/category-products/${category_id}`); // Redirect to the products page with the selected category ID
    };
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://api.hirdayam.com/api/getcategoryuser');
                const result = await response.json();
                if (result.status) {
                    // Map the API data to setMenuItems
                    const categories = result.data.map(category => ({
                        id: category._id,
                        name: category.name,  // Category name from API
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
    }, []);
    return (

        <footer className="footer1">
            <div className="container6 ">

                <div className="footer-section1 md:mr-20 ">
                    <img className="footer-logo1" src={Frame} alt="Logo" />
                    <p className="footer-description1 ">
                        Hirdayam combines  passion and  innovation to bring real to customers' business
                    </p>
                </div>
                <div className='flex flex-wrap md:gap-8  pl-4 md:pl-0 '>
                    <div className="footer-section1 footer-section2 my-1">
                        <h4 className="footer-title1 md:mt-3  font-bold md:pl-4">Location</h4>
                        <div className="footer-contact1">
                            <i className="fas fa-map-marker-alt1"></i>
                            <p className="footer-address1 md:flex">
                                <span> <img className='h-8 w-8  object-contain' src={"https://cdn-icons-png.flaticon.com/512/535/535239.png"}></img></span>
                                B-405 Anmol Space Baikunth Dham,<br />
                                Khajrana Main Road<br />
                                Indore 452018
                            </p>
                        </div>
                    </div>
                    <div className="footer-section1 footer-section3 my-3">
                        <h4 className="footer-title1 font-bold">Company</h4>
                        <ul className="footer-links1">
                            <li>
                                <NavLink to="/all-products" className="footer-link1">All Products</NavLink>
                            </li>
                            <li>
                                <NavLink to="/about-us" className="footer-link1">About Us</NavLink>
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
                    <div className="footer-section1 footer-section4 my-3">
                        <h4 className="footer-title1 font-bold">Help</h4>
                        <ul className="footer-links1">
                            <li><a href="mailto:Lorem@gmail.com" className="footer-link1">Lorem@gmail.com</a></li>
                            <li><a href="#" className="footer-link1">FAQ</a></li>
                        </ul>
                    </div>
                    {/* <div className="footer-section1 footer-section5 my-3">
                    <h4 className="footer-title1 font-bold">Product Categories</h4>
                    <ul className="footer-links1">
                        <li><a href="#" className="footer-link1">Acrylic Painting </a></li>
                        <li><a href="#" className="footer-link1">Laptop Bags</a></li>
                        <li><a href="#" className="footer-link1">Bottles</a></li>
                        <li><a href="#" className="footer-link1">Note Books</a></li>
                        <li><a href="#" className="footer-link1">T-Shirt</a></li>
                    </ul>
                </div> */}
                    {/* <div className="footer-section1 footer-section5 my-3">
                        <h4 className="footer-title1 font-bold">Product Categories</h4>
                        <ul className="footer-links1" >
                            {menuItems.slice(0, 5).map((category) => (  // Limit to first 5 items
                                <li key={category.id} >
                                    <a href="#" className="footer-link1">{category.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div> */}
                    <div className="footer-section1 footer-section5 my-3">
      <h4 className="footer-title1 font-bold">Product Categories</h4>
      <ul className="footer-links1">
        {menuItems.slice(0, 5).map((category) => (  // Limit to first 5 items
          <li key={category.id}>
            <a 
              href="#" 
              className="footer-link1" 
              onClick={(e) => {
                e.preventDefault(); // Prevent default anchor behavior
                handleCategoryClick(category.id); // Navigate to the desired page
              }}
            >
              {category.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
                </div></div>
            <div className="footer-bottom1">
                <p>© 2024 All rights reserved by Bellway Infotech</p>
            </div>
        </footer>
    );
}

export default Footer;
