import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css';
import { AuthProvider } from './store/auth';
import { CartProvider } from './CartContext';
import { WishlistProvider } from './WishlistContext';

ReactDOM.render(
  <AuthProvider>
    <CartProvider>
      <WishlistProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </WishlistProvider>
    </CartProvider>
  </AuthProvider>,
  document.getElementById('root')
);

