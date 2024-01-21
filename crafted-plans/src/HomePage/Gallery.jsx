import React from 'react';
import '../Styles/Gallery.css';

const Gallery = () => {
  return (
    <div className='gallery-container-home'>
      <div className="gallery-home">
  <div className="item long-picture-home">
    <img className='image-gallery1' src="/Images/gallery1.png" alt="gallery1" />
  </div>
  <div className="item top-left-home">
    <img src="/Images/gallery2.png" alt="gallery2" />
  </div>
  <div className="item top-right-home">
    <img src="/Images/gallery3.png" alt="gallery3" />
  </div>
  <div className="item bottom-left-home">
    <img className='image-gallery' src="/Images/gallery4.png" alt="gallery4" />
  </div>
</div>
    </div>
  )
}

export default Gallery
