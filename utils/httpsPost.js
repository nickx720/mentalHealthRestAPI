const https = require('https');
const FormData = require('form-data');
const { lensProp, set } = require('ramda');
// Custom HTTP POST
const postData = (options, inboundData) => {
    return new Promise((resolve, reject) => {
        const form = new FormData();
        form.append('api_key', process.env.api_key);
        form.append('text', inboundData);
        const header = lensProp('headers');
        const appendOptions = set(header, form.getHeaders(), options);
        let output;
        const req = https.request(appendOptions, (res) => {
            let data = undefined;
            res.on('data', chunk => {
                data = chunk;
            })
            res.on('end', () => {
                output = data;
                resolve(JSON.parse(output))
            })
        });
        req.on('error', (err) => {
            console.log('request failed')
            reject(err);
        })
        form.pipe(req);
        req.end()
    });
}

module.exports = {
    postData
}