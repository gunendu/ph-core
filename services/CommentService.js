var Promise = require('bluebird');
var commentDb = require('../lib/comment/comment');

var CommentService = {};

CommentService.createComment = function (post_id,comment,user_id) {
    console.log("save comment is called");
    var data = {};
    data.post_id = post_id;
    data.comment = comment;
    data.user_id = user_id;
    var created_at = new Date().getTime();
    created_at =  moment(created_at).format('YYYY-MM-DD HH:mm:ss');
    var updated_at = moment(updated_at).format('YYYY-MM-DD HH:mm:ss');
    data.created_at = created_at;
    data.updated_at = updated_at;
    
    return commentDb.create(data)
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

