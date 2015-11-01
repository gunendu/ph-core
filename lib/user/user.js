var Promise = require('bluebird'); 
var connection = require('../mysql');

var UserDb = {};

UserDb.create = function(username,email,name,profile_url) {
  console.log("userdb is called");
  return new Promise(function(resolve,reject) {
    var user = {};
    user.username = username;
    user.email = email;
    user.password = '';
    user.name = name;
    user.profile_url = profile_url; 
     
    connection.query('INSERT INTO Users SET ?',user, function(err,result) {
       if(!err) {
         console.log("success saving user info",result);
         resolve(result);  
       } else {
         console.log("failure saving user info",err);
         reject(err); 
       }  
    })
  })  
};

module.exports = UserDb;
