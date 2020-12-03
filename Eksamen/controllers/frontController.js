var path = require('path'); //handles the menu

var config = require('../database/dbConfig.js'); //get the dbConfig
var con = config.connection;

// Show profile for specific User
exports.frontpage_get = function(req, res) {
	if(req.session.loggedin == true && req.session.email) {
		res.redirect('/user');
	}
    res.sendFile(path.join(__dirname + '/../views/login.html'));
};

exports.login_post = function(req, res) {

    var email = req.body.email;
	var password = req.body.password;

	if (email && password) { //getting user information from mySql, and check password and email + log in status true
		con.query('SELECT * FROM users WHERE email = ? AND password = ?', [req.body.email, req.body.password], function(error, results, fields) {
			if (results.length > 0) {

				var user = results[0];

				req.session.loggedin = true;
				req.session.email = req.body.email;
				req.session.interest = user.interest;
				req.session.gender = user.gender;

				res.redirect('/user');
			} else {
				res.send('Incorrect Email and/or Password!');
			}			
			res.end();
		});
	} else {
		response.send('Please enter Email and Password!');
		response.end();
	}
};

exports.logout = function(req, res) {

    var email = req.session.email;
	var loggedin = req.session.loggedin;

	if (email && loggedin) { 
		req.session.destroy(); //remove log in, and go out from session
	}
	res.redirect('/'); //redirect to host page
};