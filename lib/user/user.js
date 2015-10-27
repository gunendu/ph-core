var Promise = require('bluebird'); 
var connection = require('../mysql');

var UserDb = {};

UserDb.create = function(username,email,name,id) {
  console.log("userdb is called");
  return new Promise(function(resolve,reject) {
    var user = {};
    user.username = username;
    user.email = email;
    user.password = '';
    user.name= name;
     
    connection.query('INSERT INTO Users SET ?',user, function(err,result) {
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
