import { envs } from "../config/envs";

export function generateCaseEmailTemplate(
  age: number,
  genre: string,
  lat: number,
  lng: number
): string {
  const mapImageUrl = generateMapboxStaticImageURL(lat, lng);
  return `
  <!DOCTYPE html>
  <html lang="es">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Detalles del Caso</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              color: #333;
              margin: 0;
              padding: 0;
          }
          .container {
              width: 100%;
              max-width: 600px;
              margin: 20px auto;
              background-color: #ffffff;
              border-radius: 8px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              overflow: hidden;
          }
          .header {
              background-color: #007BFF;
              color: #ffffff;
              padding: 20px;
              text-align: center;
          }
          .header h1 {
              margin: 0;
              font-size: 24px;
          }
          .content {
              padding: 20px;
          }
          .content p {
              margin: 10px 0;
          }
          .footer {
              background-color: #f4f4f4;
              color: #777;
              padding: 10px;
              text-align: center;
              font-size: 12px;
          }
          .map-image {
            width: 100%;
            height: auto;
            border-radius: 20px
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">
              <h1>Detalles del Caso</h1>
          </div>
          <div class="content">
              <p><strong>genre:</strong> ${genre}</p>
              <p><strong>age:</strong> ${age}</p>
              <p><strong>lat:</strong> ${lat}</p>
              <p><strong>lng:</strong> ${lng}</p>
          </div>

          <div>
            <img class="map-image" src="${mapImageUrl}"/>
          </div>

          <div class="footer">
              <p>Este es un correo generado automáticamente. Por favor, no responda a este mensaje.</p>
          </div>
      </div>
  </body>
  </html>
  `;
}

export const generateMapboxStaticImageURL = (
  lat: number,
  lng: number
): string => {
  const accessToken = envs.MAPBOX_ACCESS_TOKEN;
  const zoom = 13;
  const width = 800;
  const height = 500;
  return `https://api.mapbox.com/styles/v1/mapbox/light-v11/static/pin-l-embassy+f74e4e(${lng},${lat})/${lng},${lat},${zoom}/${width}x${height}?access_token=${accessToken}`;
};