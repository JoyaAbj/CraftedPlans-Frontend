import React, { useState } from 'react'

const Events = () => {
  const [events,setEvents] = useState([]);
  const [eventName,setEventName] = useState("");
  const [date,setDate] = useState("");
  const handleAddEvent = (event) => {
    console.log(event)
    event.preventDefault()
    setEvents((prevEvents)=>[...prevEvents, {eventName, date}]);
    setEventName("");
    setDate("");
  }
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "eventName") {
      setEventName(value);
    } else if (name === "date") {
      setDate(value);
    }
  };
  const handleDeleteEvent = (index) => {
    const updatedEvents = [...events];
    updatedEvents.splice(index, 1);
    setEvents(updatedEvents);
  }
  return (
    <div className='Dates'>
       <div className="page-dates">
       <div className="text-part-dates">
       <h2 className="title-dates">Events</h2>
       <p className="text-dates">
       Add event to display in your monthly calendar
       </p>
       </div>
       <hr className="division-line" />
       <form  className="events-form" onSubmit={handleAddEvent}>
        <input 
        type="text"
        className="event-name"
        name="eventName"
        value={eventName}
        placeholder="Event Name"
        onChange={handleInputChange}
        required
        />
        <input 
         type="date"
         className="event-date"
         name="date"
         value={date}
         onChange={handleInputChange}
         required
        
        />
        <input 
        type="submit" 
        className="add-event-btn" 
        name="Add"
        value="Add"/>
       </form>
       <table className="table-events">
      <thead>
        <tr className='title-table-events'>
          <th className='title-th-table-events'>Event Name</th>
          <th className='title-th-table-events'>Date</th>
          <th className='title-th-table-events'>Add/Delete</th>
        </tr>
      {/* <hr className='division-line'/> */}
      </thead>
      <tbody>
        {events && events.map((event,i) => (
          <div className="map-events">

        <tr>
          <td>{event.eventName}</td>
          <td>{event.date}</td>
          <td>
            <div className="add-delete-event">
              <img 
              src="/TopBar/x.png" 
              alt="x" 
              className="add-event"
              onClick={handleDeleteEvent} />
            </div>
          </td>
        </tr>
          </div>
        ))}
      </tbody>
       </table>
       </div>
    </div>
  )
}


export default Events
