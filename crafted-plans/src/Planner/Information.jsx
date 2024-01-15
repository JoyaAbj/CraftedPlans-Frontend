import React from 'react'

const Information = () => {
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
        <form action="" className="form-information">
          <input type="text"
          className='input-information'
          name="fullName"
          value="Full Name"
          required
          />
          <input type="text"
          className='input-information'
          name="phoneNumber"
          value="Phone Number"
          required
          />
          <input type="text"
          className='input-information'
          name="email"
          value="Email"
          required
          />
          <textarea 
          className='input-information'
          name="message" id="" 
          value="Message"
          cols="30" 
          rows="10">
          </textarea>
          <input type="submit" />
        </form>
      </div>
    </div>
  )
}

export default Information
