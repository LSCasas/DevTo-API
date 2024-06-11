const mongoose = require('mongoose');
require('dotenv').config();

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

const URI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`;

mongoose.connect(URI)
  .then(() => {
    console.log("DB connected successfully");
    mongoose.disconnect();
  })
  .catch((error) => {
    console.error("Error connecting to DB:", error);
  });
