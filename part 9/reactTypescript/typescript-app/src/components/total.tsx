import React from "react";
import { CoursePart } from "..";


interface TotalProps {
    courses: CoursePart[];
}

const Total: React.FC<TotalProps> =(props)=>{
return(<p>
    Number of exercises{" "}
    {props.courses.reduce((carry, part) => carry + part.exerciseCount, 0)}
  </p>)
}

export default Total