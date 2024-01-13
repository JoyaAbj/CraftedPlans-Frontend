import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import '../Styles/Hero.css'

const Hero = () => {
  return (
    <div className='hero-container'>
   <Carousel>
  <Carousel.Item>
    <img
      className="d-block w-100 rounded rounded-3"
      src="/Carousel/Carousel1.png"
      alt="First slide"
    />
    <Carousel.Caption>
      <button
      className='hero-button'>
        Create Yours Now!</button>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100 rounded-3"
      src="/Carousel/Carousel2.png"
      alt="Second slide"
    />

    <Carousel.Caption>
    <button 
        className='hero-button'>
            Organise Your Life</button>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100 rounded-3"
      src="/Carousel/Carousel3.png"
      alt="Third slide"
    />

    <Carousel.Caption>
    <button
        className='hero-button'>
        Unlock Your Potential </button>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>
    </div>
  )
}

export default Hero
