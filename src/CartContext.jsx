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
// // };
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './store/auth'; // Adjust the import based on your file structure
import { useNavigate } from 'react-router-dom';
import PlaceOrder2 from './PlaceOrder';
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [couponDiscount,setcouponDiscount]=useState(0);
  const { storeTokenInLS } = useAuth();
  const [userprofiledata,setuserprofiledata]=useState([]);
  
  const [address , setaddress]=useState([]);
  
  // Function to fetch token from localStorage
  
  const fetchTokenFromLS = () => {
    return localStorage.getItem('token');
  };
  useEffect(() => {
    console.log('Cart items:', cartItems);
    fetchCartItems()
    fetchUserProfile();
    fetchAddress();

  }, []);
  
  // Fetch cart items on component mount
  const fetchCartItems = () => {
    const token = fetchTokenFromLS();
    
    if (token) {
      axios.get('https://hridayam.dasoclothings.in/api/getcart', {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      .then(response => {
        console.log('API Response Data:', response.data);
        if (response.data.status === true && Array.isArray(response.data.data)){
          setCartItems(response.data.data);
        } else {
          console.error('Unexpected response format:', response.data);
        }
      })
      .catch(error => {
        console.error('Error fetching cart items:', error);
      });
    } else {
      console.error('No token found in localStorage.');
    }
  };

  // Add product to cart
  const addToCart = (product, quantity) => {
    const token = fetchTokenFromLS();
    console.log(product.color+"slkdfl")
    // const productToAdd = {
    
    //   product_id: product.id,
    //   quantity: quantity,
    //   user_id: product.user_id,
    //   product_color_id: product.product_color_id,
    //   product_variation_id: product.product_variation_id,
    //   price: product.price,
    //   personalize_image:product.image.name
    
    // };

    // console.log(productToAdd.personalize_image)

    const formData = new FormData();
  formData.append('product_id', product.id);
  formData.append('quantity', quantity);
  // formData.append('user_id', product.user_id);
  // formData.append('price', product.price);
  // formData.append('image', product.image);

     
  // if (product.personalize_image) {
      formData.append('personalize_image', product.image); // Assuming personalize_image is a File object
  // }

  if (product.color) {
      formData.append('product_color_id', product.color);
  }

  if (product.variation) {
      formData.append('product_variation_id', product.variation);
  }

  console.log("FormData to Add:", formData.quantity);

  
  
    axios.post('https://api.hirdayam.com/api/addtocart', formData,{
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      }
    })
    .then(response => {
    
  console.log('Added to Cart:');
      // const cartItem = response.data.cart;
      
      // const cartProduct ={
      //   product_id: cartItem.product_id,
      //   quantity: cartItem.quantity,
      //   price: cartItem.price,
      //   image: cartItem.image,
      //   name: cartItem.product.name,
      //   _id: cartItem._id // Ensure _id is set as cart_id
      // };
  
  
      // setCartItems(prevItems => {
      //   const existingItem = prevItems.find(item => item.product_id === product.id);
      //   if (existingItem) {
      //     return prevItems.map(item =>
      //       item.product_id === product.id
      //         ? { ...item, quantity: (item.quantity || 1) + 1 }
      //         : item
      //     );
      //   }
      //   return [...prevItems, cartProduct]; // Use cartProduct with _id as cart_id
      // });
      fetchCartItems();
    })
    .catch(error => {
      console.error('Error adding to cart:', error.response ? error.response.data : error.message);
    });
  };
  
  const fetchAddress = async () => {
    const token = fetchTokenFromLS();
    try {
        const response = await axios.get('https://api.hirdayam.com/api/getAddresses', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        console.log('Addres get success:', response.data +"address form cartcontext");
        // localStorage.setItem('address', JSON.stringify(response.data));
        // setSuccess('Address managed successfully.');
        // console.log(userprofiledata.data.name+"profile new")
        setaddress(response.data.data[0]);
       
       
    } catch (error) {
        console.error('Error during address submission:', error);

        if (error.response) {
            console.error('Server responded with:', error.response.data);
            // setError(`Address submission failed: ${error.response.data.message || 'Unknown error'}`);
        } else {
            // setError('Address submission failed. Please try again.');
        }
    }
};

  const removeFromCart = (cartId) => {
    axios.delete('https://api.hirdayam.com/api/deleteCart', {
      headers: {
        Authorization: `Bearer ${fetchTokenFromLS()}`,
        'Content-Type': 'application/json',
      },
      data: { cart_id: cartId } // Adjust if necessary based on API documentation
    })
    .then(response => {
      console.log('Removed from Cart:', response.data);
      setCartItems(prevItems => prevItems.filter(item => item._id !== cartId));
    })
    .catch(error => {
      console.error('Error response:', error.response.data);
    });
  };

  
  

  const updateQuantity = (product, newQuantity) =>{
    const token = fetchTokenFromLS();
    console.log(product+"lsdfjlsdflsdlsdsdfs")
  
    if (!token) {
      console.error('No token found in localStorage.');
      return;
    }
  
    if (newQuantity <= 0) {
      console.error('Invalid quantity:', newQuantity);
      return;
    }
  
    if (!product || !product) {
      console.error('Product or product_id not provided. Product:', product);
      return;
    }
  
    const cartItem = cartItems.find(item => item._id === product);
  
    if (!cartItem) {
      console.error('Cart item not found for product_id:', product);
      return;
    }
  
    if (!cartItem._id) {
      console.error('Cart ID (_id) not found for product_id:', product.product_id);
      return;
    }
  
    const productToUpdate = {
      cart_id: cartItem._id, // Use _id as cart_id
      product_id: product,
      quantity: newQuantity,
    };

    console.log(productToUpdate.cart_id+"new id")
      
  
    console.log('Sending request with payload:', productToUpdate);
  
    axios.put('https://api.hirdayam.com/api/editCart', productToUpdate, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    })
    .then(response => {
      console.log('Response from API:', response.data);
      if (response.data && response.data.status === true){
        setCartItems(prevItems =>
          prevItems.map(item =>
            item.product_id === product.product_id ? {...item, quantity: newQuantity } : item
          )
        );
        fetchCartItems()
      } else {
        console.error('Unexpected response format:', response.data);
      }
    })
    .catch(error => {
      console.error('Error editing cart:', error.response ? error.response.data : error.message);
    });
  };


  const PlaceOrder = () => {
    const token = fetchTokenFromLS();

    if (!token) {
        console.error('No token found in localStorage.');
        return;
    }

    // if (newQuantity <= 0) {
    //     console.error('Invalid quantity:', newQuantity);
    //     return;
    // }

    // if (!product) {
    //     console.error('Product not provided. Product:', product);
    //     return;
    // }

    // const cartItem = cartItems.find(item => item._id === product._id);

    // if (!cartItem) {
    //     console.error('Cart item not found for product_id:', product._id);
    //     return;
    // }

    // Create the cart details array with updated quantity
    const cartDetails = cartItems.map(item => {
        return {
            _id: item._id,
            product_id: item.product_id,
            quantity:item.quantity, // item._id === product._id ? newQuantity : item.quantity, // Update quantity if it's the current product
            user_id: item.user_id,
            product_color_image_id: item.product_color_image_id,
            product_variation_id: item.product_variation_id,
            personalize_image: item.personalize_image,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            __v: item.__v
        };
    });

    const payload = {
        order_amount: calculateTotal(),
        coupon_discount: "10.00",
        order_type: "personalize",
        cart_details: cartDetails,
        delivery_address: {
            _id: address._id,
            address_type: address.address_type,
            house_name: address.house_name,
            floor_number: address.floor_number,
            landmark: address.landmark,
            area_name: address.area_name,
            zip_code: address.zip_code,
            user_id: address.user_id,
            createdAt: address.createdAt,
            updatedAt: address.updatedAt,
            __v: address.__v
        },
        delivery_address_id: "669b9d0ea159078371605d9c",
        transaction_id: "wkeufgiuei"
    };

    console.log('Sending request with payload:', payload);

    axios.post('https://api.hirdayam.com/api/placeOrder', payload, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    })
    .then(response => {
        console.log('order Response from API :', response.data);
        fetchCartItems()
        
        //  navigate("./placeorder")
        // if (response.data && response.data.status === true) {
        //     setCartItems(prevItems =>
        //         prevItems.map(item =>
        //             item._id === product._id ? { ...item, quantity: newQuantity } : item
        //         )
        //     );
        //     fetchCartItems();
        // } 
        // else {
        //     console.error('Unexpected response format:', response.data);
        // }
    })
    .catch(error => {
        console.error('Error editing cart:', error.response ? error.response.data : error.message);
    });
};


    
  

  

  
  const applycoupon =(code,orderTotal)=>{
    const token = fetchTokenFromLS();
    const coupondata = {
     code:code,
    orderTotal:orderTotal
    };

    axios.post('https://api.hirdayam.com/api/ApplyCoupon', coupondata, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    })
    .then(response => {
      setcouponDiscount(response.data.data.discount);
      console.log('Response from API:', response.data);
    
     
    })
    .catch(error =>{
       alert(error.response.data.message)
      console.error('applyed coupon cart:', error.response ? error.response.data : error.message);
    });
  }


  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token){
        throw new Error('No token found in localStorage.');
      }

      const response = await axios.get('https://api.hirdayam.com/api/getUserprofile', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      console.log('Full response data:', response);
      console.log('User profile data:', response.data);

      setuserprofiledata(response.data)
      // console.log(userprofiledata+"in edit page")
      const { name, email, phone, _id } = response.data.data;

      if (!_id) {
        throw new Error('User ID (_id) is missing in the response data.');
      }

      
      // localStorage.setItem('user_id', _id);

      // setName(name);
      // setEmail(email);
      // setPhone(phone);

      // console.log('Stored user_id:', localStorage.getItem('user_id'));
    } catch (error) {
      console.error('Error fetching user profile:', error);
      // setError('Failed to fetch user profile. Please check your credentials.');
    }
  };
  
  
  const calculateSubtotal = () => {
    return cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  };


 const calculateTotal = () => {
        const subtotal = calculateSubtotal();
        
        const total = subtotal - couponDiscount;
        return total //> 0 ? total : 0;  // Ensure total is not negative
    };

  // Calculate total (can be extended if needed)
  // const calculateTotal = () => {
  //   return calculateSubtotal();
  // };

  return (
    <CartContext.Provider value={{applycoupon, PlaceOrder, fetchUserProfile, cartItems, userprofiledata,setuserprofiledata, addToCart, removeFromCart, updateQuantity, calculateSubtotal, calculateTotal }}>
      {children}
    </CartContext.Provider>
  );
};
// import React, { createContext, useState, useEffect } from 'react';

