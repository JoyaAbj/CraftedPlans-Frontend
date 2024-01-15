import React, {useState, useEffect} from 'react';
import axios from 'axios';

const AddOns = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  
// Fetch covers
const [addOns, setAddOns] = useState([]);
const category = "addOns";
// const url = process.env.REACT_APP_API_URL;
const getAllAddOns = () => {
    axios.post(`http://localhost:5000/templates/getTemplateByCategory`, {category})
      .then((response) => {
        setAddOns(response.data.templates);
        console.log(response.data.templates)
      })
      .catch((error) => {
        console.error(error);
      });
  };
  
  useEffect(() => {
    getAllAddOns();
  }, []);
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
      <select id="dropdown" value={selectedOption} onChange={handleSelectChange}>
        <option value="">Select...</option>
        <option value="Fitness">Fitness</option>
        <option value="Lifestyle">Lifestyle</option>
        <option value="Budget">Budget</option>
      </select>
      <p>You selected: {selectedOption}</p>

      {/* AddOns */}
      {selectedOption && (
      <div className="cover-card-cover" >
      {filteredAddOns.map((addOn, i) => (
          <div key={i}>
            <div className="add-ons-images">
              {addOn.image.map((image, j) => (
                <img
                  key={j}
                  src={image}
                  alt={`product-${i}-${j}`}
                  className="img-cover"
                  // onClick={() => handleProductClick(i)}
                />
              ))}
            </div>
            <p className="name-cover">{addOn.name}</p>
          </div>
        ))}
    </div>
      )}
    </div>
  )
}

export default AddOns
