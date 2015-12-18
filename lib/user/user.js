var Promise = require('bluebird'); 
var connection = require('../mysql');

var UserDb = {};

UserDb.create = function(username,email,name,profile_url,created_at,updated_at,hash) {
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
 
    connection.query('INSERT INTO Users SET ? ON DUPLICATE KEY UPDATE id=LAST_INSERT_ID(id)',user, function(err,result) {
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

UserDb.updateUser = function(result) {
  return new Promise(function(resolve,reject) {
    var query = {'uid': result.hash};
    var condition = {'id':result.insertId};
    connection.query('UPDATE Users SET ? WHERE ?',[query,condition],function(err,response) {
      if(!err) {
        resolve(result);
      } else {
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

UserDb.getUserNames = function(prefix) {
  return new Promise(function(resolve,reject) {
    connection.query('SELECT name FROM Users WHERE name LIKE ?','%' +prefix+ '%',function(err,rows) {
      if(!err) {
        console.log("rows are",rows);
        resolve(rows);
      } else {
        reject(err);
      }  
    })  
  })  
};

UserDb.getNames = function(names) {
  console.log("users are",names);
  names.push('Gunendu Das');
  return new Promise(function(resolve,reject) {
    connection.query('SELECT username,uid FROM Users WHERE name IN ( ? )',names,function(err,rows) {
      if(!err) {
        console.log("rows are",rows);
        resolve(rows)
      } else {
        console.log("error get names",err);
        reject(err);
      }   
    })  
  })  
};  

module.exports = UserDb;
