var Promise = require('bluebird');
var connection = require('../mysql');

var PostDb = {};

PostDb.create = function(title,url) {
  console.log("postDb is called");
  return new Promise(function(resolve,reject) {
    var post = {};
    post.title = title;
    post.url = url;
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

module.exports = PostDb;

