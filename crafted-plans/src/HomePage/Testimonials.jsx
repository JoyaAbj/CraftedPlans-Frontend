import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';
import '../Styles/review.css'; 
import axios from 'axios';

const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    const [users, setUsers] = useState([]);
    const componentStyle = {
        backgroundColor: 'rgb(248, 248, 248)',
     };

    const carouselItemStyle = {
        height: '500px',
     };

  const getAllReviews = () => {
    axios.get(`http://localhost:5000/reviews/getAll`)
      .then((response) => {
        console.log(response.data.get); 
        setReviews(response.data.get);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const getAllUsers = () => {
    axios.get(`http://localhost:5000/users/getAll`)
    .then((response)=>{
        console.log(response.data.users)
        setUsers(response.data.users)
    })
    .catch((error) => {
        console.error(error);
    });
  }

  useEffect(() => {
    getAllReviews();
    getAllUsers();
  }, []);

  const getUserNameById = (userID) => {
    const user = users.find(user => user._id === userID);
    return user ? user.fullName : 'Unknown User';
  };

  return (
    <div style={{ ...componentStyle, ...carouselItemStyle }}>
      <div className='revdiv'>
        <img className='reviewstitle' src='/Images/quotes.png'/>
      </div>

      <Carousel>
        {reviews.map((review, i) => (
          <Carousel.Item key={i}>
            <div className='rev1'>
              <div className='revbox'>
                <p>Reviewer: {getUserNameById(review.userID)}</p>
                <p>{review.comment}</p>
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default Reviews;
