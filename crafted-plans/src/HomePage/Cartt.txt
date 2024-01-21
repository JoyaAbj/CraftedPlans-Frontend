import React from 'react'
import NavBar from './NavBar'
import Footer from './Footer'
import '../Styles/cart.css'

const Cart = () => {
  return (
    <div>
      <NavBar/>
      <div className="cart">
      <div className='Dates'>
      <div className="page-dates">
      <div className="text-part-dates">
      <h2 className="title-dates">Cart</h2>
      <p className="subtotal">Subtotal</p>
      <div className="item-in-cart">
        <img src="/Images/Daily Notes.png" 
        alt="item" 
        className="item-img" />
        <div className="qty-buttons">
            <button className="minus">-</button>
            <p className="item-quantity-cart">1</p>
            <button className="minus">+</button>
        </div>
        <p className="item-price-cart">3$</p>
        <p className="select">-</p>
      </div>
      <hr className='line'/>
      <div className="total">
        <p className="total-title">Total</p>
        <p className="final-price">12$</p>
      </div>
      <button className="checkout">Checkout</button>
      </div>
      </div>
      </div>
      </div>
      <Footer/>
    </div>
  )
}

export default Cart
