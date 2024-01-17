import React, {useState, useEffect} from 'react';
import '../Styles/productAccessories.css';
import NavBar from './NavBar';
import Footer from './Footer';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const NotepadProduct = () => {
  const {Id} = useParams();
    const [quantity, setQuantity] = useState(1);
    const [accessorie,setAccessorie] = useState({});

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const getAccessorieById = () => {
    axios.get(`http://localhost:5000/products/getProductById/${Id}`)
    .then((response)=> {
      console.log(response.data.products)
      setAccessorie(response.data.products);
    })
  .catch((error) => {
    console.error(error);
  });
  }
  useEffect(() => {
    getAccessorieById();
  }, [Id]);
  return (
    <div>
     <NavBar/>
     <div className="product">
        {/* IMAGES */}
        <div className="images-product">
            <div className="big-small-images">
                <img src={accessorie.image} alt="" className="big-image" />
                <div className="small-images">
                <img src={accessorie.image}alt="" className="small-image" />
                <img src={accessorie.image}alt="" className="small-image" />
                <img src={accessorie.image}alt="" className="small-image" />
                </div>
            </div>
        </div>
        {/* INFORMATION */}
        <div className="informations-product">
            <h2 className="product-name-product">
                {accessorie.name}
            </h2>
            <p className="product-price-product">
                {accessorie.price}$
            </p>
            <p className="product-desc-product">
            {accessorie.description} 
            </p>
            <p className="product-desc-product">Quantity: {accessorie.quantity}</p>
            <div className="qty-cart">
            <div className="quantity-product">
            <p className='product-quantity-product'>Quantity: {quantity}</p>
            <div className="btns-quantity">
            <button className='product-increase'
            onClick={handleDecrease}>-</button>
            <button className='product-decrease'
             onClick={handleIncrease}>+</button>
            </div>
            </div>
            <button className='product-add-to-cart'>Add to Cart</button>
            </div>
            <div className="product-details-div">
                <p className="product-details-title">Details</p>
                <hr className="line-product-division"/>
                <p className="product-details-content">
                    {accessorie.details}
                </p>
            </div>
        </div>
     </div>
     <Footer/>
    </div>
  )
}

export default NotepadProduct