// import React, { useContext } from 'react';
// import { CartContext } from './CartContext';
// import { FaTrash } from 'react-icons/fa';
// import { Link } from 'react-router-dom';
// import './CartPage.css';
// import Footer from './Footer';
// import Header from './Header';
// const CartPage = () => {
//   const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);

//   console.log('Cart Items:', cartItems);

//   const handleIncrement = (productId) => {
//     // Find the cart item by productId
//     const itemToUpdate = cartItems.find(item => item.product_id === productId);

//     if (itemToUpdate) {
//       // Increment the quantity
//       const newQuantity = itemToUpdate.quantity + 1;
//       // Pass the complete product object
//       updateQuantity(itemToUpdate, newQuantity);
//     } else {
//       console.error('Item not found in cart for productId:', productId);
//     }
//   };



//   const handleDecrement = (productId) => {
//     const itemToUpdate = cartItems.find(item => item.product_id === productId);

//     if (itemToUpdate) {

//       const newQuantity = itemToUpdate.quantity > 1 ? itemToUpdate.quantity - 1 : 1;
//       updateQuantity(itemToUpdate, newQuantity);
//     } else {
//       console.error('Item not found in cart for productId:', productId);
//     }
//   };




//   const calculateSubtotal = () => {
//     return cartItems.reduce((acc, item) => {
//       const price = parseFloat(item.product.price) || 0;
//       const quantity = parseInt(item.quantity) || 0;
//       return acc + price * quantity;
//     }, 0);
//   };

//   const calculateTotal = () => {
//     return calculateSubtotal();
//   };

//   if (cartItems.length === 0) {
//     return <div>Your cart is empty</div>;
//   }

//   return (
//     <> 
//       <Header/>
//       <div className="cart-container">
//         <table className="cart-table">
//           <thead>
//             <tr>
//               <th>Product Image</th>
//               <th>Product Name</th>
//               <th>Price</th>
//               <th>Quantity</th>
//               <th>Total Price</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {cartItems.map(item => (
//               <tr key={item.id}>
//               <td>
//                 <div className="cart-item-image">
//                   <img
//                     src={item.product.default_color_image || 'default-image.jpg'}
//                     alt={item.product.name || 'Product'}
//                     style={{ width: '50px', height: '50px' }}
//                   />
//                 </div>
//               </td>
//               <td>
//                 <div className="cart-item-name">
//                   {item.product.name || 'Unnamed Product'}
//                 </div>
//               </td>
//               <td>{item.product.price}</td>
//               <td>
//                 <button onClick={() => handleDecrement(item.product_id)}>
//                   -
//                 </button>
//                 <span>{item.quantity}</span>
//                 <button onClick={() => handleIncrement(item.product._id)}>
//                   +
//                 </button>
//               </td>
//               <td>
//                 &#8377;{(item.product.price || 0) * (item.quantity || 1)}
//               </td>
//               <td>
//               <button onClick={() => {
//     console.log('Removing item with _id:', item._id);
//     removeFromCart(item._id);
//   }}>
//                   <FaTrash />
//                 </button>
//               </td>
//             </tr>

//             ))}
//           </tbody>
//         </table>
//         <div className="cart-summary">
//           <h2 className="cart-total">Cart Total</h2>
//           <div className="summary-box">
//             <div className="summary-item1">
//               <span>Subtotal</span>
//               <span>&#8377;{calculateSubtotal()}</span>
//             </div>
//             <hr />
//             <div className="summary-item2">
//               <span>Total</span>
//               <span>&#8377;{calculateTotal()}</span>
//             </div>
//           </div>
//           <Link to="/checkout">
//             <button className="proceed-checkout-btn">Proceed to Checkout</button>
//           </Link>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default CartPage;
// import React, { useContext } from 'react';
// import { CartContext } from './CartContext';
// import { FaTrash } from 'react-icons/fa';
// import { Link } from 'react-router-dom';
// import './CartPage.css';
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
// import Footer from './Footer';
// import Header from './Header';

// const CartPage = () => {
//   const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);

