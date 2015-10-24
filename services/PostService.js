var Promise = require('bluebird');
var postDb = require('../lib/post/post');

var PostService = {};

PostService.createPost = function (title,url) {
   console.log("save post is called");
   return postDb.create(title,url)
};

module.exports = PostService;

