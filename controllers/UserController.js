var Promise = require('bluebird');
var userService = require('../services/UserService');
var userdb = require('../lib/user/user');

var UserController = {};

UserController.saveUser = function(username,email,name,profile_url) {
   console.log("save user is called",userService);
   return userService.saveUser(username,email,name,profile_url)
     .then(function(result) {
        console.log("after save",result);
        return result;
     })
     .catch(function(e) {
        console.log(e.stack);
     })  
};

UserController.getUserUpvotedPost = function(userid) {
  return userService.getUserUpvotedPost(userid) 
};  

module.exports = UserController;
