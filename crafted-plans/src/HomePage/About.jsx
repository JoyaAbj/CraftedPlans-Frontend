import React from 'react';
import '../Styles/about.css';

const About = () => {
  return (
    <div className='about-home'>
      <div className="about">
        <div className="imgs-about">
            <img src="/Images/about.png" alt="" className="image-about" />
        </div>
        <div className="text-about">
            <h2 className="title-about">About Us</h2>
            <p className="parag-about">
            Welcome to Crafted Plans, your one-stop-shop for personalized planners and stationery. 
            Customize your own planner or explore our selection of notepads, accessories, stickers, 
            and bookmarks. We believe in the joy of organization and self-expression. Crafted Plans 
            is your partner in creating a uniquely tailored planning experience. Join us and make planning 
            a celebration of your individuality.
            </p>
        </div>
      </div>
    </div>
  )
}

export default About
