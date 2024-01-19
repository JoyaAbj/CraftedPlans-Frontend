import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Pages = () => {
  const [pages, setPages] = useState([]);
  const [selectedPlanner, setSelectedPlanner] = useState('weekly'); // Default to weekly planner
  const category = "pages";
  const [addOnsObj, setAddOnsObj] = useState({});

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
  
  const handleChange = (event, template) => {
    const templateId = template._id;
  
    // Clear other planner type from local storage and state
    if (selectedPlanner === 'weekly') {
      localStorage.removeItem('dailyPlanner');
      setAddOnsObj((previous) => ({
        ...previous,
        dailyPlanner: null,
      }));
    } else {
      localStorage.removeItem('weeklyPlanner');
      setAddOnsObj((previous) => ({
        ...previous,
        weeklyPlanner: null,
      }));
    }
  
    // Set the selected planner type in local storage and state
    if (event.target.checked) {
      const plannerType = selectedPlanner === 'weekly' ? 'weeklyPlanner' : 'dailyPlanner';
      localStorage.setItem(plannerType, templateId);
      setAddOnsObj((previous) => ({
        ...previous,
        [plannerType]: templateId,
      }));
    } else {
      // Uncheck: Remove the selected planner type from local storage and state
      const plannerType = selectedPlanner === 'weekly' ? 'weeklyPlanner' : 'dailyPlanner';
      localStorage.removeItem(plannerType);
      setAddOnsObj((previous) => ({
        ...previous,
        [plannerType]: null,
      }));
    }
  };

  return (
    <div className='Dates'>
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
            />
            <label class="labels-dates-m-s">
                      <input 
                        type="checkbox" 
                        className="button-dates1 checkbox-custom1" 
                        name="addOn" 
                        checked={addOnsObj[selectedPlanner] === template._id || localStorage.getItem(selectedPlanner) === template._id}
                        onChange={(e) => handleChange(e, template)}
                        // onClick={() => handleCheckBoxClick(template.name)}
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
