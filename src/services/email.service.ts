import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'rubenramirez.arellano99@gmail.com',  
    pass: 'mtekrwnxlcrnvwdh'     
  }
});

export const sendEmail = async (subject: string, text: string) => {
  const mailOptions = {
    from: 'rubenramirez.arellano99@gmail.com',  //De donde se manda el email
    to: 'rubenramirez.arellano99@gmail.com',  // A quien le llegara el email
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