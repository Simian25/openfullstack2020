import React from 'react';


const Total = ({ course }) => {
    const parts=course.parts
    const total = parts.map(part=>part.exercises).reduce((sum,currentValue) => sum + currentValue)
    return(
      <h2>total of {total} exercises</h2>
    ) 
  }

  export default Total;