var User = require('../model/user');
var path = require('path');
var Match = require('../model/user');
var config = require('../database/dbConfig.js');

function fetchID_and_name(req, callback) {
	config.connection.query('SELECT * FROM users WHERE email = ?', [req.session.email], function (error, results, fields) {
		if (results.length > 0) {
			var user = results[0];
			return callback(user.last_match_check_id, user.name);
		}
	});
}

// Show list of all users.
exports.show_possible_match = function (req, res) {
	if (req.session.loggedin && req.session.email) { // if user is logged in, fetch ID from log in in mySql

		fetchID_and_name(req, (last_m_id, last_m_name) => {
			config.connection.query('SELECT * FROM users WHERE interest = ? AND gender = ? AND id > ? ORDER BY id ASC', [req.session.gender, req.session.interest, last_m_id], function (error, results, fields) {
				if (results.length > 0) {
	
					var user = results[0];
	
					res.render(path.join(__dirname + '/../views/possibleMatch'), {
						user: user
					});
	
				} else {
					res.send('There are no more possible matches!');
				}
				res.end();
			});
		})
		

	}
};

exports.make_skip_match = function (req, res) {
	if (req.session.loggedin == true && req.session.email) {

		var match_id = req.params.id;
		var match_name = req.params.name;
		var what_to_do = req.body.what_to_do;

		//update last_match_check_id
		// Object is used later in the match process. 16.39
		let match = new Match(req.last_m_id, req.match_id, req.last_m_name, req.match_name);

		config.connection.query('UPDATE users SET last_match_check_id = ? WHERE email = ?', [match_id, req.session.email], function (error, results, fields) { });
		fetchID_and_name(req,  (last_m_id, last_m_name) => {
			switch (what_to_do) {
				case 'match':
					config.connection.query('SELECT * FROM matches WHERE ori_user_id = ? AND match_user_id = ?', [match_id, last_m_id], function (error, results, fields) {
						if (results.length) {
							config.connection.query('UPDATE matches SET is_a_match = 1 WHERE ori_user_id = ? AND match_user_id = ?', [match_id, last_m_id], function (error, results, fields) { });
							//res.send({"status": Match})
							// (In frontend)  if (response.body.status == Match) {
							//  	alert("THIS IS  MATCH")
							//}
						} else {
							var sql = "INSERT INTO matches (ori_user_id, match_user_id, ori_user_name, match_user_name) VALUES (?, ?, ?, ?)";
							config.connection.query(sql, [last_m_id, match_id, last_m_name, match_name], function (err, result) { });
						}
						
					});
	
					res.redirect('/matches/get-more');
					break;
	
				default:
					res.redirect('/matches/get-more');
			}
		 })

	}
};

exports.see_all_matches = function (req, res) {
	if (req.session.loggedin == true && req.session.email) {

		config.connection.query('SELECT * FROM users WHERE email = ?', [req.session.email], function (error, results, fields) {
			if (results.length) {
				var current_user = results[0];
				config.connection.query("SELECT * FROM matches WHERE (match_user_id = ? AND is_a_match = 1) OR (ori_user_id = ? AND is_a_match = 1)", [current_user.id, current_user.id], function (error, results1, fields) {
					if (results1.length) {
						var matches = results1;
	
						res.render(path.join(__dirname + '/../views/matches'), {
							matches: matches,
							user_name: current_user.name
						});
	
					}
					res.end();
				});

			}
		});
		
	}
};