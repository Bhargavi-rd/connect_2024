const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors package
require('dotenv').config();
const dbConfig = require('./app/config/dbconfig.js');
const post = require('./app/routes/post.js');
const version = require('./app/utils/version.json');

const app = express();
const PORT = process.env.PORT;

const vrsn = version.vrsnNo;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors()); // Use the cors middleware

app.get('/', (req, res) => {
  res.status(200).json(`version - ${vrsn}`);
});

app.use('/api/auth/', post);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
  dbConfig.checkConnection();
});
