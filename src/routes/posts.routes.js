const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const Post = require('../models/posts.model');

// Crear un nuevo post
router.post('/', authMiddleware, async (req, res) => {
    try {
        const { title, image, body } = req.body;
        const userId = req.user.id; // ID del usuario autenticado

        // Crea el nuevo post en la base de datos, asignando el ID del usuario
        const newPost = await Post.create({
            title,
            image,
            body,
            user: userId
        });

        res.status(201).json({
            success: true,
            data: newPost
        });
    } catch (error) {
        console.error('Error al crear el post:', error);
        res.status(500).json({
            success: false,
            error: 'Error al crear el post'
        });
    }
});

// Obtener todos los posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json({
            success: true,
            data: posts
        });
    } catch (error) {
        console.error('Error al obtener los posts:', error);
        res.status(500).json({
            success: false,
            error: 'Error al obtener los posts'
        });
    }
});

// Actualizar un post
router.patch('/:id', authMiddleware, async (req, res) => {
    try {
        const postId = req.params.id;
        const { title, image, body } = req.body;

        // Busca el post por su ID
        let post = await Post.findById(postId);

        // Verifica si el usuario autenticado es el dueño del post
        if (post.user.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                error: 'No tienes permiso para actualizar este post'
            });
        }

        // Actualiza el post
        post.title = title;
        post.image = image;
        post.body = body;
        post.updated_at = Date.now();

        await post.save();

        res.json({
            success: true,
            data: post
        });
    } catch (error) {
        console.error('Error al actualizar el post:', error);
        res.status(500).json({
            success: false,
            error: 'Error al actualizar el post'
        });
    }
});

// Eliminar un post
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const postId = req.params.id;

        // Busca el post por su ID
        let post = await Post.findById(postId);

        // Verifica si el post existe
        if (!post) {
            return res.status(404).json({
                success: false,
                error: 'El post no se encontró'
            });
        }

        // Verifica si el usuario autenticado es el dueño del post
        if (post.user.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                error: 'No tienes permiso para eliminar este post'
            });
        }

        // Elimina el post
        // Elimina el post
await post.deleteOne();


        res.json({
            success: true,
            message: 'El post ha sido eliminado correctamente'
        });
    } catch (error) {
        console.error('Error al eliminar el post:', error);
        res.status(500).json({
            success: false,
            error: 'Error al eliminar el post'
        });
    }
});

module.exports = router;
