var BaseErrors = require('./base');

var ControllerError = BaseErrors.ControllerError;

var ValidationError = function (message) {
  ControllerError.call(this, message, ValidationError);
};
ValidationError.prototype = Object.create(ControllerError.prototype);

function MissingParamsError(parameter, message){
  this.parameter = parameter;
  ValidationError.call(this, message, MissingParamsError);
}
MissingParamsError.prototype = Object.create(ValidationError.prototype);

function InvalidParamsError(paramter, message) {
  this.parameter = paramter;
  ValidationError.call(this, message, InvalidParamsError);
}
InvalidParamsError.prototype = Object.create(ValidationError.prototype);

function InvalidSessionToken(message) {
  ValidationError.call(this, message, InvalidSessionToken);
}
InvalidSessionToken.prototype = Object.create(ValidationError.prototype);

function InvalidFilenameError(message){
  ValidationError.call(this, message, InvalidFilenameError);
}
InvalidFilenameError.prototype = Object.create(ValidationError.prototype);

var InvalidEmailError = function (message) {
  console.log("InvalidEmailError is called");
  ValidationError.call(this, message, InvalidEmailError);
};
InvalidEmailError.prototype = Object.create(ValidationError.prototype);

var DuplicateValueError = function (message) {
  ValidationError.call(this, message, DuplicateValueError);
};
DuplicateValueError.prototype = Object.create(ValidationError);

module.exports = {
  ValidationError : ValidationError,
  InvalidParamsError : InvalidParamsError,
  InvalidEmailError: InvalidEmailError,
  DuplicateValueError: DuplicateValueError,
  MissingParamsError :MissingParamsError,
  InvalidFilenameError: InvalidFilenameError,
  InvalidSessionToken: InvalidSessionToken
};
