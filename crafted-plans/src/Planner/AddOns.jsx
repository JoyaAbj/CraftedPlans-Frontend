import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddOns = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');
  const [addOns, setAddOns] = useState([]);
  const category = "addOns";

  // Fetch AddOns
  const getAllAddOns = () => {
    axios.post(`http://localhost:5000/templates/getTemplateByCategory`, { category })
      .then((response) => {
        setAddOns(response.data.templates);
        console.log(response.data.templates);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getAllAddOns();
  }, []);

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
    setSelectedTemplate(null);
  };

  const handleImageClick = (selectedImage) => {
    setSelectedTemplate(selectedImage);
  };

  const filteredAddOns = addOns.filter((addOn) => {
    return selectedOption === '' || addOn.name === selectedOption;
  });

  return (
    <div className='Dates'>
      {selectedTemplate && (
        <img
          src={selectedTemplate}
          alt="Selected Template"
          className="mockup-display-pages"
        />
      )}

      {/* Dropdown */}
      <div className="dropdown-addOns">
      <select id="dropdown" value={selectedOption} onChange={handleSelectChange}>
        <option value="">Select...</option>
        <option value="Fitness">Fitness</option>
        <option value="Lifestyle">Lifestyle</option>
        <option value="Student Life">Student Life</option>
      </select>
      </div>

      {/* AddOns */}
      {selectedOption && (
        <div className="cover-card-cover">
          {filteredAddOns.map((addOn, i) => (
            <div key={i}>
              <div className="add-ons-images">
                {addOn.image.map((image, j) => (
                 <div className="map-images">
                   <img
                      key={j}
                      src={image}
                      alt={`product-${i}-${j}`}
                      className="img-cover"
                      onClick={() => handleImageClick(image)}
                    />
                    <input 
                    type="radio" 
                    className="add-page-addOns" />
                 </div> 
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddOns;
