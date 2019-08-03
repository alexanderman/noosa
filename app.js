const env = process.env.NODE_ENV || 'development';

const config = require(`./config/config.${env}.json`);
const express = require('express');


const app = express();
const apiRouter = express.Router();

app.use(express.json());
app.use('/api', require('./routes/api')(apiRouter));


app.listen(config.port, () => {
  console.log('server listening on port:', config.port);
});



