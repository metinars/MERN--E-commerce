const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
// const database = require('./config/db.js');
const product = require('./routes/product.js');
const user = require('./routes/user.js');
const cloudinary = require('cloudinary').v2;

dotenv.config();

const port = process.env.PORT || 4000;

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cookieParser());

app.use('/', product);
app.use('/', user);

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// database();

const startServer = async () => {
  try {
    mongoose
      .connect(process.env.MONGO_URL)
      .then(() => {
        console.log('MongoDB Connected');
      })
      .catch((err) => console.log(err));
    app.listen(port, () => {
      console.log('Backend server is running!');
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
