import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/planner.css';

const Review = () => {
  const [plannerData, setPlannerData] = useState({
    coverID: localStorage.getItem('cover'),
    informations: localStorage.getItem('formDataArray'),
    weekStart: localStorage.getItem('selectedStartDay'),
    startDate: localStorage.getItem('selectedPlannerStartDate'),
    endDate: localStorage.getItem('selectedPlannerEndDate'),
    events: JSON.parse(localStorage.getItem('events')),
    pages: localStorage.getItem('dailyPlanner'),
    addOns: localStorage.getItem('Habit Tracker'),
      
    
  });
  const [cover, setCover] = useState({ image: '' });
  const [pages, setPages] = useState({image: ''});
  const [addOns, setAddOns] = useState({image:''});

  
  useEffect(() => {
    if (plannerData.coverID) {
      axios.get(`http://localhost:5000/templates/getTemplateById/${plannerData.coverID}`)
        .then(response => {
          setPlannerData(prevData => ({ ...prevData, template: response.data}));
          setCover({ image: response.data.templates.image[0] });
          console.log(response.data)
        })
        .catch(error => {
          console.error('Error fetching template:', error);
        });
    }
  }, [plannerData.coverID]);

  useEffect(() => {
    if (plannerData.pages) {
      axios.get(`http://localhost:5000/templates/getTemplateById/${plannerData.pages}`)
        .then(response => {
          setPlannerData(prevData => ({ ...prevData, template: response.data}));
          setPages({ image: response.data.templates.image[0] });
          console.log(response.data)
        })
        .catch(error => {
          console.error('Error fetching template:', error);
        });
    }
  }, [plannerData.pages]);
  
  const handleSubmitPlanner = () => {
    // Parse the information string
    // const parsedInformations = JSON.parse(plannerData.informations);
  
    // Use the plannerData state to send data to the backend
    axios.post('http://localhost:5000/planners/addPlanner', {
      cover: plannerData.coverID,
      personalInformation: plannerData.informations,
      events: plannerData.events,
      price: 10, // Set the price accordingly
      pages: plannerData.pages,
      addOns: plannerData.addOns,
    })
      .then(response => {
        console.log('Success:', response);
        // You can add additional logic here if needed
      })
      .catch(error => {
        console.error('Error:', error);
        // Handle errors here
      });
  };
  return (
    <div className='Dates'>
      <p className="review-planner">Review Planner Before confirming</p>
      {/* Display the fetched items on the page */}
      <div>
      <h2>Information:</h2>
        {plannerData.template && (
          <div>
            <p>Cover ID: {plannerData.coverID}</p>
            <p>Information: {plannerData.informations}</p>
            {/* Display other information fields as needed */}
          </div>
        )}
         {cover && (
          <div>
              <img
                src={cover.image}
                alt="product"
                className="img-cover"
              />
          </div>
        )}      
        <h2>Dates:</h2>
        <p>Week Start: {plannerData.weekStart}</p>
        <p>Start Date: {plannerData.startDate}</p>
        <p>End Date: {plannerData.endDate}</p>
        <p>Events:</p>
        <ul>
          {plannerData.events.map((event, index) => (
            <li key={index}>{`Event ${index + 1}: ${event.eventName} - ${event.date}`}</li>
          ))}
        </ul>
            {/* Pages section */}
      <h2>Pages:</h2>
      {plannerData.pages && (
        <div>
            <p>{`Page: ${plannerData.pages}`}</p>
            <img 
            src={pages.image} 
            alt="" 
            className="img-cover"/>
        </div>
      )}
      
      </div>
      <button onClick={handleSubmitPlanner}>Submit Planner</button>
    </div>
  );
};

export default Review;
