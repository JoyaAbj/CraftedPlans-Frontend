import React from 'react';
import '../Styles/ProductsHomePage.css';
import { Link } from 'react-router-dom';

const ProductsHomePage = () => {
  return (
    <div>
     <div className="products-home">
      <div className="product-H">
        {/* <div className="line-home"></div> */}
        <img src="/Images/image 1.png" alt="planner" className="product-img-home" />
        <h4 className="product-name-home">Planners</h4>
        <Link to='/planners' className='product-link-home'>Build Now</Link>
      </div>
      <div className="product-H">
        <div className="line-home"></div>
        <img src="/Images/image 2.png" alt="notepad" className="product-img-home" />
        <h4 className="product-name-home">NotePads</h4>
        <Link to='/notepads' className='product-link-home'>Shop Now</Link>
      </div>
      <div className="product-H">
        <div className="line-home"></div>
        <img src="/Images/image 3.png" alt="accessorie" className="product-img-home" />
        <h4 className="product-name-home">Accessories</h4>
        <Link to='/accessories' className='product-link-home'>Shop Now</Link>
      </div>
     </div>
    </div>
  )
}

export default ProductsHomePage
