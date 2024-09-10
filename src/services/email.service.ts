import nodemailer from 'nodemailer';
import { envs } from '../config/envs';
import fetch from 'node-fetch';  // Asegúrate de importar node-fetch

// Configuración del transporte de nodemailer
const transporter = nodemailer.createTransport({
  service: envs.MAILER_SERVICE,
  auth: {
    user: envs.MAILER_EMAIL,  
    pass: envs.MAILER_ACCESS_TOKEN
  }
});

// Función para generar la URL de la imagen de Mapbox
const getMapboxImageUrl = (lat: number, lng: number) => {
  const accessToken = process.env.MAPBOX_ACCESS_TOKEN;
  const zoom = 12;
  const width = 600;
  const height = 400;
  const mapStyle = 'streets-v11';

  return `https://api.mapbox.com/styles/v1/mapbox/${mapStyle}/static/${lng},${lat},${zoom}/${width}x${height}?access_token=${accessToken}`;
};

// Función para enviar el correo con la imagen de Mapbox adjunta
export const sendEmail = async (subject: string, htmlBody: string, lat?: number, lng?: number) => {
  const mailOptions: any = {
    from: envs.MAILER_EMAIL,  // De dónde se manda el email
    to: envs.MAILER_EMAIL,    // A quién se envía
    subject,
    html: htmlBody,
  };

  try {
    // Si se proporcionan latitud y longitud, generar la imagen de Mapbox
    if (lat && lng) {
      const mapboxImageUrl = getMapboxImageUrl(lat, lng);
      const response = await fetch(mapboxImageUrl);
      const mapImage = await response.buffer();  // Descargar la imagen como buffer

      mailOptions.attachments = [
        {
          filename: 'map.png',
          content: mapImage,
        },
      ];
    }

    // Enviar el correo con la imagen adjunta (si existe)
    await transporter.sendMail({
      from: mailOptions.from,
      to: mailOptions.to,
      html: mailOptions.html,
      subject: mailOptions.subject,
      attachments: mailOptions.attachments || [] // Incluir la imagen adjunta si hay coordenadas
    });
    
    console.log('Correo enviado exitosamente');
  } catch (error) {
    console.error('Error al enviar el correo:', error);
  }
};