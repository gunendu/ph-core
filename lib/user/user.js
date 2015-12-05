var Promise = require('bluebird'); 
var connection = require('../mysql');

var UserDb = {};

UserDb.create = function(username,email,name,profile_url,created_at,updated_at) {
  console.log("userdb is called");
  return new Promise(function(resolve,reject) {
    var user = {};
    user.username = username;
    user.email = email;
    user.password = '';
    user.name = name;
    user.profile_url = profile_url;
    user.created_at = created_at;
    user.updated_at = updated_at; 
     
    connection.query('INSERT INTO Users SET ? ON DUPLICATE KEY UPDATE name=VALUES(name)',user, function(err,result) {
       if(!err) {
         console.log("success saving user info",result);
         resolve(result);  
       } else {
         console.log("failure saving user info",err);
         reject(err); 
       }  
    })
  })  
};

UserDb.getUserUpvotedPost = function(userid) {
  console.log("userid",userid);
  return new Promise(function(resolve,reject) {
     connection.query('SELECT count(*) as vote,p.title,p.id,p.image_url,p.url from post p join votepost vp on p.id=vp.post_id and vp.flag=1 and vp.user_id=? group by p.id',userid,function(err,rows) {
        if(!err) {
          console.log("rows are",rows);
          resolve(rows);
        } else {
          reject(err);
        }  
     })     
  }) 
};  

module.exports = UserDb;
