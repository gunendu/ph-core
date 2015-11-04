var Promise = require('bluebird');
var commentDb = require('../lib/comment/comment');
var replyDb = require('../lib/reply/reply');
var _ = require('underscore');

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
  var uniqComments;
  var commentsArray = [];
  return commentDb.getComments(post_id)
    .then(function(response) {
       uniqComments = _.uniq(response,function(item,key,id) {
         return item.id;
       });
       _.each(uniqComments,function(uniq) {
        var replyresponse = _.map(response,function(res) {
            if(res.id == uniq.id) {
              var reply =  _.pick(res,'reply','reply_id','reply_name');
              var replyfilter = _.pick(reply,function(res) {
                 return !(_.isNull(res))
              });
              return replyfilter;  
            } else {
              return {};
            }  
        })
        var comment = {};
        var commentDetails = _.pick(uniq,'comment','id','name');
        comment.comment = commentDetails;
        comment.reply = replyresponse;
        commentsArray.push(comment); 
        console.log("replyresponse",JSON.stringify(commentsArray[1]));
       })  
      return commentsArray;       
    }) 
 };

CommentService.upvotePost = function (post_id) {
  return commentDb.upvotePost(post_id)
};

CommentService.downvote = function (post_id) {
  return commentDb.downvote(post_id)
};

CommentService.saveReply = function (comment_id,reply,user_id) {
  var data = {};
  data.comment_id = comment_id;
  data.reply = reply;
  data.user_id = user_id;
  var created_at = new Date().getTime();
  created_at =  moment(created_at).format('YYYY-MM-DD HH:mm:ss');
  var updated_at = moment(updated_at).format('YYYY-MM-DD HH:mm:ss');
  data.created_at = created_at;
  data.updated_at = updated_at;
  
  return replyDb.create(data);  
};

module.exports = CommentService;

