var Promise = require('bluebird');
var postDb = require('../lib/post/post');

var PostService = {};

PostService.createPost = function (user_id,product_name,title,url,image_urls) {
   console.log("save post is called",image_urls);
   return postDb.create(user_id,product_name,title,url,image_urls)
};

PostService.getPosts = function () {
  return postDb.get()
};

PostService.upvotePost = function (post_id) {
  return postDb.upvotePost(post_id)
};

PostService.downvote = function (post_id) {
  return postDb.downvote(post_id)
};  

module.exports = PostService;

