
const mongoose = require('mongoose');
const mongoUri = 'mongodb://localhost/Renting';

mongoose.connect(mongoUri, {useNewUrlParser: true, useUnifiedTopology: true});
  
  const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  
  console.log('db connected');
 
});
module.exports = db;
