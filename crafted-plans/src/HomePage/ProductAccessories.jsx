import React, {useState} from 'react';
import '../Styles/productAccessories.css';
import NavBar from './NavBar';
import Footer from './Footer';

const NotepadProduct = () => {
    const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  return (
    <div>
     <NavBar/>
     <div className="product">
        {/* IMAGES */}
        <div className="images-product">
            <div className="big-small-images">
                <img src="/Images/image 3.png" alt="" className="big-image" />
                <div className="small-images">
                <img src="/Images/image 3.png" alt="" className="small-image" />
                <img src="/Images/image 3.png" alt="" className="small-image" />
                <img src="/Images/image 3.png" alt="" className="small-image" />
                </div>
            </div>
        </div>
        {/* INFORMATION */}
        <div className="informations-product">
            <h2 className="product-name-product">
                Daily Notes
            </h2>
            <p className="product-price-product">
                5$
            </p>
            <p className="product-desc-product">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam mi purus,
             feugiat non lectus in, tincidunt convallis dui. 
            </p>
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
                    Size: A5 <br/> Color: beige <br/> Design: Stylish
                </p>
            </div>
        </div>
     </div>
     <Footer/>
    </div>
  )
}

export default NotepadProduct