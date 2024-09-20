import React, { useState,useEffect } from 'react'
import Header from './Header'
import './MyOrder.css'
import axios from 'axios'
import Ripples from 'react-ripples'

const MyOrder = () => {

 const [orderdetails,setorderdetails]=useState([]);
 const [orderTotal,setordertotal]=useState("")

const [orderdate,setorderdate]=useState("");
const [orderstatus,setorderstatus]=useState("");
const [payment,setpayment]=useState("");
const [inputorderid,setinputorderid]=useState("");
const [inputorderid2,setinputorderid2]=useState("");
const [orderid,setorderid]=useState("");
const [loading,setloading]=useState(false);
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


const cancelOrder = () => {
  setloading(true)
  const fetchTokenFromLS = () => {
    return localStorage.getItem('token');
  };

  const token = fetchTokenFromLS();
  console.log(token)
  console.log(orderid)

  if (token && orderid) {
    axios.post('https://api.hirdayam.com/api/cancelOrder', 
    {
      order_id: orderid // Pass the orderid from the state
    }, 
    {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .then(response => {
      window.location.reload(); 
      console.log('API Response Data:', response);
      setorderdetails(response)
      setorderdate("df")
      setordertotal(response.data.data.order_amount)
      setorderstatus(response.data.data.order_status)
      setpayment(response.data.data.payment_status);
      setorderid(response.data.data.order_id)
      console.log(response.data.data.order_status+"lkjsdlsdldsjf")
      setorderdate(response.data.data.updated_at)

      if (response.data.status === true) {
        setorderdetails(response);
        //setOrderDetails(response.data.data);  // Handle the order details
      } else {
        console.error('Unexpected response format:', response.data);
      }
    })
    .catch(error => {
      console.error('Error fetching order item:', error);
    });
  } else {
    console.error('Token not found in localStorage or order ID is missing.');
  }
};


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
        setorderid(response.data.data.order_id)
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
            <input onChange={(e)=>{setinputorderid(e.target.value)}} placeholder='Enter OrderId' className='border py-2 px-2 rounded-md' type='text'></input>
            <button onClick={handleinputbox} className='btn bg-blue-900 text-white'>Search Order</button>
          </div>
    <table className="wishlist-table w-11/12 m-auto">
            <thead>
              <tr>
                {/* <th>Select</th> */}
                {/* <th>{orderdetails.data.message}</th> */}
              
                <th>Order Date</th>
                 <th>Payment</th>
                <th>Status</th>
                <th>Total</th>

                <th className={`${orderstatus=="cancelled"?"hidden":"block"}`}>Action</th>
              </tr>
            </thead>
            <tbody>
            
            
                <tr>
                  <td className=' font-semibold'>{formattedDate}</td>
                  <td>{payment}</td>

                  <td>{orderstatus}</td>
                  <td>{orderTotal}</td>
                  <td className={`${orderstatus=="cancelled"?"hidden":"block"}`}>
                    <Ripples onClick={()=>document.getElementById('my_modal_3').showModal()}>
                        <div className='text-white cursor-pointer gap-3 py-1 px-2 flex items-center justify-center rounded-md bg-blue-900'>
                     <img width={"30px"} src='https://cdn-icons-png.flaticon.com/512/4379/4379685.png'>

                     </img>
                     order
                     </div>
                    </Ripples>
                  
                  </td>
                 
                </tr>
             
            </tbody>
          </table>

          {/* You can open the modal using document.getElementById('ID').showModal() method */}
{/* <button className="btn" >open modal</button> */}
<dialog id="my_modal_3" className="modal">
  <div className="modal-box flex items-center  justify-center">
    {/* <form method="dialog">
      if there is a button in form, it will close the modal
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form> */}
    <div>
    <img className='m-auto' width={"70px"} src='https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/OOjs_UI_icon_notice-warning.svg/1200px-OOjs_UI_icon_notice-warning.svg.png'></img>
    <p className=' font-semibold text-3xl text-center my-3'>
    
    Are You Sure ?</p>
    <p className='my-4 text-center'>You Want To Cancel This Order!</p>
    <div className='flex justify-between w-full gap-7 my-6'>
      <button onClick={()=>{cancelOrder(orderid)}} className='bg-blue-900 flex items-center justify-center gap-3 cursor-pointer text-white p-2 rounded-md'>
      <span className={`loading  bg-white loading-spinner text-primary ${loading==false?"hidden":"block"}`}></span>
      Yes Cancel Order it!
      </button>
       <form method="dialog">
        <button className='bg-red-500 cursor-pointer text-white p-2 rounded-md'>Cancel</button>
       </form>
     

    </div>
    </div>
  </div>
</dialog>
        
          
    </>
  )
}

export default MyOrder