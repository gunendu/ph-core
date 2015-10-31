var Promise = require('bluebird');
var postService = require('../services/PostService');
var userService = require('../services/UserService');

var PostController = {};

PostController.create = function(title,url,file) {
  console.log("title url",title,url);
  return userService.uploadToS3(file)
   .then(function(result) {
      console.log("image url",result.default.url);
      postService.createPost(title,url,result.default.url)
   }) 
};

PostController.getPosts = function() {
  return postService.getPosts();
};

PostController.votePosts = function(post_id) {
  return postService.upvotePost(post_id) 
};

PostController.downvote = function(post_id) {
  return postService.downvote(post_id)
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
