// import React, { useState, useEffect, useContext } from 'react';
// import { CartContext } from './CartContext';
// import { useNavigate, useParams, useLocation } from 'react-router-dom';
// import { FaShoppingCart, FaHeart } from 'react-icons/fa';
// import Header from './Header';
// import Footer from './Footer';
// import './Products/Product1.css';
// import './Home.css';

// const Product1 = () => {

//     const { id } = useParams();
//     const location = useLocation();
//     console.log(id)
//     const { addToCart } = useContext(CartContext);
//     const navigate = useNavigate();
//     const [selectedImage2, setSelectedImage2] = useState(null);
//     const [products, setProducts] = useState([]);
//     const [selectedProduct, setSelectedProduct] = useState(null);
//     const [quantity, setQuantity] = useState(1);
//     const [selectedImage, setSelectedImage] = useState(null);
//     const [uploadMessage, setUploadMessage] = useState('');
//     const [pincode, setPincode] = useState('');

//     const [file, setfile] = useState(null);
//     const [isPincodeChecked, setIsPincodeChecked] = useState(false);
//     const [deliveryText, setDeliveryText] = useState({
//         line1: "Please enter PIN code to check delivery time.",
//         line2: "100% Original Products.",
//         line3: "Try & Buy might be available.",
//         line4: "Easy 14 days returns and exchanges."
//     });
//     const [checkButtonText, setCheckButtonText] = useState('Check');

//     const queryParams = new URLSearchParams(location.search);
//     let product_id = "";

//     const newproduc = () => {
//         for (let i = 1; i <= id.length; i++) {
//             if (id[i] == '=') {
//                 i = i + 1;
//                 for (let j = i; j < id.length; j++) {
//                     product_id += id[j]
//                 }

//             }
//         }
//     }


//     console.log("render")
//     useEffect(() => {



//         const fetchProducts = async () => {
//             try {
//                 const response = await fetch(`https://api.hirdayam.com/api/getProductBySubCategory?sub_category_id=${id}`);
//                 const result = await response.json();
//                 if (result.status) {
//                     newproduc()
//                     console.log(product_id + "new id")
//                     setProducts(result.data);
//                     console.log(products[1] + "dsf")
//                     const product = result.data.find(prod => prod._id === product_id);
//                     console.log(product + "productefj i")
//                     setSelectedProduct(products);
//                     setSelectedImage(products.image);
//                 }
//             } catch (error) {
//                 console.error('Failed to fetch products:', error);
//             }
//         };

//         fetchProducts();
//     }, []);

//     const handleIncrement = () => {
//         setQuantity(prevQuantity => prevQuantity + 1);
//     };
//     const handleImageChange = (event) => {
//         const file = event.target.files[0];

//         if (file) {
//             // Simulate uploading the file
//             setTimeout(() => {
//                 setfile(file)
//                 setSelectedImage2(URL.createObjectURL(file));
//                 setUploadMessage('File uploaded successfully!');
//             }, 1000); // Simulate a delay for the upload process
//         }
//     };
//     const handleDecrement = () => {
//         setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
//     };

//     const handlePincodeChange = (e) => {
//         const value = e.target.value;
//         if (!isNaN(value)) {
//             setPincode(value);
//             setIsPincodeChecked(false);
//             setDeliveryText({
//                 line1: "Please enter PIN code to check delivery time.",
//                 line2: "100% Original Products.",
//                 line3: "Try & Buy might be available.",
//                 line4: "Easy 14 days returns and exchanges."
//             });
//             setCheckButtonText('Check');
//         }
//     };
//     const handleButtonClick = () => {
//         document.getElementById('fileInput').click();
//     };
//     const handlePincodeCheck = () => {
//         if (pincode.trim() !== '') {
//             setIsPincodeChecked(true);
//             setDeliveryText({
//                 line2: "Get it by Mon 08",
//                 line3: "Pay on Delivery available.",
//                 line4: "Easy 14 days returns and exchanges."
//             });
//             setCheckButtonText('Change');
//         }
//     };

//     const handleAddToCart = () => {
//         console.log(selectedProduct.variations[0] + "new variation")
//         if (selectedProduct) {
//             const productToAdd = {
//                 id: selectedProduct._id,
//                 name: selectedProduct.name,
//                 price: parseFloat(selectedProduct.price),
//                 image: file,
//                 color: selectedProduct.colors[0],
//                 variation: selectedProduct.variations[0]

//             };

//             addToCart(productToAdd, quantity);
//             navigate('/cart');
//         }
//     };

//     const handleImageClick = (image) => {
//         setSelectedImage(image);
//     };

//     return (
//         <>
//             <Header />
//             <div className="breadcrumb1">Home / {selectedProduct?.name || 'Product'}</div>
//             <div className="product-detail1 mt-1">
//                 <div className="content">
//                     <div className="image-gallery">
//                         <div className="thumbnail-list">

//                             {selectedProduct && (
//                                 <img
//                                     src={selectedProduct.image}
//                                     alt={selectedProduct.name}
//                                     onClick={() => handleImageClick(selectedProduct.image)}
//                                     className="thumbnail"
//                                 />
//                             )}

