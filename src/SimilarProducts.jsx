import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { CartContext } from './CartContext';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';
import Header from './Header';
import Footer from './Footer';
import './Products/Product1.css';
import './Home.css';
import { text } from '@fortawesome/fontawesome-svg-core';
import Loadingpage from './Loadingpage';

const ProductDetailsPage = () => {
    const { id } = useParams(); // Retrieve the product ID from the URL
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [file, setfile] = useState(null);
    const { addToCart } = useContext(CartContext);
    const navigate = useNavigate(); // For programmatic navigation
    const [selectedColor, setSelectedColor] = useState(null); // State to track selected color
    const [selectedVariation, setSelectedVariation] = useState(null);

    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedImage2, setSelectedImage2] = useState(null);
    const [uploadMessage, setUploadMessage] = useState('');
    const [pincode, setPincode] = useState('');
    const [isPincodeChecked, setIsPincodeChecked] = useState(false);
    const [personalizeText, setpersonalize] = useState("");

    const [deliveryText, setDeliveryText] = useState({
        line1: "Please enter PIN code to check delivery time.",
        line2: "100% Original Products.",
        line3: "Try & Buy might be available.",
        line4: "Easy 14 days returns and exchanges."
    });
    const [checkButtonText, setCheckButtonText] = useState('Check');
    const handleVariationClick = (variation) => {
        setSelectedVariation(variation); // Store the selected variation in the state
        console.log('Selected Variation:', variation);
    };
    

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                console.log("Fetching product details...");
                const response = await fetch(`https://api.hirdayam.com/api/productDetails?product_id=${id}`);
                if (!response.ok) {
                    throw new Error(`Error fetching product details: ${response.status}`);
                }
                const data = await response.json();
                console.log("API Response:", data); // Debug API response

                if (data && data.data) {
                    const product = data.data;
                    console.log("Product Data:", product); // Debug product data
                    setProduct(product); // Set the entire product data if needed
                    setSelectedProduct(product); // Set the selected product
                    setSelectedImage(product.image || null); // Set the main image
                    console.log("Product Colors:", product.colors); // Debug colors data

                } else {
                    console.error("API response does not contain expected data:", data);
                    setProduct(null);
                    setSelectedProduct(null);
                    setSelectedImage(null);
                }

            } catch (error) {
                console.error('Failed to fetch product details:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProductDetails();
    }, [id]);


    console.log("Selected Product:", selectedProduct);
    console.log("Selected Product Colors:", selectedProduct?.colors);

    console.log("Product ID:", id);


    if (loading) {
        return <Loadingpage></Loadingpage>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!product) {
        return <p>No product found.</p>;
    }
    const handleIncrement = () => {
        if (quantity < selectedProduct.stock) {
            setQuantity(prevQuantity => prevQuantity + 1);
        }
        else {
            return
        }
    }
    const handleDecrement = () =>

        setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));


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
                image: file, // Use uploaded image or main image
                // color: selectedProduct.colors[0],
                color: selectedColor?._id,

                // variation: selectedProduct.variations[0],
                variation: selectedVariation?._id,

                text: personalizeText
            };

            // addToCart(productToAdd, quantity);
            // navigate('/cart');

            if (file == null && selectedProduct?.product_type == "personalize") {
                alert("Please Select Image")
            }
            else {
                addToCart(productToAdd, quantity);
                navigate('/cart');
            }
        }
    };
    // const handleColorClick = (color) => {
    //     setSelectedColor(color); // Set the clicked color as selected
    //     setSelectedImage(null);  // Clear the selected image on color change
    // };
    const handleColorClick = (color) => {
        setSelectedColor(color); // Set the clicked color as selected
        if (color.color_images.length > 0) {
            setSelectedImage(color.color_images[0]); // Set the first image of the color as the main image
        } else {
            setSelectedImage(null); // Clear the selected image if no images exist
        }
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            setfile(file)
            setSelectedImage2(URL.createObjectURL(file));
            setUploadMessage('File uploaded successfully!');
        }
    };

    const handleImageClick = (image) => {
        setSelectedImage(image);
    };
    return (
        <>
            <Header/>
            <div className="breadcrumb1">Home / {selectedProduct?.name || 'Product'}</div>
            <div className="product-detail1 mt-1">
                <div className="content">
                    <div className="image-gallery hidden md:block">
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
                            {/* {selectedColor && selectedColor.color_images.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`Color ${selectedColor.color_name} - Thumbnail ${index + 1}`}
                                    onClick={() => handleImageClick(image)}
                                    className="thumbnail"
                                    style={{ width: '100px', height: '100px', margin: '5px', cursor: 'pointer' }}
                                />
                            ))} */}
                            {selectedColor && selectedColor.color_images.slice(1).map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`Color ${selectedColor.color_name} - Thumbnail ${index + 1}`}
                                    onClick={() => handleImageClick(image)}
                                    className="thumbnail"
                                    style={{ width: '100px', height: '100px', margin: '5px', cursor: 'pointer' }}
                                />
                            ))}

                        </div>
                    </div>
                    <div className="image-placeholder1 m-auto flex items-center justify-center">
                        {selectedImage && (
                            <img src={selectedImage} alt="Selected" />
                        )}
                    </div>

                    <div className="">
                        <div className="thumbnail-list flex md:hidden ">
                            {selectedProduct && (
                                <img
                                    src={selectedProduct.image}
                                    alt={selectedProduct.name}
                                    onClick={() => handleImageClick(selectedProduct.image)}
                                    className="thumbnail h-20 w-20 object-contain"
                                />
                            )}
                            {selectedProduct?.images?.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`Thumbnail ${index + 1}`}
                                    onClick={() => handleImageClick(image)}
                                    className="thumbnail h-20 w-20 object-contain"
                                />
                            ))}
                            {/* {selectedColor && selectedColor.color_images.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`Color ${selectedColor.color_name} - Thumbnail ${index + 1}`}
                                    onClick={() => handleImageClick(image)}
                                    className="thumbnail"
                                    style={{ width: '100px', height: '100px', margin: '5px', cursor: 'pointer' }}
                                />
                            ))} */}
                            {selectedColor && selectedColor.color_images.slice(1).map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`Color ${selectedColor.color_name} - Thumbnail ${index + 1}`}
                                    onClick={() => handleImageClick(image)}
                                    className="thumbnail"
                                    style={{ width: '100px', height: '100px', margin: '5px', cursor: 'pointer' }}
                                />
                            ))}

                        </div>
                    </div>
                    <div className="scrollable-content4">
                        <div className="product-info">
                            <h1 className='product-name'>{selectedProduct?.name}</h1>
                            {/* <p className="price1">&#8377;{selectedProduct?.price}</p> */}
                            <p className="price1">
                &#8377;{selectedVariation ? selectedVariation.size_price : selectedProduct?.price}
            </p>
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
                                        className='w-28'
                                        onClick={() => document.getElementById('fileInput').click()}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            padding: '10px',
                                            borderRadius: '5px',
                                            width: '120px',
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
                                    <button className="text rounded-md dialogs" onClick={() => document.getElementById('my_modal_4').showModal()} >
                                        Add Text
                                    </button>
                                    {uploadMessage && <p style={{ color: 'green', marginTop: '10px' }}>{uploadMessage}</p>}
                                </>
                            )}

                            <div>{personalizeText}</div>
                            <dialog id="my_modal_4" className="modal">
                                <div className="modal-box">
                                    <form method="dialog">
                                        {/* if there is a button in form, it will close the modal */}
                                        <button style={{ background: "transparent", color: "black" }} className="btn  btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                    </form>


                                    <label style={{ paddingRight: "400px" }} className=' text-nowrap '>Add Text</label><br></br>
                                    <input
                                        onChange={(text) => { setpersonalize(text.target.value) }}
                                        type='text'
                                        className='border w-96 mr-20 px-3 my-4 py-2 rounded-md'
                                        placeholder='Enter Your Text here'
                                    />

                                    <div>

                                    </div>

                                    <form method="dialog" >
                                        <button style={{ background: "", color: "" }} className="btn   w-full h-full  btn-outline btn-primary  ">Save</button>
                                    </form>
                                </div>
                            </dialog>
                            
                            <div>
                                {selectedProduct && selectedProduct.colors && selectedProduct.colors.length > 0 && (
                                    <div>
                                        <h3 className='free'>Colors</h3>
                                        <div style={{ display: 'flex' }}>
                                            {selectedProduct.colors.map((color) => (
                                                <div key={color._id} style={{ marginRight: '10px' }}>
                                                    <h3
                                                        className="color-circle border"

                                                        onClick={() => handleColorClick(color)} // Add onClick to color name

                                                        style={{ cursor: 'pointer',backgroundColor:`${color.color_name}` }} // Make color name clickable
                                                    >
                                                        {/* {color.color_name || "No color name"} */}
                                                    </h3>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div>
    
    {selectedProduct && selectedProduct.variations && selectedProduct.variations.length > 0 && (
        <div>
            <h3 className='free'>Available Sizes</h3>
            <div style={{ display: 'flex', flexDirection: 'row',}}>
                {selectedProduct.variations.map((variation) => (
                    <div key={variation._id} style={{ marginBottom: '10px' }}>
                        <h3
                            className="variation-size border"
                            onClick={() => handleVariationClick(variation)}  // Optional: Add onClick for selecting variation
                            style={{ cursor: 'pointer',marginRight:'6px' }}
                        >
                            {variation.size || "No size"}
                        </h3>
                    </div>
                ))}
            </div>
        </div>
    )}
    </div>


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
                            <h3 className='offer mt-4'>Product Details</h3>
                            <p className='product'>{selectedProduct.product_details}</p>

                            <h3 className='offer mt-2'>Features</h3>
                            <ul className="offer-details">

                                {selectedProduct.features.map((feature, index) => (
                                    <li key={index}>{feature}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ProductDetailsPage;

