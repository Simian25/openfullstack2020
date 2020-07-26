import React from "react";
import { CoursePart } from "../index";
import Part from './part'
interface ContentProps {
    courses: CoursePart[];
}

const Content: React.FC<ContentProps> =(props)=>{
return(<div>
    {props.courses.map(course=><Part key={course.name} course={course}/>)}
</div>)
}

export default Content