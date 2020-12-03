var mysql = require('mysql'); //information to my mySql
var config = {
	host     : 'localhost',
	user     : 'root',
	password : 'rootroot',
	database : 'eksamen'
};

var connection = mysql.createConnection(config); //connecting to mySql

connection.connect(function(err) { //show if i am connected and count Id's with created users
  if (err) {
    console.log('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
});

module.exports = {
     connection : mysql.createConnection(config) //exports the database
}