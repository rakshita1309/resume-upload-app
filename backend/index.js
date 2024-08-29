const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
require('./config/mongoDB');
const router = require('./routes/index');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(cors());

app.use('/api', router);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});