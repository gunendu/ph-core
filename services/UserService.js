var Promise = require('bluebird');
var userdb = require('../lib/user/user');
bcrypt = require('bcrypt');

var UserService = {};

UserService.saveUser = function (username,email,name,id) {
   console.log("save user service");
   return userdb.create(username,email,name,id)
};

function getHashedPassword(password) {
  return new Promise(function(resolve,reject) {
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, function (err, hash) {
       resolve(hash);
      });
    });
  }) 
}  

module.exports = UserService;
