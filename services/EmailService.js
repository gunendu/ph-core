var config = require('ph_config').core;
var mailgun = require('mailgun-js')({apiKey: config.mailgun.api_key,domain: config.mailgun.domain});
var Promise = require('bluebird');

var emailService = {};

emailService.sendEmail = function(email) {
      var data = {
        from: 'Excited User <mailgun@sandbox71f1d350c2a546d6b3bba7de67e09ed4.mailgun.org>',
        to: email,
        subject: 'Startup Hunt',
        text: 'test mail' 
      };
      mailgun.messages().send(data,function(err,body) {
        console.log("er and body",err,body);
      }) 
};  

module.exports = emailService;
