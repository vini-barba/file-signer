import { Router } from 'express';
import multer from 'multer';

import multerUploadConfig from '../lib/multerUpload';
import Signer from '../controllers/signer';

const upload = multer(multerUploadConfig);

const routes = Router();

routes.post('/sign', upload.single('document'), async (req, res) => {
  try {
    const requestDoc = req.file;
    const { document, emails = [] } = { ...req.body, document: requestDoc };

    const signer = Signer({ document, emails });
    const signedDocs = await signer.start();

    return res.json(signedDocs);
  } catch (e) {
    console.log(`\nError - /sign - ${e.message}`);
    return res.status(500).json({ message: e.message });
  }
});

export default routes;
