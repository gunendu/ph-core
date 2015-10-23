var BaseErrors = require('./base');

var ControllerError = BaseErrors.ControllerError;

var ResetError = function (message) {
  ControllerError.call(this, message, ResetError)
};

ResetError.prototype = Object.create(Error.prototype);

var ResetTokenNotFoundError = function (message) {
  ResetError.call(this, message, ResetTokenNotFoundError);
};
ResetTokenNotFoundError.prototype = Object.create(ResetError.prototype);

var MultipleResetTokensFoundError = function (message) {
  ResetError.call(this, message, MultipleResetTokensFoundError);
};
MultipleResetTokensFoundError.prototype = Object.create(ResetError.prototype);

module.exports = {
  ResetError: ResetError,
  ResetTokenNotFoundError: ResetTokenNotFoundError,
  MultipleResetTokensFoundError: MultipleResetTokensFoundError
};
