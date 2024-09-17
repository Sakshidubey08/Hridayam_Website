import React, { useState, useEffect, useContext } from 'react';
import { Range, getTrackBackground } from 'react-range';
import axios from 'axios';
import './AllP.css';
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
    const [mobileviewfiltter , setmobileviewfiltter] =useState(true);
    
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

    const handleColorChange = (color) =>{
        setSelectedColor(color);
      };
    
    // useEffect(() => {
    //     axios.get(`https://api.hirdayam.com/api/getProductsforuser`, {
    //         params: {
    //             min_price: priceRange[0],
    //             max_price: priceRange[1]
    //         }
    //     })
    //         .then(response => {
    //             console.log('API response:', response.data); // Log the entire response
    //             if (response.data.status) {
    //                 const fetchedCards = response.data.data.data.map(product => ({
    //                     id: product._id,
    //                     imageUrl: product.image,
    //                     price: product.price,
    //                     description: product.name,
    //                     imagesUrl: product.images
    //                 }));
    //                 setCards(fetchedCards);
    //                 localStorage.setItem('fetchedCards', JSON.stringify(fetchedCards));
    //                 console.log('Fetched cards:', fetchedCards);
    //             }
    //         })
    //         .catch(error => {
    //             console.error('Error fetching data from API:', error);
    //         });
    // }, [priceRange]);

   
