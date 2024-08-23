import React, { useState, useEffect, useContext } from 'react';
import { Range, getTrackBackground } from 'react-range';
import axios from 'axios';
import '../AllP.css';
import Header from '../Header';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { WishlistContext } from '../WishlistContext';
import Footer from '../Footer';
import image9 from '../images/image 13.png'
import image10 from '../images/image 14.png'
// import image11 from './images/image15.png'
import image12 from '../images/image 13 (3).png'
import image13 from '../images/image15.png'
import image14 from '../images/image 16.png'
import image15 from '../images/transparent.png'
import image16 from '../images/image 15 1.png'
import image17 from '../images/image 124.png'
const STEP = 1;
const MIN = 0;
const MAX = 2000;

function Filter() {
    const [priceRange, setPriceRange] = useState([MIN, MAX]);
    const [selectedColors, setSelectedColors] = useState([]);
    const [selectedMaterials, setSelectedMaterials] = useState([]);
    const [selectedColor, setSelectedColor] = useState('');
    const [favoriteCards, setFavoriteCards] = useState({});
    const [wishlist, setWishlist] = useState([]);
    // const [cards, setCards] = useState([]);
    const { addToWishlist, wishlistItems, removeFromWishlist } = useContext(WishlistContext);
    const navigate = useNavigate();
    const [cards, setCards] = useState([
        { id: 1, imageUrl: image9, price: '1,200', description: "Veneer Wall Light" },
        { id: 2, imageUrl: image10, price: '4,200', description: "Brass Diya" },
        { id: 3, imageUrl: image12, price: '800', description: "Structured Curved Bill Cap" },
        { id: 4, imageUrl: image13, price: '499', description: "Personalized Notebooks" },
        { id: 5, imageUrl: image14, price: '80', height: '160px', description: "Win Connect Ball Pen Blue" },
        { id: 6, imageUrl: image15, price: '1,500', description: "Acrylic Photo Frame A4" },
        { id: 7, imageUrl: image16, price: '200', description: "Mug, dark turquoise" },
        { id: 8, imageUrl: image17, price: '1,400', description: "Decor Fountain" },
    ]);
    const parsePrice = (price) => {
        if (typeof price === 'number') {
            return price;
        } else if (typeof price === 'string') {
            const numericPrice = parseFloat(price);
            console.log(`Parsing price: ${price} => ${numericPrice}`);
            return isNaN(numericPrice) ? 0 : numericPrice;
        }
        return 0;
    };
    const handleCardClick = (id) => {
        switch (id) {
            case 1:
                navigate('/product3');
                break;
            case 2:
                navigate('/product4');
                break;
            case 3:
                navigate('/product1');
                break;
            case 4:
                navigate('/product5');
                break;
            case 5:
                navigate('/product6');
                break;
            case 6:
                navigate('/product2');
                break;
            case 7:
                navigate('/product7');
                break;
            case 8:
                navigate('/product8');
                break;
            default:
                break;
        }
    };

    const handleFavoriteButtonClick = async (id, e) => {
        e.stopPropagation();
        e.preventDefault();

        const selectedCard = cards.find((card) => card.id === id);
        if (!selectedCard) {
            console.error('Card not found for id:', id);
            return;
        }

        const isFavorite = favoriteCards[id];

        try {
            if (isFavorite) {
                await removeFromWishlist(id);
            } else {
                await addToWishlist(selectedCard);
            }

            setFavoriteCards((prev) => {
                const updatedFavoriteCards = {
                    ...prev,
                    [id]: !prev[id],
                };
                localStorage.setItem('favoriteCards', JSON.stringify(updatedFavoriteCards));
                return updatedFavoriteCards;
            });
        } catch (error) {
            console.error('Error managing wishlist:', error);
        }
    };

    const handleMaterialChange = (material) => {
        if (selectedMaterials.includes(material)) {
            setSelectedMaterials(selectedMaterials.filter((m) => m !== material));
        } else {
            setSelectedMaterials([...selectedMaterials, material]);
        }
    };

    const handleClearAll = () => {
        setPriceRange([MIN, MAX]);
        setSelectedColors([]);
        setSelectedMaterials([]);
    };
    const handleColorChange = (color) => {
        setSelectedColor(color);
    };
    const filteredCards = cards.filter(card => {
        const cardPrice = parsePrice(card.price);
        console.log(`Card: ${card.description}, Original Price: ${card.price}, Parsed Price: ${cardPrice}`); // Debug statement
        return cardPrice >= priceRange[0] && cardPrice <= priceRange[1];
    });

    console.log('Filtered cards:', filteredCards); // Debug statement
    console.log('Current price range:', priceRange);

    return (
        <>
            <Header />
            <div className="main-container">
                <div className="filter-container">
                    <div className="filter-header">
                        <h2>Filters</h2>
                        <button className="clear-all" onClick={handleClearAll}>
                            Clear All
                        </button>
                    </div>

                    <div className="filter-option1">
                        <label htmlFor="out-of-stock">Out of Stock</label>
                        <div className="show-hide">
                            <button>Show</button>
                            <button>Hide</button>
                        </div>
                    </div>

                    <div className="filter-option">
                        <label htmlFor="price">Price</label>
                        <div className="price-range">
                            <input
                                type="number"
                                min="0"
                                max={MAX}
                                value={priceRange[0]}
                                onChange={(event) =>
                                    setPriceRange([parseInt(event.target.value, 10), priceRange[1]])
                                }
                            />
                            <span>to</span>
                            <input
                                type="number"
                                min="0"
                                max={MAX}
                                value={priceRange[1]}
                                onChange={(event) =>
                                    setPriceRange([priceRange[0], parseInt(event.target.value, 10)])
                                }
                            />
                        </div>
                        <div className="price-slider-container">
                            <Range
                                values={priceRange}
                                step={STEP}
                                min={MIN}
                                max={MAX}
                                onChange={(values) => setPriceRange(values)}
                                renderTrack={({ props, children }) => (
                                    <div
                                        {...props}
                                        style={{
                                            ...props.style,
                                            height: '6px',
                                            width: '100%',
                                            background: getTrackBackground({
                                                values: priceRange,
                                                colors: ['#ccc', '#548BF4', '#ccc'],
                                                min: MIN,
                                                max: MAX,
                                            }),
                                        }}
                                    >
                                        {children}
                                    </div>
                                )}
                                renderThumb={({ index, props }) => (
                                    <div
                                        {...props}
                                        style={{
                                            ...props.style,
                                            height: '24px',
                                            width: '24px',
                                            backgroundColor: '#FFF',
                                            border: '1px solid #CCC',
                                            borderRadius: '50%',
                                        }}
                                    >
                                        <div style={{ position: 'absolute', top: '-28px', color: '#fff' }}>
                                            {priceRange[index]}
                                        </div>
                                    </div>
                                )}
                            />
                        </div>
                        <br/>

                    </div>
                    <div className="filter-option">
                        <label className="colors" htmlFor="colors">Colors</label>

                        <div className="color-options">
                            <div className="color-option" style={{ backgroundColor: 'red' }} onClick={() => handleColorChange('red')} />
                            <div className="color-option" style={{ backgroundColor: 'yellow' }} onClick={() => handleColorChange('yellow')} />
                            <div className="color-option" style={{ backgroundColor: 'black' }} onClick={() => handleColorChange('black')} />
                            <div className="color-option" style={{ backgroundColor: 'blue' }} onClick={() => handleColorChange('blue')} />
                            <div className="color-option" style={{ backgroundColor: 'maroon' }} onClick={() => handleColorChange('maroon')} />
                        </div>
                    </div>
                    <br/>
                    <div className="filter-option">
                        <div className="section">
                            <h3 className="section-title">Material</h3>
                            <div className="material-options">
                                <div className="material-option">

                                    <label htmlFor="material-1">Available Only</label>
                                    <input type="checkbox" id="material-1" onChange={() => handleMaterialChange('material-1')} />
                                </div>
                                <div className="material-option">
                                    <label htmlFor="material-2">Available Only</label>
                                    <input type="checkbox" id="material-2" onChange={() => handleMaterialChange('material-2')} />

                                </div>
                                <div className="material-option">
                                    <label htmlFor="material-3">Available Only</label>
                                    <input type="checkbox" id="material-3" onChange={() => handleMaterialChange('material-3')} />

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="cards-container1">
                    {filteredCards.length > 0 ? (
                        filteredCards.map(card => (
                            <div key={card.id} className="card-wrapper" style={{ cursor: 'pointer' }}>
                                <div className="card1">
                                    <div className="card-header">
                                        <img
                                            src={card.imageUrl}
                                            alt="product"
                                            style={{ height: card.height }}
                                            className="card-image1"
                                            onClick={() => handleCardClick(card.id)}
                                        />
                                        <button
                                            className="favorite-btn"
                                            onClick={(e) => handleFavoriteButtonClick(card.id, e)}
                                            style={{
                                                cursor: 'pointer',
                                                border: 'none',
                                                background: 'none',
                                                padding: '5px',
                                            }}
                                        >
                                            <i
                                                className={`fa-heart ${favoriteCards[card.id] ? 'fas' : 'far'}`}
                                                style={{ color: favoriteCards[card.id] ? 'red' : '#23387A', fontSize: '24px' }}
                                            ></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="card-info">
                                    <p className="image-description">{card.description}</p>
                                    <p className="price">
                                        <span dangerouslySetInnerHTML={{ __html: card.price }} />
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No products available in this price range.</p>
                    )}
                </div>

            </div >
            <Footer />
        </>
    );
}

export default Filter;

// import React, { useState, useEffect } from 'react';
// import './Catalog.css'; // Import your CSS file
// import Header from '../Header';
// import { driver } from 'driver.js';
// import 'driver.js/dist/driver.css';
// import Footer from '../Footer';

// const svgBorderPaths = {
//     Normal: 'M 0,0 L 600,0 L 600,400 L 0,400 Z',
//     RoundEdge: 'M 30,0 H 570 A 30,30 0 0 1 600,30 V 370 A 30,30 0 0 1 570,400 H 30 A 30,30 0 0 1 0,370 V 30 A 30,30 0 0 1 30,0 Z',
//     Circle: 'M 300,200 m -150,0 a 150,150 0 1,0 300,0 a 150,150 0 1,0 -300,0',
//     Oval: 'M 300,200 m -200,0 a 200,100 0 1,0 400,0 a 200,100 0 1,0 -400,0',
//     Square: 'M 0,0 H 400 V 400 H 0 Z',
//     RoundEdgeSquare: 'M 30,0 H 370 A 30,30 0 0 1 400,30 V 370 A 30,30 0 0 1 370,400 H 30 A 30,30 0 0 1 0,370 V 30 A 30,30 0 0 1 30,0 Z'
// };

// function App() {
//     const [selectedShape, setSelectedShape] = useState(null);
//     const [selectedThickness, setSelectedThickness] = useState(null);
//     const [borderColor, setBorderColor] = useState('black');
//     const [selectedImage, setSelectedImage] = useState('https://i.pinimg.com/736x/86/e0/62/86e0627f43de01aa0c71de63918c7777.jpg');
//     const [imageSelected, setImageSelected] = useState(false);
//     const [showTextInput, setShowTextInput] = useState(false);
//     const [text, setText] = useState('');
//     useEffect(() => {
//         const driverObj = driver({
//             animate: false,
//             showProgress: false,
//             showButtons: ['next', 'previous', 'close'],
//             steps: [
//                 { element: '.header', popover: { title: 'Header', description: 'This is the header section.', side: "bottom", align: 'start' }},
//                 { element: '.image-preview', popover: { title: 'Image Preview', description: 'Here you can see the preview of your selected image.', side: "top", align: 'start' }},
//                 { element: '.shape-options', popover: { title: 'Shape Options', description: 'Select a shape for your acrylic photo.', side: "right", align: 'start' }},
//                 { element: '.size-buttons', popover: { title: 'Size Options', description: 'Choose the size of your acrylic photo.', side: "bottom", align: 'start' }},
//                 { element: '.thickness-buttons', popover: { title: 'Thickness Options', description: 'Select the thickness of the acrylic.', side: "top", align: 'start' }},
//                 { element: '.buy-button', popover: { title: 'Buy Now', description: 'Click here to purchase your acrylic photo.', side: "top", align: 'start' }},
//                 { popover: { title: 'Happy Coding', description: 'And that is all, go ahead and start adding tours to your applications.' } }
//             ]
//         });

//         driverObj.drive();
//     }, []);

//     const handleShapeClick = (shape) => {
//         setSelectedShape(shape);
//     };

//     const handleThicknessClick = (thickness) => {
//         setSelectedThickness(thickness);
//     };

//     const handleImageUpload = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             const reader = new FileReader();
//             reader.onloadend = () => {
//                 setSelectedImage(reader.result);
//                 setImageSelected(true);
//             };
//             reader.readAsDataURL(file);
//         }
//     };

//     const handleIconClick = (color) => {
//         setBorderColor(color);
//     };
//     const handleTextClick = () => {
//         setShowTextInput(true);
//     };

//     const handleTextChange = (e) => {
//         setText(e.target.value);
//     };

//     const handleTextSubmit = (e) => {
//         e.preventDefault();
//         setShowTextInput(false);
//     };
//     return (
//         <>
//             <Header />
//             <div className="container">
//                 <div className="header" id="tour-example">
//                     <h1 className='photo'>Acrylic Photo Borders</h1>
//                     <br/>

//                     <div className="user-icons">
//                         <div className="icon1 icon-black" onClick={() => handleIconClick('black')}><img src='https://i.pinimg.com/564x/0a/80/8d/0a808da17a977f59125e56a1c9a0ae13.jpg'/></div>
//                         <div className="icon1 icon-blue" onClick={() => handleIconClick('blue')}><img src='https://i.pinimg.com/564x/0a/80/8d/0a808da17a977f59125e56a1c9a0ae13.jpg'/></div>
//                         <div className="icon1 icon-yellow" onClick={() => handleIconClick('yellow')}><img src='https://i.pinimg.com/564x/0a/80/8d/0a808da17a977f59125e56a1c9a0ae13.jpg'/></div>
//                         <div className="icon1 icon-green" onClick={() => handleIconClick('green')}><img src='https://i.pinimg.com/564x/0a/80/8d/0a808da17a977f59125e56a1c9a0ae13.jpg'/></div>
//                         <div className="icon1 icon-red" onClick={() => handleIconClick('red')}><img src='https://i.pinimg.com/564x/0a/80/8d/0a808da17a977f59125e56a1c9a0ae13.jpg'/></div>
//                     </div>
//                 </div>

//                 <div className="image-preview">
//                     <div className={`image-container ${selectedShape}`} style={{ borderColor: borderColor }}>
//                         {!imageSelected && (
//                             <>
//                                 <img src={selectedImage} alt="Preview" />
//                                 <div className="preview-text">PREVIEW</div>
//                             </>
//                         )}
//                         {imageSelected && (
//                              <>
//                              <img src={selectedImage} alt="Selected" />
//                              {text && <div className="overlay-text">{text}</div>}
//                          </>
//                         )}
//                     </div>
//                 </div>

//                 <div className="options">
//                     <button className="option" onClick={() => document.getElementById('fileInput').click()}>
//                         Select Photo
//                     </button>
//                     <input
//                         type="file"
//                         id="fileInput"
//                         style={{ display: 'none' }}
//                         accept="image/*"
//                         onChange={handleImageUpload}
//                     />
//                    <button className="option" onClick={handleTextClick}>Text</button>
//                 {showTextInput && (
//                     <form onSubmit={handleTextSubmit} className="text-input-form">
//                         <input
//                             type="text"
//                             value={text}
//                             onChange={handleTextChange}
//                             placeholder="Enter your text"
//                             className="text-input"
//                         />
//                         <button type="submit">Add Text</button>
//                     </form>
//                 )}
//                 </div>

//                 <div className="shapes-container">
//                     <h2 className='acrylic'>Acrylic Photo Shapes</h2>
//                     <br />
//                     <br />
//                     <div className="shape-options">
//                         {/* Rectangle Shape */}
//                         <svg
//                             viewBox="0 0 600 400"
//                             className={`shape-svg1 ${selectedShape === 'rectangle' ? 'selected' : ''}`}
//                             onClick={() => handleShapeClick('rectangle')}
//                         >
//                             <rect x="10" y="10" width="580" height="380" fill="#c1995d" stroke="black" strokeWidth="5" />
//                         </svg>

//                         {/* Square Shape */}
//                         <svg
//                             viewBox="0 0 400 400"
//                             className={`shape-svg2 ${selectedShape === 'square' ? 'selected' : ''}`}
//                             onClick={() => handleShapeClick('square')}
//                         >
//                             <rect x="10" y="10" width="380" height="380" fill="#c1995d" stroke="black" strokeWidth="5" />
//                         </svg>

//                         {/* Circle Shape */}
//                         <svg
//                             viewBox="0 0 400 400"
//                             className={`shape-svg3 ${selectedShape === 'circle' ? 'selected' : ''}`}
//                             onClick={() => handleShapeClick('circle')}
//                         >
//                             <circle cx="200" cy="200" r="190" fill="#c1995d" stroke="black" strokeWidth="5" />
//                         </svg>

//                         {/* Oval Shape */}
//                         <svg
//                             viewBox="0 0 400 400"
//                             className={`shape-svg4 ${selectedShape === 'oval' ? 'selected' : ''}`}
//                             onClick={() => handleShapeClick('oval')}
//                         >
//                             <ellipse cx="200" cy="200" rx="200" ry="100" fill="#c1995d" stroke="black" strokeWidth="5" />
//                         </svg>
//                     </div>
//                 </div>

//                 <br />
//                 <br />
//                 <div className="size-options">
//                     <h3>Size (Inch): 12x9</h3>
//                     <div className="size-buttons">
//                         <button className="size-button">12x9</button>
//                         <button className="size-button">11x11</button>
//                         <button className="size-button">16x12</button>
//                         <button className="size-button">16x16</button>
//                         <button className="size-button">21x15</button>
//                         <button className="size-button">35x23</button>
//                     </div>
//                 </div>

           

//                 <div className="thickness-options">
//                     <h3>Thickness</h3>
//                     <div className="thickness-buttons">
//                         <button className="thickness-button" onClick={() => handleThicknessClick('5mm')}>5mm</button>
//                         <button className="thickness-button" onClick={() => handleThicknessClick('10mm')}>10mm</button>
//                         <button className="thickness-button" onClick={() => handleThicknessClick('15mm')}>15mm</button>
//                     </div>
//                 </div>

             

//                 <button className="buy-button">Buy Now</button>
//             </div>
//             <Footer/>
//         </>
//     );
// }

// export default App;



{/* <div
                        className={`shape ${selectedShape === '1x1' ? 'selected' : ''}`}
                        onClick={() => handleShapeClick('1x1')}
                    ></div>
                    <div
                        className={`shape ${selectedShape === '1x2' ? 'selected' : ''}`}
                        onClick={() => handleShapeClick('1x2')}
                    ></div>
                    <div
                        className={`shape ${selectedShape === '1x3' ? 'selected' : ''}`}
                        onClick={() => handleShapeClick('1x3')}
                    ></div>
                    <div
                        className={`shape ${selectedShape === '1x4' ? 'selected' : ''}`}
                        onClick={() => handleShapeClick('1x4')}
                    ></div> */}