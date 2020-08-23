const express = require('express');
const { Maybe, Either } = require('monet');
const { ifElse, isNil, trim } = require('ramda');
const router = express.Router();
const helper = require('../utils/httpsPost');



router.post('/chatbot', async (req, res, next) => {
    try {
        const content = ifElse(isNil, Either.left, Either.right)(trim(req.body.content))
        console.log(content.value);
        const options = {
            hostname: 'apis.paralleldots.com',
            port: 443,
            path: '/v4/emotion',
            method: 'POST',
        }
        const emotions = await helper.postData(options, content.value);
        console.log(emotions);
        res.send(emotions)
    } catch (e) {
        next(e)
    }
})

module.exports = router;