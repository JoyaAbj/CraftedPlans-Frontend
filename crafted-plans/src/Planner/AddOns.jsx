import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddOns = () => {
  const [selectedTemplates, setSelectedTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');
  const [addOns, setAddOns] = useState([]);
  const [addOnsObj, setAddOnsObj] = useState({});
  const [correspondingImageUrl, setCorrespondingImageUrl] = useState(null);
  const [largeImage, setLargeImage] = useState('')
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
    setCorrespondingImageUrl(null); // Reset corresponding image URL when the dropdown changes
  };

  // const correspondingImageUrls = {
  //   Fitness: [
  //     { name: "Meal Planner", url: "https://firebasestorage.googleapis.com/v0/b/crafted-plans.appspot.com/o/files%2Fmeal-planner-mockup-nobg.png?alt=media&token=3d027d5e-ac37-46b8-a532-71a97f708a6c" },
  //     { name: "Workout Tracker", url: "https://firebasestorage.googleapis.com/v0/b/crafted-plans.appspot.com/o/files%2FWorkout-tracker-mockup-nobg.png?alt=media&token=59bcedc4-fd70-4d79-bd11-5520558e7759" },
  //     { name: "Measurement Tracker", url: "https://firebasestorage.googleapis.com/v0/b/crafted-plans.appspot.com/o/files%2FMeasurement-Tracker-mockup-nobg.png?alt=media&token=23de9ef4-8270-4fec-b010-c7c5236824d0" }
  //   ],
  //   Lifestyle: [
  //     {name: "Habit Tracker", url: "https://firebasestorage.googleapis.com/v0/b/crafted-plans.appspot.com/o/files%2FHabit-tracker-mockup-nobg.png?alt=media&token=007f3a1e-def6-43fe-b325-04a0bcf31eb9"},
  //     {name: "Project Tracker", url: "https://firebasestorage.googleapis.com/v0/b/crafted-plans.appspot.com/o/files%2FProject-Tracker-mockup-nobg.png?alt=media&token=d75eef64-3f38-4500-807c-f44f8c93458f"},
  //     {name: "Reading Tracker", url: "https://firebasestorage.googleapis.com/v0/b/crafted-plans.appspot.com/o/files%2FReading-Tracker-mockup-nobg.png?alt=media&token=6e0772df-3ba9-4c62-9e0a-b197a12fc388"}
  //   ],
  //   StudentLife: [
  //     {name: "Assignment Tracker", url: "https://firebasestorage.googleapis.com/v0/b/crafted-plans.appspot.com/o/files%2FAssignment%20Tracker-mockup-nobg.png?alt=media&token=567eadfb-715a-4dee-896b-55fd77d7f264"},
  //     {name: "Semester Planner", url: "https://firebasestorage.googleapis.com/v0/b/crafted-plans.appspot.com/o/files%2FSemester-planner-mockup-nobg.png?alt=media&token=00dc7687-eeef-4e15-bfb4-1421e955e662"},
  //     {name: "Study Session", url: "https://firebasestorage.googleapis.com/v0/b/crafted-plans.appspot.com/o/files%2FStudy-session-mockup-nobg.png?alt=media&token=e2bcdcb0-aa4a-4c24-b652-29e64c4ea136"}
  //   ]
  // };

  

  const correspondingImageUrls = [
      { name: "Meal Planner", url: "https://firebasestorage.googleapis.com/v0/b/crafted-plans.appspot.com/o/files%2Fmeal-planner-mockup-nobg.png?alt=media&token=3d027d5e-ac37-46b8-a532-71a97f708a6c" },
      { name: "Workout Tracker", url: "https://firebasestorage.googleapis.com/v0/b/crafted-plans.appspot.com/o/files%2FWorkout-tracker-mockup-nobg.png?alt=media&token=59bcedc4-fd70-4d79-bd11-5520558e7759" },
      { name: "Measurement Tracker", url: "https://firebasestorage.googleapis.com/v0/b/crafted-plans.appspot.com/o/files%2FMeasurement-Tracker-mockup-nobg.png?alt=media&token=23de9ef4-8270-4fec-b010-c7c5236824d0" },
    
      {name: "Habit Tracker", url: "https://firebasestorage.googleapis.com/v0/b/crafted-plans.appspot.com/o/files%2FHabit-tracker-mockup-nobg.png?alt=media&token=007f3a1e-def6-43fe-b325-04a0bcf31eb9"},
      {name: "Project Tracker", url: "https://firebasestorage.googleapis.com/v0/b/crafted-plans.appspot.com/o/files%2FProject-Tracker-mockup-nobg.png?alt=media&token=d75eef64-3f38-4500-807c-f44f8c93458f"},
      {name: "Reading Tracker", url: "https://firebasestorage.googleapis.com/v0/b/crafted-plans.appspot.com/o/files%2FReading-Tracker-mockup-nobg.png?alt=media&token=6e0772df-3ba9-4c62-9e0a-b197a12fc388"},
    
      {name: "Assignment Tracker", url: "https://firebasestorage.googleapis.com/v0/b/crafted-plans.appspot.com/o/files%2FAssignment%20Tracker-mockup-nobg.png?alt=media&token=567eadfb-715a-4dee-896b-55fd77d7f264"},
      {name: "Semester Planner", url: "https://firebasestorage.googleapis.com/v0/b/crafted-plans.appspot.com/o/files%2FSemester-planner-mockup-nobg.png?alt=media&token=00dc7687-eeef-4e15-bfb4-1421e955e662"},
      {name: "Study Session", url: "https://firebasestorage.googleapis.com/v0/b/crafted-plans.appspot.com/o/files%2FStudy-session-mockup-nobg.png?alt=media&token=e2bcdcb0-aa4a-4c24-b652-29e64c4ea136"},
  ];

  // const handleImageClick = (selectedImageName) => {
  //   // Find corresponding image URL based on the selected option and name
  //   const correspondingImageArray = correspondingImageUrls[selectedOption];
    
  //   // Check if correspondingImageArray is defined and not empty
  //   if (correspondingImageArray && correspondingImageArray.length > 0) {
  //     const correspondingImage = correspondingImageArray.find(image => image.name === selectedImageName);
    
  //     // Display the corresponding image URL
  //     setCorrespondingImageUrl(correspondingImage ? correspondingImage.url : null);
  //   }
  // };
  
  const handleImageClick = (selectedImageName) => {
    console.log(selectedImageName)
    const result = correspondingImageUrls.filter(option=>option.name === selectedImageName)
    console.log(result)
    setLargeImage(result[0].url)
  }
  
  
  const filteredAddOns = addOns.filter((addOn) => {
    return selectedOption === '' || addOn.name === selectedOption;
  })
  // console.log(filteredAddOns)

  const handleChange = (event, addOn) => {
        if (event.target.checked) {
    localStorage.setItem(addOn.name, addOn._id)
    setAddOnsObj((previous) => ({
      ...previous, [addOn.name ]: addOn._id
    }))
        } else {
    localStorage.removeItem(addOn.name)
    setAddOnsObj((previous) => ({
      ...previous,
      [addOn.name] : null
    }))
        }
  };

  return (
    <div className='Dates'>
     {/* Display the corresponding image */}
     {largeImage !=='' && (
        <img
          src={largeImage}
          alt="Corresponding Image"
          className="corresponding-image"
        />
      )}

      <div className="drorpdowns-options">
      {/* DropDown Fitness */}
      <div className="dropdown-addOns">
        <select  id="dropdown" value={selectedOption} onChange={handleSelectChange}>
          <option value="">Fitness</option>
          <option value="Meal Planner">Meal Planner</option>
          <option value="Workout Tracker">Workout Tracker</option>
          <option value="Measurement Tracker">Measurement Tracker</option>
        </select>
      </div>

      {/* DropDown Lifestyle */}
      <div className="dropdown-addOns">
        <select  id="dropdown" value={selectedOption} onChange={handleSelectChange}>
          <option value="">LifeStyle</option>
          <option value="Habit Tracker">Habit Tracker</option>
          <option value="Project Tracker">Project Tracker</option>
          <option value="Reading Tracker">Reading Tracker</option>
        </select>
      </div>

      {/* DropDown StudentLife */}
      <div className="dropdown-addOns">
        <select  id="dropdown" value={selectedOption} onChange={handleSelectChange}>
          <option value="">StudentLife</option>
          <option value="Assignment Tracker">Assignment Tracker</option>
          <option value="Semester Planner">Semester Planner</option>
          <option value="Study Session">Study Session</option>
        </select>
      </div>
      </div>

  

      {/* AddOns */}
      {selectedOption && (
        <div className="cover-card-cover">
          {filteredAddOns.map((addOn, i) => (
            <div key={addOn._id}>
              <div className="add-ons-images">
                {addOn.image.length > 0 && (
                  <div className="map-images">
                    <img
                      src={addOn.image[0]}
                      alt={`product-${i}-0`}
                      className="img-cover-addOns"
                      onClick={() => handleImageClick(addOn.name)}
                    />
                   <label class="labels-dates-m-s">
                      <input 
                        type="checkbox" 
                        className="button-dates1 checkbox-custom1" 
                        name="addOn" 
                        checked={addOnsObj[addOn.name] || localStorage.getItem(addOn.name) ? true : false}
                        onChange={(e) => handleChange(e, addOn)}
                        // onClick={() => handleCheckBoxClick(addOn.name)}
                      />
                      <span className="radio-label">{addOn.name}</span>
                    </label>
                  </div>
                )}
                    </div>
                  </div>
                ))}
        </div>
      )}

      
    </div>
  );
};

export default AddOns;
