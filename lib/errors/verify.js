var BaseErrors = require('./base');

var ControllerError = BaseErrors.ControllerError;

var VerifyError = function (message) {
  ControllerError.call(this, message, VerifyError)
};

VerifyError.prototype = Object.create(Error.prototype);

var TokenNotFoundError = function (message) {
  VerifyError.call(this, message, TokenNotFoundError);
};
TokenNotFoundError.prototype = Object.create(VerifyError.prototype);

var TokenExpiredError = function (message) {
  VerifyError.call(this, message, TokenExpiredError);
};
TokenExpiredError.prototype = Object.create(VerifyError.prototype);

var PinNotFoundError = function (message) {
  VerifyError.call(this, message, PinNotFoundError);
};
PinNotFoundError.prototype = Object.create(VerifyError.prototype);

module.exports = {
  TokenNotFoundError: TokenNotFoundError,
  PinNotFoundError: PinNotFoundError,
  TokenExpiredError: TokenExpiredError
};
