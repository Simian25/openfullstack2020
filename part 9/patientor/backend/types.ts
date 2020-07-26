export type Diagnose = {
    code:string,
    name:string,
    latin?:string
}
export interface Entry {
}

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[]
}
export type newPatient = Omit<Patient, 'id'>;
export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other"
  }