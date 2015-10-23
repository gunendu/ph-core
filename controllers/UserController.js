var bluebird = require('bluebird');
var userService = require('../services/UserService');

var UserController = {};

UserController.saveUser = function(username,email,password,firstname) {
   return userService.save(username,email,password,firstname)  
};

module.exports = UserController;
