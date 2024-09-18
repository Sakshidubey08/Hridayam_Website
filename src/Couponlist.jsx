import React, { useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import { useClipboard } from 'use-clipboard-copy';
import { useEffect } from 'react';
import axios from 'axios';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { Link,  useNavigate } from 'react-router-dom';
const Couponlist = () => {
  const navigate=useNavigate();
    const [couponlist,setcouponlist]=useState([]);
    const [couponlist2,setcouponlist2]=useState([]);
    const [copiedCode, setCopiedCode] = useState(null);
    const clipboard = useClipboard({
        copiedTimeout: 9000, 
      })

      const handleCopy = (code) => {
        clipboard.copy(code);
       setCopiedCode(code); // Set the copied code to update the UI
      };

      useEffect(() => {
       
        getcouponforuser();
      }, [])

      useEffect(()=>{
        console.log("resnder" ,"2")
        //  setcouponlist2(couponlist.length!=0)
         
      },[couponlist]);


      

      const fetchTokenFromLS = () => {
        return localStorage.getItem('token');
      };
      const token = fetchTokenFromLS();
      
      const getcouponforuser = async () => {
          try {
              const response = await axios.get('https://api.hirdayam.com/api/getCouponforusers', {
                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${token}`
                  }
              });
              if (response && response.data && response.data.data) {
              let coupondata=response.data;
        
                setcouponlist(coupondata);
              
              
            
              console.log('Addres get success:', response.data);
              }
             
          } catch (error) {
              console.error('Error during couopnlistfor user submission:', error);
      
              if (error.response) {
                  console.error('Server couponlistforuser responded with:', error.response.data);
                  // setError(`Address submission failed: ${error.response.data.message || 'Unknown error'}`);
              } else {
                  // setError('Address submission failed. Please try again.');
              }
          }
      };
     const userId= localStorage.getItem('user_id');
     let filteredCoupons2;
     if(couponlist.length!=0){

     
       filteredCoupons2 =couponlist.data.filter((coupon , index) =>
        (coupon.users.some(user => user === userId) // Check if the coupon userId matches current userId
      ))
     

    }
    // console.log(filteredCoupons2+"lkjsdflsdlsdfl")

  return (
   <>
    <Header/>
    
    <div className='my-6 mx-12'>
        <div className='w-32 '>
            <p className=' font-semibold text-lg'>Coupon List</p> 
            <div className=' h-2 my-2 rounded-r-md  w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'></div>
        </div>
        {/* {couponlist.length!=null?couponlist.data._id:""} */}
        <div className='flex gap-10 my-10     flex-wrap'>
        {

           couponlist.length!=0?(couponlist.data.map((item,index)=>{

            
return(<div key={index}>
<div>{item.useId}</div>
 <div className='border w-64     rounded-md'>
   <img className=' rounded-md m-auto my-2  w-11/12 h-36 object-contain obj' src={"https://api.hirdayam.com/uploads/coupon_images/"+item.image}></img>
   <p className=' m-2'> {item.title}</p>
   <div  className=' m-2 flex gap-3 my-3'>
           <span className=' text-lg  text-nowrap'>use code<br></br>
</span>
<div className="lg:tooltip" data-tip="click to Copy">
           <input value={`${copiedCode==item.code ? 'Copied' : item.code}`}  onClick={() => handleCopy(item.code)} readOnly   className="  w-full  text-center  outline-none rounded-md cursor-copy bg-blue-900 text-white"></input>
</div>
           
        </div>

 </div>

 </div>
)
             })):(
              <div className=' m-auto'>
                <div className='flex items-center justify-center'>
                <img className=' object-contain' src='https://us.123rf.com/450wm/andyvi/andyvi1511/andyvi151100061/48092793-discount-coupons-in-hand-60-percent-discount-special-offer-for-holidays-and-weekends-card-with-a.jpg?ver=6'></img>
                </div>
                <div className='m-auto flex items-center  justify-center w-full '>

              <div onClick={()=>{navigate("/login")}} className='btn bg-blue-900  text-white'>View Coupons List</div> 
                </div>
              </div>
             )

        }
        </div>

       
    </div>

    <Footer/>
   </>
  )
}

export default Couponlist
