import express from 'express';
import { createPdf, downloadPdf } from '../controllers/fileController.js';
const router = express.Router();

router.route('/create-pdf').post(createPdf);
router.route('/download').get(downloadPdf);

export default router;
