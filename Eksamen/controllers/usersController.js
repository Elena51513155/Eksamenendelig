var User = require('../model/user');
var path = require('path');

var config = require('../database/dbConfig.js');

// Show list of all users, click the button
exports.user_list_possible_matches = function (req, res) {
	res.send('NOT IMPLEMENTED: user possible matches list');
};

// show a detailed page for a specific user.
exports.user_detail = function (req, res) {

	if (req.session.loggedin && req.session.email) {
		config.connection.query('SELECT * FROM users WHERE email = ?', [req.session.email], function (error, results, fields) {
			if (results.length) {
				req.session.gender = results[0].gender;
				req.session.interest = results[0].interest;

				res.render(path.join(__dirname + '/../views/profile'), {
					user: results[0]
				});

			} else {
				res.send('Internal servererror!');
			}
			res.end();
		});
	}
};

// Display user create form on GET.
exports.user_create_get = function (req, res) {
	res.sendFile(path.join(__dirname + '/../views/register.html'));
};

// User create (POST), from User class, insert all values and if succesfull redirect to user page
exports.user_create_post = function (req, res) {
	let user = new User(req.body.email, req.body.password, req.body.name, req.body.interest, req.body.gender)


	if (!user.email || !user.password) {
		var sql = "INSERT INTO users (name, gender, interest, email, password) VALUES (?, ?, ?, ?, ?)";
		config.connection.query(sql, [user.name, user.gender, user.interest, user.email, user.password], function (err, result) {
			if (err) {
				res.send('Internal servererror!\n' + err);
			} else {
				req.session.loggedin = true;
				req.session.email = user.email;
				res.redirect('/user');
			}
		});
	} else {
		res.send('Please enter Username and Password!');
		res.end();
	}
};

// Display user delete form on GET.
exports.user_delete_get = function (req, res) {
	console.log("SESSION ID: " + req.params.id);

	if (req.session.loggedin) {
		config.connection.query(`DELETE FROM users WHERE id = ${req.params.id}`, function (err, result) {
			if (err) {
				res.send('Internal servererror!\n' + err);
			} else {
				res.redirect('/login/?is_deleted=True');
				//res.send('user delete POST');

			}
		});
	}

}

// Handle user delete on POST.
exports.user_delete_post = function (req, res) {
	if (req.session.loggedin) {
		config.connection.query(`DELETE FROM users WHERE id = ${req.session.id}`, function (err, result) {
			if (err) {
				throw err;
			} else {
				res.redirect("/login/?")
			}
		});
	}

	res.send('user delete POST');
};

// Display user update from on GET.
exports.user_update_get = function (req, res) {
	if (req.session.loggedin == true) {
		config.connection.query(`UPDATE users set password = ${req.params.newpassword} WHERE id = ${req.params.id}`, function (err, result) {
			if (err) {
				throw err;
			} else {
				// TODO redirect to frontpage?
			}
		});
	}
	else {

	}
	res.send('user update GET');
};

// Update Password
exports.user_update_password_get = function (req, res) {

	if (req.session.loggedin == true) {
		config.connection.query(`UPDATE users set password = ${req.params.newpassword} WHERE id = ${req.params.id}`, function (err, result) {
			if (err) {
				throw err;
			} else {
				// TODO redirect to frontpage?
			}
		});
	}
	else {

	}
	res.send('user update GET');
};

// Handle user update on POST.
exports.user_update_post = function (req, res) {
	if (req.session.loggedin) {
		const { name } = req.body;

		config.connection.query(`UPDATE users SET name = ${name} WHERE email = ${req.session.email}`)

		// TODO redirect.
	} else {

	}
	res.send('user update POST');
};

