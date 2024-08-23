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
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Range, getTrackBackground } from 'react-range';
import Header from '../Header';
import '../AllP.css';
const STEP = 1;
const MIN = 0;
const MAX = 2000;
const CatalogProducts = () => {
  const { catalog_id } = useParams();
  const navigate = useNavigate(); // For programmatic navigation
  const [productsData, setProductsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [priceRange, setPriceRange] = useState([MIN, MAX]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [selectedColor, setSelectedColor] = useState('');
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
  useEffect(() => {
    if (!catalog_id) {
      console.error('Catalog ID is missing from URL parameters.');
      return;
    }

    const fetchCatalog = async () => {
      try {
        // Fetch catalog data
        const response = await fetch(`https://hridayam.dasoclothings.in/api/getCatelogsforuser?catalog_id=${catalog_id}`, {
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

            const productsResponse = await fetch('https://hridayam.dasoclothings.in/api/ProductbycatalogId?catelog_id=' + catalog_id, {
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
    return <div>Loading products...</div>;
  }

  if (!productsData.length) {
    return <div>No products found.</div>;
  }

  return (
    <>
    <Header/>
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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-4 sm:mx-8 md:mx-20 mt-20">
      {productsData.map((product) => (
        <div
          key={product._id}
          className="relative bg-gray-200 w-full h-60 sm:h-64 md:h-80 lg:h-96 cursor-pointer"
          onClick={() => handleProductClick(product._id)} 
        >
          <img src={product.image} className="object-cover w-full h-full" alt={product.name} />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <h5
              style={{ fontFamily: 'Rosarivo' }}
              className="text-white text-center text-xl"
              dangerouslySetInnerHTML={{ __html: product.name }}
            ></h5>
            <p className="text-white text-center text-lg">${product.price}</p>
          </div>
        </div>
      ))}
    </div>
  </div>  
    </>
  );
};

export default CatalogProducts;
