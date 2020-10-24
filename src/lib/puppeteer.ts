import puppeteer, { Browser, Page } from 'puppeteer';
import path from 'path';

interface IScreenshotData {
  htmlContent: string;
  signedFileName: string;
  extension: 'jpeg' | 'png';
  dimensions: {
    width: number;
    height: number;
  };
}

function Puppeteer() {
  let browser: Browser;
  let page: Page;

  async function start() {
    browser = await puppeteer.launch({
      headless: false,
    });
    page = await browser.newPage();
  }

  async function save({
    htmlContent,
    signedFileName,
    extension,
    dimensions,
  }: IScreenshotData) {
    const pathToSave = path.join(
      __dirname,
      '..',
      '..',
      'files',
      'signed',
      signedFileName
    );

    try {
      if (!['jpeg', 'png'].includes(extension)) {
        extension = 'png';
      }

      await page.setViewport({
        width: dimensions.width,
        height: dimensions.height,
      });
      await page.setContent(htmlContent);

      await page.screenshot({
        path: `${pathToSave}.${extension}`,
        type: extension,
      });

      await browser.close();

      return `${signedFileName}.${extension}`;
    } catch (e) {
      console.log(`\nError - /sign - ${e.message}`);
      throw new Error('Error saving file');
    }
  }
  return {
    start,
    save,
  };
}

export default Puppeteer;
