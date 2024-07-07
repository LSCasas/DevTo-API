const createError = require("http-errors");
const Post = require('../models/posts.model');


// Obtener un post por ID
async function getPostById(postId) {
    try {
        const post = await Post.findById(postId);
        
        if (!post) {
            throw new Error('El post no se encontró');
        }

        return post;
    } catch (error) {
        throw new Error(error.message);
    }
}


// Crear un nuevo post
async function createPost(title, image, body, userId) {
    try {
        const newPost = await Post.create({
            title,
            image,
            body,
            user: userId
        });
        return newPost;
    } catch (error) {
        throw new Error('Error al crear el post');
    }
}

// Obtener todos los posts
async function getAllPosts() {
    try {
        const posts = await Post.find();
        return posts;
    } catch (error) {
        throw new Error('Error al obtener los posts');
    }
}

// Actualizar un post
async function updatePost(postId, title, image, body, userId) {
    try {
        let post = await Post.findById(postId);

        if (!post) {
            throw new Error('Post no encontrado');
        }

        // Verifica si el usuario es el dueño del post
        if (post.user.toString() !== userId) {
            throw new Error('No tienes permiso para actualizar este post');
        }

        // Actualiza el post
        post.title = title;
        post.image = image;
        post.body = body;
        post.updated_at = Date.now();

        await post.save();

        return post;
    } catch (error) {
        throw new Error(error.message);
    }
}

// Eliminar un post
async function deletePost(postId, userId) {
    try {
        let post = await Post.findById(postId);

        if (!post) {
            throw new Error('Post no encontrado');
        }

        // Verifica si el usuario es el dueño del post
        if (post.user.toString() !== userId) {
            throw new Error('No tienes permiso para eliminar este post');
        }

        // Elimina el post
        await post.remove();

        return true;
    } catch (error) {
        throw new Error(error.message);
    }



    
    
}

module.exports = {
    createPost,
    getAllPosts,
    updatePost,
    deletePost,
    getPostById 
};
