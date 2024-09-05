// import React, { useEffect, useState, useContext } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { useProductContext } from './context/Bestproduct';
// import { FaShoppingCart, FaHeart } from 'react-icons/fa';
// import Header from './Header';
// import './Products/Product1.css';
// import './Home.css';
// import { CartContext } from './CartContext';

// const API = "https://api.hirdayam.com/api/getlatestTrendUser";

// const Cardpage1 = () => {
//   const navigate = useNavigate();
//   const { addToCart } = useContext(CartContext);
//   const { getSingleProduct1, isSingleLoading, filteredCard } = useProductContext();
//   const { id } = useParams();
//   const [selectedImage2, setSelectedImage2] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [uploadMessage, setUploadMessage] = useState('');
//   const [pincode, setPincode] = useState('');
//   const [isPincodeChecked, setIsPincodeChecked] = useState(false);
//   const [file, setfile] = useState(null);
//   const [deliveryText, setDeliveryText] = useState({
//     line1: "Please enter PIN code to check delivery time.",
//     line2: "100% Original Products.",
//     line3: "Try & Buy might be available.",
//     line4: "Easy 14 days returns and exchanges."
//   });
//   const [checkButtonText, setCheckButtonText] = useState('Check');

//   const handleIncrement = () => setQuantity(prevQuantity => prevQuantity + 1);
//   const handleDecrement = () => setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));

//   const handleImageChange = (event) => {
//     const file = event.target.files[0];
//     setfile(file);
//     if (file) {
//       setTimeout(() => {
//         setSelectedImage2(URL.createObjectURL(file));
//         setUploadMessage('File uploaded successfully!');
//       }, 1000);
//     }
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

//   const handleImageClick = (images) => {
//     setSelectedImage(images);
//   };

//   useEffect(() => {
//     if (id) {
//       getSingleProduct1(API, id);
//     }
//   }, [id, getSingleProduct1]);

//   if (isSingleLoading) {
//     return <div>Loading...</div>;
//   }

//   if (!filteredCard || Object.keys(filteredCard).length === 0) {
//     return <div>No data available for the selected ID.</div>;
//   }

//   const { name, price, default_color_image, images, image } = filteredCard;
//   const mainImage = selectedImage || default_color_image || image ;
//   const handleAddToCart = () => {
//     // console.log(getSingleProduct.variations[0]+"new variation")
//     if (true) {
//       const productToAdd = {
//         id: id,
//         name: name,
//         price: price,
//         image: file,
//         color: filteredCard.colors[0],
//         variation: filteredCard.variations[0]

//       };

//       addToCart(productToAdd, quantity);
//       navigate('/cart');
//     }
//   };
//   return (
//     <>
//       <Header />
//       <div className="breadcrumb1">Home / {name || 'Product'}</div>
//       <div className="product-detail1 mt-1">
//         <div className="content">
//           <div className="image-gallery">
//             <div className="thumbnails">
//               {images.map((image, index) => (
//                 <img
//                   key={index}
//                   src={image}
//                   alt={`Thumbnail ${index + 1}`}
//                   onClick={() => handleImageClick(images)}
//                   className="thumbnail"
//                 />
//               ))}
//             </div>
//           </div>
//           <div className="main-image">
//             <img src={mainImage} alt="Selected" />
//           </div>


//           {/* Scrollable Content Section */}
//           <div className="scrollable-content4">
//             <div className="product-info">
//               <h1 className='product-name'>{name}</h1>
//               <p className="price1">&#8377;{price}</p>
//               <h3 className='selected1'>Selected Quantity</h3>
//               <div className="quantity-selector">
//                 <button onClick={handleDecrement} className="quantity-btn">-</button>
//                 <div className="quantity">{quantity}</div>
//                 <button onClick={handleIncrement} className="quantity-btn">+</button>
//               </div>
//               <br />
//               <div className={`${filteredCard?.product_type == "personalize" ? "block" : "hidden"}`}>
//                 <button
//                   onClick={() => document.getElementById('fileInput').click()}
//                   style={{
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     padding: '10px',
//                     borderRadius: '5px',
//                     cursor: 'pointer',
//                     border: '1px solid #ccc',
//                     background: '#23387A',
//                     color: 'white',
//                     fontFamily: 'Poppins'
//                   }}
//                 >
//                   {selectedImage2 ? (
//                     <img
//                       src={selectedImage2}
//                       alt="Selected"
//                       style={{
//                         width: '40px',
//                         height: '40px',
//                         marginRight: '10px',
//                       }}
//                     />
//                   ) : (
//                     'Select Photo'
//                   )}
//                 </button>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   id="fileInput"
//                   style={{ display: 'none' }}
//                   onChange={handleImageChange}
//                 />
//                 {uploadMessage && <p style={{ color: 'green', marginTop: '10px' }}>{uploadMessage}</p>}
//               </div>

