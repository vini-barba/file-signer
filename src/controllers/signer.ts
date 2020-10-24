import Document from './document';

interface SignerData {
  document: any;
  emails: string[];
}

function Signer({ document, emails }: SignerData) {
  if (!Array.isArray(emails)) {
    emails = [emails];
  }
  const doc = Document(document);
  doc.start();

  async function start() {
    return Promise.all(
      emails.map(async (email) => {
        const signedDoc = await doc.sign(email);
        return signedDoc;
      })
    );
  }

  return {
    start,
  };
}

export default Signer;
