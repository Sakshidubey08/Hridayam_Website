// import React, { createContext, useState, useEffect } from 'react';
// import axios from 'axios';
// import { useAuth } from './store/auth'; // Adjust the import based on your file structure

// export const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState([]);
//   const { storeTokenInLS } = useAuth();
//   const fetchTokenFromLS = () => {
//     return localStorage.getItem('token');
//   };

//   useEffect(() => {
//     const token = fetchTokenFromLS();

//     if (token) {
//       axios.get('http://91.108.104.122/api/getcart', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         }
//       })
//         .then(response => {
//           console.log('API Response Data:', response.data);
//           if (response.data.status === true && Array.isArray(response.data.data)) {
//             setCartItems(response.data.data);
//           } else {
//             console.error('Unexpected response format:', response.data);
//           }
//         })
//         .catch(error => {
//           console.error('Error fetching cart items:', error);
//         });
//     } else {
//       console.error('No token found in localStorage.');
//     }
//   }, []);

//   const addToCart = (product, quantity) => {
//     const token = fetchTokenFromLS();

//     console.log('Adding to cart with product:', product, 'and quantity:', quantity);
//     const productToAdd = {
//       product_id: product.id,
//       quantity: quantity,
//       user_id: product.user_id,
//       product_color_id: product.product_color_id,
//       product_variation_id: product.product_variation_id,
//       price: product.price
    
//     };

//     axios.post('http://91.108.104.122/api/addtocart', productToAdd, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json',
//       }
//     })
//       .then(response => {
//         console.log('Added to Cart:', response.data);

//         const cartItem = response.data.cart;
//         const cartProduct = {

//           product_id: cartItem.product_id,
//           quantity: cartItem.quantity,
//           price: cartItem.price, // Ensure price is correctly assigned
//           image: cartItem.image, // Ensure image is correctly assigned
//           name: cartItem.name, // Ensure name is correctly assigned
//         };

//         setCartItems(prevItems => {
//           const existingItem = prevItems.find((item) => item.product_id === product.id);
//           if (existingItem) {
//             return prevItems.map((item) =>
//               item.product_id === product.id
//                 ? { ...item, quantity: (item.quantity || 1) + 1 }
//                 : item
//             );
//           }
//           return [...prevItems, { ...product, quantity: 1 }]; // Ensure default quantity is 1
//         });
//       })
//       .catch(error => {
//         const errorData = error.response ? error.response.data : error.message;
//         console.error('Error adding to cart:', errorData);
//       });
//   };

//   const removeFromCart = (productId) => {
//     const token = fetchTokenFromLS();

//     if (!token) {
//       console.error('No token found in localStorage.');
//       return;
//     }

//     axios.post('http://91.108.104.122/api/deleteCart', { id: productId }, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       }
//     })
//       .then(response => {
//         console.log('Removed from Cart:', response.data);
//         setCartItems(prevItems => prevItems.filter(item => item.product_id !== productId));
//       })
//       .catch(error => {
//         console.error('Error removing from cart:', error);
//       });
//   };

//   const updateQuantity = (product, newQuantity) => {
//     const token = fetchTokenFromLS();
  
//     if (!token) {
//       console.error('No token found in localStorage.');
//       return;
//     }
  
//     if (newQuantity <= 0) {
//       console.error('Invalid quantity:', newQuantity);
//       return;
//     }
  
//     const cartItem = cartItems.find(item => item.product_id === product.product_id);
//     if (!cartItem) {
//       console.error('Cart item not found for product_id:', product.product_id);
//       return;
//     }
  
//     const productToUpdate = {
//       cart_id: cartItem.cart_id,
//       product_id: product.product_id,
//       quantity: newQuantity,
//     };
  
//     console.log('Sending request with payload:', productToUpdate);
  
//     axios.put('http://91.108.104.122/api/editCart', productToUpdate, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json',
//       }
//     })
//     .then(response => {
//       if (response.data && response.data.status === true) {
//         setCartItems(prevItems =>
//           prevItems.map(item =>
//             item.product_id === product.product_id ? { ...item, quantity: newQuantity } : item
//           )
//         );
//       } else {
//         console.error('Unexpected response format:', response.data);
//       }
//     })
//     .catch(error => {
//       console.error('Error editing cart:', error.response ? error.response.data : error.message);
//     });
//   };
  
  

//   const calculateSubtotal = () => {
//     return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
//   };

//   const calculateTotal = () => {
//     const subtotal = calculateSubtotal();
//     return subtotal;
//   };

//   return (
//     <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, calculateSubtotal, calculateTotal }}>
//       {children}
//     </CartContext.Provider>
//   );
// };
// import React, { createContext, useState, useEffect } from 'react';
// import axios from 'axios';
// import { useAuth } from './store/auth'; // Adjust the import based on your file structure

// export const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState([]);
//   const { storeTokenInLS } = useAuth();

//   // Function to fetch token from localStorage
//   const fetchTokenFromLS = () => {
//     return localStorage.getItem('token');
//   };
//   useEffect(() => {
//     console.log('Cart items:', cartItems);
//   }, [cartItems]);
  
//   // Fetch cart items on component mount
//   useEffect(() => {
//     const token = fetchTokenFromLS();
    
