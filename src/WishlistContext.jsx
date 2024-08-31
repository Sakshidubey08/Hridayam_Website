// import React, { createContext, useState, useEffect } from 'react';
// import axios from 'axios';

// export const WishlistContext = createContext();

// export const WishlistProvider = ({ children }) => {
//   const [wishlistItems, setWishlistItems] = useState({
//     data: {
//       data: [], // Initial empty array
//       paginator: {}
//     },
//     message: '',
//     status: false
//   });
//     const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchTokenFromLS = () => {
//     return localStorage.getItem('token');
//   };

//   // Function to fetch wishlist items from the API
//   const fetchWishlistItems = async () => {
//     const token = fetchTokenFromLS();
//     try {
//       const response = await axios.get('http://91.108.104.122/api/mywishlist', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         }
//       });
//       setWishlistItems(response.data);
//     } catch (err) {
//       setError('Failed to fetch wishlist items');
//       console.error('Error fetching wishlist items:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Function to add a product to the wishlist
//   const addToWishlist = async (product, quantity) => {
//     const token = fetchTokenFromLS();
  
//     const productToAdd = {
//       product_id: product.id,
//       quantity: quantity,
//     };
  
//     console.log('Sending request data:', productToAdd);
  
//     try {
//       const response = await axios.post('http://91.108.104.122/api/manageWishlist', productToAdd, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });
  
      
  
//       if (response.data.status === true) {
//         // Fetch updated wishlist items after adding a product
//         fetchWishlistItems();
//       } else {
//         console.error('Unexpected API response format:', response.data);
//       }
//     } catch (error) {
//       console.error('Error adding to wishlist:', error);
//     }
//   };

  
//   const removeFromWishlist = async (productId) => {
//     const token = fetchTokenFromLS();
//     console.log('Removing from wishlist:', productId); // Debug log
  
//     try {
//       const response = await axios.delete(`http://91.108.104.122/api/manageWishlist`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         }
//       });
//       console.log('Response from removeFromWishlist:', response); // Debug log
//       fetchWishlistItems();
//     } catch (error) {
//       console.error('Error removing from wishlist:', error.response || error.message);
//     }
//   };
  

//   // Function to update the quantity of a product in the wishlist
//   const updateQuantity = (product_id, newQuantity) => {
//     setWishlistItems(prevItems => {
//       if (prevItems.data && Array.isArray(prevItems.data.data)) {
//         const updatedData = prevItems.data.data.map(item =>
//           item.product_id === product_id ? { ...item, quantity: newQuantity } : item
//         );
//         const updatedItems = {
//           ...prevItems,
//           data: {
//             ...prevItems.data,
//             data: updatedData
//           }
//         };
//         console.log('Updated Items:', updatedItems);
//         return updatedItems;
//       } else {
//         console.error('prevItems.data.data is not an array:', prevItems.data.data);
//         return prevItems;
//       }
//     });
//   };
  
  

//   useEffect(() => {
//     fetchWishlistItems();
//   }, []);

//   return (
//     <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist, updateQuantity, loading, error }}>
//       {children}
//     </WishlistContext.Provider>
//   );
// };

import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState({
    data: {
      data: [], // Initial empty array
      paginator: {}
    },
    message: '',
    status: false
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTokenFromLS = () => {
    return localStorage.getItem('token');
  };

  // Function to fetch wishlist items from the API
  const fetchWishlistItems = async () => {
    const token = fetchTokenFromLS();
    try {
      const response = await axios.get('https://hridayam.dasoclothings.in/api/mywishlist', {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      setWishlistItems(response.data);
      console.log(wishlistItems.data.data.user_id+"in wishlist conponent kjldee")
    } catch (err) {
      setError('Failed to fetch wishlist items');
      console.error('Error fetching wishlist items:', err);
    } finally {
      setLoading(false);
    }
  };

  // Function to add a product to the wishlist
  const addToWishlist = async (product) => {
    const token = fetchTokenFromLS();
    const productToAdd = {
      product_id: product,
      action: 'add'
    };
    try {
      const response = await axios.post('https://hridayam.dasoclothings.in/api/manageWishlist', productToAdd, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (response.data.status === true){
        fetchWishlistItems();
      } else {
        console.error('Unexpected API response format:', response.data);
      }
    } catch (error) {
      console.error('Error adding to wishlist:', error);
    }
  };

  const removeFromWishlist = async (productId) => {
    const token = fetchTokenFromLS();
    const productToRemove = {
      product_id: productId,
      action: 'remove'
    };
    try {
      const response = await axios.post('https://hridayam.dasoclothings.in/api/manageWishlist', productToRemove, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (response.data.status === true) {
        fetchWishlistItems();
      } else {
        console.error('Unexpected API response format:', response.data);
      }
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  };

  useEffect(() => {
    fetchWishlistItems();
  }, []);

  return (
    <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist, loading, error }}>
      {children}
    </WishlistContext.Provider>
  );
};
// import React, { createContext, useState, useEffect } from 'react';

// export const WishlistContext = createContext();

// export const WishlistProvider = ({ children }) => {
//   const [wishlistItems, setWishlistItems] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const fetchTokenFromLS = () => {
//     return localStorage.getItem('token');
//   };

//   // Function to add a product to the wishlist
//   const addToWishlist = (product) => {
//     setWishlistItems(prevItems => {
//       // Check if the product is already in the wishlist
//       const isProductInWishlist = prevItems.find(item => item.id === product.id);
//       if (isProductInWishlist) {
//         return prevItems; // Product already in wishlist
//       }
//       return [...prevItems, product];
//     });
//   };

//   // Function to remove a product from the wishlist
//   const removeFromWishlist = (productId) => {
//     setWishlistItems(prevItems => prevItems.filter(item => item.id !== productId));
//   };

//   // Optionally, you could use useEffect to load initial wishlist items from local storage
//   useEffect(() => {
//     const savedWishlist = JSON.parse(localStorage.getItem('wishlistItems')) || [];
//     setWishlistItems(savedWishlist);
//   }, []);

//   useEffect(() => {
//     localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
//   }, [wishlistItems]);

//   return (
//     <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist, loading, error }}>
//       {children}
//     </WishlistContext.Provider>
//   );
// };

