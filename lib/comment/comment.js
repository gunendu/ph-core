var Promise = require('bluebird');
var connection = require('../mysql');

var CommentDb = {};

CommentDb.create = function(data) {
  console.log("postDb is called");
  return new Promise(function(resolve,reject) {
 
    connection.query('INSERT INTO comment SET ?',data, function(err,result) {
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
    console.log("post_id is",post_id);
    connection.query('SELECT u.name,u.profile_url as profile_image,u.id as userid,u2.name as reply_name,u2.profile_url,u2.id as ruserid,c.comment,c.id,r.reply,r.id as reply_id FROM comment c INNER JOIN Users u on c.user_id=u.id LEFT JOIN reply r on c.id = r.comment_id LEFT JOIN Users u2 ON r.user_id=u2.id where c.post_id = ?',post_id,function(err,result) {
      if(!err) {
        console.log("get comemnts with reply",JSON.stringify(result));
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
    connection.query('INSERT INTO votecomment SET ? ON DUPLICATE KEY UPDATE flag=VALUES(flag)',data,function(err,result) {
       if(!err) {
         resolve(result); 
       } else {
         console.log("Upvote Comment Error",err);
         reject(err);
       }   
    })  
  });  
};

CommentDb.downVoteComment = function(user_id,comment_id) {
  console.log("downvote is called");
  var data = {};
  data.user_id = user_id;
  data.comment_id = comment_id;
  console.log("data is",data);
  return new Promise(function(resolve,reject) {
    connection.query('UPDATE votecomment SET flag = 0 WHERE user_id = ? AND comment_id = ?',[user_id,comment_id],function(err,rows) {
      if(!err) {
        resolve(rows);
      } else {
        console.log("Error DownVote Post",err);
        reject(err);
      }
    })  
  })  
};

CommentDb.getCommentsVote = function(post_id) {
  return new Promise(function(resolve,reject) {
    connection.query('SELECT count(*) AS votecount,c.id,vc.flag FROM comment c LEFT JOIN votecomment vc on vc.comment_id = c.id WHERE c.post_id=? AND vc.flag=1 group by c.id',post_id,function(err,result) {
      if(!err) {
        resolve(result);
      } else {
        reject(err);
      }  
    })     
  })  
};

CommentDb.getReplyVote = function(reply_id,comment_id) {
  return new Promise(function(resolve,reject) {
    connection.query('SELECT count(*) AS replycount,r.id,vr.flag FROM reply r LEFT JOIN votereply vr on vr.reply_id = r.id WHERE r.comment_id=? AND vr.flag=1 group by r.id',comment_id,function(err,result) {
      if(!err) {
        resolve(result)
      } else {
        reject(err);
      }   
    })
  })  
};  

CommentDb.voteReply = function(data) {
  return new Promise(function(resolve,reject) {
    connection.query('INSERT INTO votereply SET ? ON DUPLICATE KEY UPDATE flag=VALUES(flag)',data,function(err,result) {
      if(!err) {
        console.log("success votereply");
        resolve(result);
      } else {
        console.log("error votereply",err);
        reject(err);
      }
    })  
  }) 
};  

module.exports = CommentDb;
