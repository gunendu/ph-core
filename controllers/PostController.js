var Promise = require('bluebird');
var postService = require('../services/PostService');

var PostController = {};

PostController.create = function(title,url) {
  return postService.createPost(title,url);      
};

PostController.getPosts = function() {
  return postService.getPosts();
};  

module.exports = PostController;
