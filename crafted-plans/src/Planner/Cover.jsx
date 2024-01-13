import React, {useState} from 'react';
import '../Styles/planner.css';

const Cover = () => {
  const [inputValue, setInputValue] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Submitted value:', inputValue);
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
      {cover.map ((coverimg, i) =>(
        <div className="image-cover" key={i}>
            <img 
            src={coverimg.image} 
            alt="product" 
            className="img-cover"
            // onClick={() => handleProductClick(i)} 
            />
        <p className="name-cover">
            {coverimg.name}
        </p>
        </div>
    ))}
    </div>
    </div>
  )
}

const cover = [
  {
      image: `${process.env.PUBLIC_URL}/cover/black.png`,
      name: 'Daily Notes',
  },
  {
    image: `${process.env.PUBLIC_URL}/cover/daisys.png`,
    name: 'Daily Notes',
},
{
  image: `${process.env.PUBLIC_URL}/cover/stars.png`,
  name: 'Daily Notes',
},
{
  image: `${process.env.PUBLIC_URL}/cover/black.png`,
  name: 'Daily Notes',
},
{
image: `${process.env.PUBLIC_URL}/cover/daisys.png`,
name: 'Daily Notes',
},
{
image: `${process.env.PUBLIC_URL}/cover/stars.png`,
name: 'Daily Notes',
},
{
  image: `${process.env.PUBLIC_URL}/cover/black.png`,
  name: 'Daily Notes',
},
{
image: `${process.env.PUBLIC_URL}/cover/daisys.png`,
name: 'Daily Notes',
},
{
image: `${process.env.PUBLIC_URL}/cover/stars.png`,
name: 'Daily Notes',
},
]

export default Cover
