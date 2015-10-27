var Promise = require('bluebird');
var userService = require('../services/UserService');
var userdb = require('../lib/user/user');

var UserController = {};

UserController.saveUser = function(username,email,name,id) {
   console.log("save user is called",userService);
   return userService.saveUser(username,email,name,id)
     .then(function() {
        console.log("after save");
        return;
     })
     .catch(function(e) {
        console.log(e.stack);
     })  
};

module.exports = UserController;
