import React from 'react'

const Pages = () => {
  return (
    <div className='Dates'>
      {/* <div className="page-dates1"> */}
        <img src="/Templates/Daily  planner option 1.1.png" alt="" 
        className="mockup-display-pages" />
      {/* </div> */}
      <div className="toggle-btns-pages">
        <button className="weekly-daily-btns">
          Weekly Planner
        </button>
        <button className="weekly-daily-btns">
          Weekly Planner
        </button>
      </div>
      <div className="templates-pages">
        <img src="/Templates/DailyPlanner-1.png" alt="daily planner" 
        className="choose-template" />
         <img src="/Templates/DailyPlanner-2.png" alt="daily planner" 
        className="choose-template" />
         <img src="/Templates/DailyPlanner-3.png" alt="daily planner" 
        className="choose-template" />
      </div>
    </div>
  )
}

export default Pages
