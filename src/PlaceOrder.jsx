import React from 'react'
import Header from './Header'
import './PlaceOrder.css'
import { Link } from 'react-router-dom'
const PlaceOrder = () => {
    return (
        <>
            <Header />
            <div className="container">
                <div className="message">
                    <div className="message-content">
                        Thank you. Your order has been received
                    </div>
                </div>
                <div className="order-details">
                    <div className="detail-item">
                        <span className="label">Order id</span>
                        <span className="value">164</span>
                    </div>
                    <div className="detail-item">
                        <span className="label">Date</span>
                        <span className="value">16/04/2023</span>
                    </div>
                    <div className="detail-item">
                        <span className="label">Total</span>
                        <span className="value">240.00$</span>
                    </div>
                    <div className="detail-item">
                        <span className="label">Payment Method</span>
                        <span className="value">RazorPay</span>
                    </div>
                </div>
                
               <Link to='/'> <button className="button">Back To Home Page</button></Link>
            </div>
        </>
    )
}

export default PlaceOrder