import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
return(<h1>{props.course}</h1>)
}
const Content = ({parts}) => (
  parts.map(part => (
    <Part part = {part.name} exercises = {part.exercises}/>
    )
  )
)
const Part = (props)=>{
  return(
    <p>{props.part} {props.exercises}</p>
  )
}
const Total = (props)=>{
  const parts = props.parts;
  let sum = 0;
  parts.forEach(value => {
    sum += value.exercises;
  });
  return(

    <p>Number of exercises {sum}</p>
  )
}
const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))