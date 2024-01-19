import React, {useState} from 'react'

const Information = () => {
  const initialFormData = {
    fullName: 'Full Name',
    phoneNumber: 'Phone Number',
    email: 'email@example.com',
    message: 'I am creating the best version of myself',
  };
  const [formData, setFormData] = useState(initialFormData);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      
      [e.target.name]: e.target.value,
    });
  };
  const handleInputFocus = (field) => {
    if (formData[field] === initialFormData[field]) {
      setFormData({
        ...formData,
        [field]: '',
      });
    }
  };
  const handleSaveInformations = (e) => {
    e.preventDefault();
    const existingData = JSON.parse(localStorage.getItem('formDataArray')) || [];
    const newData = {
      fullName: formData.fullName,
      phoneNumber: formData.phoneNumber,
      email: formData.email,
      message: formData.message,
    };
    localStorage.setItem('formDataArray', JSON.stringify([...existingData, newData]));
    setFormData(initialFormData);
  };

  return (
    <div className='Dates'>
      <div className="page-dates">
        <div className="text-part-dates">
        <h2 className="title-dates">
          Information
        </h2>
        <p className="text-dates">
        Welcome to your planner.  Feel free to fill your first page
        </p>
        </div>
        <form action="" className="form-information"  onSubmit={handleSaveInformations}>
          <div className="first-3-info">
          <input type="text"
          className='input-information-name'
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          onFocus={() => handleInputFocus('fullName')}
          required
          />
          <input type="text"
          className='input-information'
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          onFocus={() => handleInputFocus('phoneNumber')}
          required
          />
          <input type="text"
          className='input-information'
          name="email"
          value={formData.email}
          onChange={handleChange}
          onFocus={() => handleInputFocus('email')}
          required
          />
          </div>
          <div className="last-info">
            <textarea 
          className='input-information'
          name="message" id="" 
          value={formData.message}
          onChange={handleChange}
          onFocus={() => handleInputFocus('message')}
          cols="30" 
          rows="4"
          maxLength="50" >
            
          </textarea>
          <input 
          type="submit"
          value="Save"
          className='information-submit' />
            </div>
        </form>
      </div>
    </div>
  )
}

export default Information
