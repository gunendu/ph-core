var Promise = require('bluebird');
var userService = require('../services/UserService');
var userdb = require('../lib/user/user');
var _ = require('underscore');

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

UserController.getUserNames = function(prefix) {
  return userdb.getUserNames(prefix)
    .then(function(users) {
       var response = {};
       response.users = users;
       return response;    
    })  
};  

module.exports = UserController;
