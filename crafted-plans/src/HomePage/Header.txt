import React from 'react';
import '../Styles/Header.css';
import ImageSlider from './ImageSlider'

const Header = () => {
    const slides= [
        {url:'http://localhost:3000/Carousel1.png', title: 'image1'},
        {url:'http://localhost:3000/Carousel2-0.jpg', title: 'image2'},
        {url:'http://localhost:3000/Carousel3.png', title: 'image3'},
        {url:'http://localhost:3000/Carousel4.avif', title: 'image4'}

    ]
  return (
    <div>
        <div className='image-slider-header'>
      <ImageSlider slides={slides}/>
        </div>
    </div>
  )
}

export default Header
