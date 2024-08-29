import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css';
import { AuthProvider } from './store/auth';
import { CartProvider } from './CartContext';
import { WishlistProvider } from './WishlistContext';
import { AppProvider } from './context/Bestproduct';

ReactDOM.render(
  <AuthProvider>
    <CartProvider>
      <WishlistProvider>
        <AppProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
        </AppProvider>
      </WishlistProvider>
    </CartProvider>
  </AuthProvider>,
  document.getElementById('root')
);

