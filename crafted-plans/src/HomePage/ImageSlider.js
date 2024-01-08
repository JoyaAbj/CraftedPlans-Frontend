import React, { useState } from 'react';
import '../Styles/Header.css';

const ImageSlider = ({slides}) => {
    const [ currentImage, setCurrentImage] = useState(0);
    const goToPrevious = () => {
        const isFirstSlide = currentImage === 0;
        const newImage = isFirstSlide ? slides.lenght -1 : currentImage -1;
        setCurrentImage(newImage);
    }
    const goToNext = () => {
        const isLastSlide = currentImage === slides.length -1;
        const newImage = isLastSlide ? 0 : currentImage +1;
        setCurrentImage(newImage);
    }
    const goToSlide = (slideIndex) => {
        setCurrentImage(slideIndex)
    }
  return (
    <div className='container-image-slider'>
        <div className='left-arrow-header'
        onClick={goToPrevious}>
            &#11207;</div>
        <div className='right-arrow-header'
        onClick={goToNext}>
            &#11208;</div>
      <div className='image-slider' style={{backgroundImage: `url(${slides[currentImage].url})`}}></div>
      <div className='four-dots-header'>
        {slides.map((slide, slideIndex) => (
            <div 
            className='dots-header' 
            key={slideIndex} 
            onClick={() => goToSlide(slideIndex)}
            >&#9711;</div>
        ))}
      </div>
    </div>
  )
}

export default ImageSlider
