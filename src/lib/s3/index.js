const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const s3Client = require('./config');  // Aquí importas el cliente S3 configurado

const generatePresignedUrl = async (fileName, fileType) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,  // Nombre del bucket desde .env
    Key: fileName,
    Expires: 60 * 5, // URL válida por 5 minutos
    ContentType: fileType,
  };

  try {
    // Crear comando para el objeto
    const command = new PutObjectCommand({
      Bucket: params.Bucket,
      Key: params.Key,
      ContentType: params.ContentType,
    });

    // Generar la URL firmada
    const url = await getSignedUrl(s3Client, command, { expiresIn: params.Expires });
    return url;
  } catch (err) {
    console.error('Error generando URL firmada:', err);
    throw new Error('No se pudo generar la URL firmada');
  }
};

module.exports = {
  generatePresignedUrl,
};


