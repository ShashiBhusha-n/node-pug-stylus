const nib = require('nib');
const stylus = require('stylus');
const morgan = require('morgan');
const cron = require('node-cron');
const express = require('express');
const date = require('date-and-time');
var app = express();
var records = new Object();
date.setLocales('en', {
    A: ['AM', 'PM']
});
function compile(str, path) {
    return stylus(str).set('filename', path).use(nib());
}
app.set('views', __dirname + '/views')
app.set('view engine', 'pug')
app.use(morgan('dev'))
app.use(stylus.middleware({
    src: __dirname + '/public',
    compile: compile
}));
app.use(express.static(__dirname + '/public'));
let i = 0;
let refreshIntervalInSeconds = 10;
cron.schedule('*/' + refreshIntervalInSeconds + ' * * * * *', () => {
    var cDate = new Date()
    var nDate = new Date(cDate.getTime() + (1000 * refreshIntervalInSeconds));
    cDate = date.format(cDate, 'dddd, MMM DD-YYYY, hh:mm:ss A, [GMT]Z');
    nDate = date.format(nDate, 'dddd, MMM DD-YYYY, hh:mm:ss A, [GMT]Z');
    records[i++] = {
        'id': 'Wsfskjnmsxcoikfnm dsfsxkinmd',
        'CurrentTime': cDate,
        'NextTime': nDate
    };
});
app.get('/', function (req, res) {
    res.render('index', { title: 'Home', data: records })
});
app.post('/clearWindow', function (req, res) {
    records = new Object();
    res.redirect('/')
});
app.listen(8080, () => {
    console.log("Server is running at Port: " + 8080);
});