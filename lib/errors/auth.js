var BaseErrors = require('./base');

var ControllerError = BaseErrors.ControllerError;

var AuthError = function (message) {
  ControllerError.call(this, message, AuthError);
};

AuthError.prototype = Object.create(ControllerError.prototype);

var MissingCredentialsError = function (message) {
  AuthError.call(this, message, MissingCredentialsError);
};
MissingCredentialsError.prototype = Object.create(AuthError.prototype);

var InvalidCredentialsError = function (message) {
  AuthError.call(this, message, InvalidCredentialsError)
};
InvalidCredentialsError.prototype = Object.create(AuthError.prototype);

var GenericAuthFailureError = function (message) {
  AuthError.call(this, message, GenericAuthFailureError)
};
GenericAuthFailureError.prototype = Object.create(AuthError.prototype);

var UsernameTakenError = function (message) {
  AuthError.call(this, message, UsernameTakenError)
};
UsernameTakenError.prototype = Object.create(AuthError.prototype);

var NoSessionError = function (message) {
  AuthError.call(this, message, NoSessionError);
};
NoSessionError.prototype = Object.create(AuthError.prototype);

var UnAuthorizedError = function(message) {
  AuthError.call(this, message, UnAuthorizedError);
}
UnAuthorizedError.prototype = Object.create(AuthError.prototype);

module.exports = {
  AuthError : AuthError,
  InvalidCredentialsError: InvalidCredentialsError,
  MissingCredentialsError: MissingCredentialsError,
  GenericAuthFailureError : GenericAuthFailureError,
  UsernameTakenError : UsernameTakenError,
  NoSessionError: NoSessionError,
  UnAuthorizedError: UnAuthorizedError
};
