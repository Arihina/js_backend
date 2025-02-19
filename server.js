const express = require('express');
const app = express();

const port = 8000;

app.use(express.static('public'))


app.get('/', function (req, res) {


});

app.get('/about', function (req, res) {
    const data = {
        'app': {
            'name': 'express js server',
            'version': '0.0.1',
            'tag': '#',
            'about': 'nothing interesting yet'
        }
    }

    res.send(data);
});

app.get('/route', function (req, res) {
    let data = {};

    for (item in req.query) {
        data[item] = 0.5 * Number(req.query[item]);
    }

    res.send(data);
});


app.listen(port, function () {
    console.log('Start express server');
});
