var mysql = require('mysql');
var config = require("ph_config").core;

var connection = mysql.createConnection({
  host     : config.host,
  user     : config.user,
  password : config.password,
  database : config.database
});

connection.connect(function(err) {
  if(!err) {
    console.log("Mysql Connection success");
  } else {
    console.log("Error Connecting Mysql");  
  } 
});

module.exports = connection;