// export const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [wishlistItems, setWishlistItems] = useState([]);
//   const [cartItems, setCartItems] = useState(() => {
//     const savedCartItems = localStorage.getItem('cartItems');
//     return savedCartItems ? JSON.parse(savedCartItems) : [];
//   });

//   useEffect(() => {
//     localStorage.setItem('cartItems', JSON.stringify(cartItems));
//   }, [cartItems]);

//   const addToCart = (product, quantity) => {
//     setCartItems(prevItems => {
//       const existingItem = prevItems.find(item => item.id === product.id);
//       if (existingItem) {
//         return prevItems.map(item =>
//           item.id === product.id
//             ? { ...item, quantity: item.quantity + quantity }
//             : item
//         );
//       }
//       return [...prevItems, { ...product, quantity }];
//     });
//   };

//   const removeFromCart = (productId) => {
//     setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
//   };

//   const updateQuantity = (productId, quantity) => {
//     setCartItems(prevItems =>
//       prevItems.map(item =>
//         item.id === productId ? { ...item, quantity } : item
//       )
//     );
//   };
//   const calculateSubtotal = () => {
//     return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
//   };

//   const calculateTotal = () => {
//     // Implement logic to calculate total (e.g., including tax, discounts)
//     const subtotal = calculateSubtotal();
//     return subtotal;
//   };
//   const addToWishlist = (product, quantity) => {
//     setWishlistItems(prevItems => {
//       const existingItem = prevItems.find(item => item.id === product.id);
//       if (existingItem) {
//         return prevItems.map(item =>
//           item.id === product.id
//             ? { ...item, quantity: item.quantity + quantity }
//             : item
//         );
//       }
//       return [...prevItems, { ...product, quantity }];
//     });
//   };

//   const removeFromWishlist = (productId) => {
//     setWishlistItems(prevItems => prevItems.filter(item => item.id !== productId));
//   };

//   const updateQuantity1 = (productId, quantity) => {
//     setWishlistItems(prevItems =>
//       prevItems.map(item =>
//         item.id === productId ? { ...item, quantity } : item
//       )
//     );
//   };

//   return (
//     <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, wishlistItems, addToWishlist, removeFromWishlist, updateQuantity1,calculateSubtotal, calculateTotal }}>
//       {children}
//     </CartContext.Provider>
//   );
// };