import React, { useState, useEffect } from 'react';
import '../Styles/planner.css';
import axios from 'axios';

const Cover = () => {
  const [inputValue, setInputValue] = useState('');
  const [selectedCover, setSelectedCover] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMonthModalOpen, setIsMonthModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Submitted value:', inputValue);
  };

  // Fetch covers
  const [cover, setCover] = useState([]);
  const category = "cover";

  const getAllCovers = () => {
    axios.post(`http://localhost:5000/templates/getTemplateByCategory`, { category })
      .then((response) => {
        setCover(response.data.templates);
        // setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
          setShowContent(true);
        }, 5000);
      })
      .catch((error) => {
        console.error(error);
      })
  };

  useEffect(() => {
    getAllCovers();
  }, [isLoading]);

  const handleProductClick = (i) => {
    setSelectedCover(cover[i]);
    setIsLoading(true);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenMonthModal = () => {
    setIsMonthModalOpen(true);
  };

  const handleChooseCover = (selectedCover) => {
    localStorage.setItem('cover', selectedCover._id);
  };

  return (
    <div>
      {/* Covers */}
      <div className="cover-card-cover">
        {cover && cover.map((cover, i) => (
          <div key={i}>
            <div className="image-cover" key={i}>
              <img
                src={cover.image}
                alt="product"
                className="img-cover"
                onClick={() => handleProductClick(i)}
              />
            </div>
            <p className="name-cover">
              {cover.name}
            </p>
          </div>
        ))}
      </div>
      {/* Modal */}
      {isModalOpen && selectedCover && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            {isLoading ? (<img
              className='loader'
              src="/Images/wired-outline-112-book.gif"
              alt="loader" />
            ) : showContent && (
              <div>
                <div className="cover-images-modal">
                  <img src={selectedCover.image} alt="product" className="img-cover-modal" />
                  <img src={selectedCover.image[1]} alt="product" className="img-cover-modal" />
                  <img src={selectedCover.image[2]} alt="product" className="img-cover-modal" />
                </div>
                <p className="name-cover-modal">{selectedCover.name}</p>
                <p className="name-cover-modal">{selectedCover.price}$</p>
                <button
                  className="choose-cover-modal"
                  onClick={() => handleChooseCover(selectedCover)}
                >
                  Choose This Cover
                </button>
                <div className="month-view">
                  <p className="name-cover-modal1">
                    Every planner includes a cover page and a month at a glance
                  </p>
                  <img
                    src="/TopBar/events.png"
                    alt="month at a glance"
                    className="month-at-a-glance"
                    onClick={handleOpenMonthModal}
                  />
                </div>
                {console.log("Modal content displayed")}
              </div>
            )}
          </div>
        </div>
      )}
      {/* Month Modal */}
      {isMonthModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setIsMonthModalOpen(false)}>
              &times;
            </span>
            <div className="grid-month-modal">
            <img src="/Month-at-a-glance/1.png" alt="january" className="static-month-at-a-glance" />
            <img src="/Month-at-a-glance/2.png" alt="february" className="static-month-at-a-glance" />
            <img src="/Month-at-a-glance/3.png" alt="march" className="static-month-at-a-glance" />
            <img src="/Month-at-a-glance/4.png" alt="april" className="static-month-at-a-glance" />
            <img src="/Month-at-a-glance/5.png" alt="may" className="static-month-at-a-glance" />
            <img src="/Month-at-a-glance/6.png" alt="june" className="static-month-at-a-glance" />
            <img src="/Month-at-a-glance/7.png" alt="july" className="static-month-at-a-glance" />
            <img src="/Month-at-a-glance/8.png" alt="august" className="static-month-at-a-glance" />
            <img src="/Month-at-a-glance/9.png" alt="september" className="static-month-at-a-glance" />
            <img src="/Month-at-a-glance/10.png" alt="october" className="static-month-at-a-glance" />
            <img src="/Month-at-a-glance/11.png" alt="november" className="static-month-at-a-glance" />
            <img src="/Month-at-a-glance/12.png" alt="december" className="static-month-at-a-glance" />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cover
