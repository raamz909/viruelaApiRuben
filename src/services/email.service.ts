import nodemailer from 'nodemailer';
import { envs } from '../config/envs';



const transporter = nodemailer.createTransport({
  service: envs.MAILER_SERVICE,
  auth: {
    user: envs.MAILER_EMAIL,  
    pass: envs.MAILER_ACCESS_TOKEN
  }
});

export const sendEmail = async (subject: string, text: string) => {
  const mailOptions = {
    from: envs.MAILER_EMAIL,  //De donde se manda el email
    to: envs.MAILER_EMAIL,  // A quien le llegara el email
    text,
    subject
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Correo enviado exitosamente');
  } catch (error) {
    console.error('Error al enviar el correo:', error);
  }
};