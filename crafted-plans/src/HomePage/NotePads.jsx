import React from 'react';
import '../Styles/notepads.css';
import NavBar from './NavBar';
import Footer from './Footer';
import { Link } from 'react-router-dom';

const NotePads = () => {
    // const handleProductClick = () => {}
  return (
    <div>
      <NavBar/>
      <div className="link-notepads">
        <Link to='/' className='linking-notepads'>Home/</Link>
        
            <p className='linking-notepads'>Notepads</p>
      </div>

      <div className="notepad-card">
    {notepad.map ((product, i) =>(
    <div className="product-card-notepads" key={i}>
        <div className="image-notepad">
            <img 
            src={product.image} 
            alt="product" 
            className="img-note"
            // onClick={() => handleProductClick(i)} 
            />
        </div>
        <p className="name-notepad">
            {product.productName}
        </p>
        <div className="price-cart-notepad">
        <p className="price-notepad">
           {product.productPrice}
        </p>
           <img 
           src="/Images/cart.png" 
           alt="cart" 
           className="cart-notepad"/>
        </div>
    </div>
    ))}
      </div>

      <Footer/>
    </div>
  )
}

const notepad = [
    {
        image: `${process.env.PUBLIC_URL}/Images/Daily Notes.png`,
        productName: 'Daily Notes',
        productPrice:'5$'
    },
    {
        image: `${process.env.PUBLIC_URL}/Images/weekly list.png`,
        productName: 'Weekly List',
        productPrice:'6$'
    },
    {
        image: `${process.env.PUBLIC_URL}/Images/weekly-spread.png`,
        productName: 'Weekly Spread',
        productPrice:'5$'
    },
    {
        image: `${process.env.PUBLIC_URL}/Images/Daily Notes.png`,
        productName: 'Daily Notes',
        productPrice:'5$'
    },
    {
        image: `${process.env.PUBLIC_URL}/Images/weekly list.png`,
        productName: 'Weekly List',
        productPrice:'6$'
    },
    {
        image: `${process.env.PUBLIC_URL}/Images/weekly-spread.png`,
        productName: 'Weekly Spread',
        productPrice:'5$'
    }
]
export default NotePads
