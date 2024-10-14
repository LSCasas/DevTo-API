const { S3Client } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { PutObjectCommand } = require('@aws-sdk/client-s3');
const express = require('express');
const createError = require('http-errors');
const userUseCase = require('../usecases/users.usecase');
const auth = require('../middleware/auth.middleware'); // Si estás usando autenticación

const router = express.Router();

// Configura AWS S3
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Endpoint para generar una URL pre-firmada (presigned URL) para subir una imagen a S3
router.post('/s3/presigned-url', async (req, res) => {
  try {
    const { fileName, fileType } = req.body;

    // Parámetros para generar la URL pre-firmada
    const params = {
      Bucket: process.env.S3_BUCKET_NAME, // Nombre del bucket
      Key: fileName,                      // Nombre del archivo en S3
      Expires: 60,                        // Tiempo de validez de la URL (60 segundos)
      ContentType: fileType,              // Tipo de contenido (MIME type) del archivo
    };

    // Comando para poner el objeto en el bucket
    const command = new PutObjectCommand(params);

    // Genera la URL pre-firmada
    const signedUrl = await getSignedUrl(s3, command, { expiresIn: 60 });

    // Enviar la URL pre-firmada al frontend
    res.json({ url: signedUrl });
  } catch (error) {
    console.error('Error generating presigned URL:', error);
    res.status(500).json({
      success: false,
      error: 'Error generating presigned URL',
    });
  }
});

// Endpoint para obtener todos los usuarios
router.get('/', async (req, res) => {
  try {
    const users = await userUseCase.getAll();
    res.json({
      success: true,
      data: { users },
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      error: error.message,
    });
  }
});

// Endpoint para crear un nuevo usuario
router.post('/', async (req, res) => {
  try {
    const { name, profilePic, email, password } = req.body;

    // Verificamos si el usuario ya existe
    const existingUser = await userUseCase.getByEmail(email);
    if (existingUser) {
      throw createError(400, 'El correo electrónico ya está en uso');
    }

    // Crear el usuario
    const userCreated = await userUseCase.create({ name, profilePic, email, password });
    res.status(201).json({
      success: true,
      data: { user: userCreated },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});

// Ruta para obtener información de un usuario por id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userUseCase.getById(id);
    if (!user) {
      throw createError(404, 'Usuario no encontrado');
    }
    res.json({
      success: true,
      data: { user },
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      error: error.message,
    });
  }
});

// Exportar las rutas
module.exports = router;







