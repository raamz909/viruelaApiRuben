import nodemailer from 'nodemailer';
import { envs } from '../config/envs';



const transporter = nodemailer.createTransport({
  service: envs.MAILER_SERVICE,
  auth: {
    user: envs.MAILER_EMAIL,  
    pass: envs.MAILER_ACCESS_TOKEN
  }
});

export const sendEmail = async (subject: string,htmlBody:string) => {
  const mailOptions = {
    from: envs.MAILER_EMAIL,  //De donde se manda el email
    to: envs.MAILER_EMAIL,  // A q
    subject,
    htmlBody: htmlBody
  };

  try {
    await transporter.sendMail({
      from: mailOptions.from,
      to: mailOptions.to,
      html: mailOptions.htmlBody,
      subject:mailOptions.subject
    });
    console.log('Correo enviado exitosamente');
  } catch (error) {
    console.error('Error al enviar el correo:', error);
  }
};