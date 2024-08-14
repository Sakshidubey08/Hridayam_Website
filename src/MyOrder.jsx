import React from 'react'
import Header from './Header'
import './MyOrder.css'
const MyOrder = () => {
  return (
    <>
     <Header/>
     <div className="order-table-container">
      <div className="table-header">
        <div className="header-cell">Order</div>
        <div className="header-cell">Order Date</div>
        <div className="header-cell">Status</div>
        <div className="header-cell">Total</div>
        <div className="header-cell">Action</div>
      </div>
      <div className="table-body">
        <div className="no-order-found">No order found</div>
      </div>
    </div>
    </>
  )
}

export default MyOrder