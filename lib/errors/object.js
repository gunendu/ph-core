var BaseErrors = require('./base');

var ControllerError = BaseErrors.ControllerError;

var ObjectError = function (message) {
  ControllerError.call(this, message, ObjectError);
};

ObjectError.prototype = Object.create(ControllerError.prototype);


var ObjectNotFoundError = function () {
  ObjectError.call(this, "No Object found", ObjectNotFoundError)
};
ObjectNotFoundError.prototype = Object.create(ObjectError.prototype);

var ObjectCreationFailed = function () {
  ObjectError.call(this, "Object creation failed", ObjectCreationFailed);
};
ObjectCreationFailed.prototype = Object.create(ObjectError.prototype);

var ObjectAlreadyExists = function () {
  ObjectError.call(this, "No Object found", ObjectAlreadyExists)
};
ObjectAlreadyExists.prototype = Object.create(ObjectError.prototype);


module.exports = {
  ObjectError : ObjectError,
  ObjectNotFoundError: ObjectNotFoundError,
  ObjectCreationFailed: ObjectCreationFailed,
  ObjectAlreadyExists: ObjectAlreadyExists
};