//               <h3 className='free'>Free Delivery</h3>
//               <div className="buttons">
//                 <button className="wishlist-btn">
//                   <span>Wishlist</span>
//                   <FaHeart className="icon" />
//                 </button>
//                 <button onClick={handleAddToCart} className="cart-btn">
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
//                 <span>{deliveryText.line2}</span>
//                 <br />
//                 <span>{deliveryText.line3}</span>
//                 <br />
//                 <span className="delivery-line">{deliveryText.line4}</span>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Cardpage1;


import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useProductContext } from './context/Bestproduct';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';
import Header from './Header';
import './Products/Product1.css';
import './Home.css';
import { CartContext } from './CartContext';
import { text } from '@fortawesome/fontawesome-svg-core';

import Footer from './Footer';
import Loadingpage from './Loadingpage';
const API = "https://api.hirdayam.com/api/getlatestTrendUser";

const Cardpage1 = () => {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const { getSingleProduct1, isSingleLoading, filteredCard } = useProductContext();
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [uploadMessage, setUploadMessage] = useState('');
  const [pincode, setPincode] = useState('');
  const [isPincodeChecked, setIsPincodeChecked] = useState(false);
  const [file, setfile] = useState(null);
  const [personalizeText,setpersonalize]=useState("");
  const [deliveryText, setDeliveryText] = useState({
    line1: "Please enter PIN code to check delivery time.",
    line2: "100% Original Products.",
    line3: "Try & Buy might be available.",
    line4: "Easy 14 days returns and exchanges."
  });
  const [checkButtonText, setCheckButtonText] = useState('Check');

  const handleIncrement = () => setQuantity(prevQuantity => prevQuantity + 1);
  const handleDecrement = () => setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setfile(file);
    if (file) {
      setTimeout(() => {
        setSelectedImage(URL.createObjectURL(file));
        setUploadMessage('File uploaded successfully!');
      }, 1000);
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

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  useEffect(() => {
    if (id) {
      getSingleProduct1(API, id);
    }
  }, [id, getSingleProduct1]);

  if (isSingleLoading) {
    return <Loadingpage></Loadingpage> //<div>Loading...</div>;
  }

  if (!filteredCard || Object.keys(filteredCard).length === 0) {
    return <div>No data available for the selected ID.</div>;
  }

  const { name, price, default_color_image, images, image } = filteredCard;
  const mainImage = selectedImage || default_color_image || image;

  const handleAddToCart = () => {
    // console.log(getSingleProduct.variations[0]+"new variation")
    if (true) {
      const productToAdd = {
        id: id,
        name: name,
        price: price,
        image: file,
        color: filteredCard.colors[0],
        text:personalizeText,
        variation: filteredCard.variations[0]

      };
      if(file==null && filteredCard?.product_type=="personalize"){
        alert("Please Select Image")
      }
      else{
          addToCart(productToAdd, quantity);
      navigate('/cart');
      }
    
    }
  };

  return (
    <>
      <Header />
      <div className="breadcrumb1">Home / {name || 'Product'}</div>
      <div className="product-detail1 mt-1">
        <div className="content">
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
              <div className={`${filteredCard?.product_type === "personalize" ? "block" : "hidden"}`}>
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
                  {file ? (
                    <img
                      src={URL.createObjectURL(file)}
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
                  style={{ display: 'none' }}
                  onChange={handleImageChange}
                />
                                                <button  className="text rounded-md dialogs" onClick={() => document.getElementById('my_modal_4').showModal()} >
                            Add Text
                        </button>
                         {uploadMessage && <p style={{ color: 'green', marginTop: '10px' }}>{uploadMessage}</p>}
                          
                {/* {uploadMessage && <p style={{ color: 'green', marginTop: '10px' }}>{uploadMessage}</p>} */}
              </div>

              <div>{personalizeText}</div>
                        <dialog id="my_modal_4" className="modal">
                            <div className="modal-box">
                                <form method="dialog">
                                    {/* if there is a button in form, it will close the modal */}
                                    <button style={{ background: "transparent", color: "black" }} className="btn  btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                </form>

                                
                                <label style={{ paddingRight: "400px" }} className=' text-nowrap '>Add Text</label><br></br>
                                <input
                                onChange={(text)=>{setpersonalize(text.target.value)}}
                                    type='text'
                                    className='border w-96 mr-20 px-3 my-4 py-2 rounded-md'
                                    placeholder='Enter Your Text here'
                                     // Bind the state to the input value
                                     // Update state on change
                                />
                                

                                


                               
                            <div>

                                </div>

                                <form method="dialog" >
                                    {/* if there is a button in form, it will close the modal */}
                                    <button style={{ background: "", color: "" }} className="btn   w-full h-full  btn-outline btn-primary  ">Save</button>
                                </form>
                            </div>
                        </dialog>

              <h3 className='free'>Free Delivery</h3>
              <div className="buttons">
                <button className="wishlist-btn">
                  <span>Wishlist</span>
                  <FaHeart className="icon" />
                </button>
                <button onClick={handleAddToCart} className="cart-btn">
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
                <span>{deliveryText.line2}</span>
                <br />
                <span>{deliveryText.line3}</span>
                <br />
                <span className="delivery-line">{deliveryText.line4}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Cardpage1;

