import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {toast} from 'react-hot-toast';
import '../Styles/addReview.css';

const AddReview = () => {
  const [fullName, setFullName]= useState("");
  const [comment, setComment]= useState("");
  const [stars, setStars]= useState(0);
  const [reviews,setReviews] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const numbers=[1,2,3,4,5];
  const navigate = useNavigate();
 
  const handleClickStars = (n) => {
    setStars(n);
  };

  const handleReview = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(`https://crafted-plans.onrender.com/reviews/add`, {
        fullName,
        comment,
        rating: stars, // Make sure to send the 'rating' instead of 'stars'
      });

      console.log(response.data.result); // Adjust based on your server response structure

      toast.success('Thank you for your review!');
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (error) {
      console.error(error);
      toast.error('Failed to submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="review-body">
      <div className="review-card">
        <form className="review-form" 
        onSubmit={handleReview}
        >
          <h1>Leave a review</h1>
          <div className="hr"></div>
          <div className="two-in-onee">
          <h2>
            How was your experience?
          </h2>
          <p>Give us your rating and also your feedback</p>
          </div>
          <div>
            {numbers.map((i) => (
              <span
                key={i}
                className={`span1 ${i<=stars ?'span2':''}`}
                onClick={() => handleClickStars(i)}
              >
                &#9733;
              </span>
            ))}
          </div>
          <input type="text" placeholder="Enter your fullname" onChange={(e)=>setFullName(e.target.value)} required/>
          <textarea onChange={(e)=>setComment(e.target.value)} required></textarea>
          <button type="submit" disabled={isSubmitting}>
          Submit
        </button>
        </form>
      </div>
    </div>
  )
}

export default AddReview
