import React from 'react'

const Events = () => {
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
       <form action="addEvents" className="events-form">
        <input 
        type="text" 
        className="event-name" 
        name="eventName"
        defaultValue="Event Name"
        required
        />
        <input 
        type="text" 
        className="event-name" 
        name="eventDate"
        defaultValue="Date"
        
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
        <tr>
          <td>Christmas</td>
          <td>25th December 2024</td>
          <td>
            <div className="add-delete-event">
              <img src="/TopBar/x.png" alt="x" className="add-event" />
            </div>
          </td>
        </tr>
        <tr>
          <td>Christmas</td>
          <td>25th December 2024</td>
          <td>
            <div className="add-delete-event">
              <img src="/TopBar/x.png" alt="x" className="add-event" />
            </div>
          </td>
        </tr>
      </tbody>
       </table>
       </div>
    </div>
  )
}

export default Events