useEffect(()=>{


    const fetchData = async () => {
        try {
            let response;

            // Check if searchQuery is present
            if (searchQuery) {
                // Fetch products with search query and price range
                response = await axios.get(`https://api.hirdayam.com/api/getProductsforuser`, {
                    params: {
                        search: searchQuery,
                        min_price: priceRange[0],
                        max_price: priceRange[1],
                       
                    },
                });

            
            }

            else if(selectedColors){
                response = await axios.get(`https://api.hirdayam.com/api/getProductsforuser`, {
                    params: {
                       color:selectedColor,
                        min_price: priceRange[0],
                        max_price: priceRange[1],
                       
                    },
                });
            }
            else {
                // Fetch products with only price range if no search query is provided
                response = await axios.get(`https://api.hirdayam.com/api/getProductsforuser`, {
                    params: {
                        min_price: priceRange[0],
                        max_price: priceRange[1],
                    },
                });
            }

            console.log('API response:', response.data); // Log the entire response
            if (response.data.status) {
                const fetchedCards = response.data.data.data.map((product) => ({
                    id: product._id,
                    imageUrl: product.image,
                    price: product.price,
                    description: product.name,
                    imagesUrl: product.images,
                }));
                setCards(fetchedCards);
                localStorage.setItem('fetchedCards', JSON.stringify(fetchedCards));
                console.log('Fetched cards:', fetchedCards);
            }
        } catch (error) {
            console.error('Error fetching data from API:', error);
        }
    };

    fetchData();
}, [priceRange, searchQuery,selectedColor]);

    // useEffect(() => {
    //     axios.get(`https://api.hirdayam.com/api/getProductsforuser/`, {
    //     })
    //         .then(response => {
    //             console.log('API response:',  response.data); // Log the entire response
    //             if (response.data.status) {
    //                 const fetchedCards = response.data.data.data.map(product => ({
    //                     id: product._id,
    //                     imageUrl: product.image,
    //                     price: product.price,
    //                     description: product.name,
    //                     imagesUrl: product.images
    //                 }));
    //                 setCards(fetchedCards);
    //                 localStorage.setItem('fetchedCards', JSON.stringify(fetchedCards));
    //                 console.log('Fetched cards:', fetchedCards);
    //             }
    //         })
    //         .catch(error => {
    //             console.error('Error fetching data from API:', error);
    //         });
    // }, []);

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

    

    const handleFavoriteButtonClick = async (id, e) => {
        e.stopPropagation(); // Prevent event propagation
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
        setSelectedColors('');
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
            
            <div onClick={() => { setmobileviewfiltter(!mobileviewfiltter) }} className='btn relative  md:hidden top-10 left-5'>
        <svg className='text-black relative left-0' width={"1.3rem"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M6.17071 18C6.58254 16.8348 7.69378 16 9 16C10.3062 16 11.4175 16.8348 11.8293 18H22V20H11.8293C11.4175 21.1652 10.3062 22 9 22C7.69378 22 6.58254 21.1652 6.17071 20H2V18H6.17071ZM12.1707 11C12.5825 9.83481 13.6938 9 15 9C16.3062 9 17.4175 9.83481 17.8293 11H22V13H17.8293C17.4175 14.1652 16.3062 15 15 15C13.6938 15 12.5825 14.1652 12.1707 13H2V11H12.1707ZM6.17071 4C6.58254 2.83481 7.69378 2 9 2C10.3062 2 11.4175 2.83481 11.8293 4H22V6H11.8293C11.4175 7.16519 10.3062 8 9 8C7.69378 8 6.58254 7.16519 6.17071 6H2V4H6.17071ZM9 6C9.55228 6 10 5.55228 10 5C10 4.44772 9.55228 4 9 4C8.44772 4 8 4.44772 8 5C8 5.55228 8.44772 6 9 6ZM15 13C15.5523 13 16 12.5523 16 12C16 11.4477 15.5523 11 15 11C14.4477 11 14 11.4477 14 12C14 12.5523 14.4477 13 15 13ZM9 20C9.55228 20 10 19.5523 10 19C10 18.4477 9.55228 18 9 18C8.44772 18 8 18.4477 8 19C8 19.5523 8.44772 20 9 20Z"></path></svg>
        Filter</div>
            <div className="main-container ">
                <div className="filter-container hidden md:block">
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
                    <div className="filter-option hidden">
                        <label className="material-options " htmlFor="materials">Material</label>
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
                <div className="cards-container1 pt-10 md:pt-0">
                    {filteredCards.length > 0 ? (
                        filteredCards.map(card => (
                            <Link key={card.id} to={`/card/${card.id}`} className="card-link">
                                <div className="card-wrapper">
                                    <div className='card1 w-40 md:w-full rounded-md'>
                                        <div className='card-header w-32 h-56 md:h-72   md:w-52'>
                                           <div className='h-full w-full flex items-center justify-center'>
                                            <img className='card-image1 rounded-xl  w-23 flex   object-contain m-0 p-0' src={card.imageUrl} alt={card.description} />
                                            </div>
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
                                        <div className='card-info overflow-hidden my-3'>
                                                <h3 className='image-descriptio  '>{card.description}</h3>
                                            <p className='price'>{card.price}</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <p>No products available in this price range.</p>
                    )}
                </div>


            </div>

            <div className={`fixed block md:hidden  transition-all duration-700 ease-in-out ${mobileviewfiltter == true ? 'translate-y-full' : 'translate-y-0'} ${mobileviewfiltter == false ? 'translate-y-0' : 'translate-y-full'}  bottom-0 z-50 ml-0 p-0  w-full h-screen`}>
          <div onClick={() => { setmobileviewfiltter(!mobileviewfiltter) }} className={`transition-all duration-75 ease-in ${mobileviewfiltter == true ? '' : 'bg-black/30'} ${mobileviewfiltter == false ? 'bg-black/30' : ''} h-full w-full `}></div>
          <div className={`w-full h-1/2 overflow-auto    bg-white  absolute rounded-t-3xl bottom-0 transition-transform duration-700 ease-in-out  ${mobileviewfiltter == true ? 'translate-y-full' : 'translate-y-0'} ${mobileviewfiltter == false ? 'translate-y-0' : 'translate-y-full'}`}>
            <div onClick={() => { setmobileviewfiltter(!mobileviewfiltter) }} className=' absolute right-4 top-4 bg-black/30 rounded-full flex items-center justify-center  h-7 w-7'>X</div>
            <div className="filter-container m-0 mx-9 pt-20 p-0">
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
                <br />

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
              <br />
              <div className="filter-option hidden">
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
          </div>
        </div>
            
            <Footer/>
        </>
    );
}

export default Filter;

