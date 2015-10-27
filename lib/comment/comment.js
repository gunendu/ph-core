var Promise = require('bluebird');
var connection = require('../mysql');

var CommentDb = {};

CommentDb.create = function(post_id,comment) {
  console.log("postDb is called");
  return new Promise(function(resolve,reject) {
    var data = {};
    data.post_id = post_id;
    data.comment = comment;
    data.user_id = '1';
 
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
    connection.query('SELECT * from Comment WHERE post_id = ?',post_id,function(err,result) {
      if(!err) {
        console.log("getComments ",result);
        resolve(result); 
      } else {
        reject(err);
      }  
    }) 
  }) 
};

module.exports = CommentDb;
