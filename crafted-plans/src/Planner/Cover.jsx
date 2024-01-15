import React, {useState, useEffect} from 'react';
import '../Styles/planner.css';
import axios from 'axios';

const Cover = () => {
  const [inputValue, setInputValue] = useState('');
  const [selectedCover, setSelectedCover] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Submitted value:', inputValue);
  };


// Fetch covers
  const [cover, setCover] = useState([]);
  const category = "cover";
  // const url = process.env.REACT_APP_API_URL;
  const getAllCovers = () => {
      axios.post(`http://localhost:5000/templates/getTemplateByCategory`, {category})
        .then((response) => {
          setCover(response.data.templates);
          console.log(response.data.templates)
        })
        .catch((error) => {
          console.error(error);
        });
    };
    
    useEffect(() => {
      getAllCovers();
    }, []);

    const handleProductClick = (i) => {
      setSelectedCover(cover[i]);
      setIsModalOpen(true); 
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };

  return (
    <div>
      {/* Name on cover */}
      <form onSubmit={handleSubmit} className="name-on-cover-cover">
        <label className='label-cover' htmlFor="name on planner">Name on Planner</label>
        <div className="input-submit-cover">
        <input className='input-cover'
          type="text"
          id="name on planner"
          name="name on planner"
          value="planner"
          onChange={(e) => setInputValue(e.target.value)}
          required
        />
        <input className='submit-cover' type="submit" value="Submit" />
        </div>
      </form>

      {/* Covers */}
      <div className="cover-card-cover" >
      {cover && cover.map ((cover, i) =>(
       <div>
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
            <div className="cover-images-modal">
              <img src={selectedCover.image} alt="product" className="img-cover" />
              <img src={selectedCover.image[1]} alt="product" className="img-cover" />
              <img src={selectedCover.image[2]} alt="product" className="img-cover" />
            </div>
            <p className="name-cover-modal">{selectedCover.name}</p>
            <p className="name-cover-modal">{selectedCover.price}</p>
            <button className="choose-cover-modal">Choose This Cover</button>
            <p className="name-cover-modal">
              Every planner includes a cover page and a month at a glance
              </p>
            {console.log("Modal content displayed")}
          </div>
        </div>
      )}
    </div>
  )
}

export default Cover
