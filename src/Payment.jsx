import React, { useState } from 'react';
import './Payment.css'
import Header from './Header';
import Footer from './Footer';
const RazorpayComponent = () => {
  const [amount, setAmount] = useState('');

  const handlePayment = async () => {
    const options = {
      key: 'rzp_test_WZu8B3H1Bec0W9', 
      amount: amount * 100, 
      currency: 'INR',
      name: 'Desi Gro',
      description: 'Test Transaction',
      image: 'https://example.com/logo.png', 
      handler: async function (response) {
       console.log(response)
        setAmount('');
      },
      prefill: {
        name: 'Piyush Garg',
        email: 'youremail@example.com',
        contact: '9999999999',
      },
      notes: {
        address: 'Razorpay Corporate Office',
      },
      theme: {
        color: '#3399cc',
      },
    };

    const rzp1 = new window.Razorpay(options);

    rzp1.on('payment.failed', function (response){
      console.log(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });

    rzp1.open();
  };

  return (
    <>
    <Header/>
    <div className="container">
      <div className="card">
       
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter Amount"
        />
        <button onClick={handlePayment}>Pay Now</button>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default RazorpayComponent;

