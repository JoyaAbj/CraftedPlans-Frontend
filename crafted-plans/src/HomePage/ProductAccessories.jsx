import React, {useState, useEffect} from 'react';
import '../Styles/productAccessories.css';
import NavBar from './NavBar';
import Footer from './Footer';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { toast } from "react-hot-toast";

const NotepadProduct = () => {
    const {Id} = useParams();
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);
    const [accessorie,setAccessorie] = useState({
      image: [],
      price: 0,
      name: "",
      description: "",
      quantity: 0,
      details: "",
      category: "",
  }); 
  const [selectedImageIndex,setSelectedImageIndex] = useState(0);

  // const handleQuantityChange = (index, newQuantity) => {
  //   if (newQuantity <= 0) {
  //     toast.error("Quantity must be greater than 0");
  //     return;
  //   }
  // if (newQuantity <= cartDetails[index].quantity) {
  //   setCart((prevCart) => {
  //     const updatedCart = prevCart.map((item, i) =>
  //       i === index
  //         ? {
  //             ...item,
  //             quantity: newQuantity,
  //             totalPrice: (
  //               newQuantity *
  //               parseFloat(cartDetails[index].discountedPrice || cartDetails[index].originalPrice)
  //             ).toFixed(2),
  //           }
  //         : item
  //     );

  //     const updatedCartDetails = [...cartDetails];
  //     updatedCartDetails[index].quantity -= newQuantity;

  //     localStorage.setItem("cart", JSON.stringify(updatedCart));
  //     localStorage.setItem("cartDetails", JSON.stringify(updatedCartDetails));

  //     updateCartKey(); 

  //     return updatedCart; 
  //   });
  // } else {
  //   toast.error("Not enough quantity in stock");
  // }

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

  const handleChangeImage = (index) =>{
    setSelectedImageIndex(index);
  }
  return (
    <div>
     <NavBar/>
     <div className="link-notepads">
        <Link to='/' className='linking-notepads'>Home/</Link>
        <Link to='/accessories' className='linking-notepads'>Accessories/</Link>
        
            <p className='linking-notepads'>{accessorie.name}</p>
      </div>
     <div className="product">
        {/* IMAGES */}
        {console.log(accessorie.image)}
        <div className="images-product">
            <div className="big-small-images">
                <img src={accessorie.image[selectedImageIndex]} alt="" className="big-image" />
                <div className="small-images">
                {accessorie.image.map((smallImage, index) => (
                <img
                  key={index}
                  src={smallImage}
                  alt={`small-image-${index}`}
                  className={`small-image ${selectedImageIndex === index ? 'selected' : ''}`}
                  onClick={() => handleChangeImage(index)}
                />
              ))}
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