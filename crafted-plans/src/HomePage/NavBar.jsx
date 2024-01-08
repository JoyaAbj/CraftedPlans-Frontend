import React from 'react'
import '../Styles/NavBar.css';
import { Link } from 'react-router-dom';

const NavBar = () => {
  // const [clicked, setclicked] = useState(false);
  // const handleClick = () => {
  //     setclicked(!clicked)
  // }
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
        <img 
        src="/Images/vector.png" 
        alt="login" 
        className="login-navbar" 
        />
      </div>
      <div className="menu-navbar">
        <nav className='navigation-bar-navbar'>
          <ul className="navlinks-navbar">
          <li className='menu-items-navabar'> <Link to='/' className='menu-links-navabar active'>Home</Link></li>
          <li className='menu-items-navabar'> <Link to='/planners' className='menu-links-navabar'>Planners</Link></li>
          <li className='menu-items-navabar'> <Link to='/notepads' className='menu-links-navabar'>NotePads</Link></li>
          <li className='menu-items-navabar'> <Link to='/accessories' className='menu-links-navabar'>Accessories</Link></li>
          <li className='menu-items-navabar'> <Link to='/contact' className='menu-links-navabar'>Contact</Link></li>
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default NavBar
