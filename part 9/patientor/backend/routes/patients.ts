import expess from 'express';
import patientService from '../services/patientService'
const router = expess.Router();
router.get('/', (_req, res) => {
    console.log('someone pinged patients');
    const patients = patientService.getNonSensitive()
    res.json(patients)
  });
router.post('/',(req,res)=>{
    console.log('adding user');
    const {name,dateOfBirth,ssn,gender,occupation} = req.body;
    try {
        const newPerson = patientService.addEntry({name,dateOfBirth,ssn,gender,occupation})
        console.log(newPerson)
        res.json(newPerson)
    } catch (error) {
        res.status(500).send(error.message)
    }
    
})


  export default router