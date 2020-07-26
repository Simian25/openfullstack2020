import diagnoseData from '../data/diagnoses.json'
import {Diagnose} from '../types'

const getEntries = ():Array<Diagnose> => {
  return diagnoseData;
};



export default {
  getEntries
};