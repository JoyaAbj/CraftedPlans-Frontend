import React, {useState, useEffect} from 'react';
import '../Styles/accessories.css';
import NavBar from './NavBar';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import axios from 'axios';


const NotePads = () => {
        const [accessories, setAccessories] = useState([]);

        const category = "accessories";
        // const url = process.env.REACT_APP_API_URL;
        const getAllaccessories = () => {
            axios.post(`http://localhost:5000/products/getProductByCategory`, {category})
              .then((response) => {
                setAccessories(response.data.products);
                console.log(response.data.products)
              })
              .catch((error) => {
                console.error(error);
              });
          };
          
          useEffect(() => {
            getAllaccessories();
          }, []);
          const handleProductClick = (Id) => {
            window.location.href = `/productAccessories/${Id}`;
          };
          
          
  return (
    <div>
      <NavBar/>
      <div className="link-notepads">
        <Link to='/' className='linking-notepads'>Home/</Link>
        
            <p className='linking-notepads'>Accessories</p>
      </div>

      <div className="notepad-card">
    {accessories.map ((product, i) =>(
    <div className="product-card-notepads" key={i}>
        <div className="image-notepad">
            <Link to='/productAccessories' onClick={() => handleProductClick(product._id)}>
            <img 
            src={product.image} 
            alt="product" 
            className="img-note"
             
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
        image: `${process.env.PUBLIC_URL}/Images/image 3.png`,
        productName: 'Daily Notes',
        productPrice:'5$'
    },
    {
        image: `${process.env.PUBLIC_URL}/Images/image 3.png`,
        productName: 'Weekly List',
        productPrice:'6$'
    },
    {
        image: `${process.env.PUBLIC_URL}/Images/image 3.png`,
        productName: 'Weekly Spread',
        productPrice:'5$'
    },
    {
        image: `${process.env.PUBLIC_URL}/Images/image 3.png`,
        productName: 'Daily Notes',
        productPrice:'5$'
    },
    {
        image: `${process.env.PUBLIC_URL}/Images/image 3.png`,
        productName: 'Weekly List',
        productPrice:'6$'
    },
    {
        image: `${process.env.PUBLIC_URL}/Images/image 3.png`,
        productName: 'Weekly Spread',
        productPrice:'5$'
    }
]
export default NotePads