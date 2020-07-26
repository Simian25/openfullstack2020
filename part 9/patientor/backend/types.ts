export type Diagnose = {
    code:string,
    name:string,
    latin?:string
}
export type Patient = {
    id:string,
    name:string,
    dateOfBirth:string,
    ssn:string,
    gender: string,
    occupation:string
}
export type newPatient = Omit<Patient, 'id'>;
export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other"
  }