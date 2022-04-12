import path from 'path';
import pdf from 'html-pdf';
import { pdfTemplate } from '../documents/template.js';

export const createPdf = (req, res) => {
  pdf.create(pdfTemplate(req.body), {}).toFile('result.pdf', (err) => {
    if (err) {
      res.send(Promise.reject());
    }

    res.send(Promise.resolve());
  });
};

export const downloadPdf = (req, res) => {
  const __dirname = path.resolve(path.dirname(''));
  res.sendFile(`${__dirname}/result.pdf`);
};
