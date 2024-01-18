import React from 'react'

const Review = () => {
  const handleSubmitPlnner =()=>{
    const coverID = localStorage.getItem('cover')
    const events = JSON.parse(localStorage.getItem('events'))
    console.log(events)
    console.log(coverID)
  }
  
  return (
    <div>
      <button onClick={handleSubmitPlnner}>OMAR</button>
      Review
    </div>
  )
}

export default Review
