import React from 'react';
import '../Styles/banner.css';
import { Link } from 'react-router-dom';

const Banner = () => {
  return (
    <div>
        <div className="banner-icon">
            <img src="/Images/banner-icon.png" alt="banner" />
        </div>
      <div className="HomeBanner-container">
    <div className="HomeBanner-title-btn">
        <h1 className="text-banner">Your Ideal Planner, <br/>Your Unique Story.</h1>
        <Link to='/planners' className="btn-banner">
            Create Your Story
        </Link>
    </div>
    </div>
    </div>
  )
}

export default Banner
