import React, { useState } from 'react';
import '../Styles/NavBar.css';
import { Link } from 'react-router-dom';
import { getUserRole } from './GetData';
import { Navbar } from 'react-bootstrap';

const NavBar = () => {
  const [clicked, setClicked] = useState(false);
  const handleClick = () => {
    setClicked(!clicked);
  };
  const token = localStorage.getItem('token');
  const logout = () => {
    localStorage.clear();
  };
  const role = getUserRole();

  return (
    <div>
      <div className="catchy-phrase">
        <p className="phrase">
          Orders will be shipped 6-7 business days after the order is submitted.
        </p>
      </div>
      <div className="logo">
        <img
          src="./Images/logo1.png"
          alt="logo"
          className="logo-crafted-plans-navbar"
        />
        <div className="cart-login">
          <div id='mobile' onClick={handleClick}>
            <i
              id='bar'
              className={clicked ? 'fas fa-times' : 'fas fa-bars'}
            ></i>
          </div>
          <div className={clicked ? 'icons-navbar active' : 'icons-navbar'}>
            {token ? (
              <>
                {role === 'customer' && (
                  <Link to='/cart'>
                    <img
                      src="/Images/cart.png"
                      alt="cart"
                      className="login-navbar"
                    />
                  </Link>
                )}

                {role === 'admin' && (
                  <Link to='/dashboard'>
                    <img
                      src="/Images/dashboard.svg"
                      alt="dash"
                      className="login-navbar"
                    />
                  </Link>
                )}

                <Link to='/login' onClick={logout}>
                  <img
                    src="/Images/Logout.png"
                    alt="log out"
                    className="login-navbar"
                  />
                </Link>
              </>
            ) : (
              <Link to='/login'>
                <img
                  src="/Images/vector1.png"
                  alt="login"
                  className="login-navbar"
                />
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="menu-navbar">
        <nav className='navigation-bar-navbar'>
          <ul
            id="navlinks-navbar"
            className={clicked ? 'active' : ''}
          >
            <li className='menu-items-navabar'>
              <Link
                to='/'
                className={
                  clicked
                    ? 'menu-links-navabar active'
                    : 'menu-links-navabar'
                }
              >
                Home
              </Link>
            </li>
            <li className='menu-items-navabar'>
              <Link to='/planners' className="menu-links-navabar">
                Planners
              </Link>
            </li>
            <li className='menu-items-navabar'>
              <Link to='/notepads' className="menu-links-navabar">
                NotePads
              </Link>
            </li>
            <li className='menu-items-navabar'>
              <Link to='/accessories' className="menu-links-navabar">
                Accessories
              </Link>
            </li>
            <li className='menu-items-navabar'>
              <Link to='/contact' className="menu-links-navabar">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default NavBar;
