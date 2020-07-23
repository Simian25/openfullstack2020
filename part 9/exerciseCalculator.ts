interface Training {
	periodLength: number;
	trainingDays: number;
	target: number;
	average: number;
	success?: boolean;
	rating: number;
	ratingDescription: string;
}
interface TrainingArguments {
	array:number[]
	goal:number
}

export const calculator = (period:number[],goal:number):Training=> {
    const periodLength=period.length;
    const trainingDays = period.filter((day)=>day!=0).length;
    const target = goal;
    const average = period.reduce((a:number,b:number)=>a+b,0)/periodLength;
    const success = average>=target;
    let rating = 0;
    let ratingDescription = '';
    if (average / target > 1) {
		rating = 2;
		ratingDescription = "You accomplished your target!";
	} else if (average / target > 1.5) {
		rating = 3;
		ratingDescription = "You made it great!";
	} else if (average / target < 1) {
		rating = 1;
		ratingDescription = "You didn't accomplish your target";
	}

	return {
		periodLength,
		trainingDays,
		success,
		rating,
		ratingDescription,
		target,
		average,
	};

};
const parsArguments = (args:string[]) : TrainingArguments =>{
    if (args.length < 12) throw new Error('Not enough arguments');
	let succes = true;
  if (!isNaN(Number(args[2]))) {
   const result = {
		goal:Number(args[2]),
		array:args.slice(3).map((arg)=>
		Number(arg))
	};
	if(result.array.filter((a)=>isNaN(a)).length>0){
		succes = false;
	}
	console.log(result.array);
	if(!succes){
		throw new Error('Provided values were not numbers!');
	}
	return result;
  } else {
    throw new Error('Provided values were not numbers!');
  }
  
};
try{
    const { array, goal } = parsArguments(process.argv);
  console.log(calculator(array, goal));
} catch (e) {
	if(e instanceof Error){
		console.log('Error, something bad happened, message: ', e.message);
	}
}
