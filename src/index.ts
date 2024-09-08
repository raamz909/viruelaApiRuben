import express, { Application } from 'express';
import mongoose from 'mongoose';
import caseRoutes from './routes/case.routes';
import cron from 'node-cron';
import { sendEmail } from './services/email.service';
import CaseModel from './models/case.model';

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/viruela_db')
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

// Aquí comienza el cron job
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

      const emailText = `Nuevo caso de Viruela del Mono registrado.\nGénero: ${caseItem.genre}\nEdad: ${caseItem.age}\nUbicación: (${caseItem.lat}, ${caseItem.lng})\nSíntomas: ${caseItem.symptoms}`;
      await sendEmail('Nuevo caso registrado', emailText);

      // Actualizar el campo isSent a true después de enviar el correo
      caseItem.isSent = true;
      await caseItem.save();

      console.log(`Caso con ID: ${caseItem._id} procesado y correo enviado.`);
    }

  } catch (error) {
    console.error('Error al procesar casos en el cron job:', error);
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});