//   console.log(cartItems)
//   const handleIncrement = (productId) => {
//     const item = cartItems.find(item => item._id === productId);
//     console.log(item._id)
//     console.log(item.quantity+1)
//     updateQuantity(item._id, item.quantity + 1);
//   };

//   const handleDecrement = (productId) => {
//     const item = cartItems.find(item => item._id === productId);
//     if (item.quantity > 1) {
//       updateQuantity(productId, item.quantity - 1);
//     }
//   };

//   const calculateSubtotal = () => {
//     return cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
//   };

//   const calculateTotal = () => {
//     const subtotal = calculateSubtotal();
//     // Add any other calculations for the total price, like tax or discounts, if applicable
//     return subtotal;
//   };

//   if (cartItems.length === 0){
//     return (
//       <>
//         <Header />
//         <div className='empty-wishlist-card mt-20 md:mt-10'>Your cart is empty</div>
//       </>
//     );
//   }

//   return (
//     <>
//       <Header/>
//       <div className="cart-container  mt-20 md:mt-10">
//         <table className="cart-table ">
//           <thead>
//             <tr>
//               <th>Product Name</th>
//               <th>Product Image</th>
//               <th>Price</th>
//               <th>Quantity</th>
//               <th>Total Price</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {cartItems.map(item => (

//               <tr key={item.id}>

//                 <td className=' font-semibold md:font-normal'>{item.product.name}</td>
//                 <td>
//                   <div
//                     className="cart-item-image"
//                     // style={item.id.endsWith('_product1') ? {
//                     //   width: `${item.borderSize.split(' ')[0] * 3}px`,
//                     //   height: `${item.borderSize.split(' ')[2] * 4}px`,

//                     // } : {}}
//                   >
//                   <div className=' flex items-center gap-2'>
//                     <img className={`${item.product.product_type=="personalize"?"block":"hidden"}`} src={item.personalize_image
// } alt={item.product.name} style={{ width: '100%', height: '100%' }} />
//  <img src={item.product.image
// } alt={item.product.name} style={{ width: '100%', height: '100%' }} />
// <p>{item.personalize_text}</p>
// </div>
//                   </div>
//                 </td>

//                 <td>&#8377;{item.product.price}</td>
//                 <td >
//                   <span className=' ' onClick={() => handleDecrement(item._id)}>-</span>
//                  <span className='mx-2'>{item.quantity}</span> 
//                   <span className='' onClick={() => handleIncrement(item._id)}>+</span>
//                 </td>
//                 <td>&#8377;{item.product.price * item.quantity}</td>
//                 <td className="action-column">
//                   <div className="action-button">
//                     <button className='hidden md:block' onClick={() => removeFromCart(item._id)}>
//                       <FaTrash />
//                     </button>