//                             {selectedProduct?.images.map((image, index) => (
//                                 <img
//                                     key={index}
//                                     src={image}
//                                     alt={`Thumbnail ${index + 1}`}
//                                     onClick={() => handleImageClick(image)}
//                                     className="thumbnail"
//                                 />
//                             ))}
//                         </div>
//                     </div>
//                     <div className="image-placeholder1">
//                         {selectedImage && (
//                             <img src={selectedImage} alt="Selected" />
//                         )}
//                     </div>
//                     <div className="scrollable-content4">
//                         <div className="product-info">
//                             <h1 className='product-name'>{selectedProduct?.name}</h1>
//                             <p className="price1">&#8377;{selectedProduct?.price}</p>
//                             <h3 className='selected1'>Selected Quantity</h3>
//                             <div className="quantity-selector">
//                                 <button onClick={handleDecrement} className="quantity-btn">-</button>
//                                 <div className="quantity">{quantity}</div>
//                                 <button onClick={handleIncrement} className="quantity-btn">+</button>
//                             </div>
//                             <br />

//                             <div className={`${selectedProduct?.product_type == "personalize" ? "block" : "hidden"}`}>
//                                 <button
//                                     onClick={handleButtonClick}
//                                     style={{
//                                         display: 'flex',
//                                         alignItems: 'center',
//                                         justifyContent: 'center',
//                                         padding: '10px',
//                                         borderRadius: '5px',
//                                         cursor: 'pointer',
//                                         border: '1px solid #ccc',
//                                         background: '#23387A',
//                                         color: 'white',
//                                         fontFamily: 'Poppins'
//                                     }}
//                                 >
//                                     {selectedImage2 ? (
//                                         <img
//                                             src={selectedImage2}
//                                             alt="Selected"
//                                             style={{
//                                                 width: '40px',
//                                                 height: '40px',

//                                                 marginRight: '10px',
//                                             }}
//                                         />
//                                     ) : (
//                                         'Select Photo'
//                                     )}
//                                 </button>
//                                 <input
//                                     type="file"
//                                     accept="image/*"
//                                     id="fileInput"
//                                     style={{ display: 'none' }}
//                                     onChange={handleImageChange}
//                                 />
//                                 {uploadMessage && <p style={{ color: 'green', marginTop: '10px' }}>{uploadMessage}</p>}
//                             </div>

//                             <h3 className='free'>Free Delivery </h3>
//                             <div className="buttons">
//                                 <button className="wishlist-btn">
//                                     <span>Wishlist</span>
//                                     <FaHeart className="icon" />
//                                 </button>
//                                 <button className="cart-btn" onClick={handleAddToCart}>
//                                     <span>Add to Cart</span>
//                                     <FaShoppingCart className="icon" />
//                                 </button>
//                             </div>
//                             <div className="pincode-checker">
//                                 <input
//                                     type="text"
//                                     value={pincode}
//                                     onChange={handlePincodeChange}
//                                     placeholder="Enter Pincode"
//                                     className="pincode-input"
//                                 />
//                                 <button onClick={handlePincodeCheck} className="check-btn">
//                                     {checkButtonText}
//                                 </button>
//                             </div>
//                             <p className="delivery-info">
//                                 <span className="delivery-line1">{deliveryText.line1}</span>
//                                 <br />
//                                 <span>{deliveryText.line2}</span>
//                                 <br />
//                                 <span>{deliveryText.line3}</span>
//                                 <br />
//                                 <span className="delivery-line">{deliveryText.line4}</span>
//                             </p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <Footer />
//         </>
//     );
// };

// export default Product1;
import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { CartContext } from './CartContext';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';
import Header from './Header';
import Footer from './Footer';
import './Products/Product1.css';
import './Home.css';

const Product1 = () => {
    const { subCategoryId, productId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const { addToCart } = useContext(CartContext);

    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedImage2, setSelectedImage2] = useState(null);
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

    // Extract product_id from URL query parameters
    const queryParams = new URLSearchParams(location.search);
    const product_id = queryParams.get('product_id');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`https://api.hirdayam.com/api/getProductBySubCategory?sub_category_id=${subCategoryId}`);
                const result = await response.json();

                if (result.status) {
                    setProducts(result.data);
                    const product = result.data.find(prod => prod._id === productId);
                    setSelectedProduct(product || result.data[0]); // Set the product by ID or default to the first one
                    setSelectedImage(product?.image || result.data[0]?.image); // Set the main image
                }
            } catch (error) {
                console.error('Failed to fetch products:', error);
            }
        };

        fetchProducts();
    }, [subCategoryId, productId]);

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
        if (selectedProduct) {
            const productToAdd = {
                id: selectedProduct._id,
                name: selectedProduct.name,
                price: parseFloat(selectedProduct.price),
                image: selectedImage2 || selectedProduct.image, // Use uploaded image or main image
                color: selectedProduct.colors[0],
                variation: selectedProduct.variations[0]
            };

            addToCart(productToAdd, quantity);
            navigate('/cart');
        }
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImage2(URL.createObjectURL(file));
            setUploadMessage('File uploaded successfully!');
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
                            {selectedProduct && (
                                <img
                                    src={selectedProduct.image}
                                    alt={selectedProduct.name}
                                    onClick={() => handleImageClick(selectedProduct.image)}
                                    className="thumbnail"
                                />
                            )}
                            {selectedProduct?.images?.map((image, index) => (
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
                    <div className="image-placeholder1 m-auto flex items-center justify-center">
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
                            {selectedProduct?.product_type === "personalize" && (
                                <>
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
                                    {uploadMessage && <p style={{ color: 'green', marginTop: '10px' }}>{uploadMessage}</p>}
                                </>
                                
                            )}
                            <h3 className='free'>Free Delivery</h3>
                            <div className="buttons">
                                {/* <button className="wishlist-btn">
                                    <span>Wishlist</span>
                                    <FaHeart className="icon" />
                                </button> */}
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
            <Footer />
        </>
    );
};

export default Product1;
