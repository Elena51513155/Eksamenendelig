var express = require('express');
var session = require('express-session');
var body_parser = require('body-parser');
var path = require('path');
var cors = require('cors');

var allRoutes = require('../routes/site');


//middleware
var app = express();
app.use(session({ //local storage & cookies
	secret: 'tinder2',
	resave: true,
	saveUninitialized: false
}));

app.use(cors());
app.use(body_parser.urlencoded({extended : true}));
app.use(body_parser.json());
app.set('view engine', 'ejs'); //engine set, so I dont have to load template


app.use('/', allRoutes);

app.listen(3006);

module.exports = app;