import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from "react-hot-toast";


const Templates = () => {
  const {id} = useParams();
  const [activeCategory, setActiveCategory] = useState('pages');
  const [templates, setTemplates] = useState("");
  const [isAddProductModalOpen, setAddProductIsModalOpen] = useState(false);

  const handleAddProduct = () => {
    // Open or toggle the modal
    setAddProductIsModalOpen(true);
  };
  const closeModal = () => {
    // Close the modal
    setAddProductIsModalOpen(false);
  };
  const getAllTemplatesByCategory = (category) => {
    axios.post(`http://localhost:5000/templates/getTemplateByCategory`, { category })
      .then((response) => {
        setTemplates(response.data.templates);
        console.log(response.data.templates);
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
    // Display confirmation dialog
    const confirmDelete = window.confirm("Are you sure you want to delete this template?");
    
    if (confirmDelete) {
      axios.delete(`http://localhost:5000/templates/deleteTemplate/${id}`)
        .then((response) => {
          // Handle the response or perform any other actions after deletion
          console.log(`Template with ID ${id} deleted successfully`);
          // Update the UI
          getAllTemplatesByCategory(activeCategory);
          // Show success toast
          toast.success('Template deleted successfully!', { position: "bottom-right" });
        })
        .catch((error) => {
          console.error("Error deleting template", error);
          // Show error toast
          toast.error('Error deleting template. Please try again.', { position: "bottom-right" });
        });
    }
  };
  useEffect(() => {
    getAllTemplatesByCategory(activeCategory);
  }, [activeCategory]);

  return (
    <div>
    <div className='products-D'>
      <div className='products-toggle-D'>
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
      </div>
      <div className='products-container-D'>
        <button 
        className='add-product-D'
        onClick={handleAddProduct}
        >Add</button>
        <hr className='division-line-D' />
        <div className='show-products-D'>
          {/* Render products based on the active category */}
          {templates && templates.map((template) => (
            <div key={template.id} className='product-card-D'>
              <img
                src={template.image}
                alt={template.name}
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
                  onClick={() => handleDeleteTemplate(template._id)}
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
          {/* <form onSubmit={handleSubmit}> */}
            <label>
              Product Name:
              {/* <input type="text" value={name} onChange={(e) => setName(e.target.value)} /> */}
            </label>
            <label>
              Description:
              {/* <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} /> */}
            </label>
            <label>
              Details:
              {/* <input type="text" value={details} onChange={(e) => setDetails(e.target.value)} /> */}
            </label>
            <label>
              Price:
              {/* <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} /> */}
            </label>
            <label>
              Quantity:
              {/* <input type="text" value={quantity} onChange={(e) => setQuantity(e.target.value)} /> */}
            </label>
            <label>
              Images (up to 3):
              {/* <input type="file" multiple onChange={(e) => setImages(e.target.files)} /> */}
            </label>
            <button type="submit">Submit</button>
          {/* </form> */}
        </div>
      </div>
    )}
    
  </div>
);
};

export default Templates
