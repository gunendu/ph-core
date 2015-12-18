var Horntell = require('horntell');
var request = require('request');
var Promise = require('bluebird');
var config = require('ph_config').core;
console.log("ley and secret",config.horntell.hornokpleasekey,config.horntell.hornokpleasesecret);
Horntell.app.init(config.horntell.hornokpleasekey, config.horntell.hornokpleasesecret);

var NotificationService = {};

NotificationService.createProfile = function(username,name,result) {
  return new Promise(function(resolve,reject) {
    var hash = Horntell.app.hash(username);
    var auth = 'Basic ' + new Buffer(config.horntell.hornokpleasekey+ ':' + config.horntell.hornokpleasesecret).toString('base64');
    var data = {
      uid: hash,
      first_name: name,
      email: username
    };
    request.post({
      url: "https://api.horntell.com/profiles",
      headers: {
        "Accept": "application/vnd.horntell.v1+json",
        "Content-type": "application/json",
        "Authorization": auth
      },  
      body: data,
      json : true
     },function(error,response,body) {
        if(!error) {
          console.log("response is",error,response.body);
          result.hash = hash;
          resolve(result) 
        } else {
          console.log("error creating profile",error);
          result.hash = hash;
          resolve(result);
        }     
    })   
  })  
};

/*NotificationService.createHorns = function(hash) {
  return new Promise(function(resolve,reject) {
    var auth = 'Basic ' + new Buffer(config.horntell.hornokpleasekey+ ':' + config.horntell.hornokpleasesecret).toString('base64');
    var data = {
      format: 'simple',
      type: 'info',
      bubble: true,
      text: 'Welcome campaign was fired.'
    };
    request.post({
      url: "https://api.horntell.com/profiles/"+hash+"/horns",
      headers: {
         "Accept": "application/vnd.horntell.v1+json",
         "Content-type": "application/json",
         "Authorization": auth
      },
      body: data,
      json: true
    },function(err,response,body) {
        if(!err) {
          console.log("createHorns is",response.body,err);
        } else {
          console.log("error creating horns",err);
        }  
    })  
  })  
};*/

NotificationService.createHorns = function(hash) {
    console.log("createHorns is called",hash);
    Horntell.horn.toProfile(hash,{
      format: 'link',
      type: 'info',
      bubble: true,
      text: 'Welcome campaign was fired.',
      link: 'http://startuphunts.com',
      new_window: true 
    }).then(successCallback,errorCallback) 
};

var successCallback = function(response) {
  console.log("response is",response); 
};

var errorCallback = function(error) {
  console.log("error creating horns",error);
};  

/*NotificationService.getProfile = function(hash) {
  return new Promise(function(resolve,reject) {
    var auth = 'Basic ' + new Buffer(config.horntell.hornokpleasekey+ ':' + config.horntell.hornokpleasesecret).toString('base64');
    request.get({
      url: "https://api.horntell.com/profiles/75e633ef22a14df74e5618cbf681ffa257c084b81074ffb692e73417218c2ce1",
      headers: {
        "Accept": "application/vnd.horntell.v1+json",
        "Authorization": auth
      }
    },function(error,response,body) {
          if(!error) {
            console.log("response is",error,response.body); 
          } else {
            console.log("body",body);
          }          
     })           
    })  
};*/

NotificationService.getProfile = function(hash) {
  Horntell.profile.find(hash)
  .then(successCallback,errorCallback)
};  

var error = function(error) {
      if(error instanceof Horntell.errors.ForbiddenError) {
                /* you were successfully authenticated but not allowed to do what you were trying to do.*/
                console.log("ForbiddenError");
      } else if(error instanceof Horntell.errors.NotFoundError) {
              /* the resource you wanted to work with was not found. eg. creating horn for a profile that doesn't exist.*/
              console.log("NotFoundError");
      } else if(error instanceof Horntell.errors.AuthenticationError) {
              console.log("authentication error");
      } else if(error instanceof Horntell.errors.ServiceError) {
              console.log("ServiceError");
      } else if(error instanceof Horntell.errors.NetworkError) {
              console.log("NetworkError");
      } else if(error instanceof Horntell.errors.Error) {
              console.log("errors");
      }     
        
}

module.exports = NotificationService;


