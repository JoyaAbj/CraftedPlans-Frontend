import React, {useState, useEffect} from 'react';
import '../Styles/notepadProduct.css';
import NavBar from './NavBar';
import Footer from './Footer';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { toast } from "react-hot-toast";

const NotepadProduct = () => {
    const { Id } = useParams();
    const navigate = useNavigate();
    // const [quantity, setQuantity] = useState(1);
    const [notePad, setNotePad] = useState({
      image: [],
      price: 0,
      name: "",
      description: "",
      quantity: 0,
      details: "",
      category: "",
  }); 
  const [selectedImageIndex,setSelectedImageIndex] = useState(0);

 
  const getNotePadById = () => {
    axios.get(`http://localhost:5000/products/getProductById/${Id}`)
    .then((response)=> {
      console.log('omar ', response.data.products)
      console.log('omar2 ', response.data.products.image[0])
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
  const handleChangeImage = (index) =>{
    setSelectedImageIndex(index);
  }
  return (
    <div>
     <NavBar/>
     <div className="link-notepads">
        <Link to='/' className='linking-notepads'>Home/</Link>
        <Link to='/notepads' className='linking-notepads'>Notepads/</Link>
        
            <p className='linking-notepads'>{notePad.name}</p>
      </div>
     <div className="product">
       {/* IMAGES */}
       {console.log('hel ',notePad.image[0])}
          <div className="images-product" >
            <div className="big-small-images">
              <img src={notePad.image[selectedImageIndex]} alt="" className="big-image" />
              <div className="small-images">
              {notePad.image.map((smallImage, index) => (
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
            <p className='product-quantity-product'>  Quantity: {notePad.quantity}</p>
            <div className="qty-cart">
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
