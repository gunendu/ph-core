var Promise = require('bluebird');
var userService = require('../services/UserService');
var notificationservice = require('../services/NotificationService');
var userdb = require('../lib/user/user');
var _ = require('underscore');
var Horntell = require('horntell');

var UserController = {};

UserController.saveUser = function(username,email,name,profile_url) {
   console.log("save user is called",userService);
   var hash = Horntell.app.hash(username);
   return userService.saveUser(username,email,name,profile_url,hash)
     .then(function(result) {
        return notificationservice.createProfile(hash,username,name,result)        
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
