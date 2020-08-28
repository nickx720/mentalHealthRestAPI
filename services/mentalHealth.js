const express = require('express');
const { Maybe, Either } = require('monet');
const { ifElse, isNil, trim, toPairs, sort, map, multiply, compose, takeLast, cond, equals, flatten, } = require('ramda');
const router = express.Router();
const helper = require('../utils/httpsPost');


const sadResponse = ['Why do you feel this way?', 'Tell me more!', 'Are you alright', 'Please elucidate your feelings', 'Go on talk to me.']
const happyResponse = ['That sounds great', 'Good to know', 'Very good', 'I could not be happier']
const angryResponse = ['You sound quite aggresive', 'Try to calm down', 'It is not good to be angry', 'Please ask yourself if thats the right way to feel about this?']
const excitedResponse = ['Wow', 'Congrats', 'Great job', 'I knew you could do it']
const fearResponse = ['Try to focus on your breathing', 'I can understand, tell me more', 'Try to breathe slowly',]


const lowestTohighest = (a, b) => a[1] - b[1];
const multiplyBy10 = x => multiply(10, x)
const multiplyArrayby10 = x => map(multiplyBy10, x);
const sortArray = x => sort(lowestTohighest, x);
const getLast = x => takeLast(1, x);
const transformEmotion = compose(getLast, sortArray, toPairs, multiplyArrayby10)
const getRandomMsg = arr => Math.floor(Math.random() * arr.length)
const getMessage = x => cond([
    [([first, _]) => equals('Happy', first), () => happyResponse[getRandomMsg(happyResponse)]],
    [([first, _]) => equals('Sad', first), () => sadResponse[getRandomMsg(sadResponse)]],
    [([first, _]) => equals('Excited', first), () => excitedResponse[getRandomMsg(excitedResponse)]],
    [([first, _]) => equals('Fear', first), () => fearResponse[getRandomMsg(fearResponse)]],
    [([first, _]) => equals('Angry', first), () => angryResponse[getRandomMsg(angryResponse)]],
])(flatten(x));

router.post('/chatbot', async (req, res, next) => {
    try {
        const content = ifElse(isNil, Either.left, Either.right)(trim(req.body.content))
        const options = {
            hostname: 'apis.paralleldots.com',
            port: 443,
            path: '/v4/emotion',
            method: 'POST',
        }
        const emotions = await helper.postData(options, content.value);
        const { emotion } = emotions;
        let emotionArray = transformEmotion(emotion);
        const message = getMessage(emotionArray);
        res.send({ message })
    } catch (e) {
        next(e)
    }
})

module.exports = router;