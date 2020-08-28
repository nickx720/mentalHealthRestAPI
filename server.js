const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');


const mentalHealth = require('./services/mentalHealth');
const errorHandler = require('./utils/globalErrorHandler');




dotenv.config();
const app = express();

/* Middle wares */
app.use(morgan('combined'));
app.use(bodyParser.json());
/* helmet to enhance api security */
app.use(helmet());
/* enable cors for https accesss*/
app.use(cors());

/* JWT Config  */
const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${process.env.issuer}.well-known/jwks.json`
    }),

    // Validate the audience and the issuer.
    audience: process.env.audience,
    issuer: `${process.env.issuer}`,
    algorithms: ['RS256']
});

/* enabling jwt for routes */
app.use(checkJwt);
/* Routes */
app.use('/mentalHealth', mentalHealth);

/* Session middleware */

/* Error Handler */
app.use(errorHandler.errorHandler);


app.listen(process.env.PORT, () => {
    console.log(`Example app is currently listening on port ${process.env.PORT}`)
})
