import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/planner.css';

const Review = () => {
  const [plannerData, setPlannerData] = useState({});
  const coverID = localStorage.getItem('cover');
  const informations = localStorage.getItem('formDataArray');
  const data = JSON.parse(informations);

  let fullName = '';
  let phoneNumber = '';
  let email = '';
  let message = '';

  if (Array.isArray(data)) {
    data.forEach((entry, index) => {
      fullName = entry.fullName;
      phoneNumber = entry.phoneNumber;
      email = entry.email;
      message = entry.message;
    });
  }

  const weekStart = localStorage.getItem('selectedStartDay');
  const startDate = localStorage.getItem('selectedPlannerStartDate');
  const endDate = localStorage.getItem('selectedPlannerEndDate');
  const events = JSON.parse(localStorage.getItem('events'));
  const pagesID = localStorage.getItem('dailyPlanner');
  const templateNames = Object.keys(localStorage); 
  const addOnsData = templateNames
    .filter((key) => 
    key !== 'cover' 
    && key !== 'formDataArray' 
    && key !== 'selectedStartDay' 
    && key !== 'selectedPlannerStartDate' 
    && key !== 'selectedPlannerEndDate'
    && key !== 'events'
    && key !== 'dailyPlanner'
    && key !== 'activeButtonType'
    && key !== 'token'
    && key !== 'id') 
    .map((name) => ({ name, id: localStorage.getItem(name) })); 

  const price = '0.00';

  const [cover, setCover] = useState({ images: [] });
  const [pages, setPages] = useState({ images: [] });

  useEffect(() => {
    const fetchData = async (templateId, setFunction) => {
      try {
        const response = await axios.get(`http://localhost:5000/templates/getTemplateById/${templateId}`);

        if (response.data.templates && response.data.templates.image) {
          const imageUrls = response.data.templates.image;
          setFunction({ images: imageUrls });
        }

        setPlannerData(prevData => ({
          ...prevData,
          template: response.data,
          price: (
            parseFloat(prevData.price) +
            parseFloat(response.data.templates.price)
          ).toFixed(2),
        }));
      } catch (error) {
        console.error('Error fetching template:', error);
      }
    };

    if (coverID) {
      fetchData(coverID, setCover);
    }

    if (pagesID) {
      fetchData(pagesID, setPages);
    }
  }, [coverID, pagesID]);

  const handleSubmitPlanner = () => {
    axios.post('http://localhost:5000/planners/addPlanner', {
      "cover":coverID,
      "personalInformation": {
          "fullName":fullName,
          "email":email,
          "phone":phoneNumber,
          "message":message
        },
      "events":events,
      "price":30,
      "pages": pagesID,
      "addOns":"65a59a2d223d9c15b0eaace9"
    })
      .then(response => {
        console.log('Success:', response);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div className='Dates'>
      
      <h2>Cover:</h2>
      {cover.images && cover.images.map((imageUrl, index) => (
        <img
          key={index}
          src={imageUrl}
          alt={`cover-${index}`}
          className="img-cover"
        />
      ))}
      <p>Full Name: {fullName}</p>
      <p>Phone Number: {phoneNumber}</p>
      <p>Email: {email}</p>
      <p>Message: {message}</p>
      <h2>Dates:</h2>
      <p>Week Start: {weekStart}</p>
      <p>Start Date: {startDate}</p>
      <p>End Date: {endDate}</p>
      <p>Events:</p>
      <ul>
        {events.map((event, index) => (
          <li key={index}>{`Event ${index + 1}: ${event.eventName} - ${event.date}`}</li>
        ))}
      </ul>
      <h2>Pages:</h2>
      {pages.images && pages.images.length > 0 && (
        <img
          src={pages.images[0]}
          alt={`pages-0`}
          className="img-cover"
        />
      )}
      <h2>Add-ons:</h2>
      {addOnsData &&
        Array.isArray(addOnsData) &&
        addOnsData.map((addOn, index) => (
          <div key={index}>
            <h3>{addOn.name}</h3>
          </div>
        ))}
        <button
        onClick={handleSubmitPlanner}>Add Planner</button>
    </div>
  );
};

export default Review;
