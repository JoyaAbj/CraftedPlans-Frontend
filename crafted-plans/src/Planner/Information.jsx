import React from 'react'

const Information = () => {
  return (
    <div className='Dates'>
      <div className="page-dates">
        <h2 className="title-dates">
          Information
        </h2>
        <p className="text-dates">
        Welcome to your planner.  Feel free to fill your first page
        </p>
        <form action="" className="form-information">
          <input type="text"
          className='input-information'
          name="Full Name"
          value="Full Name"
          required
          />
          <input type="text"
          className='input-information'
          name="Phone Number"
          value="Phone Number"
          required
          />
          <input type="text"
          className='input-information'
          name="Email"
          value="Email"
          required
          />
          <textarea 
          className='input-information'
          name="" id="" 
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
