var Promise = require('bluebird');
var userService = require('../services/UserService');
var userdb = require('../lib/user/user');

var UserController = {};

UserController.saveUser = function(username,email,password,firstname) {
   console.log("save user is called",userService);
   return userService.saveUser(username,email,password,firstname)
     .then(function() {
        console.log("after save");
        return;
     })
     .catch(function(e) {
        console.log(e.stack);
     })  
};

module.exports = UserController;
