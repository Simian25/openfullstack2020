import patientData from '../data/patients.json'
import {Patient} from '../types'
import {Gender} from '../types'

const patients:Array<Patient> = patientData as Array<Patient>

const getEntries = ():Array<Patient> => {
  return patients;
};
const getNonSensitive = ():Omit<Patient,'ssn'|'entries'>[] =>{
  return patients.map(({ id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};
const addEntry = (patient:any):Patient =>{
    if(typeof patient.name==='string'){
      if(Object.values(Gender).includes(patient.gender)){
        const newPerson = {id:String(Math.floor(Math.random()*1000000)),
          ...patient
       }
       console.log(newPerson)
      patientData.push(newPerson)
      return newPerson
      }
     throw new Error('wrong gender') 
    }
    throw new Error('something went wrong')
}
const find = (searchId:string):Omit<Patient,'ssn'> | undefined =>{
  return patients.find((patient=>patient.id===searchId))
}
export default {
  getEntries,
  getNonSensitive,
  addEntry,
  find
};