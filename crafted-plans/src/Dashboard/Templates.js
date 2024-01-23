import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import '../Styles/dashboard.css';


const Templates = () => {
  const { id } = useParams() || {};
  const [activeCategory, setActiveCategory] = useState('pages');
  const [templates, setTemplates] = useState([]);
  const [price, setPrice] = useState('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [images, setImages] = useState([]);
  const [imagesArray, setImagesArray] = useState([]);
  const [isAddProductModalOpen, setAddProductIsModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAddProduct = () => {
    setName('');
    setCategory('');
    setPrice('');
    setImages([]);
    setAddProductIsModalOpen(true);
  };

  const handleUpdateTemplate = (template) => {
    setName(template.name);
    setCategory(template.category);
    setPrice(template.price);
    setImagesArray(template.image);
    setImages([]);
    setUpdateModalOpen(true);
  };

  const closeModal = () => {
    setAddProductIsModalOpen(false);
  };

  const closeUpdateModal = () => {
    setUpdateModalOpen(false);
  };

  const getAllTemplatesByCategory = (category) => {
    axios
      .post(`http://localhost:5000/templates/getTemplateByCategory`, { category })
      .then((response) => {
        setTemplates(response.data.templates);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    getAllTemplatesByCategory(category);
  };

  const handleDeleteTemplate = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this template?');

    if (confirmDelete) {
      axios
        .delete(`http://localhost:5000/templates/deleteTemplate/${id}`)
        .then((response) => {
          console.log(`Template with ID ${id} deleted successfully`);
          getAllTemplatesByCategory(activeCategory);
          toast.success('Template deleted successfully!', { position: 'top-center' });
        })
        .catch((error) => {
          console.error('Error deleting template', error);
          // Show error toast
          toast.error('Error deleting template. Please try again.', { position: 'top-center' });
        });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Create FormData object
    const formData = new FormData();
    formData.append('name', name);
    formData.append('category', category);
    formData.append('price', price);
    // Append each selected image to the form data
    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
    }
    axios
      .post('http://localhost:5000/templates/addTemplate', formData)
      .then((response) => {
        console.log(response.data);
        setAddProductIsModalOpen(false);
        getAllTemplatesByCategory(activeCategory);
        toast.success('Template added successfully!', { position: 'top-center' });
      })
      .catch((error) => {
        console.error(error);
        toast.error('Error adding template. Please try again.', { position: 'bottom-right' });
      })
      .finally(()=>{
        setLoading(false);
      });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('category', category);
    formData.append('price', price);

    // Append each selected image to the form data
    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
    }

    // Append previous images to the form data
    for (let i = 0; i < imagesArray.length; i++) {
      formData.append('imagesArray', imagesArray[i]);
    }

    axios
      .put(`http://localhost:5000/templates/updateTemplate/${id}`, formData)
      .then((response) => {
        console.log(response.data);
        setUpdateModalOpen(false);
        getAllTemplatesByCategory(activeCategory);
        toast.success('Template updated successfully!', { position: 'bottom-right' });
      })
      .catch((error) => {
        console.error(error);
        toast.error('Error updating template. Please try again.', { position: 'bottom-right' });
      });
  };

  useEffect(() => {
    getAllTemplatesByCategory(activeCategory);
  }, [activeCategory]);

  return (
    <div>
      <div className="products-D">
        <div className="products-toggle-D">
          <button
            className={`products-btns-D ${activeCategory === 'pages' ? 'active' : ''}`}
            onClick={() => handleCategoryChange('pages')}
          >
            Pages
          </button>
          <button
            className={`products-btns-D ${activeCategory === 'addOns' ? 'active' : ''}`}
            onClick={() => handleCategoryChange('addOns')}
          >
            Add Ons
          </button>
          <button
            className={`products-btns-D ${activeCategory === 'cover' ? 'active' : ''}`}
            onClick={() => handleCategoryChange('cover')}
          >
            Covers
          </button>
        </div>
        <div className="products-container-D">
          <button className="add-product-D" onClick={handleAddProduct}>
            Add
          </button>
          <hr className="division-line-D" />
          <div className="show-products-D">
            {/* Render templates based on the active category */}
            {templates &&
              templates.map((template) => (
                <div key={template.id} className="product-card-D">
                  <img src={template.image} alt={template.name} className="product-image-D" />
                  <div className="edit-product-D">
                    <img
                      src="/Images/pen.svg"
                      alt="edit-image-1"
                      className="product-image-D1"
                      onClick={() => handleUpdateTemplate(template)}
                    />
                    <img
                      src="/Images/bin.svg"
                      alt="edit-image-2"
                      className="product-image-D1"
                      onClick={() => handleDeleteTemplate(template._id)}
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      {/* Modal for adding a template */}
      {isAddProductModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <form className='form-modal-dashboard' onSubmit={handleSubmit}>
              <label className='label-modal-dashboard'>
                Name:
                <input className='input-form-dashboard' type="text" value={name} onChange={(e) => setName(e.target.value)} />
              </label>
              <label className='label-modal-dashboard'>
                Category:
                <input className='input-form-dashboard' type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
              </label>
              <label className='label-modal-dashboard'>
                Price:
                <input className='input-form-dashboard' type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
              </label>
              <label className='label-modal-dashboard'>
                Images (up to 3):
                <input className='input-form-dashboard' type="file" multiple onChange={(e) => setImages(e.target.files)} />
              </label>
              <button className='submit-form-dashboard' type="submit" disabled={loading}>
                {loading ? (
                  <img src="/Images/wired-outline-112-book.gif" alt="loader" className="loader" />
                ) : (
                  'Add'
                )}
              </button>
            </form>
          </div>
        </div>
      )}
      {/* Modal for updating a template */}
      {updateModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeUpdateModal}>
              &times;
            </span>
            <form className='form-modal-dashboard' onSubmit={handleUpdate}>
              <label className='label-modal-dashboard'>
                Name:
                <input className='input-form-dashboard' type="text" value={name} onChange={(e) => setName(e.target.value)} />
              </label>
              <label className='label-modal-dashboard'>
                Category:
                <input className='input-form-dashboard' type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
              </label>
              <label className='label-modal-dashboard'>
                Price:
                <input className='input-form-dashboard' type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
              </label>
              <label className='label-modal-dashboard'>
                Images (up to 3):
                <input className='input-form-dashboard' type="file" multiple onChange={(e) => setImages(e.target.files)} />
              </label>
              <button className='submit-form-dashboard' type="submit">Update</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Templates;
