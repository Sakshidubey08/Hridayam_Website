import React, { useEffect, useState ,useContext} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useProductContext } from './context/Bestproduct';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';
import Header from './Header';
import './Products/Product1.css';
import './Home.css';
import { CartContext } from './CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Footer from './Footer';
import Loadingpage from './Loadingpage';
const API = "https://api.hirdayam.com/api/getPreBook";
const SIMILAR_PRODUCTS_API = "https://api.hirdayam.com/api/getsimilarProducts";

const Cardpage1 = () => {
  const navigate=useNavigate();
  const { addToCart } = useContext(CartContext);
  const { getSingleProduct, isSingleLoading, filteredCard } = useProductContext();
  const { id } = useParams();
  const [selectedImage2, setSelectedImage2] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadMessage, setUploadMessage] = useState('');
  const [pincode, setPincode] = useState('');
  const [isPincodeChecked, setIsPincodeChecked] = useState(false);
  const [file ,setfile] =useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [personalizeText,setpersonalize]=useState("");
  const [similarProducts, setSimilarProducts] = useState([]);

  const [deliveryText, setDeliveryText] = useState({
    line1: "Please enter PIN code to check delivery time.",
    line2: "100% Original Products.",
    line3: "Try & Buy might be available.",
    line4: "Easy 14 days returns and exchanges."
  });
  const [checkButtonText, setCheckButtonText] = useState('Check');

  const handleIncrement = () => setQuantity(prevQuantity => prevQuantity + 1);
  const handleDecrement = () => setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  
  const handleImageChange = (event) =>{
    const file = event.target.files[0];
    setfile(file);
    if (file) {
      setTimeout(() =>{
        setSelectedImage2(URL.createObjectURL(file));
        setUploadMessage('File uploaded successfully!');
      }, 1000);
    }
  };

  const handlePincodeChange = (e) =>{
    const value = e.target.value;
    if (!isNaN(value)) {
      setPincode(value);
      setIsPincodeChecked(false);
      setDeliveryText({
        line1: "Please enter PIN code to check delivery time.",
        line2: "100% Original Products.",
        line3: "Try & Buy might be available.",
        line4: "Easy 14 days returns and exchanges."
      });
      setCheckButtonText('Check');
    }
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    quantity: '',
    message: ''
  });
  
 

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    // Collect form data from state variables
    const submissionData = {
      first_name: formData.name,
      email: formData.email,
      quantity_you_need: parseInt(formData.quantity, 10),
      message: formData.message,
      product_id: "66c044b2f2ce78c3b7eea7bb" // Replace with dynamic product_id as needed
    };

    console.log("Form Data being sent:", submissionData);

    try {
      const response = await axios.post('https://api.hirdayam.com/api/createprebookEnquiry', submissionData);

      if (response.status === 200){
        setSuccess(true);
        setIsModalOpen(false);
        setFormData({ name: '', email: '', quantity: '', message: '' });
      }
    } catch (error) {
      if (error.response) {
        console.error('Error response from server:', error.response.data);
        setError(error.response.data.message || 'Something went wrong. Please try again.');
      } else if (error.request) {
        console.error('No response received:', error.request);
        setError('No response from server. Please check your internet connection.');
      } else {
        console.error('Error setting up the request:', error.message);
        setError('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };
  const fetchSimilarProducts = async (productId) => {
    try {
      const response = await fetch(`${SIMILAR_PRODUCTS_API}?product_id=${productId}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
  
      // Log the full response to check its structure
      console.log('Full API response:', data);
  
      // Set similar products from data.data
      setSimilarProducts(data.data || []); // Ensure it's an array or fallback to an empty array
  
      // Log the similar products to ensure it's populated
      console.log('Similar products:', data.data);
    } catch (error) {
      console.error("Error fetching similar products: ", error);
    }
  };
  
  

  useEffect(() => {
    if (id) {
      fetchSimilarProducts(id);  // Passing `id` from useParams
    }
  }, [id]);
  const handlePincodeCheck = () => {
    if (pincode.trim() !== '') {
      setIsPincodeChecked(true);
      setDeliveryText({
        line2: "Get it by Mon 08",
        line3: "Pay on Delivery available.",
        line4: "Easy 14 days returns and exchanges."
      });
      setCheckButtonText('Change');
    }
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  useEffect(() =>{
    if (id){
      getSingleProduct(API, id);
    }
  }, [id, getSingleProduct]);

  if (isSingleLoading){
    return <Loadingpage></Loadingpage> //<div>Loading...</div>;
  }

  if (!filteredCard || Object.keys(filteredCard).length === 0){
    return <div>No data available for the selected ID.</div>;
  }
  

  const { name, price, default_color_image, images,image } = filteredCard;
  const mainImage = selectedImage || image;

  const handleAddToCart = () => {
    // console.log(getSingleProduct.variations[0]+"new variation")
    if (true) {
        const productToAdd ={
            id: id,
            name: name,
            price: price,
            image:  file,
            text:personalizeText,
            color:filteredCard.colors[0],
            variation:filteredCard.variations[0]
            
        };
         console.log(productToAdd)
         if(file==null && filteredCard?.product_type=="personalize"){
          alert("Please Select Image")
         }
         else{
           addToCart(productToAdd, quantity);
        navigate('/cart');
         }
       
    }
};
const handleProductClick = (productId) => {
  navigate(`/similar/${productId}`); 
};
  return (
    <>
      <Header />
      <div className="breadcrumb1">Home / {name || 'Product'}</div>
      <div className="product-detail1 mt-1">
        <div className="content">

          {/* Image Section */}
          {/* <div className="image-section">
            <div className="thumbnails">
              {images && images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className="thumbnail"
                  onClick={() => handleImageClick(img)}
                />
              ))}
            </div>
            <div className="main-image">
              <img src={image} alt={name}/>
            </div>
          </div> */}
          <div className="image-gallery">
            <div className="thumbnails">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  onClick={() => handleImageClick(img)}
                  className="thumbnail"
                />
              ))}
            </div>
          </div>
          <div className="main-image">
            <img src={mainImage} alt="Selected" />
          </div>
          {/* Scrollable Content Section */}
          <div className="scrollable-content4">
            <div className="product-info">
              <h1 className='product-name'>{name}</h1>
              <p className="price1">&#8377;{price}</p>
              <h3 className='selected1'>Selected Quantity</h3>
              <div className="quantity-selector">
                <button onClick={handleDecrement} className="quantity-btn">-</button>
                <div className="quantity">{quantity}</div>
                <button onClick={handleIncrement} className="quantity-btn">+</button>
              </div>
              <br />
              <div className={`${filteredCard?.product_type=="personalize"?"block":"hidden"}`}>
                <button
                  onClick={() => document.getElementById('fileInput').click()}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '10px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    border: '1px solid #ccc',
                    background: '#23387A',
                    color: 'white',
                    fontFamily: 'Poppins'
                  }}
                >
                  {selectedImage2 ? (
                    <img
                      src={selectedImage2}
                      alt="Selected"
                      style={{
                        width: '40px',
                        height: '40px',
                        marginRight: '10px',
                      }}
                    />
                  ) : (
                    'Select Photo'
                  )}
                </button>
                <input
                  type="file"
                  accept="image/*"
                  id="fileInput"
                  style={{ display: 'none'}}
                  onChange={handleImageChange}
                />
                {uploadMessage && <p style={{ color: 'green', marginTop: '10px' }}>{uploadMessage}</p>}
              </div>
              {/* <div className="wantmore" onClick={() => setIsModalOpen(true)}>Want More?</div>
              {isModalOpen && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                  <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                    <div className="fixed inset-0 transition-opacity">
                      <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                    </div>
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
                    <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                      <div className="sm:flex sm:items-start ">

                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left pl-20  ">
                          <h3 className="text-center leading-6 font-medium text-gray-900">
                            Contact Us
                          </h3>
                          <button
                type="button"
                className="absolute right-[-6rem]  top-[1rem] text-gray-500 hover:text-gray-700 focus:outline-none"
                onClick={() => setIsModalOpen(false)}
              >
                <FontAwesomeIcon icon={faTimes} size="lg" />
              </button>
                          <p className='text-center text-gray-400'>Pleas Enter Your valid Email Id</p>
                          <div className="mt-2">
                            <form>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                  Name
                                </label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Your name" />
                              </div>
                              <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                  Email
                                </label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Your email" />
                              </div>
                              <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                  Quantity you need
                                </label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="number" type="number" placeholder="Enter Quantity" />
                              </div>
                              <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                                  Message
                                </label>
                                <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="message" placeholder="Your message"></textarea>
                              </div>

                              <button type="button" className="bg-[#23387A] w-full   text-white font-bold py-2 px-4 rounded" onClick={() => setIsModalOpen(false)}>
                                Send
                              </button>


                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )} */}
              <div>
              
      <div className="wantmore" onClick={() => setIsModalOpen(true)}>Want More?</div>
      {isModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left pl-20">
                  <h3 className="text-center leading-6 font-medium text-gray-900">
                    Contact Us
                  </h3>
                  <button
                    type="button"
                    className="absolute right-[-6rem]  top-[1rem] text-gray-500 hover:text-gray-700 focus:outline-none"
                    onClick={() => setIsModalOpen(false)}
                  >
                    <FontAwesomeIcon icon={faTimes} size="lg" />
                  </button>
                  <p className='text-center text-gray-400'>Please Enter Your valid Email Id</p>
                  <div className="mt-2">
                    <form>
                      <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                          Name
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="name"
                          name="name"
                          type="text"
                          placeholder="Your name"
                          value={formData.name}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                          Email
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Your email"
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="quantity">
                          Quantity you need
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="quantity"
                          name="quantity"
                          type="number"
                          placeholder="Enter Quantity"
                          value={formData.quantity}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                          Message
                        </label>
                        <textarea
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="message"
                          name="message"
                          placeholder="Your message"
                          value={formData.message}
                          onChange={handleInputChange}
                        ></textarea>
                      </div>

                      <button
                        type="button"
                        className="bg-[#23387A] w-full text-white font-bold py-2 px-4 rounded"
                        onClick={handleSubmit}
                        disabled={loading}
                      >
                        {loading ? 'Sending...' : 'Send'}
                      </button>
                    </form>
                    {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
                    {success && <p className="text-green-500 mt-4 text-center">Prebook enquiry submitted successfully!</p>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
              <h3 className='free'>Free Delivery</h3>
              <div className="buttons">
                {/* <button className="wishlist-btn">
                  <span>Wishlist</span>
                  <FaHeart className="icon" />
                </button> */}
                <button onClick={handleAddToCart} className="cart-btn">
                  <span>Add to Cart</span>
                  <FaShoppingCart className="icon"/>
                </button>
              </div>
              <div className="pincode-checker">
                <input
                  type="text"
                  value={pincode}
                  onChange={handlePincodeChange}
                  placeholder="Enter Pincode"
                  className="pincode-input"
                />
                <button onClick={handlePincodeCheck} className="check-btn">
                  {checkButtonText}
                </button>
              </div>
              <p className="delivery-info">
                <span className="delivery-line1">{deliveryText.line1}</span>
                <br />
                <span>{deliveryText.line2}</span>
                <br />
                <span>{deliveryText.line3}</span>
                <br />
                <span className="delivery-line">{deliveryText.line4}</span>
              </p>
            </div>
          </div>
        </div>
        <h1 className='top ml-24'>Similar Products</h1>

        <div className="card-container">
          {similarProducts && similarProducts.length > 0 ? (
          similarProducts.map((product) => (
            <div  key={product._id} className="card-wrapper" style={{ cursor: 'pointer' }}>
              <div className="card1-product rounded-md">
                <div className="card-header w-36 h-56 md:h-72 md:w-full">
                  {/* <Link
                    to={`/card/${card.id}`}
                    className="card-link"
                    onClick={(e) => e.stopPropagation()} // Prevent click on Link from triggering card's default action
                  > */}
                    <div className='w-full h-full flex items-center' onClick={() => handleProductClick(product._id)}>
                      <img src={product.image} alt="product" className="card-image1 rounded-xl w-23 flex object-contain m-0 p-0" />
                    </div>
                  {/* </Link> */}
                  <button
                    className="favorite-btn m-2 md:m-0"
                  
                    style={{
                      cursor: 'pointer',
                      border: 'none',
                      background: 'none',
                      padding: '5px',
                    }}
                  >
                    {/* <i
                      className={`fa-heart ${wishlistItems.data.data.some(item => item.product._id === card.id) ? 'fas' : 'far'}`}
                      style={{ color: wishlistItems.data.data.some(item => item.product._id === card.id) ? 'red' : '#23387A', fontSize: '24px' }}
                    ></i> */}
                  </button>
                </div>
              </div>
              <div className="card-info">
                <p className="image-description">{product.name}</p>
                <p className='price'>&#8377;{product.price}</p>
              </div>
            </div>
         
        
           ) )
           ) : (
          <p>No similar products available.</p>
         )}
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Cardpage1;
