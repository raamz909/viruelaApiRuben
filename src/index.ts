import express, { Application } from 'express';
import mongoose from 'mongoose';
import caseRoutes from './routes/case.routes';
import cron from 'node-cron';
import { sendEmail } from './services/email.service';
import CaseModel from './models/case.model';
import { envs } from './config/envs';
import { generateCaseEmailTemplate } from './templates/email.template';

const app: Application = express();
const PORT = envs.PORT;

app.use(express.json());

mongoose.connect(envs.MONGO_URL)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });

// Rutas de la API
app.use(caseRoutes);

app.get('/', (req, res) => {
  res.send('API for Viruela del Mono');
});

//CRON  
cron.schedule('*/10 * * * * *', async () => {
  try {
    console.log('Esperando a que se registren casos...');

    const newCases = await CaseModel.find({ isSent: false });

    if (newCases.length === 0) {
      console.log('No se encontraron casos nuevos.');
    } else {
      console.log(`${newCases.length} caso(s) nuevo(s) encontrado(s). Procesando...`);
    }

    for (const caseItem of newCases) {
      console.log(`Procesando caso con ID: ${caseItem._id}`);
    
      const emailBody = generateCaseEmailTemplate(
        caseItem.age,
        caseItem.genre,
        caseItem.lat,
        caseItem.lng,
        caseItem.symptoms
      );
    
      await sendEmail('Nuevo caso registrado', emailBody);
    
      // Actualizar el campo isSent a true después de enviar el correo
      caseItem.isSent = true;
      await caseItem.save();
    
      console.log(`Caso con ID: ${caseItem._id} procesado y correo enviado.`);
    }

  } catch (error) {
    console.error('Error al procesar casos en el cron job:', error);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});