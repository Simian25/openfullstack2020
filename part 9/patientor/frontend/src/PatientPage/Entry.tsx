import React from 'react';
import { Entry } from '../types';
import {HealthCheckEntry,HospitalEntry,OccupationalHealthCareEntry} from './EntryTypes';

interface EntryProps{
    entry: Entry;
}

const EntryPage: React.FC<EntryProps> = ({entry})=>{
   if(entry){
    switch (entry.type) {
        case "Hospital":
            return <HospitalEntry entry={entry}/>;
        case "HealthCheck":
            return <HealthCheckEntry entry={entry}/>;
        case "OccupationalHealthcare":
            return <OccupationalHealthCareEntry entry={entry}/>;
        default:
            return null;
    }
   }
   return null;
};
export default EntryPage;