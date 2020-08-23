const express = require('express');
const { Maybe, Either } = require('monet');
const { ifElse, isNil } = require('ramda');
const router = express.Router();



router.post('/chatbot', (req, res, next) => {
    const content = ifElse(isNil, Either.left, Either.right)(req.body.content)
    console.log(content.value);
    res.send("About birds")
})

module.exports = router;