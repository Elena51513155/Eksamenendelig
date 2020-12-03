var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var cors = require('cors');

var allRoutes = require('../routes/site');


//middleware, tjek dette link
// https://www.reddit.com/r/node/comments/6tu503/newbie_secret_resave_saveuninitialized_in_sessions/
var app = express();
app.use(session({
	secret: 'tinder2',
	resave: true,
	saveUninitialized: true
}));


app.use(cors());
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));  //middleware whose only purpose is to serve static files like JS/CSS.
app.set('view engine', 'ejs'); //engine set, so I dont have to load template


app.use('/', allRoutes);

app.listen(3006);

module.exports = app;