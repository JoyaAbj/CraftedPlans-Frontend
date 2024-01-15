import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Dates = () => {
  const [date, setDate] = useState(new Date());
  const onChange = (date) => {
    setDate(date);
  }
  const [activeButton, setActiveButton] = useState('start');
  const handleButtonClick = (buttonType) => {
    setActiveButton(buttonType);
  };
  return (
    <div className='Dates'>
      <div className="page-dates">
      <div className="text-part-dates">
      <h2 className="title-dates">Dates</h2>
      <p className="text-dates">
      Monday Start or Sunday Start? <br/>
      Select a ‘Start Date’ and an ‘End Date’.
      </p>
      </div>
      <div className="radio-btn-dates">
      <label className='labels-dates-m-s'>
      <input 
      type="checkbox" 
      className="button-dates checkbox-custom" 
      name="Date" 
      value="Monday Start"/>
      Monday Start
      </label>
      <label className='labels-dates-m-s'>
      <input 
      type="checkbox" 
      className="button-dates checkbox-custom" 
      name="Date" 
      value="Sunday Start"/>
      Sunday Start
      </label>
      </div>
      <hr className='division-line'/>
      {/* Toggle between start date and end date to choose on the calendar*/}
      <div className="toggle-start-end-dates">
      <button className={`s-e-dates ${activeButton === 'start' ? 'active-btn' : ''}`}
       onClick={() => handleButtonClick('start')}>
        Start Date
      </button>
      <button className={`s-e-dates ${activeButton === 'end' ? 'active-btn' : ''}`}
      onClick={() => handleButtonClick('end')}>
        End Date
      </button>
      </div>
        <h2 className="chosen-date-dates">January 1st 2024</h2>
        <hr className='division-line'/>
    <div className='calendar-dates'>
      <Calendar
      onChange={onChange} value={date}>
      </Calendar>
    </div>
      </div>
    </div>
  )
}

export default Dates
