import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Styles/cartStyle.css';
import NavBar from './NavBar';

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
  const [products, setProducts] = useState({
    image: [],
    price: 0,
    name: "",
    description: "",
    quantity: 0,
    details: "",
    category: "",
});
  const [Ids, setIds] = useState([]);

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
      </div>
      </div>
    </div>
  );
};

export default Cart;
