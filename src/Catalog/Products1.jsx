// import React, { useState, useEffect, useContext } from 'react';
// import { CartContext } from '../CartContext';
// import { FaShoppingCart, FaHeart } from 'react-icons/fa';
// import Header from '../Header';
// import Footer from '../Footer';
// import '../Home.css';
// import '../Products/Product1.css';
// import image9 from '../images/image 13.png'
// const Product1 = () => {
//   const { addToCart, addToWishlist } = useContext(CartContext);
//   const [product, setProduct] = useState(null);
//   const [similarProducts, setSimilarProducts] = useState([]);
//   const [selectedColor, setSelectedColor] = useState('black');
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
//   const [showLoadMore, setShowLoadMore] = useState(true);
  
//   useEffect(() => {
//     // Fetch product details from API
//     const fetchProductData = async () => {
//       try {
//         const response = await fetch('https://hridayam.dasoclothings.in/api/ProductbycatalogId?catelog_id=66c42a734fd09c17109d482b');
//         const result = await response.json();
        
//         if (result.status) {
//           const fetchedProduct = result.data[0]; // Assuming you want the first product
//           setProduct(fetchedProduct);
//           // If there are similar products in the response, set them here
//           // setSimilarProducts(result.similarProducts || []);
//         }
//       } catch (error) {
//         console.error('Error fetching product data:', error);
//       }
//     };

//     fetchProductData();
//   }, []);

//   const handleAddToCart = () => {
//     if (product) {
//       const productToAdd = {
//         id: `${product._id}_${selectedColor}`,
//         name: product.name,
//         price: product.price,
//         image: product.images[0] // Assuming the first image is the main one
//       };
//       addToCart(productToAdd, quantity);
//       // Navigate to cart if needed
//       // navigate('/cart');
//     }
//   };

//   const handleAddToWishlist = () => {
//     if (product) {
//       const productToAdd = {
//         id: selectedColor,
//         name: product.name,
//         price: product.price,
//         image: product.images[0] // Assuming the first image is the main one
//       };
//       addToWishlist(productToAdd, quantity);
//       // Navigate to wishlist if needed
//       // navigate('/wishlist')
//     }
//   };

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

//   const handleLoadMore = () => {
//     setSimilarProducts(prevProducts => [
//       ...prevProducts,
//       { id: 9, imageUrl: image9, price: ' &#8377;45' },
//       { id: 10, imageUrl: image9, price: '$55' },
//       { id: 11, imageUrl: image9, price: '$70' },
//       { id: 12, imageUrl: image9, price: '$80' },
//     ]);
//     setShowLoadMore(false);
//   };

//   if (!product) {
//     return <div>Loading...</div>; // Show a loading state while fetching data
//   }

//   return (
//     <>
//       <Header />
//       <div className="product-detail">
//         <div className="breadcrumb">Home / {product.name}</div>

//         <div className="content">
//           <div className='image2'>
//             <img src={product.images[0]} alt="Product" className="product-image3" />
//           </div>
//           <div className="scrollable-content">
//             <div className="product-info">
//               <h1 className='product-name'>{product.name}</h1>
//               <p className="price1" dangerouslySetInnerHTML={{ __html: product.price }}></p>
//               <h3 className='product-name mt-4'>Colors</h3>
//               <div className="colors1">
//                 {/* Assuming colors are available in product data */}
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
//               <h3 className='mt-4 offer'>Free Delivery</h3>
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
//                 <span className="delivery-line">{deliveryText.line2}</span>
//                 <span className="delivery-line">{deliveryText.line3}</span>
//                 <span className="delivery-line">{deliveryText.line4}</span>
//               </p>
//               <h3 className='offer text-bold mt-2'>Best Offer</h3>
//               <p className="best-price">Best Price: &#8377;45</p>
//               <ul className="offer-details">
//                 <li>Coupon code: <strong>Cloth123</strong></li>
//                 <li>Coupon Discount: &#8377;48 off (check cart for final savings)</li>
//                 <li>Applicable On: Orders above &#8377; (only on first purchase)</li>
//               </ul>
//               <h3 className='offer mt-2'>Product Details</h3>
//               <p className='product'>{product.product_details}</p>
//               <h3 className='offer mt-2'>Best Offer</h3>
//               <ul className="offer-details">
//                 {/* Render additional product details if available */}
//               </ul>
//               <h3 className='offer mt-2'>Size</h3>
//               <p className='product'>The Model (Height 6') is wearing a size M</p>
//               <h3>Material & Care</h3>
//               <p className='product'>100% Cotton</p>
//               <p className='product'>Machine Wash</p>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className='similar'>Similar Products</div>
//       <div className="card-container">
//         {similarProducts.map(card => (
//           <div key={card.id} className="card-wrapper" style={{ cursor: 'pointer' }}>
//             <img className="card-image" src={card.imageUrl} alt="Similar Product" />
//             <div className="card-price">{card.price}</div>
//           </div>
//         ))}
//       </div>
//       {showLoadMore && (
//         <button className="load-more" onClick={handleLoadMore}>Load More</button>
//       )}
//       <Footer />
//     </>
//   );
// };

// export default Product1;
import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '../CartContext';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';
import Header from '../Header';
import Footer from '../Footer';
import '../Products/Product1.css';
import '../Home.css';

