import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/dashboard.css';

const Products = () => {
  const [activeCategory, setActiveCategory] = useState('notepads');
  const [products, setProducts] = useState([]);
  const [isAddProductModalOpen, setAddProductIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [details, setDetails] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [images, setImages] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // You can send the form data to your backend API here
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("details", details);
    formData.append("price", price);
    formData.append("quantity", quantity);
    formData.append("category", activeCategory);
    for (let i = 0; i < images.length; i++) {
      formData.append(`images[${i}]`, images[i]);
    }

    // Perform your axios post request here with formData
    axios.post('http://localhost:5000/products/addProduct', formData)
      .then(response => {
        // Handle the response
        console.log(response.data);
      })
      .catch(error => {
        // Handle the error
        console.error(error);
      });

    // Close the modal after form submission
    setAddProductIsModalOpen(false);
  };

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
  const closeModal = () => {
    // Close the modal
    setAddProductIsModalOpen(false);
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
                    src="/Images/pen.svg"
                    alt='edit-image-1'
                    className='product-image-D1'
                  />
                  <img
                    src="/Images/bin.svg"
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
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            {/* Add your modal content here */}
            <form onSubmit={handleSubmit}>
              <label>
                Product Name:
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
              </label>
              <label>
                Description:
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
              </label>
              <label>
                Details:
                <input type="text" value={details} onChange={(e) => setDetails(e.target.value)} />
              </label>
              <label>
                Price:
                <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
              </label>
              <label>
                Quantity:
                <input type="text" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
              </label>
              <label>
                Images (up to 3):
                <input type="file" multiple onChange={(e) => setImages(e.target.files)} />
              </label>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
