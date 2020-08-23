const https = require('https');
const FormData = require('form-data');
const { lensProp, set } = require('ramda');

const postData = (options, inboundData) => {
    const form = new FormData();
    form.append('api_key', process.env.api_key);
    form.append('text', inboundData);
    const header = lensProp('headers');
    const appendOptions = set(header, form.getHeaders(), options);
    const req = https.request(appendOptions, (res) => {
        let data = {};
        res.on('data', chunk => {
            data += chunk;
        })
        res.on('end', () => {
            console.log(data)
        })
    });
    req.on('error', (err) => {
        console.log('request failed')
        throw err;
    })
    form.pipe(req);
    req.on('response', function (res) {
        console.log(res.statusCode);
    });
}

module.exports = {
    postData
}