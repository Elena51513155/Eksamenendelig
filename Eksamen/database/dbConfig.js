var mysql = require('mysql'); //information to my mySql

var db_config = {
  host: 'localhost',
  user: 'root',
  password: 'rootroot', //ændre password
  database: 'eksamen'
};

var db_connection = mysql.createConnection(db_config); //connecting to mySql

db_connection.connect(function (err) { //show if i am connected and count Id's with created users
  if (err) {
    console.log('Unable to connect: \n' + err.stack);

  } else {
    console.log('Connecting successful');
  }

  console.log('Server connection details:' + db_connection.threadId);
});

module.exports = {
  connection: mysql.createConnection(db_config) //exports the database
}