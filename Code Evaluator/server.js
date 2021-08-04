const express = require('express')

const app = express()

app.use('/', express.static(__dirname + '/public'))  // this command lets you access the public folder

function decryptQueryParams(req, res, next) {

    // TODO: decrypt all query params as per our logic
    console.log(req.query);
    if (req.query.code) {
        let enData = req.query.code;
        let deData = '';
        for (let i = 0; i < enData.length; i++) {
            //console.log(i);
            if (enData[i] == enData[i].toUpperCase()) {

                deData += enData[i].toLowerCase();
            }
            else {
                deData += enData[i].toUpperCase();
            }
        }
        req.query.code = deData;

    }
    console.log(req.query);
    next()
}

function decodeQueryBase64(req, res, next) {
    for (let q in req.query) {
        console.log(q);
        let data = req.query[q];
        data = new Buffer(data, 'base64').toString('ascii')
        req.query[q] = data;
    }
    next()
}

app.get('/eval', decryptQueryParams, decodeQueryBase64, (req, res) => {
    console.log(req.query)

    // TODO: eval the code actually
    //res.send(eval(req.query.code));      
    res.send('RESULT ==>   ' + eval(req.query.code).toString());
    //we cannot send NUMBER into res.send() we need convert them into STRING.

})

app.listen(4545, () => {
    console.log('server started on http://localhost:4545')
})