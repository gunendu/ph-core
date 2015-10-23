var Promise = require('bluebird'); 
var connection = require('../mysql');

var UserDb = {};

UserDb.create = function(username,email,password,firstname) {
  console.log("userdb is called");
  return new Promise(function(resolve,reject) {
    var user = {};
    user.username = username;
    user.email = email;
    user.password = password;
     
    connection.query('INSERT INTO Users SET ?',user, function(err,result) {
       if(!err) {
         console.log("error saving user info");
         connection.end();
         resolve(result);  
       } else {
         console.log("success saving user info");
         reject(err); 
       }  
    })
  })  
};

module.exports = UserDb;