const Product1 = () => {
    const { addToCart } = useContext(CartContext);
    const navigate = useNavigate();
    const [selectedImage2, setSelectedImage2] = useState(null);
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(null);
    const [uploadMessage, setUploadMessage] = useState('');
    const [pincode, setPincode] = useState('');
    const [isPincodeChecked, setIsPincodeChecked] = useState(false);
    const [deliveryText, setDeliveryText] = useState({
        line1: "Please enter PIN code to check delivery time.",
        line2: "100% Original Products.",
        line3: "Try & Buy might be available.",
        line4: "Easy 14 days returns and exchanges."
    });
    const [checkButtonText, setCheckButtonText] = useState('Check');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://hridayam.dasoclothings.in/api/ProductbycatalogId?catelog_id=66c42a734fd09c17109d482b');
                const result = await response.json();
                if (result.status) {
                    setProducts(result.data);
                    // Optionally set the first product as the selected product
                    setSelectedProduct(result.data[1]);
                    // Set the main image as the selected image initially
                    setSelectedImage(result.data[1].image);
                }
            } catch (error) {
                console.error('Failed to fetch products:', error);
            }
        };

        fetchProducts();
    }, []);

    const handleIncrement = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };
//  const handleImageChange = (event) => {
//         const file = event.target.files[0];
//         if (file) {
//             // Simulate uploading the file
//             setTimeout(() => {
//                 setSelectedImage2(URL.createObjectURL(file));
//                 setUploadMessage('File uploaded successfully!');
//             }, 1000); // Simulate a delay for the upload process
//         }
//     };
const [selectedFile, setSelectedFile] = useState(null); // State to store the file

const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    // Store the file object
    setSelectedFile(file);
    
    // Optional: Create an object URL for display purposes
    const imageURL = URL.createObjectURL(file);
    setSelectedImage2(imageURL);
    
    setUploadMessage('File uploaded successfully!');
  }
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
    const handleButtonClick = () => {
        document.getElementById('fileInput').click();
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

    // const handleAddToCart = () => {
    //     if (selectedProduct) {
    //         const productToAdd = {
    //             id: selectedProduct._id,
    //             name: selectedProduct.name,
    //             price: parseFloat(selectedProduct.price),
    //             image: selectedProduct.image,

    //         };
    //         addToCart(productToAdd, quantity);
    //         navigate('/cart');
    //     }
    // };
    const createProductToAdd = (product, file, quantity) => {
        return {
            id: product._id,
            name: product.name,
            user_id: '6697a31f3344136bd4364461',
            cart_id: "66c86dd42d70ef4b40654f47",
            product_color_id: product.product_color_id || null,
            product_variation_id: product.product_variation_id || null,
            price: parseFloat(product.price),
            image: product.image,
            personalize_image: file, // We will handle this separately in FormData
            quantity: quantity
        };
    };
    
    const handleAddToCart = () => {
        const personalizeImage = localStorage.getItem('selectedProductImage');
        
        console.log("Personalize Image:", personalizeImage);
        
        if (!personalizeImage) {
            setUploadMessage('Please upload a personalized image before adding to cart.');
            return;
        }
    
         if (selectedProduct) {
        // Create the productToAdd object
        const productToAdd = createProductToAdd(selectedProduct, selectedFile, quantity);

        // Create a new FormData object
        const formData = new FormData();
        formData.append('product_id', productToAdd.id);
        formData.append('name', productToAdd.name);
        formData.append('user_id', productToAdd.user_id);
        formData.append('price', productToAdd.price);
        formData.append('image', productToAdd.image);
        formData.append('personalize_image', productToAdd.personalize_image); // Append the file object
        formData.append('quantity', productToAdd.quantity);

            console.log("Product to Add:", productToAdd);
            
            addToCart(productToAdd, quantity);
            navigate('/cart');
        } else {
            console.log("Selected Product is undefined");
        }
    };
    
    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    return (
        <>
            <Header />
            <div className="breadcrumb1">Home / {selectedProduct?.name || 'Product'}</div>
            <div className="product-detail1 mt-1">
                <div className="content">
                    <div className="image-gallery">
                       
                        <div className="thumbnail-list">
                                {/* Display the main image at the top */}
                                {selectedProduct && (
                                    <img
                                        src={selectedProduct.image}
                                        alt={selectedProduct.name}
                                        onClick={() => handleImageClick(selectedProduct.image)}
                                        className="thumbnail"
                                    />
                                )}
                                {/* Display additional images */}
                                {selectedProduct?.images.map((image, index) => (
                                    <img
                                        key={index}
                                        src={image}
                                        alt={`Thumbnail ${index + 1}`}
                                        onClick={() => handleImageClick(image)}
                                        className="thumbnail"
                                    />
                                ))}
                            </div>
                    </div>
                    <div className="image-placeholder1">
                        {selectedImage && (
                            <img src={selectedImage} alt="Selected" />
                        )}
                    </div>
                    <div className="scrollable-content4">
                        <div className="product-info">
                            <h1 className='product-name'>{selectedProduct?.name}</h1>
                            <p className="price1">&#8377;{selectedProduct?.price}</p>
                            <h3 className='selected1'>Selected Quantity</h3>
                            <div className="quantity-selector">
                                <button onClick={handleDecrement} className="quantity-btn">-</button>
                                <div className="quantity">{quantity}</div>
                                <button onClick={handleIncrement} className="quantity-btn">+</button>
                            </div>
                            <br />
                            <div>
                                <button
                                    onClick={handleButtonClick}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: '10px',
                                        borderRadius: '5px',
                                        cursor: 'pointer',
                                        border: '1px solid #ccc',
                                        background: '#23387A',
                                        color:'white',
                                        fontFamily:'Poppins'
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
                                {uploadMessage && <p style={{ color: 'green', marginTop: '10px' }}>{uploadMessage}</p>}
                            </div>

                            <h3 className='free'>Free Delivery</h3>
                            <div className="buttons">
                                <button className="wishlist-btn">
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

export default Product1;
