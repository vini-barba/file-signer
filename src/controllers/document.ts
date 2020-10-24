import { DocumentTypes } from './documentTypes/index';

function Document(document: any) {
  let DocumentHandler: any;

  function validateType(extension: string) {
    const avaliableExtension = ['pdf', 'jpg', 'jpeg', 'png'];
    const isExtensionValid = avaliableExtension.includes(extension);
    if (!isExtensionValid) {
      throw new Error('File type not implemented yet');
    }
  }

  function getDocumentHandler(extension: string) {
    const docTypes: any = DocumentTypes();
    return docTypes[extension];
  }

  function start() {
    const [, fileExtension] = document.filename.split('.');
    validateType(fileExtension);
    DocumentHandler = getDocumentHandler(fileExtension);
  }

  async function sign(email: string) {
    const documentHandler = DocumentHandler(document);
    return documentHandler.sign(email);
  }

  return {
    start,
    sign,
  };
}

export default Document;