//     if (token) {
//       axios.get('http://91.108.104.122/api/getcart', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         }
//       })
//       .then(response => {
//         console.log('API Response Data:', response.data);
//         if (response.data.status === true && Array.isArray(response.data.data)) {
//           setCartItems(response.data.data);
//         } else {
//           console.error('Unexpected response format:', response.data);
//         }
//       })
//       .catch(error => {
//         console.error('Error fetching cart items:', error);
//       });
//     } else {
//       console.error('No token found in localStorage.');
//     }
//   }, []);

//   // Add product to cart
//   const addToCart = (product, quantity) => {
//     const token = fetchTokenFromLS();
  
//     const productToAdd = {
//       product_id: product.id,
//       quantity: quantity,
//       user_id: product.user_id,
//       product_color_id: product.product_color_id,
//       product_variation_id: product.product_variation_id,
//       price: product.price
//     };
  
//     axios.post('http://91.108.104.122/api/addtocart', productToAdd, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json',
//       }
//     })
//     .then(response => {
//       console.log('Added to Cart:', response.data);
  
//       const cartItem = response.data.cart;
//       const cartProduct = {
//         product_id: cartItem.product_id,
//         quantity: cartItem.quantity,
//         price: cartItem.price,
//         image: cartItem.image,
//         name: cartItem.name,
//         _id: cartItem._id // Ensure _id is set as cart_id
//       };
  
//       setCartItems(prevItems => {
//         const existingItem = prevItems.find(item => item.product_id === product.id);
//         if (existingItem) {
//           return prevItems.map(item =>
//             item.product_id === product.id
//               ? { ...item, quantity: (item.quantity || 1) + 1 }
//               : item
//           );
//         }
//         return [...prevItems, cartProduct]; // Use cartProduct with _id as cart_id
//       });
//     })
//     .catch(error => {
//       console.error('Error adding to cart:', error.response ? error.response.data : error.message);
//     });
//   };
  
  

//   const removeFromCart = (cartId) => {
//     axios.delete('http://91.108.104.122/api/deleteCart', {
//       headers: {
//         Authorization: `Bearer ${fetchTokenFromLS()}`,
//         'Content-Type': 'application/json',
//       },
//       data: { cart_id: cartId } // Adjust if necessary based on API documentation
//     })
//     .then(response => {
//       console.log('Removed from Cart:', response.data);
//       setCartItems(prevItems => prevItems.filter(item => item._id !== cartId));
//     })
//     .catch(error => {
//       console.error('Error response:', error.response.data);
//     });
//   };
  
  

//   const updateQuantity = (product, newQuantity) => {
//     const token = fetchTokenFromLS();
  
//     if (!token) {
//       console.error('No token found in localStorage.');
//       return;
//     }
  
//     if (newQuantity <= 0) {
//       console.error('Invalid quantity:', newQuantity);
//       return;
//     }
  
//     if (!product || !product.product_id) {
//       console.error('Product or product_id not provided. Product:', product);
//       return;
//     }
  
//     const cartItem = cartItems.find(item => item.product_id === product.product_id);
  
//     if (!cartItem) {
//       console.error('Cart item not found for product_id:', product.product_id);
//       return;
//     }
  
//     if (!cartItem._id) {
//       console.error('Cart ID (_id) not found for product_id:', product.product_id);
//       return;
//     }
  
//     const productToUpdate = {
//       cart_id: cartItem._id, // Use _id as cart_id
//       product_id: product.product_id,
//       quantity: newQuantity,
//     };
  
//     console.log('Sending request with payload:', productToUpdate);
  
//     axios.put('http://91.108.104.122/api/editCart', productToUpdate, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json',
//       }
//     })
//     .then(response => {
//       console.log('Response from API:', response.data);
//       if (response.data && response.data.status === true) {
//         setCartItems(prevItems =>
//           prevItems.map(item =>
//             item.product_id === product.product_id ? { ...item, quantity: newQuantity } : item
//           )
//         );
//       } else {
//         console.error('Unexpected response format:', response.data);
//       }
//     })
//     .catch(error => {
//       console.error('Error editing cart:', error.response ? error.response.data : error.message);
//     });
//   };
  
  
  
  
//   const calculateSubtotal = () => {
//     return cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
//   };

//   // Calculate total (can be extended if needed)
//   const calculateTotal = () => {
//     return calculateSubtotal();
//   };

//   return (
//     <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, calculateSubtotal, calculateTotal }}>
//       {children}
//     </CartContext.Provider>
//   );
// };
import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [cartItems, setCartItems] = useState(() => {
    const savedCartItems = localStorage.getItem('cartItems');
    return savedCartItems ? JSON.parse(savedCartItems) : [];
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevItems, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };
  const calculateSubtotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const calculateTotal = () => {
    // Implement logic to calculate total (e.g., including tax, discounts)
    const subtotal = calculateSubtotal();
    return subtotal;
  };
  const addToWishlist = (product, quantity) => {
    setWishlistItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevItems, { ...product, quantity }];
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlistItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const updateQuantity1 = (productId, quantity) => {
    setWishlistItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, wishlistItems, addToWishlist, removeFromWishlist, updateQuantity1,calculateSubtotal, calculateTotal }}>
      {children}
    </CartContext.Provider>
  );
};