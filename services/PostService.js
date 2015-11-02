var Promise = require('bluebird');
var postDb = require('../lib/post/post');

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
       return results;  
    })
    .catch(function(e) {
       console.log("error stack",e.stack); 
    })    
   
};

PostService.upvotePost = function (post_id) {
  return postDb.upvotePost(post_id)
};

PostService.downvote = function (post_id) {
  return postDb.downvote(post_id)
};  

module.exports = PostService;

