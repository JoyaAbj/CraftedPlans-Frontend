import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Styles/cartStyle.css';
import NavBar from './NavBar';
import { getUserID } from './GetData';
import { getUserRole } from './GetData';

const fetchProducts = async () => {
  try {
    const response = await axios.get('http://localhost:5000/products/getAll');
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

  

  getUserID();
  useEffect(() => {
    const fetchData = async () => {
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
      setIds(localStorage.getItem('Ids').split(','));
    };

    fetchData();
  }, [Ids]);
  const handleRemoveItem = (id) => {
    if (Ids.length!==0) 
    setIds(Ids.filter((Id) => Id !== id));
  };
   const handleSubtotal = () => {
    const subtotal = products
      .filter((product) => Ids.includes(product._id))
      .reduce((acc, product) => acc + product.price, 0);

    return subtotal.toFixed(2); // To display two decimal places
  };
  const openBilling = () => {
    setShowBillingForm(true);
  };

  return (
    <div>
      <NavBar/>
      <div className="cart">
      <div className="cart-product">
        <table>
          <thead>
            <tr>
              <td className="white-tr-td">Product</td>
              <td className="white-tr-td">Details</td>
              <td className="white-tr-td"> Price</td>
              <td className="white-tr-td"> Action</td>
            </tr>
          </thead>
          <tbody>
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
                        <div className="btns-qty-cart">
                          <button className="increase">-</button>
                          <p className="item-qty-cart">{item.quantity}</p>
                          <button className="increase">+</button>
                        </div>
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
                <td className="td-white">SubTotal</td>
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
                <input 
                type="text" 
                placeholder='Full Name'
                className="billing-input" 
                // value={fullName}
                />
              </label>
              <label className="billing-label">
                <input 
                type="text" 
                placeholder='Email'
                className="billing-input" 
                // value={userInfo ? userInfo.email : ''}
                />
              </label>
              <label className="billing-label">
                <input 
                type="text" 
                placeholder='Phone Number'
                className="billing-input" 
                // value={userInfo ? userInfo.phoneNumber : ''}
                />
              </label>
              <label className="billing-label">
                <textarea 
                  placeholder="Address" 
                  id="" 
                  cols="30" 
                  rows="10" 
                  className="billing-text">
                </textarea>
              </label>
            <hr className="billing-line" />
            <p className="info-extra">Cash On Delivery</p>
            <input  className='checkout-cart' type="submit" />
            </div>
          </div>
        )}
      </div>
      </div>
    </div>
  );
};

export default Cart;
