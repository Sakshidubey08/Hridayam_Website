// import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState,useContext } from 'react';
import './AllP.css';
import { Link } from 'react-router-dom';
import { WishlistContext } from './WishlistContext';
import Header from './Header';
import axios from 'axios';
import { Range, getTrackBackground } from 'react-range';
import { useNavigate,useLocation } from 'react-router-dom';
import Footer from './Footer';
import './AllP.css';
import '@fortawesome/fontawesome-free/css/all.min.css';


const STEP = 1;
const MIN = 0;
const MAX = 2000;
const ProductsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const productIds = query.get('ids')?.split(',');
  const [productsData, setProductsData] = useState([]);
  const [favoriteCards, setFavoriteCards] = useState({});
  const { addToWishlist, wishlistItems, removeFromWishlist } = useContext(WishlistContext);
  const [cards, setCards] = useState([]);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [priceRange, setPriceRange] = useState([MIN, MAX]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [selectedColor, setSelectedColor] = useState('');
  const [mobileviewfiltter , setmobileviewfiltter] =useState(true);
  const handleMaterialChange = (material) => {
    if (selectedMaterials.includes(material)) {
      setSelectedMaterials(selectedMaterials.filter((m) => m !== material));
    } else {
      setSelectedMaterials([...selectedMaterials, material]);
    }
  };
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await fetch('https://api.hirdayam.com/api/getProductsforuser');
//         const result = await response.json();
        
//         console.log('Full API response:', result);
  
//         // Check if the response has the 'data' and 'data' contains the products array
//         if (result?.status && result?.data?.data?.length > 0) {
//           const products = result.data.data; // Accessing the products array from 'data'
//           console.log('Filtered Products:', products);
  
//           setProducts(products.filter(product => productIds.includes(product._id)));
//         } else {
//           console.error('API response does not contain valid data or products array.');
//         }
//       } catch (error) {
//         console.error('Failed to fetch products:', error);
//       }
//     };
  
//     fetchProducts();
//   }, []);
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
useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://api.hirdayam.com/api/getProductsforuser');
        const result = await response.json();
        
        console.log('Full API response:', result);

        if (result?.status && result?.data?.data?.length > 0) {
          const allProducts = result.data.data;
          
          const filteredProducts = allProducts.filter(product => productIds.includes(product._id));
          
          console.log('Filtered Products:', filteredProducts);
          setProducts(filteredProducts);
        } else {
          console.error('API response does not contain valid data or products array.');
          setError('No products found');
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
        setError('Error fetching products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
 
  const handleIconClick = () => {
    setFiltersVisible(!filtersVisible);
  };
  const handleColorChange = (color) => {
    setSelectedColor(color);
  };
  const filteredProducts = productsData.filter(product => {
    const productPrice = parsePrice(product.price);
    return productPrice >= priceRange[0] && productPrice <= priceRange[1];
  });
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
const handleProductClick = (productId) => {
  navigate(`/similar/${productId}`); 
};

const [filtersVisible, setFiltersVisible] = useState(true);

const handleClearAll = () => {
  // Hide filters and reposition the cards-container1
  setFiltersVisible(false);
};
  return (
    <>
    <Header/>
    <div onClick={() => { setmobileviewfiltter(!mobileviewfiltter) }} className='btn relative  md:hidden top-20 left-5'>
        <svg className='text-black relative left-0' width={"1.3rem"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M6.17071 18C6.58254 16.8348 7.69378 16 9 16C10.3062 16 11.4175 16.8348 11.8293 18H22V20H11.8293C11.4175 21.1652 10.3062 22 9 22C7.69378 22 6.58254 21.1652 6.17071 20H2V18H6.17071ZM12.1707 11C12.5825 9.83481 13.6938 9 15 9C16.3062 9 17.4175 9.83481 17.8293 11H22V13H17.8293C17.4175 14.1652 16.3062 15 15 15C13.6938 15 12.5825 14.1652 12.1707 13H2V11H12.1707ZM6.17071 4C6.58254 2.83481 7.69378 2 9 2C10.3062 2 11.4175 2.83481 11.8293 4H22V6H11.8293C11.4175 7.16519 10.3062 8 9 8C7.69378 8 6.58254 7.16519 6.17071 6H2V4H6.17071ZM9 6C9.55228 6 10 5.55228 10 5C10 4.44772 9.55228 4 9 4C8.44772 4 8 4.44772 8 5C8 5.55228 8.44772 6 9 6ZM15 13C15.5523 13 16 12.5523 16 12C16 11.4477 15.5523 11 15 11C14.4477 11 14 11.4477 14 12C14 12.5523 14.4477 13 15 13ZM9 20C9.55228 20 10 19.5523 10 19C10 18.4477 9.55228 18 9 18C8.44772 18 8 18.4477 8 19C8 19.5523 8.44772 20 9 20Z"></path></svg>
        Filter</div>
    {/* <div className="main-container">
        
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

     
        </div> */}
        <div className="main-container">
      {/* Toggle Filters Section */}
      {filtersVisible ? (
        <div className="filter-container">
          <div className="filter-header">
            <h2>Filters</h2>
            {/* <div className="filter-toggle-icon" onClick={handleIconClick}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 4.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM12 11a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM12 17.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM4 3.5h16a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1z"/>
              </svg>
            </div> */}
            {/* <button class="clear-all" onClick={handleIconClick}> */}
            <button class="clear-all" onClick={handleIconClick}>
          <i class="fas fa-times clear-all-icon"></i> 
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
      ) : (
        // <div className="filter-toggle-icon" onClick={handleIconClick}>
        //   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
        //     <path d="M12 4.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM12 11a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM12 17.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM4 3.5h16a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1z"/>
        //   </svg>
        // </div>
        <div className="filter-container">

        <div className="filter-header">
            <h2>Filters</h2>
            <button className="clear-all" onClick={handleIconClick}>
              Clear All
            </button>
          </div>
          </div>
      )}
    {/* <div>
      {loading ? (
        <p>Loading products...</p>
      ) : error ? (
        <p>{error}</p>
      ) : products.length > 0 ? (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {products.map((product) => (
            <div
              key={product._id} // Use `_id` based on your API response
              onClick={() => handleProductClick(product._id)}
              style={{
                border: '1px solid #ccc',
                borderRadius: '10px',
                padding: '20px',
                cursor: 'pointer',
                width: '200px',
              }}
            >
              <img
                src={product.image} // Ensure `image` field exists
                alt={product.name}
                style={{ width: '100%', height: '150px', objectFit: 'cover' }}
              />
              <h3>{product.name}</h3>
              <p>Price: ${product.price}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No matching products found</p>
      )}
    </div> */}
    {/* <div className=" cards-container1  pt-20 md:pt-0"> */}
    <div className={`cards-container1 ${filtersVisible ? 'pt-20 md:pt-0' : 'center-content'}`}>
    <div>
      {loading ? (
        <p>Loading products...</p>
      ) : error ? (
        <p>{error}</p>
      ) : products.length > 0 ? (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }} >
          {products.map((product) => (
            // <div
            //   key={product._id} // Use `_id` based on your API response
            //   onClick={() => handleProductClick(product._id)}
            //   style={{
            //     border: '1px solid #ccc',
            //     borderRadius: '10px',
            //     padding: '20px',
            //     cursor: 'pointer',
            //     width: '200px',
            //   }}
            // >
            //   <img
            //     src={product.image} // Ensure `image` field exists
            //     alt={product.name}
            //     style={{ width: '100%', height: '150px', objectFit: 'cover' }}
            //   />
            //   <h3>{product.name}</h3>
            //   <p>Price: ${product.price}</p>
            // </div>
            <div key={product._id} className="card-wrapper" style={{ cursor: 'pointer' }}  onClick={() => navigate(`/similar/${product._id}`)}>
                <div className="card1">
                  <div className="card-header w-32 h-56 md:h-72   md:w-full">
                    <img
                      src={product.image}
                      alt="product"
                      className="card-image1"
                    />
                    <button
                      className="favorite-btn"
                      onClick={(e) => handleFavoriteButtonClick(product._id, e)}
                      style={{
                        cursor: 'pointer',
                        border: 'none',
                        background: 'none',
                        padding: '5px',
                      }}
                    >
                      <i
                        className={`fa-heart ${favoriteCards[product.id] ? 'fas' : 'far'}`}
                        style={{ color: favoriteCards[product.id] ? 'red' : '#23387A', fontSize: '24px' }}
                      ></i>
                    </button>
                  </div>
                </div>
                <div className="card-info">
                  <p className="image-description">{product.name}</p>
                  <p className="price">
                    ₹{product.price}
                  </p>
                </div>
              </div>
          ))}
        </div>
      ) : (
        <p>No matching products found</p>
      )}
     
     </div>
    </div>
</div>
<Footer/>
    </>
  );
};

export default ProductsPage;
