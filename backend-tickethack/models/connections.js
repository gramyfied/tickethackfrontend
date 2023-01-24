const mongoose = require('mongoose');

const connectionString = 'mongodb+srv://gramyfied:sissoko13011985@cluster0.yetldg0.mongodb.net/tickethack';

mongoose.connect(connectionString, { connectTimeoutMS: 2000 })
  .then(() => console.log('Database connected'))
  .catch(error => console.error(error));