import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Pages = () => {
  const [pages, setPages] = useState([]);
  const [selectedPlanner, setSelectedPlanner] = useState('weekly'); // Default to weekly planner
  const category = "pages";
  const [addOnsObj1, setAddOnsObj1] = useState({});
  const [largeImage, setLargeImage] = useState('');

  const getAllPages = () => {
    axios.post(`http://localhost:5000/templates/getTemplateByCategory`, { category })
      .then((response) => {
        setPages(response.data.templates);
        console.log(response.data.templates);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getAllPages();
  }, []);

  const filteredTemplates = pages.filter(template => {
    if (selectedPlanner === 'weekly') {
      // Filter for Weekly Planner, Weekly Planner-1, and Weekly Planner-2
      return (
        template.name.toLowerCase().includes('weekly planner') ||
        template.name.toLowerCase().includes('weekly planner-1') ||
        template.name.toLowerCase().includes('weekly planner-2')
      );
    } else {
      // Filter for Daily Planner
      return template.name.toLowerCase().includes('daily planner');
    }
  });
  const correspondingImageUrls = [
    { name: "Weekly Planners", url: "https://firebasestorage.googleapis.com/v0/b/crafted-plans.appspot.com/o/files%2FWeekly%20%20planner%20option%201.1.png?alt=media&token=a6c553fc-589d-497a-aaa9-3d30edb941ce" },
    { name: "Weekly Planner-1", url: "https://firebasestorage.googleapis.com/v0/b/crafted-plans.appspot.com/o/files%2FWeekly%20%20planner%20option%201.2.png?alt=media&token=d8e1e334-93b8-4bcd-bd6d-590fa3376d7d" },
    { name: "Weekly Planner-2", url: "https://firebasestorage.googleapis.com/v0/b/crafted-plans.appspot.com/o/files%2FWeekly%20%20planner%20option%201.3.png?alt=media&token=4ff5b981-c8fb-4762-aabb-7273d8101dce" },
  
    {name: "Daily Planners", url: "https://firebasestorage.googleapis.com/v0/b/crafted-plans.appspot.com/o/files%2FDaily%20%20planner%20option%201.1.png?alt=media&token=b1fb38b3-3a53-4f84-8ddf-79dcecf18c48"},
    {name: "Daily Planner-1", url: "https://firebasestorage.googleapis.com/v0/b/crafted-plans.appspot.com/o/files%2FDaily%20%20planner%20option%201.2.png?alt=media&token=dda242ff-8c82-4c05-9789-6205e558c866"},
    {name: "Daily Planner-2", url: "https://firebasestorage.googleapis.com/v0/b/crafted-plans.appspot.com/o/files%2FDaily%20%20planner%20option%201.3.png?alt=media&token=da7277c4-b468-4478-a913-2fefa8b86d60"},
];
  const handleImageClick = (selectedImageName) => {
    console.log(selectedImageName)
    const result = correspondingImageUrls.filter(option=>option.name === selectedImageName)
    console.log(result)
    setLargeImage(result[0].url)
  }
  const handleChange = (event, template) => {
    const templateId = template._id;
  
    // Clear other planner type from local storage and state
    if (selectedPlanner === 'weekly') {
      localStorage.removeItem('dailyPlanner');
      setAddOnsObj1((previous) => ({
        ...previous,
        dailyPlanner: null,
      }));
    } else {
      localStorage.removeItem('weeklyPlanner');
      setAddOnsObj1((previous) => ({
        ...previous,
        weeklyPlanner: null,
      }));
    }
  
    if (event.target.checked) {
      const plannerType = selectedPlanner === 'weekly' ? 'weeklyPlanner' : 'dailyPlanner';
      localStorage.setItem(plannerType, templateId);
      setAddOnsObj1((previous) => ({
        ...previous,
        [plannerType]: templateId,
      }));
    } else {
      const plannerType = selectedPlanner === 'weekly' ? 'weeklyPlanner' : 'dailyPlanner';
      localStorage.removeItem(plannerType);
      setAddOnsObj1((previous) => ({
        ...previous,
        [plannerType]: null,
      }));
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
      <div className="toggle-btns-pages">
        <button
          className={`weekly-daily-btns ${selectedPlanner === 'daily' ? 'active-daily' : ''}`}
          onClick={() => setSelectedPlanner('weekly')}
        >
          Weekly Planner
        </button>
        <button
          className={`weekly-daily-btns ${selectedPlanner === 'weekly' ? 'active-daily' : ''}`}
          onClick={() => setSelectedPlanner('daily')}
        >
          Daily Planner
        </button>
      </div>
      <div className="templates-pages">
        {filteredTemplates.map((template, index) => (
          <div key={index} className="map-images">
            <img
              src={template.image[0]}
              alt={template.name}
              className="choose-template"
              onClick={() => handleImageClick(template.name)}
            />
            <label class="labels-dates-m-s">
                      <input 
                        type="checkbox" 
                        className="button-dates1 checkbox-custom1" 
                        name="addOn" 
                        checked={addOnsObj1[selectedPlanner] === template._id ? true : false}
                        onChange={(e) => handleChange(e, template)}
                      />
                      {/* <span className="radio-label">{template.name}</span> */}
                    </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pages;
