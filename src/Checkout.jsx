import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from './CartContext';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import './CheckoutPage.css';
import Header from './Header';
import Payment from './Payment';
import Button from 'react-bootstrap-button-loader';
import axios from 'axios';

const CheckoutPage = () => {
  const { cartItems,applycoupon, userprofiledata,  calculateSubtotal, calculateTotal } = useContext(CartContext);

  const countries = ['India', 'Country B', 'Country C', 'Country D'];
  const states = ['Madhya Pradesh', 'State 2', 'State 3', 'State 4', 'State 5'];
  const [couponinput,setcouponinput]=useState("");
  const [address,setaddress]=useState([]);
const handlecouponinput=(text)=>{
  setcouponinput(text.target.value);
}
const handleapplycouponbutton =()=>{
  applycoupon(couponinput,calculateTotal())
}

useEffect(() => {
  // Define an async function inside useEffect

  const fetchTokenFromLS = () => {
    return localStorage.getItem('token');
  };
  const token = fetchTokenFromLS();

  const fetchAddress = async () => {
      try {
          const response = await axios.get('https://api.hirdayam.com/api/getAddresses', {
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
              }
          });

          console.log('Addres get success:', response.data);
          // setSuccess('Address managed successfully.');
          // console.log(userprofiledata.data.name+"profile new")
          // setaddress(response.data);
         
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

  // Call the async function
  fetchAddress();

},[])

// console.log(address.data[0].house_name+"new")

  return (
    <>
      <Header />
      <div className="checkout-page">
        <div className="billing-details">
          <h2 className='billing'>Billing Details</h2>
          <div className="billing-form">
            <div className="form-row">
              <div className="half-width">
                <label htmlFor="firstName">First Name</label>
                {/* <input value={userprofiledata.data.name} type="text" id="firstName" name="firstName" placeholder='Enter your name' /> */}
              </div>
              <div className="half-width">
                <label htmlFor="lastName">Last Name</label>
                <input type="text" id="lastName" name="lastName" placeholder='Enter your name' />
              </div>
            </div>
            <div className="form-row">
              <div className="half-width">
                <label htmlFor="email">Email Address</label>
                {/* <input value={userprofiledata.data.email} type="email" id="email" name="email" placeholder='Enter email address' /> */}
              </div>
              <div className="half-width">
                <label htmlFor="phone">Phone Number</label>
                {/* <input value={userprofiledata.data.phone} type="text" id="phone" name="phone" placeholder='Enter phone number' /> */}
              </div>
            </div>
            <div className="form-row">
              <div className="half-width">
                <label  htmlFor="country">Country</label>
                <select id="country" name="country">
                  {/* {countries.map((country, index) => (
                    <option key={index} value={country}>{country}</option>
                  ))} */}
                  <option >India</option>
                </select>
              </div>
              <div className="half-width">
                <label htmlFor="state">State</label>
                <select id="state" name="state">
                  {states.map((state, index) => (
                    <option key={index} value={state}>{state}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="half-width">
                <label htmlFor="city">Town/City</label>
                <input type="text" id="city" name="city" placeholder='Enter city or town'/>
              </div>
              <div className="half-width">
                <label htmlFor="zipCode">Zip Code</label>
                {/* <input value={`${address.data[0].zip_code}`}  type="text" id="zipCode" name="zipCode" placeholder='Enter ZIP code'/> */}
              </div>
            </div>
            <div className="form-row">
              <div className="half-width">
                <label htmlFor="address">Address</label>
              
                {/* <input type="text" id="address" value={`${address.data[0].house_name}`}   name="address"  placeholder='Enter address'/> */}
              </div>
              <div className="half-width">
                <label htmlFor="landmark">Landmark</label>
                {/* <input value={`${address.data[0].landmark}`}  type="text" id="landmark" name="landmark" placeholder='Enter landmark'/> */}
              </div>
            </div>
          </div>
        </div>
        <div className="order-summary">
          <h2 className='billing'>Your Order</h2>
          <table className="order-table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map(item => (
                <tr key={item.id}>
                  <td>{item.product.name}</td>
                  <td>&#8377;{item.product.price}</td>
                </tr>
              ))}
              <tr>
                <td>Subtotal</td>
                <td>&#8377;{calculateSubtotal()}</td>
              </tr>
              <tr>
                <td>Total</td>
                <td>&#8377;{calculateTotal()}</td>
              </tr>
            </tbody>
          </table>
          <div className='gap-2'>
          <input onChange={handlecouponinput} className=' border-blue-300 p-2 rounded-md border-2 w-4/6' type='text'></input>
          {/* <Button >Press me!</Button> */}
          <button loading={handleapplycouponbutton.loading} onClick={handleapplycouponbutton} className='border  rounded-md  p-2 m-2 '>Apply coupon</button>
          </div>
          <div>
            <h2 className='billing1'>Payment Details</h2>
           {/* <Link to='/payment'><button>Pay Now</button></Link> */}
          </div>
          <Link to="/place-order">
            <button style={{backgroundColor:'#23387A'}} className="proceed-checkout-btn">Place Order</button>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CheckoutPage;




{/* {cartItems.map(item => (
                <tr key={item.id}>
                  <td>{item.product.name}</td>
                  <td>&#8377;{item.product.price}</td>
                </tr>
              ))} */}