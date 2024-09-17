import { useEffect, useState } from 'react';
import Frame from './images/image 7365.png';
import './Footer.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import Locationlogo from "./images/location.png"
import { NavLink } from 'react-router-dom';
function Footer() {
    const [menuItems, setMenuItems] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');
    const [giftingFor, setGiftingFor] = useState('');
    const [budgetPerGift, setBudgetPerGift] = useState('');
    const [quantityRequired, setQuantityRequired] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [showOther, setShowOther] = useState(false);
    const [showOther1, setShowOther1] = useState(false);
  
    const handleSelectChange1 = (e) => {
      if (e.target.value === 'other') {
        setShowOther1(true);
      } else {
        setShowOther1(false);
      }
      setBudgetPerGift(e.target.value);
    };
  
    const handleSelectChange = (e) => {
      if (e.target.value === 'other') {
        setShowOther(true);
      } else {
        setShowOther(false);
      }
      setQuantityRequired(e.target.value);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
         // Collect form data from state variables
         const formData = {
               first_name: firstName,
               last_name: lastName,
               phone_number: phoneNumber,
               email ,
               city,
               gifting_for: giftingFor,
               budget_per_gift: budgetPerGift,
               quantity_required: quantityRequired,
               message,
             };
     
         console.log("Form Data being sent:", formData);
     
         try {
           const response = await axios.post('https://api.hirdayam.com/api/enquirenow', formData);
     
           if (response.status === 200){
             // setSuccess(true);
             setIsModalOpen(false);
             
             // setFormData({ first_name: '', last_name: '', pho: '', message: '' });
           }
         } catch (error) {
             console.log(error.response.data.message)
         } finally {
           setLoading(false);
         }
       };
       
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
                                <NavLink to="/all-products?search=" className="footer-link1">All Products</NavLink>
                            </li>
                            <li>
                                <NavLink to="/about-us" className="footer-link1">About Us</NavLink>
                            </li>
                            <li>
                                <NavLink to=""  onClick={() => setIsModalOpen(true)}    className="footer-link1">Contact Us</NavLink>
                                {isModalOpen && (
  <div className="fixed z-20 inset-0 overflow-y-auto">
    <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
      <div className="fixed inset-0 transition-opacity">
        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
      <div
        className="inline-block align-bottom bg-white px-4 pt-5 pb-4 text-center overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
        style={{ maxWidth: '700px' }}
      >
        <div className="flex flex-col items-center justify-center">
          <h1
            className="leading-6 font-medium text-gray-900"
            style={{ fontFamily: 'Poppins', fontWeight: 'bolder', fontSize: '18px' }}
          >
            Talk to Our Experts
            <button
              type="button"
              className="absolute right-[-5.2rem] top-6 text-gray-500 hover:text-gray-700 focus:outline-none"
              onClick={() => setIsModalOpen(false)}
            >
              <FontAwesomeIcon icon={faTimes} size="lg" />
            </button>
          </h1>
          <div className="mt-6 w-full">
            <form className="w-full" onSubmit={handleSubmit}>
              <div className="flex flex-col space-y-4">
                <div className="flex space-x-4">
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="firstName"
                    name='first_name'
                    type="text"
                    placeholder="Enter Your First name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="lastName"
                    name='last_name'
                    type="text"
                    placeholder="Enter Your Last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
                <div className="flex space-x-4">
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    name='email'
                    placeholder="Enter Your Business Email Address*"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="phone"
                    name='phone_number'
                    type="text"
                    placeholder="Enter Your Phone number*"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                </div>
                <div className="flex space-x-4">
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="city"
                    name='city'
                    type="text"
                    placeholder="Enter your city*"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                  />
                  <select
                    className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="giftingFor"
                    name='gifting_for'
                    value={giftingFor}
                    onChange={(e) => setGiftingFor(e.target.value)}
                    required
                  >
                    <option value="">Gifting For *</option>
                    <option value="internalEmployees">Internal Employees</option>
                    <option value="clientsCustomers">Clients/Customers</option>
                    <option value="vipCeo">VIP/CEO</option>
                    <option value="others">Others</option>
                  </select>
                </div>
                <div className="flex space-x-4">
                  <select
                    className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="budget"
                    name='budget'
                    value={budgetPerGift}
                    onChange={handleSelectChange1}
                    required
                  >
                    <option value="">Budget Per Gift *</option>
                    <option value="0-500">₹0 - ₹500</option>
                    <option value="500-1000">₹500 -₹1000</option>
                    <option value="2000-5000">₹2000-₹5000</option>
                    <option value="5000-10000">₹5000-₹10000</option>
                    <option value="other">Other</option>
                  </select>

                  {showOther1 && (
                    <input
                      type="text"
                      className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                      id="other-budget"
                      name="other-budget"
                      placeholder="Please specify your budget"
                      value={budgetPerGift === 'other' ? '' : budgetPerGift}
                      onChange={(e) => setBudgetPerGift(e.target.value)}
                    />
                  )}
                  <select
                    className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="quantity-select"
                    name="quantity_required"
                    value={quantityRequired}
                    onChange={handleSelectChange}
                    required
                  >
                    <option value="">Quantity Required *</option>
                    <option value="10-50">10-50pcs</option>
                    <option value="50-100">50-100pcs</option>
                    <option value="100-200">100-200pcs</option>
                    <option value="200-300">200-300pcs</option>
                    <option value="other">Other</option>
                  </select>
                  {showOther && (
                    <input
                      type="text"
                      id="other-quantity"
                      name="other_quantity"
                      placeholder="Please specify"
                      className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                      value={quantityRequired === 'other' ? '' : quantityRequired}
                      onChange={(e) => setQuantityRequired(e.target.value)}
                    />
                  )}
                </div>
                <div className="w-full">
                  <textarea
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="wishingMessage"
                    name='message'
                    placeholder="Enter Your Message"
                    rows="2"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  ></textarea>
                </div>
              </div>
              <button
                type="submit"
                className="bg-[#23387A] w-full text-white font-medium py-3 px-4 rounded text-xs mt-6"
              >
                ENQUIRE NOW
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
)}
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
