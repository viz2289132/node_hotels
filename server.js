const express = require('express');
const app = express();
const db = require('./db'); // Ensure db connection is established in this file

const bodyParser = require('body-parser');
app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.send('Hello, welcome to my hotel.');
});


//Import router files
const personzRoutes = require('./routes/personRoute');
const menuRoutes = require('./routes/menuRoutes');

//use the routes
app.use('/person' , personzRoutes);
app.use('/menu' , menuRoutes);

// Server listening on port 3000
app.listen(3000, () => {
  console.log('Listening on port 3000');
});
