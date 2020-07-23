import express from 'express';
import {calculateBmi} from './bmiCalculator';
import {calculator} from './exerciseCalculator';
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});
app.get('/bmi',(req,res)=>{
  const weight = Number(req.query.weight);
  const height = Number(req.query.height);
  if(!isNaN(weight)&&!isNaN(height)){
    const bmi=calculateBmi(height,weight);
    res.json({
      weight,
      height,
      bmi
    });
  }else{
    res.status(500).json({
      error:"malformatted parameters"
    });
  }
});
app.post('/calculator',(req,res)=>{
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const target:any = Number(req.body.target);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const daily_exercises:any=Array(...req.body.daily_exercises);
  console.log(target,daily_exercises);
  if (isNaN(target) || !Array.isArray(daily_exercises)) {
		res.status(500).json("Malformatted parameters");
		return;
  }else{
    res.json(calculator(daily_exercises,target));
  }
});
const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});