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
    Normal: [rect1, rect2],
    RoundEdge: ['round1.jpg', 'round2.jpg', 'round3.jpg', 'round4.jpg'],
    Circle: [ 'circle2.jpg', 'circle3.jpg', 'circle4.jpg'],
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
        name: 'Acrylic Photo Frame',
        price: '&#8377;1,200',
    };

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
    };

    const getShapePath = (shape) => {
        return svgBorderPaths[shape] || '';
    };

    return (
        <>
            <Header/>
            <div className="product-detail">
                <div className="breadcrumb">Home / {product.name}</div>
                <div className="content">
                    <div className="image3"style={{ position: 'relative' }}>
                        <div className="image-placeholder" style={{ position: 'relative', width: `${size.split(' ')[0] * 15}px`, height: `${size.split(' ')[2] * 15}px`, zIndex: '2' }}>

                            {selectedImage && (
                                <img src={selectedImage} alt="Selected" style={{ width: '60%', height: '60%', objectFit: 'cover', clipPath: `url(#${selectedShape})` ,zIndex: '2'}} />
                            )}
                            {selectedImage1 && (
                                <img src={selectedImage1} alt="Selected" style={{ width: '100%', height: '100%', objectFit: 'cover', clipPath: `url(#${selectedShape})` ,zIndex: '1'}} />
                            )}
                        </div>
                        <div className="image-options" style={{ position: 'relative', zIndex: '2' }}>
                            <div style={{ position: 'absolute',bottom:'-82px', left: '40rem', display: 'flex', flexDirection: 'column', gap: '10px', zIndex: '2' }}>
                                {Object.keys(shapeImages).map((shape) => (
                                    <svg
                                        key={shape}
                                        viewBox="0 0 600 400"
                                        width="50"
                                        height="50"
                                        className={`${shape} activeshape`}
                                        onClick={() => handleShapeClick(shape)}
                                        style={{ cursor: 'pointer', border: selectedShape === shape ? '2px solid blue' : 'none', position: 'relative', zIndex: '1' }}
                                    >
                                        <path d={getShapePath(shape)} fill="#c1995d" />
                                    </svg>
                                ))}
                            </div>
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
                            <div className="image-list" style={{ zIndex: '2' }}>
                                {imageList.map((image, index) => (
                                    <img
                                        key={index}
                                        src={image}
                                        alt={`Shape ${index + 1}`}
                                        style={{ width: '50px', height: '50px',cursor: 'pointer' }}
                                        onClick={() => handleImageClick(image)}
                                    />
                                ))}
                            </div>
                            <input type="file" accept="image/*" onChange={handleImageUpload} style={{ position: 'absolute', top: 0, left: 0, opacity: 0, zIndex: '3' }} id="imageUpload" />
                            <label htmlFor="imageUpload" className="select-photo-button" style={{ position: 'absolute', top: 0, left: 0, zIndex: '4', cursor: 'pointer' }}>Select Photo</label>
                        </div>
                    </div>

                    <div className="scrollable-content2">
                        <div className="product-info">
                            <h1 className='product-name'>{product.name}</h1>
                            <p className="price" dangerouslySetInnerHTML={{ __html: product.price }}></p>
                            <h3 className='selected'>Selected Quantity</h3>
                            <div className="quantity-selector">
                                <button onClick={handleDecrement} className="quantity-btn">-</button>
                                <div className="quantity">{quantity}</div>
                                <button onClick={handleIncrement} className="quantity-btn">+</button>
                            </div>
                            <h3 className='selected'>Thickness</h3>
                            <div className="dropdown-container">
                                <select value={thickness} onChange={(e) => setThickness(e.target.value)}>
                                    <option value="">Select Thickness</option>
                                    <option value="3mm">3mm</option>
                                    <option value="8mm">8mm</option>
                                </select>
                            </div>
                            <h3 className='selected'>Size</h3>
                            <div className="dropdown-container">
                                <select value={size} onChange={(e) => setSize(e.target.value)}>
                                    <option value="">Select Size</option>
                                    <option value="12 x 8">12 x 8</option>
                                    <option value="18 x 12">18 x 12</option>
                                    <option value="21 x 15">21 x 15</option>
                                </select>
                            </div>
                            <h3>Free Delivery</h3>
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
                                <span className="delivery-line">{deliveryText.line2}</span>
                                <br />
                                <span className="delivery-line">{deliveryText.line3}</span>
                                <br />
                                <span className="delivery-line">{deliveryText.line4}</span>
                            </p>

                            <h3>Description</h3>
                            <p className="best-price">Home Decor Gift: Perfect for Home Decor as it’s a Beautiful Gift.</p>
                            <ul className="offer-details">
                                <li>Unidirectional Pixel Perfect Direct Printing On Acrylic</li>
                                <li>Super HD Print Output 1200*2400 DPI</li>
                                <li>Acrylic Chemical Treatment Before Printing</li>
                                <li>Never peel off,even moisture environment</li>
                                <li>Unidirectional mode means we give 2x time each picture</li>
                                <li>Same Day Processing of orders</li>
                                <li>Same Day Processing of orders</li>
                                <li>Advanced use of Artificial Intelligence</li>
                            </ul>
                            <p>The perfect home decor gift with a beautiful gloss finish.</p>
                            <p>Buy your acrylic photo online with us in different sizes.<br /> The available size option for you to choose from to customize<br /> your acrylic photo prints in inches are: 12×9, 18×11, 21×15</p>
                            <h3>Image Requirement</h3>
                            <p className='product'>Kindly provide high resolution, non-blurry pictures for<br /> printing. We cannot fix quality/blur and other such issues at<br /> our end. Refund will not be eligible due to poor quality or<br /> blurred pictures provided from customer end.</p>
                            <p>A high-quality image is required from your end to print the<br /> acrylic wall photo in high-definition. Make sure the photos<br /> you upload have a high resolution, are crystal clear and<br /> the contents are visible. As we cannot fix blurred or poor-quality<br /> pictures, your order will not be eligible for returns<br /> or refunds in case you provide low-quality images or screenshots.</p>
                            <p>Ideal gift for anniversary, birthday, festivals, valentine’s day<br /> and all other lovely occasions.</p>
                            <h3>Please, don’t use screenshots or social media<br /> shared photos.</h3>
                            <p>Processing & Shipping (Fastest Delivery via BlueDart)</p>
                            <p>Fulfilment & Processing Time: 1-3 Working days</p>
                            <p>Shipping & Delivery Time: 3-7 Working days across India</p>
                            <p >Note: Actual shipping & delivery time might be affected by<br /> COVID-19 restrictions and other non-avoidable issues <br /> affecting transportation.</p>
                            <h3>Additional Information</h3>
                            <p className='product'>Weight: 500gm</p>
                            <p className='product'>Dimensions: 33 x 26 x 2.5cm</p>
                            <p className='product'>Size (Inch) :           12×8, 11×11, 16×16, 18×12, 21×15,<br />
                                24×16, 30×20, 35×23</p>

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
