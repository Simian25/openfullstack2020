import React from "react";
import {CoursePart} from '../index'

interface PartProps {
    course: CoursePart;
}

const Part: React.FC<PartProps> =(props)=>{
    const course = props.course
switch(course.name){
    case "Fundamentals":
return(<div>
    {course.name}
    <ul>
        <li>{`${course.exerciseCount} exercises`}</li>
        <li>{course.description}</li>
    </ul>
</div>)
    case "Assignment":
        return(<div>
            {course.name}
            <ul>
                <li>{`${course.exerciseCount} exercises`}</li>
                <li>{`${course.likes} likes`}</li>
                <li>{course.description}</li>
            </ul>
        </div>)

    case "Deeper type usage":
    return(<div>
        {course.name}
        <ul>
            <li>{`${course.exerciseCount} exercises`}</li>
    <li><a>{course.exerciseSubmissionLink}</a></li>
            <li>{course.description}</li>
        </ul>
    </div>)
    case "Using props to pass data":
        return(<div>
            {course.name}
            <ul>
                <li>{`${course.exerciseCount} exercises`}</li>
                <li>{`${course.groupProjectCount} group projects`}</li>
            </ul>
        </div>)
}
}

export default Part