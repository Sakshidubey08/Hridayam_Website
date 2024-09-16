
import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useProductContext } from './context/Bestproduct';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';
import Header from './Header';
import './Products/Product1.css';
import Footer from './Footer';
import './Home.css';
import { CartContext } from './CartContext';
import Loadingpage from './Loadingpage';

const API = "https://api.hirdayam.com/api/getbestsellingproduct";
const SIMILAR_PRODUCTS_API = "https://api.hirdayam.com/api/getsimilarProducts";

const Cardpage1 = () => {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const { getSingleProduct, isSingleLoading, filteredCard } = useProductContext();
  const { id } = useParams();
    const [similarProducts, setSimilarProducts] = useState([]);

  const [selectedImage2, setSelectedImage2] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadMessage, setUploadMessage] = useState('');
  const [pincode, setPincode] = useState('');
  const [personalizeText,setpersonalize]=useState("");
  const [isPincodeChecked, setIsPincodeChecked] = useState(false);
  const [file, setfile] = useState(null);
  const [deliveryText, setDeliveryText] = useState({
    line1: "Please enter PIN code to check delivery time.",
    line2: "100% Original Products.",
    line3: "Try & Buy might be available.",
    line4: "Easy 14 days returns and exchanges."
  });
  const [checkButtonText, setCheckButtonText] = useState('Check');

  const handleIncrement = () => {
    if(quantity<filteredCard.stock){
    setQuantity(prevQuantity => prevQuantity + 1);
    }

  }
  const handleDecrement = () => {
    if(quantity<filteredCard.stock){
      setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1))
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setfile(file);
    if (file) {
      setTimeout(() => {
        setSelectedImage2(URL.createObjectURL(file));
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

  useEffect(() => {
    if (id) {
      getSingleProduct(API, id);
    }
  }, [id, getSingleProduct]);

  if (isSingleLoading) {
    return <Loadingpage></Loadingpage> //<div>Loading...</div>;
  }

  if (!filteredCard || Object.keys(filteredCard).length === 0) {
    return <div>No data available for the selected ID.</div>;
  }

  const { name, price, default_color_image, images, image,product_details,features } = filteredCard;
  const mainImage = selectedImage || image;


  const handleAddToCart = () => {
    // console.log(getSingleProduct.variations[0]+"new variation")
    if (true) {
      const productToAdd = {
        id: id,
        name: name,
        price: price,
        image: file,
        text:personalizeText,
        color: filteredCard.colors[0],
        variation: filteredCard.variations[0]

      };
      if(filteredCard.stock==0){
        alert("Product is out of stock");
        return;
      }
      if(file==null && filteredCard?.product_type=="personalize"){
          alert("Please Select a Image")
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
              <div className={`${filteredCard?.product_type == "personalize" ? "block" : "hidden"}`}>
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

              

              {/* <h3 className='free'>Free Delivery</h3> */}
              <div className="buttons">
                {/* <button className="wishlist-btn">
                  <span>Wishlist</span>
                  <FaHeart className="icon" />
                </button> */}
                <button onClick={handleAddToCart} className="cart-btn">
                  <span>Add to Cart</span>
                  <FaShoppingCart className="icon" />
                </button>
              </div>
              {/* <div className="pincode-checker">
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
              </p> */}
              <h3 className='offer mt-4'>Product Details</h3>
              <p className='product'>{product_details}</p>
              <h3 className='offer mt-2'>Features</h3>
              <ul className="offer-details">
                {/* <li> Athleisure Tshirt can be paired with Tracks</li>
                <li>Style: round neck.</li>
                <li>Sleeves: Short sleeves</li>
                <li>Sleeves: Short sleeves</li>
                <li>Color: Teal</li>
                <li>Print: Geometric</li>
                <li>Fit:regular</li> */}
                 {features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                     ))}
              </ul>
            </div>
          </div>
        </div>
        {/* <div className="similar-products-list">
          {similarProducts && similarProducts.length > 0 ? (
             similarProducts.map((product) => (
           <div  key={product._id} className="similar-product-card">
           <img src={product.image} alt={product.name} />
           <p>{product.name}</p>
           <p>&#8377;{product.price}</p>
        </div>
           ) )
        ) : (
        <p>No similar products available.</p>
          )}
        </div>  */}
      <h1 className='top ml-24'>Similar Products</h1>

        <div className="card-container">
          {similarProducts && similarProducts.length > 0 ? (
          similarProducts.map((product) => (
            <div  key={product._id} className="card-wrapper" style={{ cursor: 'pointer' }}>
              <div className="card1-product rounded-md">
                <div className="card-header w-36 h-56 md:h-72 md:w-full">
                    <div className='w-full h-full flex items-center' onClick={() => handleProductClick(product._id)}>
                      <img src={product.image} alt="product" className="card-image1 rounded-xl w-23 flex object-contain m-0 p-0" />
                    </div>
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
// import React, { useEffect, useState, useContext } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { useProductContext } from './context/Bestproduct';
// import { FaShoppingCart, FaHeart } from 'react-icons/fa';
// import Header from './Header';
// import './Products/Product1.css';
// import Footer from './Footer';
// import './Home.css';
// import { CartContext } from './CartContext';
// import Loadingpage from './Loadingpage';

// const API = "https://api.hirdayam.com/api/getbestsellingproduct";
// const SIMILAR_PRODUCTS_API = "https://api.hirdayam.com/api/getsimilarProducts";

// const Cardpage1 = () => {
//   const navigate = useNavigate();
//   const { addToCart } = useContext(CartContext);
//   const { getSingleProduct, isSingleLoading, filteredCard } = useProductContext();
//   const { id } = useParams();
//   const [similarProducts, setSimilarProducts] = useState([]);
//   const [selectedImage2, setSelectedImage2] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [uploadMessage, setUploadMessage] = useState('');
//   const [pincode, setPincode] = useState('');
//   const [personalizeText, setpersonalize] = useState("");
//   const [isPincodeChecked, setIsPincodeChecked] = useState(false);
//   const [file, setfile] = useState(null);
//   const [deliveryText, setDeliveryText] = useState({
//     line1: "Please enter PIN code to check delivery time.",
//     line2: "100% Original Products.",
//     line3: "Try & Buy might be available.",
//     line4: "Easy 14 days returns and exchanges."
//   });
//   const [checkButtonText, setCheckButtonText] = useState('Check');

//   // Increment and decrement quantity
//   const handleIncrement = () => setQuantity(prevQuantity => prevQuantity + 1);
//   const handleDecrement = () => setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));

//   // Handle image upload
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

//   // Handle pincode input
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

//   const handleImageClick = (image) => {
//     setSelectedImage(image);
//   };

//   // Fetch product details
//   useEffect(() => {
//     if (id) {
//       getSingleProduct(API, id);
//       fetchSimilarProducts(id); // Fetch similar products
//     }
//   }, [id, getSingleProduct]);

//   // Fetch similar products
//   // const fetchSimilarProducts = async (id) => {
//   //   try {
//   //     const response = await fetch(`${SIMILAR_PRODUCTS_API}?product_id=${id}`);
//   //     if (!response.ok) {
//   //       throw new Error(`Error: ${response.status}`);
//   //     }
//   //     const data = await response.json();
//   //     setSimilarProducts(data.similar_products);
//   //   } catch (error) {
//   //     console.error("Error fetching similar products: ", error);
//   //   }
//   // };
 
//   // const fetchSimilarProducts = async (productId) => {
//   //   console.log(`Fetching similar products for product ID: ${productId}`);
//   //   try {
//   //     const response = await fetch(`${SIMILAR_PRODUCTS_API}?product_id=${productId}`);
//   //     if (!response.ok) {
//   //       throw new Error(`Error: ${response.status}`);
//   //     }
//   //     const data = await response.json();
//   //     console.log('API response:', data);

//   //     // Ensure the data contains `similar_products`
//   //     setSimilarProducts(data.similar_products || []);  // Fallback to empty array
//   //   } catch (error) {
//   //     console.error("Error fetching similar products: ", error);
//   //   }
//   // };
//   const fetchSimilarProducts = async (productId) => {
//     try {
//       const response = await fetch(`${SIMILAR_PRODUCTS_API}?product_id=${productId}`);
//       if (!response.ok) {
//         throw new Error(`Error: ${response.status}`);
//       }
//       const data = await response.json();
  
//       // Log the full response to check its structure
//       console.log('Full API response:', data);
  
//       // Set similar products from data.data
//       setSimilarProducts(data.data || []); // Ensure it's an array or fallback to an empty array
  
//       // Log the similar products to ensure it's populated
//       console.log('Similar products:', data.data);
//     } catch (error) {
//       console.error("Error fetching similar products: ", error);
//     }
//   };
  
  

//   useEffect(() => {
//     if (id) {
//       fetchSimilarProducts(id);  // Passing `id` from useParams
//     }
//   }, [id]);
  

//   if (isSingleLoading) {
//     return <Loadingpage />;
//   }

//   if (!filteredCard || Object.keys(filteredCard).length === 0) {
//     return <div>No data available for the selected ID.</div>;
//   }

//   const { name, price, default_color_image, images, image, product_details } = filteredCard;
//   const mainImage = selectedImage || default_color_image || image;

//   const handleAddToCart = () => {
//     if (true) {
//       const productToAdd = {
//         id: id,
//         name: name,
//         price: price,
//         image: file,
//         text: personalizeText,
//         color: filteredCard.colors[0],
//         variation: filteredCard.variations[0]
//       };
//       if (file == null && filteredCard?.product_type === "personalize") {
//         alert("Please Select an Image");
//       } else {
//         addToCart(productToAdd, quantity);
//         navigate('/cart');
//       }
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
//               {images.map((img, index) => (
//                 <img
//                   key={index}
//                   src={img}
//                   alt={`Thumbnail ${index + 1}`}
//                   onClick={() => handleImageClick(img)}
//                   className="thumbnail"
//                 />
//               ))}
//             </div>
//           </div>
//           <div className="main-image">
//             <img src={mainImage} alt="Selected" />
//           </div>
//           <div className="scrollable-content4">
//             <div className="product-info">
//               <h1 className='product-name'>{name}</h1>
//               <p className="price1">&#8377;{price}</p>
//               <button onClick={handleAddToCart} className="cart-btn">
//                 <span>Add to Cart</span>
//                 <FaShoppingCart className="icon" />
//               </button>
//             </div>
//           </div>
//         </div>

//         <div className="similar-products-list">
//   {similarProducts && similarProducts.length > 0 ? (
//     similarProducts.map((product) => (
//       <div  key={product._id} className="similar-product-card">
//         <img src={product.image} alt={product.name} />
//         <p>{product.name}</p>
//         <p>&#8377;{product.price}</p>
//       </div>
//     ))
//   ) : (
//     <p>No similar products available.</p>
//   )}
// </div>

//       </div>
//       <Footer />
//     </>
//   );
// };

// export default Cardpage1;