//                     <img  onClick={() => removeFromCart(item._id)} className='w-3 md:hidden m-auto' src="https://cdn-icons-png.flaticon.com/512/3405/3405244.png"></img>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <div className="cart-summary">
//         <h2 className="cart-total">Cart Total</h2>
//         <div className="summary-box">
//           <div className="summary-item1">
//             <span>Subtotal</span>
//             <span>&#8377;{calculateSubtotal()}</span>
//           </div>
//           <hr />
//           <div className="summary-item2">
//             <span>Total</span>
//             <span>&#8377;{calculateTotal()}</span>
//           </div>
//         </div>
//         <Link to="/checkout">
//           <button className="proceed-checkout-btn">Proceed to Checkout</button>
//         </Link>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default CartPage;
import React, { useState, useContext } from 'react';
import './CartPage.css';
import Header from './Header';
import { CartContext } from './CartContext';
import { FaTrash } from 'react-icons/fa';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import Ripples from  "react-ripples"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
function App() {
  const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);

  // console.log(cartItems)
  // const handleIncrement = (productId) => {
  //   const item = cartItems.find(item => item._id === productId);
  //   console.log(item._id)
  //   console.log(item.quantity + 1)
  //   updateQuantity(item._id, item.quantity + 1);
  // };
  console.log(cartItems+"this is from cartpage")
  const [selected, setSelected] = useState(false);
  if (cartItems.length === 0) {
    return (
      <>
        <Header />
        <div className='empty-wishlist-card mt-20 md:mt-10'>Your cart is empty</div>
      </>
    );
  }
  const handleCheckboxChange = () => {
    setSelected(!selected);
  };
   const calculateSubtotal = () => {
    return 
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    // Add any other calculations for the total price, like tax or discounts, if applicable
    return subtotal;
  };
  return (
    <>
      <Header />
   <div className="product-summary-container">
      <div className='final'>

        <div className="cart-container" >

          <div className="product">
            <div className="delete">
              <button className='hidden md:block' onClick={() => removeFromCart()}>
                <FontAwesomeIcon icon={faTimes} size="lg" />

              </button>
              <img onClick={() => removeFromCart()} className='w-3 md:hidden m-auto' src="https://cdn-icons-png.flaticon.com/512/3405/3405244.png"></img>
            </div>
            <div className="product-image flex items-center gap-2 ">
              <img src='https://i.pinimg.com/564x/c4/88/15/c48815ba889d5fb6b028e6c494942abc.jpg' />
            </div>
            <div className="product-info12">
              <h2 className="product-name">Name</h2>
              <p className="product-description">
                Black Accordion Pleats Empire Dress
              </p>
              <div className="product-options">
                <div className="option flex items-center">
                  <span className="label">Size:</span>
                  <select className="select">
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                  </select>
                </div>
                <div className="option flex items-center">
                  <span className="label">Qty:</span>
                  <select className="select">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                </div>
              </div>
              <p className="product-price">
                &#8377;123
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="cart-summary">
        <h2 className="cart-total">Cart Total</h2>
        <div className="summary-box">
          <div className="summary-item1">
            <span>Subtotal</span>
            <span>&#8377;123</span>
          </div>
          <hr />
          <div className="summary-item2">
            <span>Total</span>
            <span>&#8377;123</span>
          </div>
        </div>
        <Link to="/checkout">
        <Ripples background	={'rgb(150,150,150)'} color={'rgba(254, 242, 239 ,0.2)'} during={2000} className=''>
        <button className="proceed-checkout-bt bg-blue-900 text-white p-3 rounded-md">Proceed to Checkout</button>

        </Ripples>
        </Link>
      </div>
      {/* <div className="product-summary-container">
  <div className="final">
    {cartItems.map(item => (
      <div className="product-container" key={item._id}>
        <div className="product">
          <div className="delete">
            <button className='hidden md:block' onClick={() => removeFromCart(item._id)}>
              <FontAwesomeIcon  icon={faTimes} size="lg" />
            </button>
            <img onClick={() => removeFromCart(item._id)} className='w-3 md:hidden m-auto' src="https://cdn-icons-png.flaticon.com/512/3405/3405244.png" />
          </div>
          <div className="product-image flex items-center gap-2 ">
            <img className={`${item.product.product_type === "personalize" ? "block" : "hidden"}`} src={item.personalize_image} alt={item.product.name} style={{ width: '100%', height: '100%' }} />
            <img src={item.product.image} alt={item.product.name} style={{ width: '100%', height: '100%' }} />
          </div>
          <div className="product-info">
            <h2 className="product-name">{item.product.name}</h2>
            <p className="product-description">Black Accordion Pleats Empire Dress</p>
            <div className="product-options">
              <div className="option flex items-center">
                <span className="label">Size:</span>
                <select className="select">
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                </select>
              </div>
              <div className="option flex items-center">
                <span className="label">Qty:</span>
                <select className="select">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </div>
            </div>
            <p className="product-price">&#8377;{item.product.price}</p>
          </div>
        </div>
      </div>
    ))}
  </div>

  <div className="cart-summary">
    <h2 className="cart-total">Cart Total</h2>
    <div className="summary-box">
      <div className="summary-item1">
        <span>Subtotal</span>
        <span>&#8377;{calculateSubtotal()}</span>
      </div>
      <hr />
      <div className="summary-item2">
        <span>Total</span>
        <span>&#8377;{calculateTotal()}</span>
      </div>
    </div>
    <Link to="/checkout">
      <button className="proceed-checkout-btn">Proceed to Checkout</button>
    </Link>
  </div>
</div> */}
</div>
      <Footer />
    </>

  );
}

export default App;
