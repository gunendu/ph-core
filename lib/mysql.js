var mysql = require('mysql');
var config = require('ph_config').core;

var connection = mysql.createConnection({
  host     : config.dbconfig.host,
  user     : config.dbconfig.user,
  password : config.dbconfig.password,
  database : config.dbconfig.database
});

connection.connect(function(err) {
  if(!err) {
    console.log("Mysql Connection success",err);
  } else {
    console.log("Error Connecting Mysql",err);  
  } 
});

module.exports = connection;

