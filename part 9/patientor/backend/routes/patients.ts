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
router.get('/:id',(req,res)=>{
    console.log(`looking up persons with id: ${req.params.id}`)
    try {
        const patient = patientService.find(req.params.id)
        if(patient){
            res.json(patient)
        }else{
            res.sendStatus(400)
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
})

  export default router