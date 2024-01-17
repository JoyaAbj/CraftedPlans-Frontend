import React from 'react'
import '../Styles/footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div>
        <div className="footer">
      <div className="menu-logo-footer">
      <div className="menu-footer">
      <ul className="navlinks-footer">
          <li className='menu-items-footer'> <Link to='/contact' className='menu-links-footer'>Contact</Link></li>
          <li className='menu-items-footer'> <Link to='/planners' className='menu-links-footer'>Planners</Link></li>
          <li className='menu-items-footer'> <Link to='/notepads' className='menu-links-footer'>NotePads</Link></li>
          <li className='menu-items-footer'> <Link to='/accessories' className='menu-links-footer'>Accessories</Link></li>
          </ul>
      </div>
      <div className="logo-footer">
        <img src="/Images/logo2.png" alt="logo" />
      </div>
      </div>
      <div className="social-footer">
        <ul className="social-links">
          <li className="social-footer"><img src='/Images/Instagram.png' alt='instagram' className='social-icons'/><Link to="https://www.instagram.com/buildwithjoya.aj/" target="_blank" rel="noopener noreferrer" className='social-name-footer'>@Crafted_Plans</Link></li>
          <li className="social-footer"><img src='/Images/Facebook.png' alt='instagram' className='social-icons'/><Link to="https://www.instagram.com/buildwithjoya.aj/" target="_blank" rel="noopener noreferrer" className='social-name-footer'>@Crafted_Plans</Link></li>
          <li className="social-footer"><img src='/Images/Tiktok.png' alt='instagram' className='social-icons'/><Link to="https://www.tiktok.com/@webdesign_andstuff" target="_blank" rel="noopener noreferrer" className='social-name-footer'>@Crafted_Plans</Link></li>
        </ul>
      </div>
        </div>
        <p className="copyright-footer">
        Copyright 2024, Crafted Plans
        </p>
    </div>
  )
}

export default Footer
