var BaseErrors = require('./base');

var ControllerError = BaseErrors.ControllerError;

var UserError = function (message) {
  ControllerError.call(this, message, UserError)
};
UserError.prototype = Object.create(Error.prototype);

var UserNotFoundError = function (message) {
  UserError.call(this, message, UserNotFoundError);
};
UserNotFoundError.prototype = Object.create(UserError.prototype);

var MultipleUsersFoundError = function (message) {
  UserError.call(this, message, MultipleUsersFoundError);
};
MultipleUsersFoundError.prototype = Object.create(UserError.prototype);

var UserValidationError = function(message){
  UserError.call(this, message, UserValidationError);
};
UserValidationError.prototype = Object.create(UserError.prototype);

var UserAlreadyExistsError = function (message) {
  UserError.call(this, message, UserAlreadyExistsError);
};

UserAlreadyExistsError.prototype = Object.create(UserError.prototype);

var ParentRefNotFound = function (message) {
  UserError.call(this, message, UserError);
};
ParentRefNotFound.prototype = Object.create(UserError.prototype);

var UserCreationFailed = function (message) {
  UserError.call(this, message, UserError);
};
UserCreationFailed.prototype = Object.create(UserError.prototype);

var UserAccessDenied = function (message) {
  UserError.call(this, message, UserError);
};
UserAccessDenied.prototype = Object.create(UserError.prototype);

var UserNotValid = function (message) {
  UserError.call(this, message, UserError);
};  
UserNotValid.prototype = Object.create(UserError.prototype);

var UserOldPassWord = function (message) {
  UserError.call(this, message, UserError);
}
UserOldPassWord.prototype = Object.create(UserError.prototype);

module.exports = {
  UserNotFoundError: UserNotFoundError,
  MultipleUsersFoundError: MultipleUsersFoundError,
  UserValidationError: UserValidationError,
  UserAlreadyExistsError: UserAlreadyExistsError,
  ParentRefNotFound: ParentRefNotFound,
  UserCreationFailed: UserCreationFailed,
  UserAccessDenied: UserAccessDenied,
  UserNotValid: UserNotValid,
  UserOldPassWord: UserOldPassWord
};
