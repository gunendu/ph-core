var Promise = require('bluebird');
var postDb = require('../lib/post/post');

var PostService = {};

PostService.createPost = function (title,url,image_url) {
   console.log("save post is called",image_url);
   return postDb.create(title,url,image_url)
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

