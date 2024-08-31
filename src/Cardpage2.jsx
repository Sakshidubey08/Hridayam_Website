import React, { useState, useContext } from 'react';
import { CartContext } from './CartContext';
import { WishlistContext } from './WishlistContext';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaHeart } from 'react-icons/fa'; // Add react-icons
import Header from './Header';
import './Home.css';
import './Cardpage2.css';

const Cardpage2 = () => {
  const { addToCart } = useContext(CartContext);
  const { addToWishlist } = useContext(WishlistContext);

  const navigate = useNavigate();

  const product = { 
    id: '66ae0c2e795b91923f1e0a46',
    name: 'Tea Mug',
    price: 400.00,
    images: {
      default: 'http://91.108.104.122/uploads/product_images/image-1722682413430-233746251.png',
      additional: [
        'undefineduploads/product_images/default_color_images-1721820074546-747327987.png',
        'undefineduploads/product_images/image-1721820074546-422664922.png',
        'undefineduploads/product_images/images-1721820074546-38473470.png'
      ]
    },
  };

  const [selectedColor, setSelectedColor] = useState('default');
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
  };

  const handleDecrement = () => {
    setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
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

  const handleAddToCart = () => {
    const productToAdd = {
      cart_id: "66a2482e4323fdc35ad418e6",
      id: product.id,
      product_color_id: "66a0e3aac6daab55cbbd6d1b",
      product_variation_id: "66a0e3aac6daab55cbbd6d19",
      user_id: "6697a31f3344136bd4364461",
      price: product.price
    };
    console.log('Adding to cart:', productToAdd);
    addToCart(productToAdd, quantity);
    navigate('/cart');
  };
  

  const handleAddToWishlist = () => {
    const productToAdd = {
      id: product.id,
      name: product.name,
      price: product.price, 
      image: product.images.additional[0]
    };
    addToWishlist(productToAdd);
    navigate('/wishlist');
  };

  const [cards, setCards] = useState([
    { id: 1, imageUrl: 'path/to/image1.jpg', price: '&#8377;1,200', description: "Veneer Wall Light" },
    { id: 2, imageUrl: 'path/to/image2.jpg', price: '&#8377;4,200', description: "Brass Diya" },
    { id: 3, imageUrl: 'path/to/image3.jpg', price: '&#8377;800', description: "Structured Curved Bill Cap" },
    { id: 4, imageUrl: 'path/to/image4.jpg', price: '&#8377;499', description: "Personalized Notebooks" },
  ]);

  const [showLoadMore, setShowLoadMore] = useState(true);

  const handleLoadMore = () => {
    setCards(prevCards => [
      ...prevCards,
      { id: 9, imageUrl: 'path/to/image5.jpg', price: '&#8377;45', description: 'New Product' },
      { id: 10, imageUrl: 'path/to/image6.jpg', price: '&#8377;55', description: 'New Product' },
      { id: 11, imageUrl: 'path/to/image7.jpg', price: '&#8377;70', description: 'New Product' },
      { id: 12, imageUrl: 'path/to/image8.jpg', price: '&#8377;80', description: 'New Product' },
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
            <img src={product.images[selectedColor]} alt="Product" className="product-image2" />
          </div>
          <div className="scrollable-content">
            <div className="product-info">
              <h1 className='product-name'>{product.name}</h1>
              <p className="price">&#8377;{product.price}</p>
              <h3 className='product-name'>Colors</h3>
              <div className="colors">
                {Object.keys(product.images).map(color => (
                  <div
                    key={color}
                    className="color-circle"
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedColor(color)}
                  />
                ))}
              </div>
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
                <button className="cart-btn" onClick={handleAddToCart}>
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
                <li>Coupon Discount:<br/> &#8377;48 off (check cart for final savings)</li>
                <li>Applicable On: Orders above <br/> &#8377;500 (only on first purchase)</li>
              </ul>
              <h3>Product Details</h3>
              <p className='product'>This sweatshirt is amazing with great features.</p>
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
          <div key={card.id} className="card-wrapper" style={{ cursor: 'pointer' }}>
            <div className="card1">
              <div className="card-header">
                <img src={card.imageUrl} alt="product" style={{ height: card.height }} className="card-image1" />
              </div>
            </div>
            <div className="card-info">
              <p className="description" dangerouslySetInnerHTML={{ __html: card.price }}></p>
              <p className="description">{card.description}</p>
            </div>
          </div>
        ))}
      </div>
      {showLoadMore && <button onClick={handleLoadMore} className="load-more">Load More</button>}
    </>
  );
};

