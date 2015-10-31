var Promise = require('bluebird');
var connection = require('../mysql');

var PostDb = {};

PostDb.create = function(title,url,image_url) {
  console.log("postDb is called");
  return new Promise(function(resolve,reject) {
    var post = {};
    post.title = title;
    post.url = url;
    post.image_url = image_url;
    post.user_id = '1';

    console.log("post is",post);
     
    connection.query('INSERT INTO Post SET ?',post, function(err,result) {
       if(!err) {
         console.log("Success saving user info");
         resolve(result);  
       } else {
         console.log("Error saving user info",err);
         reject(err); 
       }  
    })
  })  
};

PostDb.get = function() {
  return new Promise(function(resolve,reject) {
    connection.query('SELECT * from Post WHERE user_id = ?', '1', function(err,rows) {
      if(!err) {
        console.log("get posts success",rows);
        resolve(rows);
      } else {
        console.log("get posts failure",err);
        reject(err);
      }  
    })    
  })  
};

PostDb.upvotePost = function(post_id) {
  return new Promise(function(resolve,reject) {
    connection.query('UPDATE Post SET vote = vote + 1 WHERE id = ?',post_id,function(err,rows) {
      if(!err) {
        resolve(rows);
      } else {
        reject(err);
      }
    })  
  })  
};

PostDb.downvote= function(post_id) {
  return new Promise(function(resolve,reject) {
    connection.query('UPDATE Post SET vote = vote - 1 WHERE id = ?',post_id,function(err,rows) {
      if(!err) {
        resolve(rows);
      } else {
        reject(err);
      }
    })  
  })  
};  

module.exports = PostDb;

