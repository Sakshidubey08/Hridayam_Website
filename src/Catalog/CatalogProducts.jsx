// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';

// const CatalogProducts = () => {
//   const { catalog_id } = useParams();
//   const [productsData, setProductsData] = useState([]);

//   useEffect(() => {
//     // Fetch products data for the selected catalog ID
//     const fetchProducts = async () => {
//       try {
//         const response = await fetch(`https://hridayam.dasoclothings.in/api/ProductbycatalogId?catalog_id=${catalog_id}`, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         });
//         const result = await response.json();

//         if (result.status) {
//           setProductsData(result.data);
//         } else {
//           console.error('Failed to retrieve products:', result.message);
//         }
//       } catch (error) {
//         console.error('Error fetching products:', error);
//       }
//     };

//     fetchProducts();
//   }, [catalog_id]);

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-4 sm:mx-8 md:mx-20 mt-20">
//       {productsData.map((product) => (
//         <div
//           key={product._id}
//           className="relative bg-gray-200 w-full h-60 sm:h-64 md:h-80 lg:h-96 cursor-pointer"
//         >
//           <img src={product.image} className="object-cover w-full h-full" alt={product.name} />
//           <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
//             <h5
//               style={{ fontFamily: 'Rosarivo' }}
//               className="text-white text-center text-xl"
//               dangerouslySetInnerHTML={{ __html: product.name }}
//             ></h5>
//             <p className="text-white text-center text-lg">${product.price}</p>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default CatalogProducts;
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';

// const CatalogProducts = () => {
//   const { catalog_id } = useParams();
//   const [productsData, setProductsData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!catalog_id) {
//       console.error('Catalog ID is missing from URL parameters.');
//       return;
//     }

//     const fetchCatalog = async () => {
//       try {
//         // Fetch catalog data
//         const response = await fetch(`https://hridayam.dasoclothings.in/api/getCatelogsforuser?catalog_id=${catalog_id}`, {
//           method: 'GET',
//         });

//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const result = await response.json();

//         if (result.status && result.data && result.data.data && result.data.data.length > 0) {
//           const catalog = result.data.data[0]; // Assuming you get a single catalog

//           if (catalog.product_ids && catalog.product_ids.length > 0) {
//             const productIds = catalog.product_ids;

//             // Fetch product details using the product IDs
//             const productsResponse = await fetch('https://hridayam.dasoclothings.in/api/ProductbycatalogId?catelog_id=' + catalog_id, {
//               method: 'GET',
//             });

//             if (!productsResponse.ok) {
//               throw new Error(`HTTP error! status: ${productsResponse.status}`);
//             }

//             const productsResult = await productsResponse.json();

//             if (productsResult.status && productsResult.data && productsResult.data.length > 0) {
//               const products = productsResult.data.map(product => ({
//                 _id: product._id,
//                 name: product.name,
//                 image: product.image,
//                 price: product.price,
//               }));

//               setProductsData(products);
//             } else {
//               console.error('Failed to retrieve products data:', productsResult.message);
//             }
//           } else {
//             console.log('No products found for this catalog.');
//           }
//         } else {
//           console.error('Failed to retrieve catalog data:', result.message);
//         }
//       } catch (error) {
//         console.error('Error fetching catalog:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCatalog();
//   }, [catalog_id]);

//   if (loading) {
//     return <div>Loading products...</div>;
//   }

