var Promise = require('bluebird');
var connection = require('../mysql');

var PostDb = {};

PostDb.create = function(post) {
  console.log("postDb is called");
  return new Promise(function(resolve,reject) {
     
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

PostDb.votePost = function(data) {
  return new Promise(function(resolve,reject) {
    connection.query('INSERT INTO votepost SET ? ON DUPLICATE KEY UPDATE flag=VALUES(flag)',data,function(err,result) {
       if(!err) {
         resolve(result); 
       } else {
         console.log("Upvote Post Error",err);
         reject(err);
       }   
    })  
  });  
};  

PostDb.get = function() {
  return new Promise(function(resolve,reject) {
    connection.query('SELECT count(distinct vp.post_id) as vote,count(distinct c.id) as commentcount,p.title,p.id,p.url,p.image_url,p.product_name,p.user_id from post p left join votepost vp on p.id=vp.post_id and vp.flag=1 LEFT JOIN comment c ON p.id=c.post_id group by p.id', function(err,rows) {
      if(!err) {
        resolve(rows);
      } else {
        console.log("get posts failure",err);
        reject(err);
      }  
    })    
  })  
};

PostDb.getUserVotedPost = function(userid) {
  return new Promise(function(resolve,reject) {
    connection.query('SELECT post_id,flag from votepost where user_id = ?',userid,function(err,res) {
      if(!err) {
        console.log("rows are",res);
        resolve(res);
      } else {
        reject(err);
      }     
    }) 
  }) 
};  

PostDb.downvote= function(user_id,post_id) {
  console.log("downvote is called");
  var data = {};
  data.user_id = user_id;
  data.post_id = post_id;
  return new Promise(function(resolve,reject) {
    connection.query('UPDATE votepost SET flag = 0 WHERE user_id = ? AND post_id = ?',[user_id,post_id],function(err,rows) {
      if(!err) {
        resolve(rows);
      } else {
        console.log("Error DownVote Post",err);
        reject(err);
      }
    })  
  })  
};

PostDb.getPostImages = function(post_id) {
  return new Promise(function(resolve,reject) {
    connection.query('SELECT image_url from post where id = ?',post_id,function(err,res) {
      if(!err) {
        console.log("post images",res[0]);
        resolve(res);
      } else {
        console.log("error is",err);
        reject(err);
      }  
    })  
  })   
};  

module.exports = PostDb;

