var User = require('../model/user');
var path = require('path'); //handles the menu

var db_config = require('../database/dbConfig.js'); //get the dbConfig

// Show profile for specific User
exports.frontpage_get = function(req, res) {
	if(req.session.loggedin == true && req.session.email) {
		res.redirect('/user');
	}
    res.sendFile(path.join(__dirname + '/../views/login.html'));
};

exports.login_post = function(req, res) {
 
	if (req.body.email && req.body.password) { //getting user information from mySql, and check password and email + log in status true
		db_config.connection.query('SELECT * FROM users WHERE email = ?', [req.body.email], function(error, results, fields) {
			if (results.length) {
				var user = new User(
					results[0].email, 
					results[0].password, 
					results[0].name, 
					results[0].interest, 
					results[0].gender
				)//Objektorienteret,klk ind på parametre for at se

				if (user.password == req.body.password) {
					req.session.loggedin = true;
					req.session.email = user.email;
					req.session.interest = user.interest
					req.session.gender = user.gender;
	
					res.redirect('/user');
				} else {
					res.send('Invalid password!');
				}

				
			} else {
				res.send('Invalid email!');
			}			
			res.end();
		});
	} else {
		response.send('Please enter Email and Password!');
		response.end();
	}
};

exports.logout = function(req, res) {
	let user_to_logout = new User(req.session.email, req.session.password)
  
	var loggedin = req.session.loggedin;

	if (user_to_logout.email && loggedin) { 
		req.session.destroy(); //remove log in, and go out from session
	}

	res.redirect('/'); //redirect to login page
};