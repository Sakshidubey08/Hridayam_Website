import React, { useState, useContext } from 'react';
import { CartContext } from '../CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaHeart } from 'react-icons/fa'; // Add react-icons
import pinterest from '../images/PinterestLogo.png';
import instagram from '../images/InstagramLogo.png';
import facebook from '../images/FacebookLogo.png';
import XLogo from '../images/XLogo.png';
import location from '../images/location.png';
import logo from '../images/hridayam logo.png';
import search from '../images/search.png';
import heart from '../images/Heart.png';
import icon2 from '../images/icon2.png';
import icon3 from '../images/icon3.png';
import image13 from '../images/image 13 (3).png';
import image9 from '../images/image 13.png';
import image10 from '../images/image 14.png';
import image12 from '../images/image 13 (3).png';
import '../Home.css';
import './Product1.css';
import './Product2.css';
import rect1 from '../images/RECTANGLE FRAME 2(1).jpg'
import rect2 from '../images/RECTANGLE FEAME(1).jpg'
import square1 from '../images/SQUARE FRAME.jpg'
import oval from '../images/OVAL FRAME(1).jpg'
import circle from '../images/CIRCLE FRAME.jpg'
import Header from '../Header';
import Footer from '../Footer';
const shapeImages = {
    Normal: ['https://i.pinimg.com/564x/61/f6/8f/61f68f3bb8a99a46feb2c4d7250e92d6.jpg', 'https://i.pinimg.com/564x/0a/03/72/0a037201533c78383bd2a0d4ac632541.jpg', 'https://i.pinimg.com/564x/b7/40/8d/b7408dd3e2456a06e612223158bc69a6.jpg', 'https://i.pinimg.com/564x/6c/c4/71/6cc47135ae86a109f91af95d65c2b6d0.jpg'],
    RoundEdge: ['round1.jpg', 'round2.jpg', 'round3.jpg', 'round4.jpg'],
    Circle: ['circle2.jpg', 'circle3.jpg', 'circle4.jpg'],
    Oval: [oval, 'oval2.jpg', 'oval3.jpg', 'oval4.jpg'],
    Square: [square1, 'square2.jpg', 'square3.jpg', 'square4.jpg'],
    RoundEdgeSquare: ['roundSquare1.jpg', 'roundSquare2.jpg', 'roundSquare3.jpg', 'roundSquare4.jpg'],
};

const svgBorderPaths = {
    Normal: 'M 0,0 L 600,0 L 600,400 L 0,400 Z',
    RoundEdge: 'M 30,0 H 570 A 30,30 0 0 1 600,30 V 370 A 30,30 0 0 1 570,400 H 30 A 30,30 0 0 1 0,370 V 30 A 30,30 0 0 1 30,0 Z',
    Circle: 'M 300,200 m -150,0 a 150,150 0 1,0 300,0 a 150,150 0 1,0 -300,0',
    Oval: 'M 300,200 m -200,0 a 200,100 0 1,0 400,0 a 200,100 0 1,0 -400,0',
    Square: 'M 0,0 H 400 V 400 H 0 Z',
    RoundEdgeSquare: 'M 30,0 H 370 A 30,30 0 0 1 400,30 V 370 A 30,30 0 0 1 370,400 H 30 A 30,30 0 0 1 0,370 V 30 A 30,30 0 0 1 30,0 Z'
};

