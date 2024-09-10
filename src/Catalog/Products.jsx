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
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';
import Header from '../Header';
import Footer from '../Footer';
import '../Products/Product1.css';
import '../Home.css';

const Product1 = () => {

    const { id } = useParams();
    const location = useLocation();
    console.log(id)
    const { addToCart } = useContext(CartContext);
    const navigate = useNavigate();
    const [selectedImage2, setSelectedImage2] = useState(null);
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(null);
    const [uploadMessage, setUploadMessage] = useState('');
    const [pincode, setPincode] = useState('');
    const [personalizeText,setpersonalize]=useState("");
    const [file, setfile] = useState(null);
    const [isPincodeChecked, setIsPincodeChecked] = useState(false);
    const [deliveryText, setDeliveryText] = useState({
        line1: "Please enter PIN code to check delivery time.",
        line2: "100% Original Products.",
        line3: "Try & Buy might be available.",
        line4: "Easy 14 days returns and exchanges."
    });
    const [checkButtonText, setCheckButtonText] = useState('Check');

    const queryParams = new URLSearchParams(location.search);
    let product_id = "";

    const newproduc = () => {
        for (let i = 1; i <= id.length; i++) {
            if (id[i] == '=') {
                i = i + 1;
                for (let j = i; j < id.length; j++) {
                    product_id += id[j]
                }

            }
        }
    }


    console.log("render")
    useEffect(() => {



        const fetchProducts = async () => {
            try {
                const response = await fetch(`https://api.hirdayam.com/api/ProductbycatalogId?catelog_id=${id}`);
                const result = await response.json();
                if (result.status) {
                    newproduc()
                    // console.log(product_id + "new id")
                    setProducts(result.data);
                    // console.log(products[1] + "dsf")
                    const product = result.data.find(prod => prod._id === product_id);
                    console.log(product + "productefj i")
                    // Optionally set the first product as the selected product
                    setSelectedProduct(product || result.data[0]); // Set the product by ID or default to the first one

                    // Set the main image as the selected image initially
                    setSelectedImage(product?.image || result.data[0]?.image); // Set the main image

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
    const handleImageChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            // Simulate uploading the file
            setTimeout(() => {
                setfile(file)
                setSelectedImage2(URL.createObjectURL(file));
                setUploadMessage('File uploaded successfully!');
            }, 1000); // Simulate a delay for the upload process
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

    const handleAddToCart = () => {
        console.log(selectedProduct.variations[0] + "new variation")
        if (selectedProduct) {
            const productToAdd = {
                id: selectedProduct._id,
                name: selectedProduct.name,
                price: parseFloat(selectedProduct.price),
                image: file,
                text:personalizeText,
                color: selectedProduct.colors[0],
                variation: selectedProduct.variations[0]

            };

            if(file==null && selectedProduct?.product_type == "personalize"){
                alert("Please Add Image")
            }
            else{
                 addToCart(productToAdd, quantity);
            navigate('/cart');
            }

           
        }
    };

    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    return (
        <>
            <Header />
            {/* <div className="breadcrumb1 hidden md:block">Home / {selectedProduct?.name || 'Product'}</div>
            <div className="product-detail1 mt-1">
                <div className="content">
                    <div className="image-gallery hidden">
                        <div className="thumbnail-list">

                            {selectedProduct && (
                                <img
                                    src={selectedProduct.image}
                                    alt={selectedProduct.name}
                                    onClick={() => handleImageClick(selectedProduct.image)}
                                    className="thumbnail"
                                />
                            )}

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
                    <div className="image-placeholder1 m-auto flex items-center justify-center">
                        {selectedImage && (
                            <img src={selectedImage} alt="Selected"/>
                        )}
                    </div>


                    <div className="thumbnail-lis  w-full gap-2 justify-center items-center flex md:hidden">

  {selectedProduct && (
    <img
        src={selectedProduct.image}
        alt={selectedProduct.name}
        onClick={() => handleImageClick(selectedProduct.image)}
        className="thumbnai h-20 w-20 hover:ring rounded-md   "
    />
  )}

{selectedProduct?.images.map((image, index) => (
    <img
        key={index}
        src={image}
        alt={`Thumbnail ${index + 1}`}
        onClick={() => handleImageClick(image)}
        className="thumbnai h-20 w-20 hover:ring rounded-md"
    />
))}
</div>
                    <div className="scrollable-content">
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
                           
                            <div className={`${selectedProduct?.product_type == "personalize" ? "block" : "hidden"}  `}>
                                <button className=''
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
                            </div>

                          
                        <div>{personalizeText}</div>
                        <dialog id="my_modal_4" className="modal">
                            <div className="modal-box">
                                <form method="dialog">
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

                                <form method="dialog">
                                 
                                    <button style={{ background: "", color: "" }} className="btn   w-full h-full  btn-outline btn-primary  ">Save</button>
                                </form>
                            </div>
                        </dialog>
                            <h3 className='free'>Free Delivery</h3>
                            <div className="buttons">
                                <button className="wishlist-btn">
                                    <span>Wishlist</span>
                                </button>
                                <button className="cart-btn" onClick={handleAddToCart}>
                                    <span>Add to Cart</span>
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
            <Footer /> */}
            <div className="breadcrumb1">Home / {selectedProduct?.name || 'Product'}</div>
            <div className="product-detail1 mt-1">
                <div className="content">
                    <div className="image-gallery">
                        <div className="thumbnail-list">
                            {/* {selectedProduct && (
                                <img
                                    src={selectedProduct.image}
                                    alt={selectedProduct.name}
                                    onClick={() => handleImageClick(selectedProduct.image)}
                                    className="thumbnail"
                                />
                            )} */}
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
            <Footer />
        </>
    );
};

export default Product1;
