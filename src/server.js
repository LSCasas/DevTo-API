const cors = require('cors');
const express = require('express');

const usersRouter = require('./routes/users.router');
const authRouter = require('./routes/auth.router');
const postsRouter = require("./routes/posts.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use("/post", postsRouter);

app.get('/', (require, response) => {
    response.json({
        message: "Koders APIv1"
    });
});
module.exports = app;




