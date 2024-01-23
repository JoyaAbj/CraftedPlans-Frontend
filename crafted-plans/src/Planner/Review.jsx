import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/planner.css';
import { useNavigate} from 'react-router-dom';
import { toast } from "react-hot-toast";

const Review = () => {
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
  const pagesID = localStorage.getItem('dailyPlanner') || localStorage.getItem('weeklyPlanner');
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
    && key !== 'weeklyPlanner') 
    .map((name) => ({ name, id: localStorage.getItem(name) })); 
    // console.log(addOnsData)

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

  const getAllAddOns = () => {
    axios.get(`http://localhost:5000/templates/getAll`)
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
  });

  
  const handleSubmitPlanner = async () => {
    try {
      const response = await axios.post('http://localhost:5000/planners/addPlanner', {
        "cover": coverID,
        "personalInformation": {
          "fullName": fullName,
          "email": email,
          "phone": phoneNumber,
          "message": message
        },
        "events": events,
        "price": 30,
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
        price: 30,
        pages: pagesID,
        addOns: addOnsData.map((addOn) => addOn.id),
      };
  
      localStorage.setItem('submittedPlanner', JSON.stringify(plannerInfo));
  
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
      <p className='infor-review'>Full Name: {fullName}</p>
      <p className='infor-review'>Phone Number: {phoneNumber}</p>
      <p className='infor-review'>Email: {email}</p>
      <p className='infor-review'>Message: {message}</p>
      <h2 >Dates:</h2>
      <p className='infor-review'>Week Start: {weekStart}</p>
      <p className='infor-review'>Start Date: {startDate}</p>
      <p className='infor-review'>End Date: {endDate}</p>
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
      {addOns &&
        Array.isArray(addOns) &&
        addOns.map((addOn, index) => (
          <div key={index}>
            <h3>{addOn.name}</h3>
            <h3>{addOn.price}</h3>
            <img src={addOn.image} alt="" />
          </div>
        ))}
        <button
        onClick={handleSubmitPlanner}>
          Add Planner
        </button>
        <button 
        onClick={handleAddToCart}
        >
        Add to cart
      </button>
    </div>
  );
};

export default Review;
