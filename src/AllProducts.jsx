import React, { useState, useEffect, useContext } from 'react';
import { Range, getTrackBackground } from 'react-range';
import axios from 'axios';
import './AllP.css';
import './Home.css';

import Header from './Header';
import { Link ,useLocation, useSearchParams} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { WishlistContext } from './WishlistContext';
import Footer from './Footer';
const STEP = 1;
const MIN = 0;
const MAX = 1000;

function Filter() {
    const [priceRange, setPriceRange] = useState([MIN, MAX]);
    const [selectedColors, setSelectedColors] = useState([]);
    const [selectedMaterials, setSelectedMaterials] = useState([]);
    const [selectedColor, setSelectedColor] = useState('');
    const [favoriteCards, setFavoriteCards] = useState({});
    const [wishlist, setWishlist] = useState([]);
    const [cards, setCards] = useState([]);
    const { addToWishlist, wishlistItems, removeFromWishlist } = useContext(WishlistContext);
    const navigate = useNavigate();
    const location =useLocation();
    const queryparem=new URLSearchParams(location.search)
    const searchQuery=queryparem.get("search");
    console.log(searchQuery)
    useEffect(() => {
        const storedFavoriteCards = localStorage.getItem('favoriteCards');
        if (storedFavoriteCards) {
            setFavoriteCards(JSON.parse(storedFavoriteCards));
        }

        const storedWishlist = localStorage.getItem('wishlist');
        if (storedWishlist) {
            setWishlist(JSON.parse(storedWishlist));
        }
    }, []);

   
    
    useEffect(() => {
        axios.get(`https://api.hirdayam.com/api/getProductsforuser`, {
            params: {
                min_price: priceRange[0],
                max_price: priceRange[1]
            }
        })
            .then(response => {
                console.log('API response:', response.data); // Log the entire response
                if (response.data.status) {
                    const fetchedCards = response.data.data.data.map(product => ({
                        id: product._id,
                        imageUrl: product.image,
                        price: product.price,
                        description: product.name,
                        imagesUrl: product.images
                    }));
                    setCards(fetchedCards);
                    localStorage.setItem('fetchedCards', JSON.stringify(fetchedCards));
                    console.log('Fetched cards:', fetchedCards);
                }
            })
            .catch(error => {
                console.error('Error fetching data from API:', error);
            });
    }, [priceRange]);
    const handleFavoriteButtonClick = (id) => {
        console.log(id + "lksdsdjf")
        addToWishlist(id)
      }
    
   

    useEffect(() => {
        
        axios.get(`https://api.hirdayam.com/api/getProductsforuser?search=${searchQuery}`, {
            params: {
                min_price: priceRange[0],
                max_price: priceRange[1]
            }
        })
            .then(response => {
                console.log('API response:', response.data); // Log the entire response
                if (response.data.status) {
                    const fetchedCards = response.data.data.data.map(product => ({
                        id: product._id,
                        imageUrl: product.image,
                        price: product.price,
                        description: product.name,
                        imagesUrl: product.images
                    }));
                    setCards(fetchedCards);
                    localStorage.setItem('fetchedCards', JSON.stringify(fetchedCards));
                    console.log('Fetched cards:', fetchedCards);
                }
            })
            .catch(error => {
                console.error('Error fetching data from API:', error);
            });
    }, [searchQuery]);

    useEffect(() => {
        axios.get(`https://api.hirdayam.com/api/getProductsforuser/`, {
        })
            .then(response => {
                console.log('API response:',  response.data); // Log the entire response
                if (response.data.status) {
                    const fetchedCards = response.data.data.data.map(product => ({
                        id: product._id,
                        imageUrl: product.image,
                        price: product.price,
                        name: product.name,

                        imagesUrl: product.images
                    }));
                    setCards(fetchedCards);
                    localStorage.setItem('fetchedCards', JSON.stringify(fetchedCards));
                    console.log('Fetched cards:', fetchedCards);
                }
            })
            .catch(error => {
                console.error('Error fetching data from API:', error);
            });
    }, []);

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

    

    // const handleFavoriteButtonClick = async (id, e) => {
    //     e.stopPropagation(); // Prevent event propagation
    //     e.preventDefault();

    //     const selectedCard = cards.find((card) => card.id === id);
    //     if (!selectedCard) {
    //         console.error('Card not found for id:', id);
    //         return;
    //     }

    //     const isFavorite = favoriteCards[id];

    //     try {
    //         if (isFavorite) {
    //             await removeFromWishlist(id);
    //         } else {
    //             await addToWishlist(selectedCard);
    //         }

    //         setFavoriteCards((prev) => {
    //             const updatedFavoriteCards = {
    //                 ...prev,
    //                 [id]: !prev[id],
    //             };
    //             localStorage.setItem('favoriteCards', JSON.stringify(updatedFavoriteCards));
    //             return updatedFavoriteCards;
    //         });
    //     } catch (error) {
    //         console.error('Error managing wishlist:', error);
    //     }
    // };



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
            <div className="main-container ">
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

                    </div>
                    <div className="filter-option">
                        <label className="colors" htmlFor="colors">Colors</label>
                        <div className="colors">
                            {['red', 'yellow', 'black', 'blue', 'maroon'].map((color) => (
                                <div
                                    key={color}
                                    className={`color-circle ${selectedColor === color ? 'selected' : ''}`}
                                    style={{ backgroundColor: color }}
                                    onClick={() => setSelectedColor(color)}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="filter-option">
                        <label className="material-options" htmlFor="materials">Material</label>
                        <div className="material-options">
                            {['material-1', 'material-2', 'material-3'].map((material) => (
                                <label htmlFor={material} key={material}>
                                    <input
                                        type="checkbox"
                                        id={material}
                                        value={material}
                                        checked={selectedMaterials.includes(material)}
                                        onChange={() => handleMaterialChange(material)}
                                    />
                                    {material}
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="cards-container1">
                    {filteredCards.length > 0 ? (
                        filteredCards.map(card => (
                               
                                <div  className="card-wrapper" style={{ cursor: 'pointer' }}>
                <div className="card1">
                  <div className="card-header w-32 h-56 md:h-72   md:w-full">
                  <Link key={card.id} to={`/card/${card.id}`} className="card-link">

                    <img
                      src={card.imageUrl}
                      alt="product"
                      className="allProducts"
                     
                    />
                    </Link>
                    <button
                      className="favorite-btn"
                      onClick={(e) => handleFavoriteButtonClick(card.id)}
                      style={{
                        cursor: 'pointer',
                        border: 'none',
                        background: 'none',
                        padding: '5px',
                      }}
                    >
                      <i
                        className={`fa-heart ${wishlistItems.data.data.some(item => item.product._id === card.id) ? 'fas' : 'far'}`}
                        style={{ color: wishlistItems.data.data.some(item => item.product._id === card.id) ? 'red' : '#23387A', fontSize: '24px' }}

                      ></i>
                    </button>
                  </div>
                </div>

                <div className="card-info">
                  <p className="image-description">{card.name}</p>
                  <p className="price">
                    ₹{card.price}
                  </p>
                </div>
              </div>

                        ))
                    ) : (
                        <p>No products available in this price range.</p>
                    )}
                </div>
            </div>
            
            <Footer/>
        </>
    );
}

export default Filter;

