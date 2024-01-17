import React, {useState, useEffect} from 'react';
import '../Styles/notepadProduct.css';
import NavBar from './NavBar';
import Footer from './Footer';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from "react-hot-toast";

const NotepadProduct = () => {
    const { Id } = useParams();
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);
    const [notePad, setNotePad] = useState({}); 

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const getNotePadById = () => {
    axios.get(`http://localhost:5000/products/getProductById/${Id}`)
    .then((response)=> {
      console.log(response.data.products)
      setNotePad(response.data.products);
    })
  .catch((error) => {
    console.error(error);
  });
  }
  useEffect(() => {
    getNotePadById();
  }, [Id]);
  const handleAddToCart = () => {
    if (!localStorage.getItem("Ids")) {
      localStorage.setItem("Ids", Id);
      navigate("/cart");
    } else {
      if (localStorage.getItem("Ids").split(",").includes(Id)) {
        toast.error("Already in your cart");
        return;
      }
      let updatedId = localStorage.getItem("Ids") + `,${Id}`;
      localStorage.setItem("Ids", updatedId);
    }
   
  };
  return (
    <div>
     <NavBar/>
     <div className="product">
       {/* IMAGES */}
       
          <div className="images-product" >
            <div className="big-small-images">
              <img src={notePad.image} alt="" className="big-image" />
              <div className="small-images">
                <img src={notePad.image} alt="" className="small-image" />
                <img src={notePad.image} alt="" className="small-image" />
                <img src={notePad.image} alt="" className="small-image" />
              </div>
            </div>
          </div>
        
        {/* </div> */}
        {/* INFORMATION */}
        <div className="informations-product">
            <h2 className="product-name-product">
                {notePad.name}
            </h2>
            <p className="product-price-product">
                {notePad.price}$
            </p>
            <p className="product-desc-product">
              {notePad.description}
            </p>
            <div className="qty-cart">
            <div className="quantity-product">
            <p className='product-quantity-product'>Quantity: {notePad.quantity}</p>
            <div className="btns-quantity">
            <button className='product-increase'
            onClick={handleDecrease}>-</button>
            <button className='product-decrease'
             onClick={handleIncrease}>+</button>
            </div>
            </div>
            <button 
            className='product-add-to-cart'
            onClick={handleAddToCart}>
              Add to Cart</button>
            </div>
            <div className="product-details-div">
                <p className="product-details-title">Details</p>
                <hr className="line-product-division"/>
                <p className="product-details-content">
                    Size: {notePad.details} <br/> Color: beige <br/> Design: Stylish
                </p>
            </div>
        </div>
     </div>
     <Footer/>
    </div>
  )
}

export default NotepadProduct
