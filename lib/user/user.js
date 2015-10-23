var Promise = require('bluebird'); 
var connection = require('../mysql');

var UserDb = {};

UserDb.save = function(username,email,password,firstname) {
  return new Promise(function(resolve,reject) {
    var user = {};
    user.username = username;
    user.email = email;
    user.password = password;
    user.firstname = firstname;
     
    connection.query('INSERT INTO User SET ?',user, function(err,result) {
       if(!err) {
         console.log("error saving user info");
         resolve(result);  
       } else {
         console.log("success saving user info");
         reject(err); 
       }  
    })
  })  
};

module.exports = UserDb;
