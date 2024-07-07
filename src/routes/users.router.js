const express = require('express');
const createError = require('http-errors');  // Importa createError
const userUseCase = require('../usecases/users.usecase');
const auth = require('../middleware/auth.middleware');

const router = express.Router();

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

// Obtener un post por ID
router.get('/:id', async (req, res) => {
    try {
        const postId = req.params.id;
        
        // Busca el post por su ID
        const post = await Post.findById(postId);

        // Verifica si el post existe
        if (!post) {
            return res.status(404).json({
                success: false,
                error: 'El post no se encontró'
            });
        }

        res.json({
            success: true,
            data: post
        });
    } catch (error) {
        console.error('Error al obtener el post por ID:', error);
        res.status(500).json({
            success: false,
            error: 'Error al obtener el post por ID'
        });
    }
});


module.exports = router;



