import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/planner.css';
import { useNavigate} from 'react-router-dom';
import { toast } from "react-hot-toast";
import moment from 'moment';

const Review = () => {
  const [showCoverInfo, setShowCoverInfo] = useState(true);
  const [showDatesEvents, setShowDatesEvents] = useState(false);
  const [showPagesAddOns, setShowPagesAddOns] = useState(false);
  const [submittedPlannerId, setSubmittedPlannerId] = useState(null);
  const navigate = useNavigate();
  const [plannerData, setPlannerData] = useState({});
  const [addOns, setAddOns] = useState([]);
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
  const pagesID = localStorage.getItem('dailyPlanner') ? localStorage.getItem('dailyPlanner') : localStorage.getItem('weeklyPlanner');
  const templateNames = Object.keys(localStorage);
  // console.log(templateNames) 
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
    && key !== 'id'
    && key !== 'Ids'
    && key !== 'weeklyPlanner'
    && key !== 'submittedPlanner') 
    .map((name) => ({ name, id: localStorage.getItem(name) })); 
    // console.log(addOnsData)

  const price = '0.00';

  const [cover, setCover] = useState({ images: [] });
  const [pages, setPages] = useState({ images: [] });

  const calculateDuration = (start, end) => {
    console.log('calculateDuration - start:', start);
    console.log('calculateDuration - end:', end);
  
    const startMoment = moment(start, 'M/D/YYYY');
    const endMoment = moment(end, 'M/D/YYYY');
  
    console.log('calculateDuration - startMoment:', startMoment.format());
    console.log('calculateDuration - endMoment:', endMoment.format());
    console.log('calculateDuration - pagesID:', pagesID); // Add this line
    if (pagesID === localStorage.getItem('weeklyPlanner')) {
      const daysDifference = endMoment.diff(startMoment, 'days');
      console.log('Weekly Planner - Days Difference:', daysDifference);
      return (daysDifference + 1)/7; 
    } else if (pagesID === localStorage.getItem('dailyPlanner')) {
      const daysDifference = endMoment.diff(startMoment, 'days');
      console.log('Daily Planner - Days Difference:', daysDifference);
      return daysDifference + 1; // Add 1 to include both the start and end dates
    }
  
    return 0;
  };
  
  useEffect(() => {
    const fetchData = async (templateId, setFunction, type) => {
      try {
        const response = await axios.get(`https://crafted-plans.onrender.com/templates/getTemplateById/${templateId}`);

        if (response.data.templates && response.data.templates.image) {
          const imageUrls = response.data.templates.image;
          setFunction({ images: imageUrls });
        }

           
        const templatePrice = parseFloat(response.data.templates.price);
      const duration = calculateDuration(startDate, endDate, type);
      const totalPrice = (10 + (templatePrice * duration)+(2 * duration)).toFixed(2); // Updated totalPrice calculation

      console.log('Template Price:', templatePrice);
      console.log('Duration:', duration);
      console.log('Total Price:', totalPrice);

      setPlannerData((prevData) => ({
        ...prevData,
        template: response.data,
        price: parseFloat(totalPrice),
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

  const getAllAddOns = () => {
    axios.get(`https://crafted-plans.onrender.com/templates/getAll`)
    .then((response)=>{

      function findSelectedTemplate(array1, array2) {
        const result = [];

        array1.forEach(obj1 => {
            const matchingObject = array2.find(obj2 => obj1._id === obj2.id);

            if (matchingObject) {
                result.push(obj1);
            }
        });

        return result;
    }

    const matchings = findSelectedTemplate(response?.data?.templates, addOnsData);
    setAddOns(matchings)
    })
    .catch((error)=>{
      console.error(error)
    });
  };
  useEffect(()=>{
    getAllAddOns()
  },[]);

  
  const handleSubmitPlanner = async () => {
    console.log(addOnsData)
    console.log({
      "cover": coverID,
      "personalInformation": {
        "fullName": fullName,
        "email": email,
        "phone": phoneNumber,
        "message": message
      },
      "events": events,
      "price": plannerData.price,
      "pages": pagesID,
      "addOns": addOnsData.map((addOn) => addOn.id)
    })
    try {
      const response = await axios.post(`https://crafted-plans.onrender.com/planners/addPlanner`, {
        "cover": coverID,
        "personalInformation": {
          "fullName": fullName,
          "email": email,
          "phone": phoneNumber,
          "message": message
        },
        "events": events,
        "price": plannerData.price,
        "pages": pagesID,
        "addOns": addOnsData.map((addOn) => addOn.id)
      });
  
       // Save the submitted planner ID to local storage
       const submittedPlannerId = response.data.plannerId;
       setSubmittedPlannerId(submittedPlannerId);
 
       // Save the planner information to local storage
       const plannerInfo = {
         cover: coverID,
         personalInformation: {
           fullName,
           email,
           phone: phoneNumber,
           message,
         },
         events,
         price: plannerData.price,
         pages: pagesID,
         addOns: addOnsData.map((addOn) => addOn.id),
         
       };
 
       localStorage.setItem('submittedPlanner', JSON.stringify(plannerInfo));
       toast.success('Success! 🌟 Your planner submitted . Add it to your cart now and let the planning brilliance continue! ')
       console.log('Success:', response);
     } catch (error) {
       console.error('Error:', error);
     }
   };
 

  const handleAddToCart = () => {
    try {
      // Retrieve the planner information from local storage
      const plannerInfo = JSON.parse(localStorage.getItem('submittedPlanner'));

      // Check if the planner information is available
      if (plannerInfo) {
        const { cover, personalInformation, events, price, pages, addOns } = plannerInfo;

        // Add the planner to the cart (modify this part based on your cart logic)
        const cartItem = {
          cover,
          personalInformation,
          events,
          price,
          pages,
          addOns,
        };

        // You can save the cart items to local storage or dispatch an action to update the global state
        // Example: localStorage.setItem('cartItems', JSON.stringify([...existingCartItems, cartItem]));

        toast.success('Planner added to cart successfully');
      } else {
        toast.error('No planner information found. Please submit a planner first.');
      }
    } catch (error) {
      console.error('Error adding planner to cart:', error);
      toast.error('Error adding planner to cart. Please try again.');
    }
  };
  const toggleAdditionalInfo = () => {
    // Toggle between different sections when clicking the arrows
    if (showCoverInfo) {
      setShowCoverInfo(false);
      setShowDatesEvents(true);
    } else if (showDatesEvents) {
      setShowDatesEvents(false);
      setShowPagesAddOns(true);
    } else if (showPagesAddOns) {
      setShowPagesAddOns(false);
      setShowCoverInfo(true);
    }
  };
  return (
    <div className='Dates'>
      {showCoverInfo && (
      <div className="cover-info">
      <h2>Cover</h2>
      <div className="cover-imgs-review">
      {cover.images && cover.images.map((imageUrl, index) => (
        <img
          key={index}
          src={imageUrl}
          alt={`cover-${index}`}
          className="img-cover"
        />
      ))}
      </div>
      <h2>Informations</h2>
      <p className='infor-review'>Full Name: {fullName}</p>
      <p className='infor-review'>Phone Number: {phoneNumber}</p>
      <p className='infor-review'>Email: {email}</p>
      <p className='infor-review'>Message: {message}</p>
      </div>)}
      
      {showDatesEvents && (
      <div className="cover-info">
      <h2 >Dates:</h2>
      <p className='infor-review'>Week Start: {weekStart}</p>
      <p className='infor-review'>Start Date: {startDate}</p>
      <p className='infor-review'>End Date: {endDate}</p>
      <h2>Events:</h2>
      <ul>
        {events.map((event, index) => (
          <li className='infor-review' key={index}>{`Event ${index + 1}: ${event.eventName} - ${event.date}`}</li>
        ))}
      </ul>
      </div>
        )}
          {showPagesAddOns && (
      <div className="cover-info">
      <h2>Pages:</h2>
      {pages.images && pages.images.length > 0 && (
        <img
          src={pages.images[0]}
          alt={`pages-0`}
          className="img-cover"
        />
      )}
      <h2>Add-ons:</h2>
      <div className="addons-review">
      {addOns &&
        Array.isArray(addOns) &&
        addOns.map((addOn, index) => (
          <div key={index}>
            <p className='infor-review'>{addOn.name}</p>
            <img 
              src={addOn.image} 
              alt=""
              className="img-cover" />
          </div>
        ))}
        </div>
        </div>
          )}
        <div className="cover-info1">
        <p className="arrow-review" onClick={toggleAdditionalInfo}>&lt;</p>
        <p className="arrow-review" onClick={toggleAdditionalInfo}>&gt;</p>
      
        </div>
        <p className="infor-review-price">{`$${plannerData.price || '0.00'}`}</p>
        <div className="submit-cart-bts">
        <button
        className='buttons-review'
        onClick={handleSubmitPlanner}>
          Add Planner
        </button>
        <button 
        className='buttons-review'
        onClick={handleAddToCart}
        >
        Add to cart
      </button>
      </div>
    </div>
  );
};

export default Review;
