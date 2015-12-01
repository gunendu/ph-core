var Promise = require('bluebird');
var userdb = require('../lib/user/user');
bcrypt = require('bcrypt'),
fs = Promise.promisifyAll(require('fs')),
AWS = require('aws-sdk'),
imageSize = require('image-size'),
moment = require('moment'),
lwip = require('lwip'),
im = require("imagemagick"),
gm = require('gm'); 

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
                console.log("success putting in s3 bucket");
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
                this.filesSaved = {};
                var response = {
                    "url": url,
                    "fileName": "images/" + file.originalname,
                    "size": file.size
                }
                filesSaved["default"] = response;
                filesSaved["media_id"] = file.originalname.split('.')[0];
                return filesSaved;
            })
            .then(function(filesaved) {  
              return UserService.getImageSize(file.path)
            })  
	         .then(function (size) {
              this.size = size;
		          var newHeight = (size.height/size.width) * 192;
		          return UserService.lwipOpen(192,newHeight,file)		
	          })
            .then(function(cropImage) {
               return UserService.imageToBuffer(file,cropImage)  
            }) 
            .then(function (cropImage) {
                var thumbnailKey = "images/thumbnailKey" + file.filename;
                var thumbParams = {
                  "Key": thumbnailKey,
                  "ContentLength": cropImage.length,
                  "Body": cropImage,
                };
                return UserService.putInS3Bucket(thumbParams)
            })
            .then(function () {
                var aclParams = {
                    "Key": "images/thumbnailKey" + file.filename,
                    "Bucket": s3Bucket_name,
                    ACL: 'public-read'
                };
                return UserService.changeS3Acl(aclParams)
            })
            .then(function () {
                var urlParams = {
                    Bucket: s3Bucket_name,
                    Key: "images/thumbnailKey" + file.filename,
                };
                return UserService.getS3Url(urlParams)
            })
            .then(function (url) {
                var response = {
                    "url": url,
                    "fileName": "images/thumbnailKey" + file.originalname,
                    "size": file.size
                }
                filesSaved["thumbnail"] = response;
                filesSaved["media_id"] = file.originalname.split('.')[0];
                return filesSaved;
            })
            .then(function () {
                var newHeight = (size.height/size.width) * 500;
                return UserService.lwipOpen(500,newHeight,file)
            })
            .then(function(cropImage) {
               return UserService.imageToBuffer(file,cropImage)  
            }) 
            .then(function (cropImage) {
                var scaledKey = "images/scaledKey" + file.filename;
                var scaledParams = {
                  "Key": scaledKey,
                  "ContentLength": cropImage.length,
                  "Body": cropImage,
                };
                return UserService.putInS3Bucket(scaledParams)            
            })
            .then(function () {
                var aclParams = {
                    "Key": "images/scaledKey" + file.filename,
                    "Bucket": s3Bucket_name,
                    ACL: 'public-read'
                };
                return UserService.changeS3Acl(aclParams)
            })
            .then(function () {
                var urlParams = {
                    Bucket: s3Bucket_name,
                    Key: "images/scaledKey" + file.filename,
                };
                return UserService.getS3Url(urlParams)
            })
            .then(function (url) {
                var response = {
                    "url": url,
                    "fileName": "images/scaledKey" + file.originalname,
                    "size": file.size
                }
                console.log("response is",response); 
                filesSaved["scaled"] = response;
                filesSaved["media_id"] = file.originalname.split('.')[0];
                resolve(filesSaved);
            }) 
            .catch(function(e) {
                console.log("error in thumbnail",e.stack);
            })
    })  
};

UserService.getImageSize = function (filename) {
  console.log("image filename is",filename);
  return new Promise(function(resolve,reject) {
    imageSize(filename,function(err,size) {
      if(!err) {
        console.log("size is",size.height);
   	    resolve(size); 
      } else {
        console.log("error is",err);
	      reject(err);
      }	 
    })  
  });  
};

UserService.imageToBuffer = function (file, image) {
    var fileName = file.originalname;
    var splitfileName = fileName.split(".");
    return new Promise(function (resolve, reject) {
        image.toBuffer(splitfileName[(splitfileName.length - 1)], function (err, buffer) {
            if (!err) {
                resolve(buffer);
            } else {
                reject();
            }
        });
    })
};

UserService.lwipOpen = function (width,height,file) {
    return new Promise(function (resolve, reject) {
	    lwip.open(file.path,function(err,image) {
      console.log("err image",err,image);  
	    if(!err) {
	    image.resize(width,height,"lanczos",function(err,scaledimage) {
	      if(!err) {
          console.log("scaled image",scaledimage);
		      resolve(scaledimage);
	      } else {
          console.log("error scaling image",err);
		      reject(err);
	      }
	    })
	  } else {
       console.log("error scaling",err);
	     reject(err);
	  }
	  }) 
    });
};

UserService.imageResize = function (width,height,path) {
  return new Promise(function(resolve,reject) {
     im.crop({"width": width,
               "height": height,
               "srcData":fs.readFileSync(path,'binary')
     },function(err,stdout,stderr) {
       if(!err) {
         console.log("imageResize complete",err);
         resolve(stdout);
       }
       else {
         console.log("imageResize error"); 
       }  
     });    
  }) 
};  

UserService.getUserUpvotedPost = function(userid) {
  return userdb.getUserUpvotedPost(userid)    
};  

module.exports = UserService;
