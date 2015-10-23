var BaseErrors = require('./base');

var ControllerError = BaseErrors.ControllerError;

var ApiKeyError = function (message) {
  ControllerError.call(this, message, ApiKeyError)
};

ApiKeyError.prototype = Object.create(ControllerError.prototype);

var ApiKeyNotFound = function (message) {
  ApiKeyError.call(this, message, ApiKeyNotFound);
};
ApiKeyNotFound.prototype = Object.create(ApiKeyError.prototype);

var InvalidApiKeyError = function (message) {
  ApiKeyError.call(this, message, InvalidApiKeyError);
};
InvalidApiKeyError.prototype = Object.create(ApiKeyError.prototype);

module.exports = {
  ApiKeyError: ApiKeyError,
  ApiKeyNotFound: ApiKeyNotFound,
  InvalidApiKeyError: InvalidApiKeyError
};
