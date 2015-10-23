var BaseErrors = require('./base');

var ControllerError = BaseErrors.ControllerError;

var UserSegmentsError = function (message) {
  ControllerError.call(this, message, UserSegmentsError)
};

UserSegmentsError.prototype = Object.create(Error.prototype);
                        
var UserSegmentAlreadyExist = function (message) {
  UserSegmentsError.call(this, "Zippr Group EXist"+ message , UserSegmentAlreadyExist);
};

UserSegmentAlreadyExist.prototype = Object.create(UserSegmentsError.prototype);

var UserSegmentDoesNotExist = function (message) {
  UserSegmentsError.call(this, "Zippr Group EXist"+ message , UserSegmentDoesNotExist);
};

UserSegmentDoesNotExist.prototype = Object.create(UserSegmentsError.prototype);

module.exports = {
  UserSegmentsError: UserSegmentsError,
  UserSegmentAlreadyExist: UserSegmentAlreadyExist,
  UserSegmentDoesNotExist:UserSegmentDoesNotExist
};
