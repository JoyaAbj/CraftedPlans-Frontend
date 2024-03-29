import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';
import '../Styles/review.css';
import axios from 'axios';

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  const starIcons = [];
  for (let i = 0; i < fullStars; i++) {
    starIcons.push(<span key={i}>&#9733;</span>); // Full star (★)
  }

  if (hasHalfStar) {
    starIcons.push(<span key="half">&#9734;&#9733;</span>); // Half star (☆★)
  }

  return <div>{starIcons}</div>;
};

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  const componentStyle = {
    margin: '20px 40px 30px 40px',
    borderRadius: '10px',
  };

  const carouselItemStyle = {
    height: '300px',
  };

  const getAllReviews = () => {
    axios.get(`https://crafted-plans.onrender.com/reviews/getAll`)
      .then((response) => {
        console.log(response.data.get);
        setReviews(response.data.get);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getAllReviews();
  }, []);

  return (
    <div style={{ ...componentStyle, ...carouselItemStyle }}>
      <Carousel>
      {reviews.slice(-4).map((review, i) => (
          <Carousel.Item key={i}>
            <div className='review-titles'>
              <img className='reviewstitle' src='/Images/quotes.png' alt="quotes" />
              <p className='show-review'>{review.fullName}</p>
            </div>
            <p className='stars'><StarRating rating={review.rating} /></p>
            <div className='rev1'>
              <div className='revbox'>
                <p className='show-review'>{review.comment}</p>
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default Reviews;
