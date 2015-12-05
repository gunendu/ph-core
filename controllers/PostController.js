var Promise = require('bluebird');
var postService = require('../services/PostService');
var userService = require('../services/UserService');
var _  = require('underscore');
var mapSeries = require('promise-map-series')

var PostController = {};

PostController.create = function(user_id,product_name,title,url,files) {
  console.log("title url",title,url);
  return mapSeries(files,function(file) {
     console.log("first iteration");
     return userService.uploadToS3(file)     
  })
  .then(function(results) {
     console.log("results",results);
     image_urls = JSON.stringify(results);
     return postService.createPost(user_id,product_name,title,url,image_urls);     
  })
};

PostController.getPosts = function(userid) {
  return postService.getPosts()
    .then(function(results) {
       console.log("before getUser upvoted post");
       return postService.getUserVotedPost(userid,results) 
    })
};

PostController.votePosts = function(user_id,post_id) {
  return postService.upvotePost(user_id,post_id) 
};

PostController.downvote = function(user_id,post_id) {
  console.log("downvote is called");
  return postService.downvotePost(user_id,post_id)
};

PostController.uploadImage = function(file) {
  return userService.uploadToS3(file)
    .then(function(result) {
       postService.createPost(result)   
    })  
    .catch(function(e) {
      console.log("updateImage error",e.stack);
    })  
}; 

module.exports = PostController;
