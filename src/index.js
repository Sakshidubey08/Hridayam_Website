import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { AuthProvider } from './store/auth';
import { CartProvider } from './CartContext';
import { WishlistProvider } from './WishlistContext';
import { AppProvider } from './context/Bestproduct';

// ReactDOM.render(
  ReactDOM.createRoot(document.getElementById('root')).render(

  <AuthProvider>
    <CartProvider>
      <WishlistProvider>
        <AppProvider>
        <HashRouter>
          <App />
        </HashRouter>
        </AppProvider>
      </WishlistProvider>
    </CartProvider>
  </AuthProvider>,
  
);

