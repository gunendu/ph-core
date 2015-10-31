var Promise = require('bluebird');
var userdb = require('../lib/user/user');
bcrypt = require('bcrypt'),
fs = Promise.promisifyAll(require('fs')),
AWS = require('aws-sdk'),
lwip = require('lwip');

AWS.config.loadFromPath('./aws-credentials.json');

var s3Bucket_name = "staging-zipprmedia";
var s3Bucket = new AWS.S3({
    params: {
        Bucket: s3Bucket_name
    }
});

var UserService = {};

UserService.saveUser = function (username,email,name,id) {
   console.log("save user service");
   return userdb.create(username,email,name,id)
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
                this.fileKey = "images/" + file.originalname;
                this.params = {
                    "Key": this.fileKey,
                    "ContentLength": file.size,
                    "Body": bodyStream
                };
                return;
            })
            .then(function () {
                return UserService.putInS3Bucket(params)
            })
            .then(function () {
                var aclParams = {
                    "Key": this.fileKey,
                    "Bucket": s3Bucket_name,
                    ACL: 'public-read'
                };
                return UserService.changeS3Acl(aclParams)
            })
            .then(function () {
                var urlParams = {
                    Bucket: s3Bucket_name,
                    Key: fileKey
                };
                return UserService.getS3Url(urlParams)
            })
            .then(function (url) {
                var filesSaved = {};
                var response = {
                    "url": url,
                    "fileName": this.fileKey,
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

module.exports = UserService;
