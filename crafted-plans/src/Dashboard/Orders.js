import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import '../Styles/dashboard.css';

const Orders = () => {
  const { id } = useParams();
  const [activeOrder, setActiveOrder] = useState('products');
  const [orders, setOrders] = useState([]);
  const [templateImages, setTemplateImages] = useState({});

  const getAllOrders = () => {
    axios.get(`https://crafted-plans.onrender.com/orders/getAll`)
      .then((response) => {
        console.log(response.data.allOrders);
        setOrders(response.data.allOrders);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  

  useEffect(() => {
    getAllOrders(activeOrder);
  }, [activeOrder]);

  return (
    <div>
      <div className="products-D1">
        <div className="cart-product1">
          <table>
            <thead>
              <tr>
                <th className='white-tr-td'>Products</th>
                <th className='white-tr-td'>Planners</th>
                <th className='white-tr-td'>User</th>
                <th className='white-tr-td'>Status</th>
                <th className='white-tr-td'>Address</th>
              </tr>
            </thead>
            <tbody>
              {orders && orders.map((order, i) => (
                <tr key={i}>
                  {/* Products */}
                  <td className='white-tr'>
                    {order.products && order.products.map((product, j) => (
                      <div key={j}>
                        <p>{product.name}</p>
                        {/* Include other product details here */}
                      </div>
                    ))}
                  </td>

                  {/* Planners */}
                  <td className='white-tr'>
                  {order.planners && order.planners.map((planner, k) => (
                      <div key={k}>
                        <p>{planner.cover}</p>
                      </div>
                    ))}
                  </td>

                  {/* User */}
                  <td className='white-tr'>{order.userID?.fullName}</td>

                  {/* Status */}
                  <td className='white-tr'>{order.status ? 'Completed' : 'Pending'}</td>

                  {/* Address */}
                  <td className='white-tr'>{order.address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;
