var Promise = require('bluebird');
var postDb = require('../lib/post/post');
var _ = require('underscore');

var PostService = {};

PostService.createPost = function (user_id,product_name,title,url,image_urls) {
   console.log("save post is called",image_urls);
    var post = {};
    post.product_name = product_name;
    post.title = title;
    post.url = url;
    post.image_url = image_urls;
    post.user_id = user_id;
    var created_at = new Date().getTime();
    var updated_at = new Date().getTime();
    created_at =  moment(created_at).format('YYYY-MM-DD HH:mm:ss');
    var updated_at = moment(updated_at).format('YYYY-MM-DD HH:mm:ss');
    post.created_at = created_at;
    post.updated_at = updated_at;
    return postDb.create(post)
};

PostService.getPosts = function () {
  return postDb.get()
    .then(function(results) {
       console.log("results length",results,results.length);
       for(var i=0;i<results.length;i++) {
          results[i].image_url = JSON.parse(JSON.parse(JSON.stringify(results[i].image_url)));
       }
       console.log("before results");
       return results;  
    })   
};

PostService.getUserVotedPost = function (userid,posts) {
  console.log("getUserUpvotedPost is called");
  return postDb.getUserVotedPost(userid)
    .then(function(result) {
      var mergedlist = _.map(posts,function(item) {
         return _.extend(item, _.findWhere(result,{post_id: item.id})) 
      });
      console.log("merged list is",mergedlist);
      return mergedlist;      
    })  
};  

PostService.upvotePost = function (user_id,post_id) {
  var data = {};
  data.user_id = user_id;
  data.post_id = post_id;
  data.flag = 1;
  var created_at = new Date().getTime();
  var updated_at = new Date().getTime();
  created_at =  moment(created_at).format('YYYY-MM-DD HH:mm:ss');
  updated_at = moment(updated_at).format('YYYY-MM-DD HH:mm:ss');
  data.created_at = created_at;
  data.updated_at = updated_at;
  return postDb.votePost(data)
};

PostService.downvotePost = function (user_id,post_id) {
  console.log("downvote is called",user_id,post_id);
  var data = {};
  data.user_id = user_id;
  data.post_id = post_id;
  data.flag = 0;
  var created_at = new Date().getTime();
  var updated_at = new Date().getTime();
  created_at =  moment(created_at).format('YYYY-MM-DD HH:mm:ss');
  updated_at = moment(updated_at).format('YYYY-MM-DD HH:mm:ss');
  data.created_at = created_at;
  data.updated_at = updated_at;  
  return postDb.downvote(user_id,post_id)
};  

module.exports = PostService;

