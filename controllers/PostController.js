var Promise = require('bluebird');
var postService = require('../services/PostService');

var PostController = {};

PostController.create = function(title,url) {
  return postService.createPost(title,url);      
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

module.exports = PostController;
