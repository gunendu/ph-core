var bluebird = require('bluebird');
var userdb = require('../lib/user/user');
bcrypt = require('bcrypt');

var UserService = {};

UserService.save = function(username,email,password,firstname) {
   var hash = getHashedPassword(password);
   return userdb.save(username,email,hash,firstname)
};

function getHashedPassword(password) {
   bcrypt.genSalt(10, function (err, salt) {
     bcrypt.hash(password, salt, function (err, hash) {
       resolve(hash);
     });
   });
}  

exports.module = UserService;
