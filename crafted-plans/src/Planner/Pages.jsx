import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Pages = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isWeeklyPlanner, setIsWeeklyPlanner] = useState(true);

  const handleTemplateClick = (template) => {
    setSelectedTemplate(template);
  };

  const handleToggleClick = () => {
    setIsWeeklyPlanner(!isWeeklyPlanner);
    setSelectedTemplate(null); 
  };

  // Fetch Pages by category
  const [pages, setPages] = useState([]);
  const category = "pages";
  // const url = process.env.REACT_APP_API_URL;
  const getAllPages = () => {
      axios.post(`http://localhost:5000/templates/getTemplateByCategory`, {category})
        .then((response) => {
          setPages(response.data.templates);
          console.log(response.data.templates)
        })
        .catch((error) => {
          console.error(error);
        });
    };
    
    
    useEffect(() => {
      getAllPages();

    }, []);

  return (
    <div className='Dates'>
      {selectedTemplate && (
        <img 
          src={selectedTemplate}
          alt="Selected Template"
          className="mockup-display-pages"
        />
      )}
      <div className="toggle-btns-pages">
        <button 
          className={`weekly-daily-btns ${!isWeeklyPlanner ? 'active-daily' : ''}`}
          onClick={() => handleToggleClick()}
        >
          Weekly Planner
        </button>
        <button 
          className={`weekly-daily-btns ${isWeeklyPlanner ? 'active-daily' : ''}`}
          onClick={() => handleToggleClick()}
        >
          Daily Planner
        </button>
      </div>
      <div className="templates-pages">
        {isWeeklyPlanner ? (
          <>
            <div className="template-card">
              <img 
                src="/Templates/WeeklyPLanner-1.png" 
                alt="weekly planner 1" 
                className="choose-template" 
                onClick={() => handleTemplateClick("/Templates/Weekly  planner option 1.1.png")}
              />
            </div>
            <div className="template-card">
              <img 
                src="/Templates/WeeklyPLanner-2.png" 
                alt="weekly planner 2" 
                className="choose-template" 
                onClick={() => handleTemplateClick("/Templates/Weekly  planner option 1.2.png")}
              />
            </div>
            <div className="template-card">
              <img 
                src="/Templates/WeeklyPLanner-3.png" 
                alt="weekly planner 3" 
                className="choose-template" 
                onClick={() => handleTemplateClick("/Templates/Weekly  planner option 1.3.png")}
              />
            </div>
          </>
        ) : (
          <>
            <div className="template-card">
              <img 
                src="/Templates/DailyPlanner-1.png" 
                alt="daily planner 1" 
                className="choose-template" 
                onClick={() => handleTemplateClick("/Templates/Daily  planner option 1.1.png")}
              />
            </div>
            <div className="template-card">
              <img 
                src="/Templates/DailyPlanner-2.png" 
                alt="daily planner 2" 
                className="choose-template" 
                onClick={() => handleTemplateClick("/Templates/Daily  planner option 1.2.png")}
              />
            </div>
            <div className="template-card">
              <img 
                src="/Templates/DailyPlanner-3.png" 
                alt="daily planner 3" 
                className="choose-template" 
                onClick={() => handleTemplateClick("/Templates/Daily  planner option 1.3.png")}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Pages;
