//var User = require('../models/user');
var path = require('path');

var config = require('../database/dbConfig.js');
var con = config.connection;

// Show list of all users, click the button
exports.user_list_possible_matches = function(req, res) {
    res.send('NOT IMPLEMENTED: user possible matches list');
};

// show a detailed page for a specific user.
exports.user_detail = function(req, res) {

	if(req.session.loggedin == true && req.session.email) {
		con.query('SELECT * FROM users WHERE email = ?', [req.session.email], function(error, results, fields) {
			if (results.length > 0) {

				var user = results[0];

				res.render(path.join(__dirname + '/../views/profile'), {
			        user: user
			    });

			} else {
				res.send('Incorrect Username and/or Password!');
			}			
			res.end();
		});
	}
};

// Display user create form on GET.
exports.user_create_get = function(req, res) {
    res.sendFile(path.join(__dirname + '/../views/register.html'));
};

// User create (POST), insert all values and if succesfull redirect to user page
exports.user_create_post = function(req, res) {
    var email = req.body.email;
	var password = req.body.password;
	var name = req.body.name;
	var interest = req.body.interest;
	var gender = req.body.gender;

	if (email && password) {
		var sql = "INSERT INTO users (name, gender, interest, email, password) VALUES (?, ?, ?, ?, ?)";
		con.query(sql, [name, gender, interest, email, password], function (err, result) {
			if (err) {
				throw err;
			} else {
				req.session.loggedin = true;
				req.session.email = email;
				res.redirect('/user');
			} 
		});
	} else {
		res.send('Please enter Username and Password!');
		res.end();
	}
};

// Display user delete form on GET.
exports.user_delete_get = function(req, res) {


	if(request.session.loggedin == true) {

		
	}
	else {
		
	}

    res.send('NOT IMPLEMENTED: user delete GET');
};

// Handle user delete on POST.
exports.user_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: user delete POST');
};

// Display user update form on GET.
exports.user_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: user update GET');
};

// Handle user update on POST.
exports.user_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: user update POST');
};