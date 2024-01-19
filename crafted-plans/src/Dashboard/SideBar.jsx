import React, { useState } from 'react';
import '../Styles/planner.css';
import NavBar from '../HomePage/NavBar';
import Footer from '../HomePage/Footer';
import Products from './Products';
import Templates from './Templates';
import Orders from './Orders';
import Users from './Users';

const SideBar = () => {
    const [visibleProducts, setProductsVisible] = useState(true);
    const [visibleTemplates, setTemplatesVisible] = useState(false);
    const [visibleOrders, setOrdersVisible] = useState(false);
    const [visibleUsers, setUsersVisible] = useState(false);
 

    const handleSidebarClick = (section) => {
        setProductsVisible(section === 'products');
        setTemplatesVisible(section === 'templates');
        setOrdersVisible(section === 'orders');
        setUsersVisible(section === 'users');
      };
  return (
    <div>
    <body>
      <NavBar/>
      <div className="sidebar">
      <div className="one-cover">
        {visibleProducts &&
        <div className="icons-top-bar"></div>
        }
        <a href="#" 
        className={`link-topBar ${visibleProducts ? 'active1' : ''}`}
        onClick={() => handleSidebarClick('products')}>
          Products
        </a>
        </div>
        <div className="one-cover">
          
        {visibleTemplates &&
        <div className="icons-top-bar"></div>
        }
        <a href="#"  
        className={`link-topBar ${visibleTemplates ? 'active1' : ''}`} 
        onClick={() => handleSidebarClick('templates')}>
          Templates
        </a>
        </div>
        
        <div className="one-cover">
        
        {visibleOrders &&
        <div className="icons-top-bar"></div>
        }
        <a href="#" 
         className={`link-topBar ${visibleOrders ? 'active1' : ''}`}
         onClick={() => handleSidebarClick('orders')}>
          Orders
        </a>
        </div>
        <div className="one-cover">
        {visibleUsers &&
        <div className="icons-top-bar"></div>
        }
        <a href="#" 
         className={`link-topBar ${visibleUsers ? 'active1' : ''}`}
         onClick={() => handleSidebarClick('users')}>
            Users
        </a>
        </div>
      </div>
      <div class="Content">
        {visibleProducts && <Products/>}
        {visibleTemplates && <Templates/>}
        {visibleOrders && <Orders/>}
        {visibleUsers && <Users/>}
      </div>
      <Footer/>
    </body>
      
    </div>
  )
}

export default SideBar


//



  

  
 

