const express = require('express');
const { uploadFile, generatePresignedUrl } = require('../lib/s3'); // Importa las funciones de S3 que ya tienes
const router = express.Router();

// Ruta para generar URL firmada
router.post('/presigned-url', async (req, res) => {
  const { fileName, fileType } = req.body;

  if (!fileName || !fileType) {
    return res.status(400).json({ message: 'Faltan parámetros en la solicitud' });
  }

  try {
    const url = await generatePresignedUrl(fileName, fileType);
    res.status(200).json({ url });
  } catch (error) {
    res.status(500).json({ message: 'Error generando URL firmada' });
  }
});

// Ruta para subir un archivo directamente a S3
router.post('/upload', async (req, res) => {
  const { fileName, fileContent, mimeType } = req.body;

  if (!fileName || !fileContent || !mimeType) {
    return res.status(400).json({ message: 'Faltan parámetros en la solicitud' });
  }

  try {
    const fileUrl = await uploadFile(fileName, Buffer.from(fileContent, 'base64'), mimeType);
    res.status(200).json({ url: fileUrl });
  } catch (error) {
    res.status(500).json({ message: 'Error subiendo archivo a S3' });
  }
});

module.exports = router;
