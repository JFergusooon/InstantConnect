const express = require('express'),
    pug = require('pug'),
    path = require('path'),
    routes = require('./routes/routes'),
    bodyParser = require('body-parser');



const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

let urlencodedParser = bodyParser.urlencoded({extended: true
    });

app.get('/home', routes.index);
app.get('/findpeople', routes.findpeople);
app.get('/trending', routes.trending);
app.get('/private/:username', routes.privateAccount);

app.get('/public/:username', routes.publicAccount)
app.get('/addFriend/:userTo/:userFrom', routes.friendConfirm)

app.listen(3001);