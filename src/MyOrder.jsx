import React, { useState,useEffect } from 'react'
import Header from './Header'
import './MyOrder.css'
import axios from 'axios'
const MyOrder = () => {

 const [orderdetails,setorderdetails]=useState([]);
 const [orderTotal,setordertotal]=useState("")

const [orderdate,setorderdate]=useState("");
const [orderstatus,setorderstatus]=useState("");
const [payment,setpayment]=useState("");
const [inputorderid,setinputorderid]=useState("");
const [inputorderid2,setinputorderid2]=useState("");
const date = new Date(orderdate);

// Options for formatting

const handleinputbox=()=>{
  setinputorderid2(inputorderid);
  fetchorderdetails();
}

const options = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: true, // for AM/PM format
  timeZoneName: 'short'
};

// Format the date
const formattedDate = date.toLocaleDateString('en-US', options);


useEffect(() => {
 
fetchorderdetails();
console.log(orderdetails)
  
}, [])

  const fetchorderdetails = () => {
    const fetchTokenFromLS = () => {
      return localStorage.getItem('token');
    };

    const fetchorderid = () => {
      return localStorage.getItem('orderid');
    };

    



    

    const orderid=fetchorderid();
    const token = fetchTokenFromLS();
   
    if (token) {
      axios.get(`https://api.hirdayam.com/api/getOrderdetails?order_id=${inputorderid2==""?orderid:inputorderid2}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      .then(response => {
        console.log('API Response Data:', response);
        setorderdetails(response)
        setorderdate("df")
        setordertotal(response.data.data.order_amount)
        setorderstatus(response.data.data.order_status)
        setpayment(response.data.data.payment_status);
        console.log(response.data.data.order_status+"lkjsdlsdldsjf")
        setorderdate(response.data.data.updated_at        )
        if (response.data.status === true && Array.isArray(response)){
          setorderdetails(response);
        } else {
          console.error('Unexpected response format:', response.data);
        }
      })
      .catch(error => {
        console.error('Error fetching order item:', error);
      });
    } else {
      console.error('Order Id found in localStorage.');
    }
  };

  return (
    <>
     <Header/>
{/* 
     <table className="order-table-container">
      <thead className="table-header">
        <th className="header-cell">Order</th>
        <div className="header-cell">Order Date</div>
        <div className="header-cell">Status</div>
        <div className="header-cell">Total</div>
        <div className="header-cell">Action</div>
        
      </thead>
      
      <tbody className="table-body">
        <div className="no-order-found">No order found</div>
        <div className="body-cell">Order</div>
       
       
      </tbody>
     

    </table> */}
    <div className='mx-14 my-5 flex gap-3 '>
            <input onChange={(e)=>{setinputorderid(e.target.value)}} placeholder='Enter Your OrderId' className='border py-2 px-2 rounded-md' type='text'></input>
            <button onClick={handleinputbox} className='btn bg-blue-900 text-white'>Search Order</button>
          </div>
    <table className="wishlist-table w-11/12 m-auto">
            <thead>
              <tr>
                {/* <th>Select</th> */}
                {/* <th>{orderdetails.data.message}</th> */}
                <th>Order</th>
              
                <th>Order Date</th>
                 <th>Payment</th>
                <th>Status</th>
                <th>Total</th>
                {/* <th>Action</th> */}
              </tr>
            </thead>
            <tbody>
            
            
                <tr>
                  <td><input className='' type="checkbox" /></td>
                  <td className=' font-semibold'>{formattedDate}</td>
                  <td>{payment}</td>

                  <td>{orderstatus}</td>
                  <td>{orderTotal}</td>
                 
                </tr>
             
            </tbody>
          </table>
        
          
    </>
  )
}

export default MyOrder