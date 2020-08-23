const express = require('express');
const dotenv = require('dotenv');

dotenv.config();
const app = express();



app.listen(process.env.PORT, () => {
    console.log(`Example app is currently listening on port ${process.env.PORT}`)
})