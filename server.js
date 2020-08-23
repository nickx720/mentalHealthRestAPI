const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mentalHealth = require('./services/mentalHealth');
const errorHandler = require('./utils/globalErrorHandler');
dotenv.config();
const app = express();

/* Middle wares */
app.use(morgan('tiny'));
app.use(bodyParser.json());
/* Routes */
app.use('/mentalHealth', mentalHealth);

/* Error Handler */
app.use(errorHandler.errorHandler);


app.listen(process.env.PORT, () => {
    console.log(`Example app is currently listening on port ${process.env.PORT}`)
})