const Product1 = () => {
    const { addToCart } = useContext(CartContext);
    const navigate = useNavigate();

    const [cards, setCards] = useState([
        { id: 1, imageUrl: image9, price: '&#8377;1,200', description: "Veneer Wall Light" },
        { id: 2, imageUrl: image10, price: '&#8377;4,200', description: "Brass Diya" },
        { id: 3, imageUrl: image12, price: '&#8377;800', description: "Structured Curved Bill Cap" },
        { id: 4, imageUrl: image13, price: '&#8377;499', description: "Personalized Notebooks" },
    ]);

    const product = {
        name: 'Gift Hamper',
        price: '&#8377;1,200',
    };
    const [selectedImage2, setSelectedImage2] = useState(null);
    const [selectedColor, setSelectedColor] = useState('black');
    const [quantity, setQuantity] = useState(1);
    const [thickness, setThickness] = useState('');
    const [size, setSize] = useState('21 x 15');
    const [pincode, setPincode] = useState('');
    const [isPincodeChecked, setIsPincodeChecked] = useState(false);
    const size1 = '10 10 10 10';
    const [selectedShape, setSelectedShape] = useState('Normal');
    const [selectedImage1, setSelectedImage1] = useState(shapeImages.Normal[0]);
    const [selectedImage, setSelectedImage] = useState(null);

    const [imageList, setImageList] = useState(shapeImages.Normal);

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
    const handleButtonClick = () => {
        document.getElementById('fileInput').click();
    };
    const [uploadMessage, setUploadMessage] = useState('');
    const handleDecrement = () => {
        setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
    };
  const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Simulate uploading the file
            setTimeout(() => {
                setSelectedImage2(URL.createObjectURL(file));
                setUploadMessage('File uploaded successfully!');
            }, 1000); // Simulate a delay for the upload process
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

    const handleLoadMore = () => {
        setCards(prevCards => [
            ...prevCards,
            { id: 9, imageUrl: image9, price: ' &#8377;45' },
            { id: 10, imageUrl: image9, price: '$55' },
            { id: 11, imageUrl: image9, price: '$70' },
            { id: 12, imageUrl: image9, price: '$80' },
        ]);
    };

    const handleAddToCart = () => {
        if (!selectedImage) {
            alert("Please upload an image before adding to cart.");
            return;
        }
        const productToAdd = {
            id: `${product.name}_product1`,
            name: product.name,
            price: 1600,
            image: selectedImage,
            thickness,
            size,
            borderSize: size,
            borderColor: 'black',
        };
        addToCart(productToAdd, quantity);
        navigate('/cart');
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleShapeClick = (shape) => {
        setSelectedShape(shape);
        setImageList(shapeImages[shape]);
    };

    const handleImageClick = (image) => {
        setSelectedImage1(image);
        console.log(selectedImage);
    };

    const getShapePath = (shape) => {
        return svgBorderPaths[shape] || '';
    };
    const [framtext, setFramText] = useState(''); // State for the text input
    const [color, setColor] = useState('#000000'); // State for the color input
    const framTextfontfamily = ["Permanent Marker", "Grey Qo", "Matemasie", "Edu VIC WA NT Beginner", "Bodoni Moda SC"];
        const [framTextfontfamilystate, setframTextfontfamilystate] = useState("");
    return (
        <>
            <Header />
            <div className="breadcrumb1">Home / {product.name}</div>
            <div className="product-detail1">   
                <div className="content">
                    <div >
                        <div className="image-placeholder1">
                            {selectedImage && (
                                <img src={selectedImage} alt="Selected" />
                            )}
                            {selectedImage1 && (
                                <img src={selectedImage1} alt="Selected" />
                            )}
                        </div>
                        <div className="image-options">
                            {/* Removed SVG and image options */}
                            {selectedImage && (
                                <div className="image-preview">
                                    <svg
                                        viewBox="0 0 600 400"
                                        preserveAspectRatio="xMidYMid meet"
                                        style={{ width: '100%', height: 'auto' }}
                                    >
                                        <defs>
                                            <clipPath id="shapeClipPath">
                                                <path d={getShapePath(selectedShape)} />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </div>
                            )}
                            <div className="image-list">
                                {imageList.map((image, index) => (
                                    <img
                                        key={index}
                                        src={image}
                                        alt={`Shape ${index + 1}`}
                                        className={`image-item  ${selectedImage1 === image ? 'highlighted' : ''}`}
                                        onClick={() => handleImageClick(image)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="scrollable-content4">
                        <div className="product-info">
                            <h1 className='product-name'>{product.name}</h1>
                            <p className="price1" dangerouslySetInnerHTML={{ __html: product.price }}></p>
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
                                        color:'white'
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
                            <button  className="text rounded-md dialogs" onClick={() => document.getElementById('my_modal_4').showModal()} >
                            Add Text
                        </button>
                        <dialog id="my_modal_4" className="modal">
                            <div className="modal-box">
                                <form method="dialog">
                                    {/* if there is a button in form, it will close the modal */}
                                    <button style={{ background: "transparent", color: "black" }} className="btn  btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                </form>


                                <label style={{ paddingRight: "400px" }} className=' text-nowrap '>Add Text</label><br></br>
                                <input
                                    type='text'
                                    className='border w-96 mr-20 px-3 my-4 py-2 rounded-md'
                                    placeholder='Enter Your Text here'
                                    value={framtext} // Bind the state to the input value
                                    onChange={(e) => setFramText(e.target.value)} // Update state on change
                                />
                               

                                <div className={`${framtext == "" ? "hidden" : "block"}`}>
                                    <label style={{ paddingRight: "400px" }} className=' text-nowrap'>Text Style</label><br></br>
                                    {
                                        framTextfontfamily.map((text, index) => (
                                            <form method="dialog">
                                                <p className='border my-3 text-2xl py-4 cursor-pointer' onClick={() => { setframTextfontfamilystate(text) }} key={index} style={{ fontFamily: `${text}` }}>{framtext}</p>
                                            </form>
                                        ))
                                    }


                                </div>
                            <div>

                                </div>

                                <form method="dialog" className={`${framtext == "" ? "hidden" : "block"}`}>
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
                                <span >{deliveryText.line3}</span>
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
                            <p className='product'>This Season Set a Sporty Fashion Trend with the HRX Mens<br/> Athleisure Tshirt.This Striped Casual Tshirt can be worn on <br/> its own or layered under a jacket or hoodie.</p>
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
            <div className='similar1'>Similar Products</div>
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
            <div className="load-more-container">
                <button className="load-more-btn" onClick={handleLoadMore}>
                    Load More
                </button>
            </div>
            <Footer/>
        </>
    );
};

export default Product1;
