var Promise = require('bluebird');
var commentDb = require('../lib/comment/comment');

var CommentService = {};

CommentService.createComment = function (post_id,comment,user_id) {
   console.log("save comment is called");
   return commentDb.create(post_id,comment,user_id)
};

CommentService.getComments = function (post_id) {
  return commentDb.getComments(post_id)
};

CommentService.upvotePost = function (post_id) {
  return commentDb.upvotePost(post_id)
};

CommentService.downvote = function (post_id) {
  return commentDb.downvote(post_id)
};  

module.exports = CommentService;

