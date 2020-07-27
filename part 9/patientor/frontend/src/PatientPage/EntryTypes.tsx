import React from 'react';
import { Icon, Card } from 'semantic-ui-react';
import { Entry, HealthCheckRating } from '../types';

interface EntryProps{
    entry: Entry;
}

export const HospitalEntry: React.FC<EntryProps> = ({entry}) =>{
    if(entry.type==="Hospital"){
        return(
            <Card fluid>
                <Card.Content>
                    <Card.Header as="h2">{entry.date} <Icon size="big" name="hospital"/></Card.Header>
                    <Card.Meta>{entry.description}</Card.Meta>
        <Card.Content>discharged from hospital on {entry.discharge.date} because {entry.discharge.criteria}</Card.Content>
               </Card.Content>
            </Card>
        );
    }
    return null;
};
export const OccupationalHealthCareEntry: React.FC<EntryProps> = ({entry}) =>{
    if(entry.type==="OccupationalHealthcare"){
        return(
            <Card fluid>
                <Card.Content>
                    <Card.Header as="h2">{entry.date} <Icon size="big" name="stethoscope"/></Card.Header>
                    <Card.Meta>{entry.description}</Card.Meta>
        {entry.sickLeave ? <Card.Description>sick leave from {entry.sickLeave.startDate} untill {entry.sickLeave.endDate}</Card.Description>:null}
               </Card.Content>
            </Card>
        );
    }
    return null;
};

export const HealthCheckEntry: React.FC<EntryProps> = ({entry}) =>{
    const getHealthRating = (healthCheck: HealthCheckRating|undefined): "green"|"yellow"|"orange"|"red"|"black" =>{
        switch (healthCheck) {
            case 0:
               return "green";
            case 1:
               return "yellow"; 
            case 2:
               return "orange";   
            case 3:
               return "red";
            default:
                return "black";
        }
    };
    
    if(entry.type==="HealthCheck"){
        return(
            <Card fluid>
                <Card.Content>
                    <Card.Header as="h2">{entry.date} <Icon size="big" name="user md"/></Card.Header>
                    <Card.Meta>{entry.description}</Card.Meta>
                    <Card.Description><Icon color={getHealthRating(entry.healthCheckRating)} name="heart"/></Card.Description>
               </Card.Content>
            </Card>
        );
    }
    return null;
};







