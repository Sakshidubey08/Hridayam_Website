// import React, { useContext } from 'react';
// import { WishlistContext } from './WishlistContext'; // Ensure this is the correct path to your context file
// import { FaTrash } from 'react-icons/fa'; 
// import './Wishlist.css'; 
// import { Link } from 'react-router-dom';
// import pinterest from './images/PinterestLogo.png';
// import instagram from './images/InstagramLogo.png';
// import facebook from './images/FacebookLogo.png';
// import XLogo from './images/XLogo.png';
// import location from './images/location.png';
// import logo from './images/hridayam logo.png';
// import search from './images/search.png';
// import heart from './images/Heart.png';
// import icon2 from './images/icon2.png';
// import icon3 from './images/icon3.png';
// import './Home.css';
// import Header from './Header'
// const WishlistPage = () => {
//   const { wishlistItems, removeFromWishlist, loading, error } = useContext(WishlistContext);

//   return (
//     <>
//       <Header/>
//       <div className="wishlist-page">
//         {loading ? (
//           <p>Loading...</p>
//         ) : error ? (
//           <p>{error}</p>
//         ) : !wishlistItems.data.data.length ? (
//           <p>Your wishlist is empty.</p>
//         ) : (
//           <div className="wishlist-cards-container">
//             {wishlistItems.data.data.map(item => (
//               <div className="wishlist-card-wrapper" key={item.product_id}>
//                 <div className="wishlist-card">
//                   <img src={item.default_color_image || 'default-image.png'} alt={item.product.name || 'Product'} className="wishlist-card-image" />
//                 </div>
//                 <div className="wishlist-card-details">
//                   <h3 className="wishlist-card-title">{item.product.name || 'N/A'}</h3>
//                   <p className="wishlist-card-price">&#8377;{item.product.price || 'N/A'}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default WishlistPage;
// import React, { useContext } from 'react';
// import { CartContext } from './CartContext';
// import { FaTrash } from 'react-icons/fa'; // Import trash icon from react-icons/fa
// import './Wishlist.css'; // Import your CSS file
// import pinterest from './images/PinterestLogo.png';
// import instagram from './images/InstagramLogo.png';
// import facebook from './images/FacebookLogo.png';
// import XLogo from './images/XLogo.png';
// import location from './images/location.png';
// import logo from './images/hridayam logo.png';
// import search from './images/search.png';
// import heart from './images/Heart.png';
// import icon2 from './images/icon2.png';
// import icon3 from './images/icon3.png';
// import { Link } from 'react-router-dom';
// import Header from './Header';
// import './Home.css'
// const WishlistPage = () => {
//   const { wishlistItems, removeFromWishlist, updateQuantity1 } = useContext(CartContext);

//   const handleIncrement = (productId) => {
//     const item = wishlistItems.find(item => item.id === productId);
//     if (item) {
//       updateQuantity1(productId, item.quantity + 1);
//     }
//   };

//   const handleDecrement = (productId) => {
//     const item = wishlistItems.find(item => item.id === productId);
//     if (item && item.quantity > 1) {
//       updateQuantity1(productId, item.quantity - 1);
//     }
//   };

//   return (
//     <>
//     <Header/>
//     <div className="wishlist-page">
    

//       {wishlistItems.length === 0 ? (
//         <p>Your wishlist is empty.</p>
//       ) : (
//         <table className="wishlist-table">
//           <thead>
//             <tr>
//               <th>Select</th>
//               <th>Product Name</th>
//               <th>Price</th>
             
//               <th>Total Price</th>
//               <th>Product Image</th>
//               <th>Delete</th>
//             </tr>
//           </thead>
//           <tbody>
//             {wishlistItems.map(item => (
//               <tr key={item.id}>
//                 <td><input type="checkbox" /></td>
//                 <td>{item.name}</td>
//                 <td>&#8377;{item.price}</td>
//                 {/* <td>
//                   <button onClick={() => handleDecrement(item.id)}>-</button>
//                   {item.quantity}
//                   <button onClick={() => handleIncrement(item.id)}>+</button>
//                 </td> */}
//                 <td>&#8377;{item.price * item.quantity}</td>
//                 <td><img src={item.image} alt={item.name} /></td>
//                 <td>
//                   <button onClick={() => removeFromWishlist(item.id)}>
//                     <FaTrash />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//     </>
//   );
// };

// export default WishlistPage;
import React, { useContext } from 'react';
import { WishlistContext } from './WishlistContext';
import { FaTrash } from 'react-icons/fa';
import Header from './Header';
import './Wishlist.css';

const WishlistPage = () => {
  const { wishlistItems, removeFromWishlist } = useContext(WishlistContext);

  return (
    <>
      <Header/>
      <div className="wishlist-page">
        {wishlistItems.length === 0 ? (
           <div className="empty-wishlist-card">
           <p>Your wishlist is empty.</p>
         </div>
        ) : (
          <table className="wishlist-table">
            <thead>
              <tr>
                <th>Select</th>
                <th>Product Name</th>
                <th>Price</th>
               
                <th>Product Image</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {wishlistItems.map(item => (
                <tr key={item.id}>
                  <td><input type="checkbox" /></td>
                  <td>{item.name}</td>
                  <td>&#8377;{item.price}</td>
                  
                  <td><img src={item.image} alt={item.name} /></td>
                  <td>
                    <button onClick={() => removeFromWishlist(item.id)}>
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default WishlistPage;
