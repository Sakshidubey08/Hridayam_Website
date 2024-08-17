import pinterest from '../images/PinterestLogo.png'
import instagram from '../images/InstagramLogo.png'
import facebook from '../images/FacebookLogo.png'
import XLogo from '../images/XLogo.png'
import React, { useState, useContext,useEffect } from 'react';
import { CartContext } from '../CartContext';
import location from '../images/location.png'
import logo from '../images/hridayam logo.png'
import nike2 from '../images/nike2.png'
import nike3 from '../images/nike3.png'
import search from '../images/search.png'
import heart from '../images/Heart.png'
import icon2 from '../images/icon2.png'
import icon3 from '../images/icon3.png'
import { Link, useNavigate } from 'react-router-dom';
import image13 from '../images/image 13 (3).png'
import { FaShoppingCart, FaHeart } from 'react-icons/fa'; // Add react-icons
import image9 from '../images/image 13.png'
import image10 from '../images/image 14.png'
import image12 from '../images/image 13 (3).png'
import image24 from '../images/image25.png'
import '../Home.css'
import './Product3.css'
import Header from '../Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
const Product1 = () => {
  const { addToCart, addToWishlist } = useContext(CartContext);
  const navigate = useNavigate();

  const handleAddToCart = () => {
    let newRemainingQuantity = remainingQuantity;
  
    if (quantity > 0 && quantity <= remainingQuantity) {
      newRemainingQuantity = remainingQuantity - quantity;
  
      const productToAdd = {
        id: `${product.id}_${selectedColor}`,
        name: product.name,
        price: 1200,
        image: product.images[selectedColor]
      };
  
      addToCart(productToAdd, quantity);
  
      // Update localStorage and state
      localStorage.setItem('remainingQuantity', newRemainingQuantity);
      setRemainingQuantity(newRemainingQuantity);
  
      navigate('/cart');
    } else {
      alert("Insufficient stock!");
    }
  };
  // const [remainingQuantity, setRemainingQuantity] = useState(() => {
  //   const savedQuantity = localStorage.getItem('remainingQuantity');
  //   return savedQuantity ? parseInt(savedQuantity, 10) : 63; // Default to 36 if not found
  // });
   const [remainingQuantity, setRemainingQuantity] = useState(86);
  useEffect(() => {
    // Save remaining quantity to localStorage whenever it changes
    localStorage.setItem('remainingQuantity', remainingQuantity);
  }, [remainingQuantity]);
  const handleAddToWishlist = () => {
    const productToAdd = {
      id: selectedColor,
      name: product.name,
      price: 1200,
      image: product.images[selectedColor]
    };
    addToWishlist(productToAdd, quantity);
    navigate('/wishlist')
  };

  const [cards, setCards] = useState([
    { id: 1, imageUrl: image9, price: '&#8377;1,200', description: "Veneer Wall Light" },
    { id: 2, imageUrl: image10, price: '&#8377;4,200', description: "Brass Diya" },
    { id: 3, imageUrl: image12, price: '&#8377;800', description: "Structured Curved Bill Cap" },
    { id: 4, imageUrl: image13, price: '&#8377;499', description: "Personalized Notebooks" },

  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const product = {
    id: 'Product12',
    name: 'Men Plain Slim Fit Shirt',
    price: '&#8377;1,200',
    images: {
      black: image24, // Replace with your actual image paths
      gray: nike3,
      red: nike2,
      blue: 'path/to/blue-cap.jpg',
      brown: 'path/to/brown-cap.jpg',
    },
  };

  const [selectedColor, setSelectedColor] = useState('black');
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState('');
  const [isPincodeChecked, setIsPincodeChecked] = useState(false);
  const [checkButtonText, setCheckButtonText] = useState('Check');
  const [deliveryText, setDeliveryText] = useState({
    line1: "Please enter PIN code to check delivery time.",
    line2: "100% Original Products.",
    line3: "Try & Buy might be available.",
    line4: "Easy 14 days returns and exchanges."
  });

  const handleIncrement = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
    setRemainingQuantity(prevRemainingQuantity => Math.max(prevRemainingQuantity - 1, 0));
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
      
    }
  };
  const handlePincodeChange = (e) => {
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
  const [showLoadMore, setShowLoadMore] = useState(true);

  const handleLoadMore = () => {

    setCards(prevCards => [
      ...prevCards,
      { id: 9, imageUrl: image9, price: ' &#8377;45' },
      { id: 10, imageUrl: image9, price: '$55' },
      { id: 11, imageUrl: image9, price: '$70' },
      { id: 12, imageUrl: image9, price: '$80' },

    ]);
    setShowLoadMore(false);
  };

  return (
    <>
      <Header />
      <div className="product-detail">
        <div className="breadcrumb">Home / {product.name}</div>

        <div className="content">
          <div className='image2'>
            <img src={product.images[selectedColor]} alt="Product" className="product-image6 h-3/4" style={{ marginTop: '55px', marginLeft: '-32px' }} /></div>
          <div className="scrollable-content">
            <div className="product-info">
              <h1 className='product-name'>{product.name}</h1>
              <div className="quantity-box">
                {remainingQuantity} left
              </div>
              <p className="price" dangerouslySetInnerHTML={{ __html: product.price }}></p>
              <div className="wantmore" onClick={() => setIsModalOpen(true)}>Want More?</div>
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
                                  Email
                                </label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Your email" />
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
              )}

              <h3 className='selected'>Selected Quantity</h3>
              <div className="quantity-selector">
                <button onClick={handleDecrement} className="quantity-btn">-</button>
                <div className="quantity">{quantity}</div>
                <button onClick={handleIncrement} className="quantity-btn">+</button>
              </div>
              <h3>Free Delivery</h3>
              <div className="buttons">
                <button className="wishlist-btn" onClick={handleAddToWishlist}>
                  <span>Wishlist</span>
                  <FaHeart className="icon" />
                </button>
                <button className="cart-btn" onClick={handleAddToCart}        disabled={remainingQuantity === 0}>
                  <span>Add to Cart</span>
                  <FaShoppingCart className="icon" />
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
                <span className="delivery-line">{deliveryText.line2}</span>
                <br />
                <span className="delivery-line">{deliveryText.line3}</span>
                <br />
                <span className="delivery-line">{deliveryText.line4}</span>
              </p>

              <h3>Best Offer</h3>
              <p className="best-price">Best Price: &#8377;45</p>
              <ul className="offer-details">
                <li>Coupon code: <strong>Cloth123</strong></li>
                <li>Coupon Discount: &#8377;48 off (check cart for final savings)</li>
                <li>Applicable On: Orders above &#8377; (only on first purchase)</li>
              </ul>
              <h3>Product Details</h3>
              <p className='product'>This Season Set a Sporty Fashion Trend with the HRX Mens<br /> Athleisure Tshirt.This Striped Casual Tshirt can be worn on <br /> its own or layered under a jacket or hoodie.</p>
              <h3>Best Offer</h3>
              <ul className="offer-details">
                <li> Athleisure Tshirt can be paired with Tracks</li>
                <li>Style: round neck.</li>
                <li>Sleeves: Short sleeves</li>
                <li>Sleeves: Short sleeves</li>
                <li>Color: Teal</li>
                <li>Print: Geometric</li>
                <li>Fit:regular</li>
              </ul>
              <h3>Size</h3>
              <p className='product'>The Model (Height 6') is wearing a size M</p>
              <h3>Material & Care</h3>
              <p className='product'>100% Cotton</p>
              <p className='product'>Machine Wash</p>

            </div>
          </div>
        </div>
      </div>
      <div className='similar'>Similar Products</div>
      <div className="card-container">
        {cards.map(card => (
          <div key={card.id} className="card-wrapper"
            style={{ cursor: 'pointer' }}>
            <div className="card1">
              <div className="card-header">
                <img src={card.imageUrl} alt="product" style={{ height: card.height }} className="card-image1" />
              </div>
            </div>
            <div className="card-info">
              <p className="image-description">{card.description}</p>
              <p className='price'><span dangerouslySetInnerHTML={{ __html: card.price }} /></p>
            </div>
          </div>
        ))}
      </div>

      {showLoadMore && (
        <div className="load-more-container">
          <button className="load-more-btn" onClick={handleLoadMore}>
            Load More
          </button>
        </div>
      )}
    </>
  )
}

export default Product1


