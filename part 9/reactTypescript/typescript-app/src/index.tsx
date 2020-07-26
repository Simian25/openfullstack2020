import React from "react";
import ReactDOM from "react-dom";
import Header from './components/header'
import Total from './components/total'
import Content from './components/content'

// new types
interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartOne extends CoursePartWithDescription {
  name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartWithDescription {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}
interface CoursePartFour extends CoursePartWithDescription {
  name: "Assignment";
  likes: number;
}
interface CoursePartWithDescription extends CoursePartBase{
  description: string;
}
export type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;
const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
    },
    {name:"Assignment",
  exerciseCount:28,
description:"a groups assignment",
likes:10}
  ];
  return (
    <div>
      <Header courseName={courseName}/>
      <Content courses = {courseParts}/>
      <Total courses = {courseParts}/>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));