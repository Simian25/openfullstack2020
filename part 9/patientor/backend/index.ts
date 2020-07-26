import express from 'express';
import cors from "cors"

import pingRouter from './routes/ping';
import diagnoseRouter from './routes/diagnoses';
import patientRouter from './routes/patients'

const app = express();
app.use(express.json());
app.use(cors()
)
const PORT = 3001;

app.use('/api/ping', pingRouter);
app.use('/api/diagnoses',diagnoseRouter)
app.use('/api/patients',patientRouter)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});