import patientData from '../data/patients'
import {Patient} from '../types'
import {Gender} from '../types'

const patients:Array<Patient> = patientData as Array<Patient>

const getPatients = ():Array<Patient> => {
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
const addPatient = (patient:any):Patient =>{
    if(typeof patient.name==='string'){
      if(Object.values(Gender).includes(patient.gender)){
        const newPerson:Patient = {id:String(Math.floor(Math.random()*1000000)),
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
  getPatients,
  getNonSensitive,
  addPatient,
  find
};