//   if (!productsData.length) {
//     return <div>No products found.</div>;
//   }

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-4 sm:mx-8 md:mx-20 mt-20">
//       {productsData.map((product) => (
//         <div
//           key={product._id}
//           className="relative bg-gray-200 w-full h-60 sm:h-64 md:h-80 lg:h-96 cursor-pointer"
//         >
//           <img src={product.image} className="object-cover w-full h-full" alt={product.name} />
//           <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
//             <h5
//               style={{ fontFamily: 'Rosarivo' }}
//               className="text-white text-center text-xl"
//               dangerouslySetInnerHTML={{ __html: product.name }}
//             ></h5>
//             <p className="text-white text-center text-lg">${product.price}</p>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default CatalogProducts;
import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Range, getTrackBackground } from 'react-range';
import Header from '../Header';
import { Link } from 'react-router-dom';
import { WishlistContext } from '../WishlistContext';
import Heart from "react-animated-heart";
import '../AllP.css';
import Loadingpage from '../Loadingpage';
import Footer from '../Footer';
const STEP = 1;
const MIN = 0;
const MAX = 2000;
const CatalogProducts = () => {
  const { catalog_id } = useParams();
  const [cards, setCards] = useState([]);
  const [favoriteCards, setFavoriteCards] = useState({});
  const { addToWishlist, wishlistItems, removeFromWishlist } = useContext(WishlistContext);
  const [isClick, setClick] = useState(false);
  const navigate = useNavigate(); // For programmatic navigation
  const [productsData, setProductsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [priceRange, setPriceRange] = useState([MIN, MAX]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [selectedColor, setSelectedColor] = useState('');
  const [mobileviewfiltter , setmobileviewfiltter] =useState(true);
  const [favbutton,setfavbutton]=useState(false);
  const [filtersVisible, setFiltersVisible] = useState(true);


  const handleMaterialChange = (material) => {
    if (selectedMaterials.includes(material)) {
      setSelectedMaterials(selectedMaterials.filter((m) => m !== material));
    } else {
      setSelectedMaterials([...selectedMaterials, material]);
    }
  };
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

 const handleFavoriteButtonClick = (id )=>{
  console.log(id+"lksdsdjf")
  addToWishlist(id)

  setfavbutton(!favbutton)


}
// const handleFavoriteButtonClick = async (id, e) => {
//   e.stopPropagation(); // Prevent event propagation
//   e.preventDefault();

//   const selectedCard = cards.find((card) => card.id === id);
//   if (!selectedCard) {
//       console.error('Card not found for id:', id);
//       return;
//   }

//   const isFavorite = favoriteCards[id];

//   try {
//       if (isFavorite) {
//           await removeFromWishlist(id);
//       } else {
//           await addToWishlist(selectedCard);
//       }

//       setFavoriteCards((prev) => {
//           const updatedFavoriteCards = {
//               ...prev,
//               [id]: !prev[id],
//           };
//           localStorage.setItem('favoriteCards', JSON.stringify(updatedFavoriteCards));
//           return updatedFavoriteCards;
//       });
//   } catch (error) {
//       console.error('Error managing wishlist:', error);
//   }
// };

  const handleClearAll = () => {
    setPriceRange([MIN, MAX]);
    setSelectedColors([]);
    setSelectedMaterials([]);
  };
  const handleColorChange = (color) =>{
    setSelectedColor(color);
  };
  useEffect(() => {
    if (!catalog_id) {
      console.error('Catalog ID is missing from URL parameters.');
      return;
    }

    const fetchCatalog = async () => {
      try {
        // Fetch catalog data
        const response = await fetch(`https://api.hirdayam.com/api/getCatelogsforuser?catalog_id=${catalog_id}`, {
          method: 'GET',
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (result.status && result.data && result.data.data && result.data.data.length > 0) {
          const catalog = result.data.data[0];

          if (catalog.product_ids && catalog.product_ids.length > 0) {
            const productIds = catalog.product_ids;

            const productsResponse = await fetch('https://api.hirdayam.com/api/ProductbycatalogId?catelog_id=' + catalog_id, {
              method: 'GET',
            });

            if (!productsResponse.ok) {
              throw new Error(`HTTP error! status: ${productsResponse.status}`);
            }
            const productsResult = await productsResponse.json();

            if (productsResult.status && productsResult.data && productsResult.data.length > 0) {
              const products = productsResult.data.map(product => ({
                _id: product._id,
                name: product.name,
                image: product.image,
                price: product.price,
              }));

              setProductsData(products);
            } else {
              console.error('Failed to retrieve products data:', productsResult.message);
            }
          } else {
            console.log('No products found for this catalog.');
          }
        } else {
          console.error('Failed to retrieve catalog data:', result.message);
        }
      } catch (error) {
        console.error('Error fetching catalog:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCatalog();
  }, [catalog_id]);
  

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  if (loading) {
    return <Loadingpage></Loadingpage> //<div>Loading products...</div>;
  }

  if (!productsData.length) {
    return <>
    <Header/>
    <div className='empty-wishlist-card'>No products found.</div>;</>
  }


  const filteredProducts = productsData.filter(product => {
    const productPrice = parsePrice(product.price);
    return productPrice >= priceRange[0] && productPrice <= priceRange[1];
  });

  if (loading) {
    return <div>Loading products...</div>;
  }
  const handleIconClick = () => {
    setFiltersVisible(!filtersVisible);
  };


  return (
    <>
      <Header />
      <div onClick={() => { setmobileviewfiltter(!mobileviewfiltter) }} className='btn relative  md:hidden top-10 left-5'>
        <svg className='text-black relative left-0' width={"1.3rem"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M6.17071 18C6.58254 16.8348 7.69378 16 9 16C10.3062 16 11.4175 16.8348 11.8293 18H22V20H11.8293C11.4175 21.1652 10.3062 22 9 22C7.69378 22 6.58254 21.1652 6.17071 20H2V18H6.17071ZM12.1707 11C12.5825 9.83481 13.6938 9 15 9C16.3062 9 17.4175 9.83481 17.8293 11H22V13H17.8293C17.4175 14.1652 16.3062 15 15 15C13.6938 15 12.5825 14.1652 12.1707 13H2V11H12.1707ZM6.17071 4C6.58254 2.83481 7.69378 2 9 2C10.3062 2 11.4175 2.83481 11.8293 4H22V6H11.8293C11.4175 7.16519 10.3062 8 9 8C7.69378 8 6.58254 7.16519 6.17071 6H2V4H6.17071ZM9 6C9.55228 6 10 5.55228 10 5C10 4.44772 9.55228 4 9 4C8.44772 4 8 4.44772 8 5C8 5.55228 8.44772 6 9 6ZM15 13C15.5523 13 16 12.5523 16 12C16 11.4477 15.5523 11 15 11C14.4477 11 14 11.4477 14 12C14 12.5523 14.4477 13 15 13ZM9 20C9.55228 20 10 19.5523 10 19C10 18.4477 9.55228 18 9 18C8.44772 18 8 18.4477 8 19C8 19.5523 8.44772 20 9 20Z"></path></svg>
        Filter</div>
        <div className="main-container">
        {/* Toggle Filters Section */}
        {filtersVisible ? (
          <div className="filter-container hidden md:block">
            <div className="filter-header ">
              <h2>Filters</h2>
              {/* <div className="filter-toggle-icon" onClick={handleIconClick}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 4.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM12 11a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM12 17.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM4 3.5h16a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1z"/>
              </svg>
            </div> */}
              {/* <button class="clear-all" onClick={handleIconClick}> */}
              <button class="clear-all" onClick={handleIconClick}>
                Close
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
                Open
              </button>
            </div>
          </div>
        )}


        <div className=" cards-container1  pt-20 md:pt-0">
       
        {filteredProducts.length === 0 ? (
    <div className="no-products-found">
      <p>No products found in this price range.</p>
    </div>
  ) : (
    filteredProducts.map((product) => (
      // <div
      //   key={product._id}
      //   className="card-wrapper"
      //   onClick={() => handleProductClick(product._id)}
      // >
      //   <img src={product.image} className="object-cover w-full h-full" alt={product.name} />
      //   <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
      //     <h5
      //       style={{ fontFamily: 'Rosarivo' }}
      //       className="text-white text-center text-xl"
      //       dangerouslySetInnerHTML={{ __html: product.name }}
      //     ></h5>
      //     <p className="text-white text-center text-lg">${product.price}</p>
      //   </div>
      // </div>
      <div key={product._id} className="card-wrapper" style={{ cursor: 'pointer' }}>
                                <div className="card1-product rounded-md">
                                    <div className="card-header w-32 h-56 md:h-72   md:w-full">
                                     <Link to={`/similar/${product._id}`}>
                                        <div className='w-full h-full flex items-center'>

                                        
                                        <img
                                          
                                            src={product.image}
                                            alt="product"
                                            
                                            className=" card-image1 rounded-xl  w-23 flex   object-contain m-0 p-0 "
                                            // onClick={() => handleProductClick(product._id)}
                                        />
                                        </div>
                                        </Link>
                                        
                                        <button
                                            className="favorite-btn btn border-8"
                                            onClick={(e) => handleFavoriteButtonClick(product._id)}
                                            style={{
                                                cursor: 'pointer',
                                                border: 'none',
                                                background: 'none',
                                                // padding: '5px',
                                            }}
                                        > 
                                     {/* <h1>{wishlistItems.data.data.some(item=>item.product._id==product._id)?"a":"b"}</h1>  */}
                                     
                                            <i
                                                className={`fa-heart ${wishlistItems.data.data.some(item=>item.product._id==product._id) ? 'fas' : 'far'} `}
                                                style={{ color: wishlistItems.data.data.some(item=>item.product._id==product._id) ? 'red' : '#23387A', fontSize: '24px' }}
                                            ></i>
                                            {/* <Heart className="bg-red-600 absolute top-2 right-0 " isClick={wishlistItems.data.data.some(item=>item.product._id==product._id)?true:false} /> */}
                                        </button>
                                    </div>
                                </div>
                                <div className="card-info">
                                    <p className="image-description">{product.name}</p>
                                    <p className="price">
                                     ₹{ product.price } 
                                    </p>
                                </div>
                            </div>
    ))
  )}
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
              
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default CatalogProducts;
