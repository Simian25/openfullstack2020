interface BmiValues {
    height:number,
    weight:number
}

export const calculateBmi = (height:number,weight:number):string =>{
    height=height/100;
    const bmi = weight/(height*height);
    if(bmi<25){
        return "Normal (healthy weight)";
    }
    else if(bmi<30){
        return "Overweight";
    }
    if(bmi>30){
        return "Obese";
    }
    return 'undefined';
};
const parsArgs = (args:string[]) : BmiValues =>{
    if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};
try{
    const { height, weight } = parsArgs(process.argv);
  console.log(calculateBmi(height, weight));
} catch (e) {
  if(e instanceof Error){
    console.log('Error, something bad happened, message: ', e.message);
  }
}