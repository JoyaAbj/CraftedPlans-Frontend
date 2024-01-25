import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Styles/cartStyle.css';
import NavBar from './NavBar';
import { getUserID } from './GetData';
import { getUserRole } from './GetData';

const fetchProducts = async () => {
  try {
    const response = await axios.get(`https://crafted-plans.onrender.com/products/getAll`);
    return response.data.products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

const Cart = () => {
  const navigate = useNavigate();
  const [cartData, setCartData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [checkoutStatus, setCheckoutStatus] = useState();
  const [products, setProducts] = useState([]);
  const [Ids, setIds] = useState([]);
  const [prices, setPrices] = useState([]);
  const [showBillingForm, setShowBillingForm] = useState(false);
  const [plannerInfo, setPlannerInfo] = useState(null); 
  const [coverTemplate, setCoverTemplate] = useState(null);
  const [submittedPlannerId, setSubmittedPlannerId] = useState(null);
  
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  

  getUserID();
  useEffect(() => {
    const fetchData = async () => {
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
      localStorage.getItem('Ids') && setIds(localStorage.getItem('Ids').split(','));

      const storedPlannerInfo = JSON.parse(localStorage.getItem('submittedPlanner'));
      setPlannerInfo(storedPlannerInfo);
    };
    fetchData();
  }, [Ids]);

  useEffect(() => {
    const fetchCoverTemplate = async () => {
      try {
        const response = await axios.get(`https://crafted-plans.onrender.com/templates/getTemplateById/${plannerInfo?.cover}`);
        setCoverTemplate(response.data.templates);
      } catch (error) {
        console.error('Error fetching cover template:', error);
      }
    };

    if (plannerInfo && plannerInfo.cover) {
      fetchCoverTemplate();
    }
  }, [plannerInfo]);
  const handleRemoveItem = (id) => {
    if (Ids.length !== 0) {
      const updatedIds = Ids.filter((cartId) => cartId !== id);
      setIds(updatedIds);
  
      // Update local storage
      localStorage.setItem('Ids', updatedIds.join(',')); // Convert array to string
    }
  };
  const handleSubtotal = () => {
    const plannerPrice = plannerInfo ? parseFloat(plannerInfo.price) : 0;
  
    const subtotal = products
      .filter((product) => Ids.includes(product._id))
      .reduce((acc, product) => acc + parseFloat(product.price), 0);
  
    return (subtotal + plannerPrice).toFixed(2);
  };
  const openBilling = () => {
    setShowBillingForm(true);
  };
  const handleFormSubmit = async () => {
    try {
      // Prepare the order data
      const orderData = {
        userID: getUserID(), // assuming getUserID() returns the user ID
        planners: plannerInfo,
        products: Ids,
        status: false, // you can set the initial status as needed
        address,
      };
      console.log(orderData)
      const billingDetails = {
        fullName,
        email,
        phoneNumber,
        address,
      };

      const response = await axios.post(`https://crafted-plans.onrender.com/orders/add`, {
        ...orderData,
        ...billingDetails,
      });

      console.log(response.data);
      setIds([]);
      setPlannerInfo(null);
      setAddress('');
      localStorage.removeItem('Ids');
      localStorage.removeItem('submittedPlanner');
      navigate('/addReview'); 
    } catch (error) {
      console.error('Error submitting order:', error);
    }
  };

  return (
    <div>
      <NavBar/>
      <div className="cart">
      <div className="cart-product">
        <table>
          <thead>
            <tr>
              <td className="white-tr-td2">Product</td>
              <td className="white-tr-td2">Details</td>
              <td className="white-tr-td2"> Price</td>
              <td className="white-tr-td2"> Action</td>
            </tr>
          </thead>
          <tbody>
             {plannerInfo && coverTemplate && (
                <tr key="planner">
                  <td className="cart-details-order">
                    <img
                      className="cart-details-order-img"
                      src={coverTemplate.image}
                      alt="planner"
                    />
                  </td>
                  <td className="cart-details-order">
                    <span className="cart-Name">{coverTemplate.name}</span>
                  </td>
                  <td className="cart-details-order">
                    <span className="cart-car-details">{plannerInfo.price}$</span>
                  </td>
                  <td className="cart-details-order">
                    <button
                      onClick={() => handleRemoveItem('planner')}
                      className="cart-car-details"
                    >
                      x
                    </button>
                  </td>
                </tr>
              )}
            {Ids &&
              Ids.map((id) => {
                const item = products.find((product) => product._id === id);
                return (
                  item && (
                    <tr key={id}>
                      <td className="cart-details-order">
                        <img className="cart-details-order-img" src={item.image[0]} alt="product" />
                      </td>
                      <td className="cart-details-order">
                        <span className="cart-Name">{item.name}</span>
                        <br />
                        <span className="cart-details">
                           {item.category} 
                        </span>
                      </td>
                      <td className="cart-details-order">
                        <span className="cart-car-details">
                          {item.price}$
                        </span>
                      </td>
                      <td className="cart-details-order">
                        <button
                        onClick={() => handleRemoveItem(item._id)}
                        className="cart-car-details">x
                        </button>
                      </td>
                    </tr>
                  )
                );
              })}
          </tbody>
        </table>
      <table>
              <thead>
              <tr>
                <td className="td-white">SubTotal:</td>
                <td className="td-n">
                  {handleSubtotal()+" $"}
                </td>
                </tr>
                </thead>
                </table>
      <button 
      className="checkout-cart"
      onClick={openBilling}
      >Checkout</button>
          {showBillingForm && (
              <div className="billing-form">
                <div className="billing-title-line">
                  <h1 className="billing-title">Billing Details</h1>
                  <hr className="billing-line" />
                </div>
                <div className="billing-form">
                
          <label className="billing-label">
            <textarea 
              placeholder="Address" 
              id="" 
              cols="30" 
              rows="10" 
              className="billing-text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            ></textarea>
          </label>
            <hr className="billing-line" />
            <p className="info-extra">Cash On Delivery</p>
            <input  
            className='checkout-cart' 
            type="submit"
            onClick={handleFormSubmit} />
            </div>
          </div>
        )}
      </div>
      </div>
    </div>
  );
};

export default Cart;
