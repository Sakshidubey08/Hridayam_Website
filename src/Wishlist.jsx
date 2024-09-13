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
// import React, { useContext } from 'react';

// import { FaTrash } from 'react-icons/fa';
// import Header from './Header';
// import './Wishlist.css';
// import { WishlistContext } from './WishlistContext';

// const WishlistPage = () => {
//   const { wishlistItems, removeFromWishlist } = useContext(WishlistContext);
//   console.log(wishlistItems+"widsit lis ")
//   return (
//     <>
//       <Header/>
//       <div className="wishlist-page">
//         {wishlistItems.length === 0 ? (
//            <div className="empty-wishlist-card">
//            <p>Your wishlist is empty.</p>
//          </div>
//         ) : (
//           <table className="wishlist-table">
//             <thead>
//               <tr>
//                 <th>Product Name</th>
//                 <th>Product Image</th>
//                 <th>Delete</th>
//               </tr>
//             </thead>
//             <tbody>
//               {wishlistItems.data.data.map(item => (
//                 <tr key={item.id}>
//                   {/* <td><input className='' type="checkbox" /></td> */}
//                   <td className=' font-semibold'>{item.product.name}</td>

//                   <td><img src={item.product.image} alt={item.product.name} /></td>
//                   <td className=''>
//                     <button className='hidden md:block'  onClick={() => removeFromWishlist(item.product._id)}>
//                       <FaTrash />
//                     </button>
//                     <img  onClick={() => removeFromWishlist(item.product._id)} className='w-3 md:hidden m-auto' src="https://cdn-icons-png.flaticon.com/512/3405/3405244.png"></img>
                    
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </>
//   );
// };

// export default WishlistPage;
import React, { useContext } from 'react';
import { FaTrash } from 'react-icons/fa';
import Header from './Header';
import './Wishlist.css';
import Footer from './Footer';
import { WishlistContext } from './WishlistContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
const WishlistPage = () => {
  const { wishlistItems, removeFromWishlist, moveToBag } = useContext(WishlistContext); // Assuming you have a `moveToBag` function in your context

  return (
    <>
      <Header />
      <div className="wishlist-page">
        {wishlistItems.length === 0 ? (
          <div className="empty-wishlist-card">
            <p>Your wishlist is empty.</p>
          </div>
        ) : (
          <div className="wishlist-card-container ">
            {wishlistItems.data.data.map(item => (
              <div key={item.id} className="wishlist-card">
                <img  src={item.product.image} alt={item.product.name} className="wishlist-card-image h-40 object-contain" />
                <div className="wishlist-card-info">
                  <div className="wishlist-details">
                    <p className="wishlist-product-name text-sm">{item.product.name}</p>
                    <p className="wishlist-product-price">&#8377;{item.product.price}</p>
                  </div>
                </div>
                <button className="wishlist-delete-button" onClick={() => removeFromWishlist(item.product._id)}>
                  <FaTrash className="wishlist-delete-icon" />
                  <FontAwesomeIcon icon={faTimes} size="lg" className="wishlist-delete-icon" />

                </button>
                <button className="wishlist-move-to-bag rounded-md my-3 relative top-0" >    
                  MOVE TO BAG
                </button>
              
              </div>
              
            ))}
          </div>
        )}
      </div>
      <Footer/>
    </>
  );
};

export default WishlistPage;
