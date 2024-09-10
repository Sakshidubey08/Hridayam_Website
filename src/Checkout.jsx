import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from './CartContext';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Footer from './Footer';
import './CheckoutPage.css';
import Header from './Header';
import Payment from './Payment';
import Button from 'react-bootstrap-button-loader';
import axios from 'axios';
import Loadingpage from './Loadingpage';

const CheckoutPage = () => {
  const { cartItems,applycoupon,PlaceOrder,placeorderdone, handlePayment, calculateSubtotal, calculateTotal } = useContext(CartContext);
  const screenshot = localStorage.getItem('screenshot');
  const countries = ['India', 'Country B', 'Country C', 'Country D'];
  const states = ['Madhya Pradesh', 'State 2', 'State 3', 'State 4', 'State 5'];
  const [couponinput,setcouponinput]=useState("");
  const [userprofiledata,setuserprofiledata]=useState([]);
  const [address,setaddress]=useState("");
  const [landmark,setLandmark]=useState("");
  const [zipcode ,setzipcode]=useState("");
  const [name ,setname] =useState("");
  const [email ,setemail] =useState("");
  const [phone,setphone]=useState("");
  const [areaname,setareaname]=useState("");
  const [floornumber ,setfloornumber]=useState("");
  const [discount,setdscount]=useState("");
  const [couponcode,setcouponcode]=useState("");
  const navigate=useNavigate();
  useEffect(() => {
    // Define an async function inside useEffect
  
   
  
    
  
    // Call the async function
    // const savedAddress = localStorage.getItem('address');
    // console.log(savedAddress)
    // if (savedAddress) {
    //   setaddress(JSON.parse(savedAddress));
    // } else {
    //   fetchAddress(); // Fetch from API if not found in local storage
    // }
  
    fetchUserProfile();
    // console.log(userprofiledata.data.name+"user profile data ")
    console.log(placeorderdone+"in the chekoutou")
    // setphone(userprofiledata.data.phone)
    fetchAddress();
  
  },[])
const handlecouponinput=(text)=>{
  setcouponinput(text.target.value);
}
const handleapplycouponbutton =()=>{
  applycoupon(couponinput,calculateTotal())
}


if(placeorderdone=="true"){
  navigate("/placeorder")
}



const handlepersonaldetail=()=>{
  const navigateTo = (url) => {
    window.location.href = url;
  };
  
  // Usage:
  navigateTo('/#/editprofile');
}

const handleaddressdetails =()=>{
  const navigateTo = (url) => {
    window.location.href = url;
  };
  
  // Usage:
  navigateTo('/#/manage-address');
}

const fetchUserProfile = async () => {
  try {
    const token = localStorage.getItem('token');
    
    if (!token){
      throw new Error('No token found in localStorage.');
    }

    const response = await axios.get('https://api.hirdayam.com/api/getUserprofile', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });

    console.log('Full response data:', response);
    console.log('User profile data:', response.data);

    // setuserprofiledata(response.data)
    setname(response.data.data.name)
    setemail(response.data.data.email)
    setphone(response.data.data.phone)
    // console.log(userprofiledata+"in edit page")
    const { name, email, phone, _id } = response.data.data;

    if (!_id) {
      throw new Error('User ID (_id) is missing in the response data.');
    }

    
    // localStorage.setItem('user_id', _id);

    // setName(name);
    // setEmail(email);
    // setPhone(phone);

    // console.log('Stored user_id:', localStorage.getItem('user_id'));
  } catch (error) {
    console.error('Error fetching user profile:', error);
    // setError('Failed to fetch user profile. Please check your credentials.');
  }
};

const handlePayment2=()=>{
  if(placeorderdone==false){
    return <Loadingpage></Loadingpage>
  }
  handlePayment()
 
  
}



const handaleplaceorder=()=>{



}

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
        setaddress(response.data.data[0].house_name);
        setLandmark(response.data.data[0].landmark)
        setzipcode(response.data.data[0].zip_code)
        setareaname(response.data.data[0].area_name)
        setfloornumber(response.data.data[0].floor_number)
        console.log(response.data.data[0].house_name+"from checkout page")
       
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

// console.log(address.data[0].house_name+"new")

  return (
    <>
      <Header />

    {/* <div>{userprofiledata.data.name}</div> */}
  

     
      <div className="checkout-page">
        <div className="billing-details">
          <h2 className='billing'>Billing Details</h2>
          <div className="billing-form">
            <div className="form-row">
              <div className="half-width">
                <label htmlFor="firstName">Full Name</label>
                <input disabled value={name} type="text" id="firstName" name="firstName" placeholder='Enter your name' />
              </div> 
              {/* <div className="half-width">
                <label htmlFor="lastName">Last Name</label>
                <input type="text" id="lastName" name="lastName" placeholder='Enter your name' />
              </div> */}
            </div>
            <div className="form-row">
              <div className="half-width">
                <label htmlFor="email">Email Address</label>
                 <input disabled value={email} type="email" id="email" name="email" placeholder='Enter email address' />
              </div>
              <div className="half-width">
                <label htmlFor="phone">Phone Number</label>
                <input disabled value={phone} type="text" id="phone" name="phone" placeholder='Enter phone number' />
              </div>
            </div>
            
                          <button onClick={handlepersonaldetail} className=' btn rounded-md text-white p-2 bg-blue-300 py-0 m-0'>Update Personal Details</button>

            
            <div className="form-row">
              {/* <div className="half-width">
                <label  htmlFor="country">Country</label>
                <select id="country" name="country">
                  {countries.map((country, index) => (
                    <option key={index} value={country}>{country}</option>
                  ))}
                  <option >India</option>
                </select>
              </div> */}
              {/* <div className="half-width">
                <label htmlFor="state">State</label>
                <select id="state" name="state">
                  {states.map((state, index) => (
                    <option key={index} value={state}>{state}</option>
                  ))}
                </select>
              </div> */}
            </div>
            
            <div className="form-row">
              <div className="half-width">
                <label htmlFor="address">Address</label>
              
                <input disabled type="text" id="address" value={address}   name="address"  placeholder='Enter address'/>
              </div>
              <div className="half-width">
                <label htmlFor="landmark">Landmark</label>
                <input disabled value={landmark}  type="text" id="landmark" name="landmark" placeholder='Enter landmark'/>
              </div>
            </div>

            <div className="form-row">
              <div className="half-width">
                <label htmlFor="city">Area Name</label>
                <input disabled value={areaname} type="text" id="city" name="city" placeholder='Enter city or town'/>
              </div>
              <div className="half-width">
                <label htmlFor="zipCode">Zip Code</label>
                <input disabled value={zipcode}  type="text" id="zipCode" name="zipCode" placeholder='Enter ZIP code'/>
              </div>
            </div>

            <div className="form-row">
              <div className="half-width">
                <label htmlFor="city">Floor Number</label>
                <input disabled value={floornumber} type="text" id="city" name="city" placeholder='Enter city or town'/>
              </div>
             
          </div>
          <button onClick={handleaddressdetails} className=' btn h-2  rounded-md text-white p-2 my-0 bg-blue-300 py-0 m-0'>Update Address Details</button>

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
              {/* <div>{cartItems.length}dsfjsdfllsdfljk</div> */}
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
          {/* <Link to="/place-order"> */}
            <button onClick={handlePayment2} style={{backgroundColor:'#23387A'}} className="proceed-checkout-btn">Place Order</button>
          {/* </Link> */}
        </div>
      </div>
     
      <Footer />
    </>
  );
};

export default CheckoutPage;



