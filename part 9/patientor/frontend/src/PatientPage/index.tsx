import React from "react";
import axios from "axios";
import { Container, Header, Icon } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { useStateValue } from "../state";
import {apiBaseUrl} from '../constants';
import { Patient } from "../types";
interface Paramaters{
    id?: string;
}



const PatientPage: React.FC = () =>{
    const [state,dispatch] = useStateValue();
    const params: Paramaters = useParams();
    const getPatient = async (id: string) =>{
        const {data: patient} = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
        dispatch({type:"GET_PATIENT",payload:patient});
    };
    
    if(!params.id){
        return null;
    }
    if(!state.patients[params.id]){
        return(
            <p>No person found with this id</p>
        );
    }
    if(!state.patients[params.id].entries){
        getPatient(params.id);
    }
    const patient = state.patients[params.id];
    const getGender = (): 'mars'|'venus'|'genderless' =>{
        switch (patient.gender) {
            case "male":
                return "mars";
            case "female":
                return "venus";
            case "other":
                return "genderless";
            default:
                return "mars";
        }
    };
    return(
        <Container>
        <Header as="h2">{patient?.name} <Icon name={getGender()}/></Header>
    <p>{`ssn: : ${patient.ssn}`}</p>
    <p>{`occupation: ${patient.occupation}`}</p>
        </Container>

    );
};
export default PatientPage;