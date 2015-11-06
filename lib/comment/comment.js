var Promise = require('bluebird');
var connection = require('../mysql');

var CommentDb = {};

CommentDb.create = function(data) {
  console.log("postDb is called");
  return new Promise(function(resolve,reject) {
 
    connection.query('INSERT INTO Comment SET ?',data, function(err,result) {
       if(!err) {
         console.log("Success saving comment info");
         resolve(result);  
       } else {
         console.log("Error saving comment info",err);
         reject(err); 
       }  
    })
  })  
};

CommentDb.getComments = function(post_id) {
  return new Promise(function(resolve,reject) {
    connection.query('SELECT u.name,u2.name as reply_name,c.comment,c.id,r.reply,r.id as reply_id from Comment c INNER JOIN Users u on c.user_id=u.id LEFT JOIN reply r on c.id = r.comment_id JOIN Users u2 ON r.user_id=u2.id where c.post_id = ?',post_id,function(err,result) {
      if(!err) {
        console.log("getComments ",result);
        resolve(result); 
      } else {
        console.log("error getComments",err);
        reject(err);
      }  
    }) 
  }) 
};

CommentDb.voteComment = function(data) {
  return new Promise(function(resolve,reject) {
    connection.query('INSERT INTO votecomment SET ?',data,function(err,result) {
       if(!err) {
         resolve(result); 
       } else {
         console.log("Upvote Comment Error",err);
         reject(err);
       }   
    })  
  });  
};  

CommentDb.getCommentsVote = function(post_id) {
  return new Promise(function(resolve,reject) {
    connection.query('select count(*) as commentcount,c.id from Comment c inner join votecomment vc on c.id = vc.comment_id where c.post_id=? and vc.flag=1 group by vc.comment_id',post_id,function(err,result) {
      if(!err) {
        resolve(result);
      } else {
        reject(err);
      }  
    })     
  })  
};  

module.exports = CommentDb;