export default Cardpage2;
// import React, { useState, useContext } from 'react';
// import { CartContext } from './CartContext';
// import { useNavigate } from 'react-router-dom';
// import { FaShoppingCart, FaHeart } from 'react-icons/fa';
// import Header from './Header';
// import './Home.css';
// import './Cardpage2.css';

// const Cardpage2 = () => {
//   const { addToCart, addToWishlist } = useContext(CartContext);
//   const navigate = useNavigate();

//   const product = { 
//     _id: '66a0e3aac6daab55cbbd6d1d',
//     name: 'sweatshirt',
//     price: '400.00',
//     default_color_image: 'undefineduploads/product_images/default_color_image-1721820074545-540767157.png',
//     default_color_images: [
//       'undefineduploads/product_images/default_color_images-1721820074546-747327987.png',
//       'undefineduploads/product_images/image-1721820074546-422664922.png',
//       'undefineduploads/product_images/images-1721820074546-38473470.png'
//     ],
//     colors: ['66a0e3aac6daab55cbbd6d1b'],
//     variations: ['66a0e3aac6daab55cbbd6d19'],
//     numericPrice: 400,
//   };

//   const [selectedColor, setSelectedColor] = useState('default');
//   const [quantity, setQuantity] = useState(1);
//   const [pincode, setPincode] = useState('');
//   const [isPincodeChecked, setIsPincodeChecked] = useState(false);
//   const [checkButtonText, setCheckButtonText] = useState('Check');
//   const [deliveryText, setDeliveryText] = useState({
//     line1: "Please enter PIN code to check delivery time.",
//     line2: "100% Original Products.",
//     line3: "Try & Buy might be available.",
//     line4: "Easy 14 days returns and exchanges."
//   });

//   const handleIncrement = () => {
//     setQuantity(prevQuantity => prevQuantity + 1);
//   };

//   const handleDecrement = () => {
//     setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
//   };

//   const handlePincodeChange = (e) => {
//     const value = e.target.value;
//     if (!isNaN(value)) {
//       setPincode(value);
//       setIsPincodeChecked(false);
//       setDeliveryText({
//         line1: "Please enter PIN code to check delivery time.",
//         line2: "100% Original Products.",
//         line3: "Try & Buy might be available.",
//         line4: "Easy 14 days returns and exchanges."
//       });
//       setCheckButtonText('Check');
//     }
//   };

//   const handlePincodeCheck = () => {
//     if (pincode.trim() !== '') {
//       setIsPincodeChecked(true);
//       setDeliveryText({
//         line2: "Get it by Mon 08",
//         line3: "Pay on Delivery available.",
//         line4: "Easy 14 days returns and exchanges."
//       });
//       setCheckButtonText('Change');
//     }
//   };

//   const handleAddToCart = () => {
//     const productToAdd = {
//       _id: product._id,
//       product_color_id: product.colors[0],
//       product_variation_id: product.variations[0],
//       user_id: "6697a31f3344136bd4364461",
//       numericPrice: product.numericPrice
//     };
//     addToCart(productToAdd, quantity);
//     navigate('/cart');
//   };

//   const handleAddToWishlist = () => {
//     const productToAdd = {
//       name: product.name,
//       price: product.price, 
//       image: product.default_color_images[0]
//     };
//     addToWishlist(productToAdd, quantity);
//     navigate('/wishlist');
//   };

//   const [cards, setCards] = useState([
//     { id: 1, imageUrl: 'path/to/image1.jpg', price: '&#8377;1,200', description: "Veneer Wall Light" },
//     { id: 2, imageUrl: 'path/to/image2.jpg', price: '&#8377;4,200', description: "Brass Diya" },
//     { id: 3, imageUrl: 'path/to/image3.jpg', price: '&#8377;800', description: "Structured Curved Bill Cap" },
//     { id: 4, imageUrl: 'path/to/image4.jpg', price: '&#8377;499', description: "Personalized Notebooks" },
//   ]);

//   const [showLoadMore, setShowLoadMore] = useState(true);

