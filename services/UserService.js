var Promise = require('bluebird');
var userdb = require('../lib/user/user');
bcrypt = require('bcrypt'),
fs = Promise.promisifyAll(require('fs')),
AWS = require('aws-sdk'),
lwip = require('lwip');
moment = require('moment');

AWS.config.loadFromPath('./aws-credentials.json');

var s3Bucket_name = "staging-zipprmedia";
var s3Bucket = new AWS.S3({
    params: {
        Bucket: s3Bucket_name
    }
});

var UserService = {};

UserService.saveUser = function (username,email,name,id) {
   var created_at = new Date().getTime();
   created_at =  moment(created_at).format('YYYY-MM-DD HH:mm:ss');
   var updated_at = moment(updated_at).format('YYYY-MM-DD HH:mm:ss');
   return userdb.create(username,email,name,id,created_at,updated_at)
};

function getHashedPassword(password) {
  return new Promise(function(resolve,reject) {
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, function (err, hash) {
       resolve(hash);
      });
    });
  }) 
}

UserService.readFile = function (file) {
    return new Promise(function (resolve, reject) {
        fs.readFileAsync(file.path)
            .then(function (data) {
                console.log("data is",data);
                resolve(data);
            })
    });
};

UserService.putInS3Bucket = function (params) {
    return new Promise(function (resolve, reject) {
        s3Bucket.putObject(params, function (err, data) {
            if (!err) {
                resolve();
            } else {
		            console.log("putInS3Bucket fail",err);
                reject(err);
            }
        });
    });
};

UserService.changeS3Acl = function (aclParams) {
    return new Promise(function (resolve, reject) {
        s3Bucket.putObjectAcl(aclParams, function (err, data) {
            if (!err) {
                console.log("data is", data);
                resolve();
            } else {
                reject();
            }
        });
    });
};

UserService.getS3Url = function (urlParams) {
    return new Promise(function (resolve, reject) {
        s3Bucket.getSignedUrl('getObject', urlParams, function (err, url) {
            if (!err) {
                var splitUrl = url.split("?");
                console.log("splitUrl is", splitUrl[0]);
                resolve(splitUrl[0]);
            } else {
                reject();
            }
        })
    });
};


UserService.uploadToS3 = function (file) {
    return new Promise(function (resolve, reject) {
        return UserService.readFile(file)
            .then(function (data) {
                return fs.createReadStream(file.path)
            })
            .then(function (bodyStream) {
                var params = {
                    "Key": "images/" + file.originalname,
                    "ContentLength": file.size,
                    "Body": bodyStream
                };
                return UserService.putInS3Bucket(params);
            })
            .then(function () {
                var aclParams = {
                    "Key": "images/" + file.originalname,
                    "Bucket": s3Bucket_name,
                    ACL: 'public-read'
                };
                return UserService.changeS3Acl(aclParams)
            })
            .then(function () {
                var urlParams = {
                    Bucket: s3Bucket_name,
                    Key: "images/" + file.originalname,
                };
                return UserService.getS3Url(urlParams)
            })
            .then(function (url) {
                var filesSaved = {};
                var response = {
                    "url": url,
                    "fileName": "images/" + file.originalname,
                    "size": file.size
                }
                filesSaved["default"] = response;
                filesSaved["media_id"] = file.originalname.split('.')[0];
                resolve(filesSaved);
            })
            .catch(function (err) {
                reject("upload to s3 failed", err.stack);
            })

    });
};

UserService.getUserUpvotedPost = function(userid) {
  return userdb.getUserUpvotedPost(userid)    
};  

module.exports = UserService;
