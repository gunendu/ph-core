var Promise = require('bluebird');
var commentService = require('../services/CommentService');

var CommentController = {};

CommentController.create = function(post_id,comment,user_id) {
  return commentService.createComment(post_id,comment,user_id);      
};

CommentController.getComments= function(post_id) {
  return commentService.getComments(post_id)
    .then(function(response) {
       return commentService.getCommentsVote(post_id,response);       
    })
    .then(function(response) {
       return commentService.getPostImages(post_id,response)
    })
    .then(function(response) {
       return commentService.userVotedPost(post_id,response) 
    })  
};

CommentController.votePosts = function(post_id) {
  return commentService.upvotePost(post_id) 
};

CommentController.downvote = function(post_id) {
  return commentService.downvote(post_id)
};

CommentController.saveReply = function(comment_id,reply,user_id) {
  return commentService.saveReply(comment_id,reply,user_id)
};

CommentController.voteComment = function(user_id,comment_id) {
  return commentService.voteComment(user_id,comment_id);
};

CommentController.downVote = function(user_id,comment_id) {
  return commentService.downVoteComment(user_id,comment_id);
};

CommentController.voteReply = function (user_id,comment_id,reply_id) {
  return commentService.voteReply(user_id,comment_id,reply_id)
}; 

module.exports = CommentController;
