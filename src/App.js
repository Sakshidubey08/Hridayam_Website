// App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes,useLocation  } from 'react-router-dom';
import Home from './Home';
import Login from './Login-signup/Login';
import Product1 from './Products/Product1';
import Product2 from './Products/Product2';
import Product3 from './Products/Product3';
import Product4 from './Products/Product4';
import Product5 from './Products/Product5';
import Product6 from './Products/Product6';
import Product7 from './Products/Product7';
import Product8 from './Products/Product8';
import Signup from './Login-signup/Signup';
import Checkout from './Checkout';

import CartPage from './CartPage';
import { CartProvider } from './CartContext';
import Wishlist from './Wishlist';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};



const App = () => {
  return (
    <>
      <CartProvider>
      <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="product1" element={<Product1 />} />
          <Route path="product2" element={<Product2 />} />
          <Route path="product3" element={<Product3 />} />
          <Route path="product4" element={<Product4 />} />
          <Route path="product5" element={<Product5 />} />
          <Route path="product6" element={<Product6 />} />
          <Route path="product7" element={<Product7 />} />
          <Route path="product8" element={<Product8 />} />
          <Route path="signup" element={<Signup />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="checkout" element={<Checkout />} />
        </Routes>

      </CartProvider>

    </>
  );
};

export default App;
