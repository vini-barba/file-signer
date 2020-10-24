import path from 'path';
import sizeOf from 'image-size';
import { promisify } from 'util';
import Puppeteer from '../../lib/puppeteer';

function Images(document: any) {
  function generateHtml(email: string) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
      <style>
        body {
          width: 92vw;
          height: 92vh;
          background-image: url('${process.env.baseUrl}/files/${document.filename}'); 
          background-position: center; 
          background-repeat: no-repeat; 
          background-size: cover; 
        }
        #container{
          width: 100%;
          height: 100%;
          display: flex; 
          justify-content:flex-start; 
          align-items:flex-end;
          margin: 0; 
          padding: 0; 
        }
        span {
          color: rgba(0,0,0,.5);
          font-size:16px; 
        }

        </style>
    </head>
    <body>
      <div id="container">
        <span>${email}</span>
      </div>

    </body>
    </html> 
    `;
  }

  async function sign(email: string) {
    const [filename, extension] = document.filename.split('.');
    const signedFileName = `${email.replace(/\./g, '-')}-${filename}`;

    const htmlContent = generateHtml(email);
    const puppeteer = Puppeteer();
    await puppeteer.start();

    const dimensions = (await promisify(sizeOf.imageSize)(
      path.join(__dirname, '..', '..', '..', 'files', document.filename)
    )) as { width: number; height: number };

    const savedFileNameWithExtension = await puppeteer.save({
      htmlContent,
      signedFileName,
      extension,
      dimensions,
    });

    return {
      email,
      signedDocument: `${process.env.baseUrl}/files/signed/${savedFileNameWithExtension}`,
    };
  }
  return {
    sign,
  };
}

export default Images;
