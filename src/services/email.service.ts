import nodemailer from 'nodemailer';
import { envs } from '../config/envs';
import fetch from 'node-fetch'; // Update to use import

const transporter = nodemailer.createTransport({
  service: envs.MAILER_SERVICE,
  auth: {
    user: envs.MAILER_EMAIL,
    pass: envs.MAILER_ACCESS_TOKEN,
  },
});

// Function to generate Mapbox image URL
const getMapboxImageUrl = (lat: number, lng: number) => {
  const accessToken = process.env.MAPBOX_ACCESS_TOKEN;
  const zoom = 13;
  const width = 800;
  const height = 500;
  const mapStyle = 'streets-v11';

  return `https://api.mapbox.com/styles/v1/mapbox/${mapStyle}/static/${lng},${lat},${zoom}/${width}x${height}?access_token=${accessToken}`;
};

export const sendEmail = async (subject: string, htmlBody: string) => {
  const mailOptions = {
    from: envs.MAILER_EMAIL, // Sender address
    to: envs.MAILER_EMAIL,   // Recipient address
    subject,
    html: htmlBody,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};