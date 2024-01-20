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
    pagesID: localStorage.getItem('weeklyPlanner'),
    price: '0.00', // Initial price
  });

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

    if (plannerData.coverID) {
      fetchData(plannerData.coverID, setCover);
    }

    if (plannerData.pagesID) {
      fetchData(plannerData.pagesID, setPages);
    }
  }, [plannerData.coverID, plannerData.pagesID]);

  const handleSubmitPlanner = () => {
    axios.post('http://localhost:5000/planners/addPlanner', {
      cover: plannerData.coverID,
      personalInformation: plannerData.informations,
      events: plannerData.events,
      price: plannerData.price,
      pages: plannerData.pagesID,
      addOns: plannerData.addOns,
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
      <p className="review-planner">Review Planner Before Confirming</p>
      <div>
        <h2>Information:</h2>
        {plannerData.template && (
          <div>
            <p>Cover ID: {plannerData.coverID}</p>
            <p>Information: {plannerData.informations}</p>
          </div>
        )}
        <h2>Cover:</h2>
        {cover.images && cover.images.map((imageUrl, index) => (
          <img
            key={index}
            src={imageUrl}
            alt={`cover-${index}`}
            className="img-cover"
          />
        ))}
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
        <h2>Pages:</h2>
        {pages.images && pages.images.map((imageUrl, index) => (
          <img
            key={index}
            src={imageUrl}
            alt={`pages-${index}`}
            className="img-cover"
          />
        ))}
        <h2>Total Price:</h2>
        <p>{`$${plannerData.price}`}</p>
      </div>
      <button onClick={handleSubmitPlanner}>Submit Planner</button>
    </div>
  );
};

export default Review;
