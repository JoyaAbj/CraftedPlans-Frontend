import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Dates = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
 
  const [activeButton, setActiveButton] = useState('start');
  const handleButtonClick = (buttonType) => {
    setActiveButton(buttonType);

    // Save the buttonType to local storage
    localStorage.setItem('activeButtonType', buttonType);
  };

  const handleRadioClick = (value) => {
    // Save the selected value to local storage
    localStorage.setItem('selectedStartDay', value);
  };

  const handleCalendarChange = (date) => {
    if (activeButton === 'start') {
      date.setHours(0, 0, 0, 0);
      setStartDate(date);
      localStorage.setItem('selectedPlannerStartDate', date.toLocaleDateString());
    } else if (activeButton === 'end') {
      date.setHours(0, 0, 0, 0);
      setEndDate(date);
      localStorage.setItem('selectedPlannerEndDate', date.toLocaleDateString());
    }
  };
  const selectedStartDateString = startDate.toLocaleDateString();
  const selectedEndDateString = endDate.toLocaleDateString();
  const minStartDate = new Date();
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
      type="radio" 
      className="button-dates checkbox-custom" 
      name="date" 
      value="Monday Start"
      onClick={() => handleRadioClick("Monday Start")}/>
      <span className="radio-label">Monday Start</span>
      </label>
      <label class="labels-dates-m-s">
      <input 
        type="radio" 
        className="button-dates checkbox-custom" 
        name="date" 
        value="Sunday Start"
        onClick={() => handleRadioClick("Sunday Start")}
      />
      <span className="radio-label">Sunday Start</span>
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
      {activeButton === 'start' && (
          <h2 className="chosen-date-dates">Start Date: {selectedStartDateString}</h2>
        )}
        {activeButton === 'end' && (
          <h2 className="chosen-date-dates">End Date: {selectedEndDateString}</h2>
        )}
        <hr className='division-line'/>
    <div className='calendar-dates'>
    {activeButton === 'start' && (
            <Calendar 
            onChange={handleCalendarChange} 
            value={startDate} 
            minDate={minStartDate}/>
          )}
          {activeButton === 'end' && (
            <Calendar 
            onChange={handleCalendarChange} 
            value={endDate} />
          )}
    </div>
      </div>
    </div>
  )
}

export default Dates
