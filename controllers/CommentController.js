var Promise = require('bluebird');
var commentService = require('../services/CommentService');

var CommentController = {};

CommentController.create = function(post_id,comment) {
  return commentService.createPost(post_id,comment);      
};

CommentController.getComments= function(post_id) {
  return commentService.getComments(post_id);
};

CommentController.votePosts = function(post_id) {
  return commentService.upvotePost(post_id) 
};

CommentController.downvote = function(post_id) {
  return commentService.downvote(post_id)
};  

module.exports = CommentController;
