import React, { createContext, useState } from 'react';

export const CartContext1 = createContext();

export const CartProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);

  const addToWishlist = (product) => {
    setWishlistItems(prevItems => [...prevItems, product]);
  };

  const removeFromWishlist = (productId) => {
    setWishlistItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    setWishlistItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  return (
    <CartContext1.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist, updateQuantity }}>
      {children}
    </CartContext1.Provider>
  );
};
