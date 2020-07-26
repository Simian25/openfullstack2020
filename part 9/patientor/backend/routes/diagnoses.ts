import expess from 'express';
import diagnoseService from '../services/diagnoseService'
const router = expess.Router();
router.get('/', (_req, res) => {
    console.log('someone pinged diagnoses');
    const diagnoses = diagnoseService.getEntries()
    res.json(diagnoses)
  });


  export default router