//   const handleLoadMore = () => {
//     setCards(prevCards => [
//       ...prevCards,
//       { id: 9, imageUrl: 'path/to/image5.jpg', price: '&#8377;45', description: 'New Product' },
//       { id: 10, imageUrl: 'path/to/image6.jpg', price: '&#8377;55', description: 'New Product' },
//       { id: 11, imageUrl: 'path/to/image7.jpg', price: '&#8377;70', description: 'New Product' },
//       { id: 12, imageUrl: 'path/to/image8.jpg', price: '&#8377;80', description: 'New Product' },
//     ]);
//     setShowLoadMore(false);
//   };

//   return (
//     <>
//       <Header />
//       <div className="product-detail">
//         <div className="breadcrumb">Home / {product.name}</div>
//         <div className="content">
//           <div className='image2'>
//             <img src={product.default_color_image} alt="Product" className="product-image2" />
//           </div>
//           <div className="scrollable-content">
//             <div className="product-info">
//               <h1 className='product-name'>{product.name}</h1>
//               <p className="price">&#8377;{product.price}</p>
//               <h3 className='product-name'>Colors</h3>
//               <div className="colors">
//                 {product.colors.map(color => (
//                   <div
//                     key={color}
//                     className="color-circle"
//                     style={{ backgroundColor: color }}
//                     onClick={() => setSelectedColor(color)}
//                   />
//                 ))}
//               </div>
//               <h3 className='selected'>Selected Quantity</h3>
//               <div className="quantity-selector">
//                 <button onClick={handleDecrement} className="quantity-btn">-</button>
//                 <div className="quantity">{quantity}</div>
//                 <button onClick={handleIncrement} className="quantity-btn">+</button>
//               </div>
//               <h3>Free Delivery</h3>
//               <div className="buttons">
//                 <button className="wishlist-btn" onClick={handleAddToWishlist}>
//                   <span>Wishlist</span>
//                   <FaHeart className="icon" />
//                 </button>
//                 <button className="cart-btn" onClick={handleAddToCart}>
//                   <span>Add to Cart</span>
//                   <FaShoppingCart className="icon" />
//                 </button>
//               </div>
//               <div className="pincode-checker">
//                 <input
//                   type="text"
//                   value={pincode}
//                   onChange={handlePincodeChange}
//                   placeholder="Enter Pincode"
//                   className="pincode-input"
//                 />
//                 <button onClick={handlePincodeCheck} className="check-btn">
//                   {checkButtonText}
//                 </button>
//               </div>
//               <p className="delivery-info">
//                 <span className="delivery-line1">{deliveryText.line1}</span>
//                 <br />
//                 <span className="delivery-line">{deliveryText.line2}</span>
//                 <br />
//                 <span className="delivery-line">{deliveryText.line3}</span>
//                 <br />
//                 <span className="delivery-line">{deliveryText.line4}</span>
//               </p>
//               <h3>Best Offer</h3>
//               <p className="best-price">Best Price: &#8377;45</p>
//               <ul className="offer-details">
//                 <li>Coupon code: <strong>Cloth123</strong></li>
//                 <li>Coupon Discount: &#8377;48 off (check cart for final savings)</li>
//                 <li>Applicable On: Orders above &#8377;500 (only on first purchase)</li>
//               </ul>
//               <h3>Product Details</h3>
//               <p className='product'>This sweatshirt is amazing with great features.</p>
//               <h3>Size</h3>
//               <p className='product'>The Model (Height 6') is wearing a size M</p>
//               <h3>Material & Care</h3>
//               <p className='product'>100% Cotton</p>
//               <p className='product'>Machine Wash</p>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className='similar'>Similar Products</div>
//       <div className="cards2">
//         {cards.map(card => (
//           <div key={card.id} className="card">
//             <img src={card.imageUrl} alt={card.description} className="card-image" />
//             <p className="card-price" dangerouslySetInnerHTML={{ __html: card.price }} />
//             <p className="card-description">{card.description}</p>
//           </div>
//         ))}
//       </div>
//       {showLoadMore && (
//         <div className="load-more">
//           <button onClick={handleLoadMore} className="load-more-btn">Load More</button>
//         </div>
//       )}
//     </>
//   );
// };

// export default Cardpage2;
