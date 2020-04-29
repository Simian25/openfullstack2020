import React, { useState } from 'react'
import ReactDOM from 'react-dom'



const Button = ({ onClick, text }) => (  <button onClick={onClick}>    {text}  </button>)

const Statistics = ({statistics,all}) => {
  const stats = statistics.map(stat => <Statistic key={stat.name} name={stat.name} value={stat.value}/>);
  if(all>0){
   return(
     <div>
        <h1>Statistics</h1>
   
    <table>
     <tbody>
      {stats}
      </tbody>
    </table>
    </div>
    )
  }
  else{
    return(
    <div>
    <h1>statistics</h1>
    <p>No feedback given</p>
    </div>)
  }
  
}
  
const Statistic = ({name, value})=>{
  return(
    <tr>
      <td>{name}</td>
      <td>{value}</td>
    </tr>
  )
}


const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = bad+good+neutral;
  const average = (bad*-1+good*1)/(all);
  const positive = (good/all*100).toString() +" %";
  const addGood = () => setGood(good+1);
  const addNeutral = () => setNeutral(neutral+1);
  const addBad = () => setBad(bad+1);

  const statistics=[
    {name:'good',
    value:good},
{
  name:'neutral',
  value:neutral
},
{
  name:'bad',
  value:bad
},
{
  name:'all',
  value:all
},
{
  name:'average',
  value:average
},
{
  name:'positive',
  value:positive
}
  ];
  return (
    <div>
        <h1>give feedback</h1>
      <Button onClick={addGood} text="good"/>
      <Button onClick={addNeutral} text="neutral"/>
      <Button onClick={addBad} text="bad"/>
      <Statistics statistics={statistics} all={all}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
