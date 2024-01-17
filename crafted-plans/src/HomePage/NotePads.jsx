import React, {useState, useEffect} from 'react';
import '../Styles/notepads.css';
import NavBar from './NavBar';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import axios from 'axios';

const NotePads = () => {
    const [notePads, setNotePads] = useState([]);
    const category = "notepads";
    // const url = process.env.REACT_APP_API_URL;
    const getAllNotePads = () => {
        axios.post(`http://localhost:5000/products/getProductByCategory`, {category})
          .then((response) => {
            setNotePads(response.data.products);
            // console.log(response.data.products)
          })
          .catch((error) => {
            console.error(error);
          });
      };
      
      useEffect(() => {
        getAllNotePads();
      }, []);

      const handleProductClick = (Id) => {
        window.location.href = `/notepadProduct/${Id}`;
      };
  return (
    <div>
      <NavBar/>
      <div className="link-notepads">
        <Link to='/' className='linking-notepads'>Home/</Link>
        
            <p className='linking-notepads'>Notepads</p>
      </div>

      <div className="notepad-card">
    {notePads && notePads.map ((product, i) =>(
    <div className="product-card-notepads" key={i}>
        <div className="image-notepad">
        <Link to='/notepadProduct' onClick={() => handleProductClick(product._id)}>
            <img 
            src={product.image} 
            alt="product" 
            className="img-note"
            // onClick={() => handleProductClick(i)} 
            />
            </Link>
            <Link to='/productAccessories' onClick={() => handleProductClick(product._id)} 
                className="check-item-button">
                Check Item
            </Link>
        </div>
        <p className="name-notepad">
            {product.name}
        </p>
        <div className="price-cart-notepad">
        <p className="price-notepad">
           {product.price}$
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

// const notepad = [
//     {
//         image: `${process.env.PUBLIC_URL}/Images/Daily Notes.png`,
//         productName: 'Daily Notes',
//         productPrice:'5$'
//     },
//     {
//         image: `${process.env.PUBLIC_URL}/Images/weekly list.png`,
//         productName: 'Weekly List',
//         productPrice:'6$'
//     },
//     {
//         image: `${process.env.PUBLIC_URL}/Images/weekly-spread.png`,
//         productName: 'Weekly Spread',
//         productPrice:'5$'
//     },
//     {
//         image: `${process.env.PUBLIC_URL}/Images/Daily Notes.png`,
//         productName: 'Daily Notes',
//         productPrice:'5$'
//     },
//     {
//         image: `${process.env.PUBLIC_URL}/Images/weekly list.png`,
//         productName: 'Weekly List',
//         productPrice:'6$'
//     },
//     {
//         image: `${process.env.PUBLIC_URL}/Images/weekly-spread.png`,
//         productName: 'Weekly Spread',
//         productPrice:'5$'
//     }
// ]
export default NotePads
