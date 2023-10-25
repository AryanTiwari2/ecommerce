import React from 'react'
import "../CSS/OrderList.css"
const OrderList = ({name,image,amount,date,UserEmail,paymentStatus}) => {
  return (
    <>
    <div className='flex'>
      <div className='flex'>
      <img src={image} alt="image" />
      <p>{name}</p>
      <p>{date}</p>
      <p>{UserEmail}</p>
      <p>{amount}</p>
      <p>{paymentStatus}</p>
      </div>
    </div>
    </>
  )
}

export default OrderList
