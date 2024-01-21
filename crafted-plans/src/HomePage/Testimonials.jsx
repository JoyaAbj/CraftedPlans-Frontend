import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';
import '../Styles/review.css'; 
import axios from 'axios';

const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    const componentStyle = {
        backgroundColor: 'rgb(248, 248, 248)',
     };

    const carouselItemStyle = {
        height: '500px',
     };

  const getAllReviews = () => {
    axios.get(`http://localhost:5000/reviews/getAll`)
      .then((response) => {
        console.log(response.data); 
        setReviews(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  
  useEffect(() => {
    getAllReviews();
  }, []);

 

  return (
    <div style={{ ...componentStyle, ...carouselItemStyle }}>
      <div className='revdiv'>
        <img className='reviewstitle' src='/Images/quotes.png'/>
        {/* <p className="reviews-user">{comment}</p> */}
      </div>

      <Carousel>
  {reviews && reviews.map((review, i) => (
    <Carousel.Item key={i}>
      <div className='rev1'>
        <div className='revbox'>{review.comment}</div>
      </div>
    </Carousel.Item>
  ))}
</Carousel>
    </div>
  );
};

export default Reviews;