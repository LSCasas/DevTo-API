const cors = require('cors');
const express = require('express');

const usersRouter = require('./routes/users.router');
const authRouter = require('./routes/auth.router');
const postsRouter = require("./routes/posts.routes");
const s3Router = require('./routes/s3');  // Importa las rutas de S3

const app = express();

app.use(cors());
app.use(express.json());

app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/post', postsRouter);
app.use('/api/s3', s3Router);  // Registra las rutas de S3

// Ruta de prueba para verificar que el servidor funciona
app.get('/', (req, res) => {
    res.json({
        message: "Koders APIv1"
    });
});

module.exports = app;





