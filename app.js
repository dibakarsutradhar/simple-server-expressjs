var express = require('express');
var path = require('path');
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    res.render('index', {title: 'Computer Not Working?'});
});

app.get('/about', function (req, res) {
    res.render('about');
});

app.get('/contact', function (req, res) {
    res.render('contact');
});

app.post('/contact/send', function (req, res) {
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'blabla@gmail.com',
            pass: ''
        }
    });

    var mailOption = {
        from: 'Dibakar sutra dhar <blabla@gmail.com>',
        to: 'contact@bla.com',
        subject: 'Website Submission',
        text: 'You have a submission from ' +req.body.name+ ' email: '+req.body.email+ ' message: ' +req.body.message,
        html: '<p>You have a new submission with following details...</p><ul><li>Name: '+req.body.name+'</li><li>Email: '+req.body.email+'</li><li>Message: '+req.body.message+'</li></ul>'
    }

    transporter.sendMail(mailOption, function(error, info){
        if(error){
            console.log(error);
            res.redirect('/');
        } else {
            console.log('Message Sent ' + info.response);
            res.redirect('/');
        }
    });
});

app.listen(3030);
console.log('Server is running on Port 3030');