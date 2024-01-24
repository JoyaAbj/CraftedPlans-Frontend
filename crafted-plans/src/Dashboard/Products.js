import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/dashboard.css';
import { toast } from 'react-hot-toast';

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
  const [addProductsIsModalOpen,setAddProductsIsModalOpen] = useState(false);
  const [isUpdateProductModalOpen, setUpdateProductModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [updateName, setUpdateName] = useState("");
  const [updateDescription, setUpdateDescription] = useState("");
  const [updateDetails, setUpdateDetails] = useState("");
  const [updatePrice, setUpdatePrice] = useState("");
  const [updateQuantity, setUpdateQuantity] = useState("");

  const handleAddProducts = () => {
    setName('');
    setDescription('');
    setDetails('');
    setPrice('');
    setQuantity('');
    setImages([]);
    setAddProductsIsModalOpen(true);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("details", details);
    formData.append("price", price);
    formData.append("quantity", quantity);
    formData.append("category", activeCategory);
    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
    }
    axios.post(`http://localhost:5000/products/addProduct`, formData)
      .then(response => {
        console.log(response.data);
        setAddProductsIsModalOpen(false);
        getAllProductsByCategory(activeCategory);
        toast.success('Product added successfully!', {position: 'top-center'})
      })
      .catch(error => {
        console.error(error);
        toast.error('Error adding product. Please try again.', {position: 'top-center'})
      })
      .finally(() => {
        setLoading(false); 
      });
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    getAllProductsByCategory(category);
  };

  const handleDeleteProduct = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?')

    if (confirmDelete){
      axios.delete(`http://localhost:5000/products/deleteProduct/${id}`)
      .then((response)=>{
        console.log(`Template with ID ${id} deleted successfully`);
        getAllProductsByCategory(activeCategory);
        toast.success('Template deleted successfully!', {position: 'top-center'});
      })
      .catch((error)=>{
        console.error('Error deleting template', error)
        toast.error('Error deleting template. Please try again.', {position: 'top-center'})
      });
    }
  };
  const handleOpenUpdateModal = (product) => {
    setUpdateName(product.name);
    setUpdateDescription(product.description);
    setUpdateDetails(product.details);
    setUpdatePrice(product.price);
    setUpdateQuantity(product.quantity);
    setUpdateProductModalOpen(true);
  };
  const handleUpdateProduct = (id) => {
    const updatedProductData = {
      name: updateName,
      description: updateDescription,
      details: updateDetails,
      price: updatePrice,
      quantity: updateQuantity,
    };
  
    axios.put(`http://localhost:5000/products/updateProduct/${id}`, updatedProductData)
      .then((response) => {
        console.log(updatedProductData)
        setProducts(updatedProductData)
        // console.log(response.data);
        getAllProductsByCategory(activeCategory);
        toast.success('Product updated successfully!', { position: 'top-center' });
        setUpdateProductModalOpen(false); // Close the update modal
      })
      .catch((error) => {
        console.error(error);
        toast.error('Error updating product. Please try again.', { position: 'top-center' });
      });
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
 
  const closeModal = () => {
    setAddProductsIsModalOpen(false);
  };
  const closeUpdateModal = () => {
    setUpdateProductModalOpen(false);
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
          onClick={handleAddProducts}
          className='add-product-D'
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
                    onClick={() => handleOpenUpdateModal(product)}
                  />
                  <img
                    src="/Images/bin.svg"
                    alt='edit-image-2'
                    className='product-image-D1'
                    onClick={() => handleDeleteProduct(product._id)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
       {/* Modal for adding a product */}
      {addProductsIsModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <form className='form-modal-dashboard' onSubmit={handleSubmit}>
              <label className='label-modal-dashboard'>
                Product Name:
                <input className='input-form-dashboard' type="text" value={name} onChange={(e) => setName(e.target.value)} />
              </label>
              <label className='label-modal-dashboard'>
                Description:
                <input className='input-form-dashboard' type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
              </label>
              <label className='label-modal-dashboard'>
                Details:
                <input className='input-form-dashboard' type="text" value={details} onChange={(e) => setDetails(e.target.value)} />
              </label>
              <label className='label-modal-dashboard'>
                Price:
                <input className='input-form-dashboard' type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
              </label>
              <label className='label-modal-dashboard'>
                Quantity:
                <input className='input-form-dashboard' type="text" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
              </label>
              <label className='label-modal-dashboard'>
                Images (up to 3):
                <input className='input-form-dashboard' type="file" multiple onChange={(e) => setImages(e.target.files)} />
              </label>
              <button className='submit-form-dashboard' type="submit" disabled={loading}>
                {loading ? (
                  <img src="/Images/wired-outline-112-book.gif" alt="loader" className="loader" />
                ) : (
                  'Submit'
                )}
              </button>
            </form>
          </div>
        </div>
      )}
      {/* Modal for updating a product */}
      {isUpdateProductModalOpen && (
  <div className="modal">
    <div className="modal-content">
      <span className="close" onClick={closeUpdateModal}>&times;</span>
      <form className='form-modal-dashboard'>
        {/* Update product fields */}
        <label className='label-modal-dashboard'>
          Product Name:
          <input className='input-form-dashboard' type="text" value={updateName} onChange={(e) => setUpdateName(e.target.value)} />
        </label>
        <label className='label-modal-dashboard'>
          Description:
          <input className='input-form-dashboard' type="text" value={updateDescription} onChange={(e) => setUpdateDescription(e.target.value)} />
        </label>
        <label className='label-modal-dashboard'>
          Details:
          <input className='input-form-dashboard' type="text" value={updateDetails} onChange={(e) => setUpdateDetails(e.target.value)} />
        </label>
        <label className='label-modal-dashboard'>
          Price:
          <input className='input-form-dashboard' type="text" value={updatePrice} onChange={(e) => setUpdatePrice(e.target.value)} />
        </label>
        <label className='label-modal-dashboard'>
          Quantity:
          <input className='input-form-dashboard' type="text" value={updateQuantity} onChange={(e) => setUpdateQuantity(e.target.value)} />
        </label>
        <button className='submit-form-dashboard' type="button" disabled={loading} onClick={() => handleUpdateProduct(products._id)}>
          {loading ? (
            <img src="/Images/wired-outline-112-book.gif" alt="loader" className="loader" />
          ) : (
            'Update'
          )}
        </button>
      </form>
    </div>
  </div>
)}
    </div>
  );
};

export default Products;
