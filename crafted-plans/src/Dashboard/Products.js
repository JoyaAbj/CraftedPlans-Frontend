import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/dashboard.css';

const Products = () => {
  const [activeCategory, setActiveCategory] = useState('notepads');
  const [products, setProducts] = useState([]);
  const [isAddProductModalOpen, setAddProductIsModalOpen] = useState(false);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    getAllProductsByCategory(category);
  };

  const getAllProductsByCategory = (category) => {
    axios.post(`http://localhost:5000/products/getProductByCategory`, { category })
      .then((response) => {
        setProducts(response.data.products);
        console.log(response.data.products);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleAddProduct = () => {
    // Open or toggle the modal
    setAddProductIsModalOpen(true);
  };

  useEffect(() => {
    getAllProductsByCategory(activeCategory);
  }, [activeCategory]);

  return (
    <div>
      <div className='products-D'>
        <div className='products-toggle-D'>
          <button
            className={`products-btns-D ${activeCategory === 'notepads' ? 'active' : ''}`}
            onClick={() => handleCategoryChange('notepads')}
          >
            NotePads
          </button>
          <button
            className={`products-btns-D ${activeCategory === 'accessories' ? 'active' : ''}`}
            onClick={() => handleCategoryChange('accessories')}
          >
            Accessories
          </button>
        </div>
        <div className='products-container-D'>
          <button 
          className='add-product-D'
          onClick={handleAddProduct}
          >Add</button>
          <hr className='division-line-D' />
          <div className='show-products-D'>
            {/* Render products based on the active category */}
            {products.map((product) => (
              <div key={product.id} className='product-card-D'>
                <img
                  src={product.image}
                  alt={product.name}
                  className='product-image-D'
                />
                <div className='edit-product-D'>
                  <img
                    src="/Images/insta-contact.png"
                    alt='edit-image-1'
                    className='product-image-D1'
                  />
                  <img
                    src="/Images/insta-contact.png"
                    alt='edit-image-2'
                    className='product-image-D1'
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Modal for adding a product */}
      {isAddProductModalOpen && (
        <div className="modal">
          hi
          <button onClick={() => setAddProductIsModalOpen(false)}>Close Modal</button>
          {/* Add your form elements for adding a product */}
        </div>
      )}
    </div>
  );
};

export default Products;
