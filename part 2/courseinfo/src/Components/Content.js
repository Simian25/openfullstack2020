import React from 'react';
import Part from './Part';


const Content = ({ course }) => {
    return (
      <div>
          {course.parts.map( (part) => {
          
          console.log(part.id);
          return <Part key={part.id} part={part}/>})}
      </div>
    )
  }
export default Content;  