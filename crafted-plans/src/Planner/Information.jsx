import React from 'react'

const Information = () => {
  return (
    <div className='information-information'>
      <div className="page-information">
        <h2 className="title-information">
          Information
        </h2>
        <p className="text-information">
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
        </form>
      </div>
    </div>
  )
}

export default Information
