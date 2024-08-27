import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
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
import EditProfile from './Login-signup/EditProfile';
import CartPage from './CartPage';
import Wishlist from './Wishlist';
import Forget from './Login-signup/Forget';
import Catalog from './Catalog/Catalog';
import { CartProvider } from './CartContext';
import { AuthProvider } from './AuthContext';
import AllProducts from './AllProducts';
import Cardpage1 from './Cardpage1';
import PlaceOrder from './PlaceOrder';
import Payment from './Payment';
import Protected from './Protected'
import MyOrder from './MyOrder';
import PreeBook from './Products/PreeBook';
import Preebook1 from './Products/Preebook1';
import Preebook2 from './Products/Preebook2';
import Preebook3 from './Products/Preebook3';
import Preebook4 from './Products/Preebook4';
import Preebook5 from './Products/Preebook5';
import Preebook6 from './Products/Preebook6';
import Prebook7 from './Products/Prebook7'
import Customize1 from './Products/Customize1'
import Customize2 from './Products/Customize2'
import Customize7 from './Products/Customize7'
import Customize8 from './Products/Customize8'
import Catalog1 from './Catalog/Catalog1'
// import Acrylic from './Acrylic'
import Products from './Catalog/Products'
import Discover1 from './Products/Discover1'
import Discover2 from './Products/Discover2'
import Discover3 from './Products/Discover3'
import Discover4 from './Products/Discover4'
import Discover5 from './Products/Discover5'
import Discover6 from './Products/Discover6'
import CatalogProducts from './Catalog/CatalogProducts';
import Customize3 from './Products/Customize3'
import Customize4 from './Products/Customize4'
import Customize5 from './Products/Customize5'
import Customize6 from './Products/Customize6'
import Acylic2 from './Acylic2';
import Acrylic3 from './Acrylic3'
import ProductDetail from './Catalog/ProductDetail'
import Thankyou from './Thankyou';
import TextEditer from './TextEditer';
const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

const App = () => {
    return (
        <AuthProvider>
            <CartProvider>
                <ScrollToTop/>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="*" element={<Acrylic3 />} />
                    <Route path="login" element={<Login />} />
                    <Route path="product1" element={<Product1 />} />
                    <Route path="product2" element={<Product2 />} />
                    <Route path="product3" element={<Product3 />} />
                    <Route path="product4" element={<Product4 />} />
                    <Route path="product5" element={<Product5 />} />
                    <Route path="product6" element={<Product6 />} />
                    <Route path="product7" element={<Product7 />} />
                    <Route path="product8" element={<Product8 />} />
                    <Route path="prebook" element={<PreeBook />} />
                    <Route path="prebook1" element={<Preebook1 />} />
                    <Route path="prebook2" element={<Preebook2 />} />
                    <Route path="prebook3" element={<Preebook3 />} />
                    <Route path="prebook4" element={<Preebook4 />} />
                    <Route path="prebook5" element={<Preebook5 />} />
                    <Route path="prebook6" element={<Preebook6 />} />
                    <Route path="prebook7" element={<Prebook7 />} />

                    <Route path="customize" element={<Customize1 />} />
                    <Route path="customize1" element={<Customize2 />} />
                    <Route path="signup" element={<Signup />} />
                    <Route path="cart" element={<Protected element={<CartPage />} />} />
                    <Route path="wishlist" element={<Protected element={<Wishlist />} />} />
                    <Route path="checkout" element={<Checkout />} />
                    <Route path="forget" element={<Forget />} />
                    <Route path="editprofile" element={<EditProfile />} />
                    <Route path="catalog" element={<Catalog />} />
                    <Route path="all-products" element={<AllProducts />} />
                    <Route path="/card/:id" element={<Cardpage1 />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/products" element={<Products />} />

                    <Route path="/place-order" element={<PlaceOrder />} />
                    <Route path="/payment" element={<Payment />} />
                    <Route path="/my-orders" element={<MyOrder />} />
                    <Route path="/catalog1" element={<Catalog1 />} />
                   
                    <Route path="/discover1" element={<Discover1 />} />
                    <Route path="/discover2" element={<Discover2 />} />
                    <Route path="/discover3" element={<Discover3 />} />
                    <Route path="/discover4" element={<Discover4 />} />
                    <Route path="/discover5" element={<Discover5 />} />
                    <Route path="/discover6" element={<Discover6 />} />

                    <Route path="/customize3" element={<Customize3 />} />
                    <Route path="/customize4" element={<Customize4 />} />
                    <Route path="/customize5" element={<Customize5 />} />
                    <Route path="/customize6" element={<Customize6 />} />
                    <Route path="/customize7" element={<Customize7 />} />
                    <Route path="/customize8" element={<Customize8 />} />
                    <Route path="/thank-you" element={<Thankyou />} />

                    <Route path="/catalog/:catalog_id" element={<CatalogProducts />} />

                    <Route path='/Acrylic2' element={<TextEditer></TextEditer>}></Route>
                </Routes>
            </CartProvider>
        </AuthProvider>
    );
};

export default App;
