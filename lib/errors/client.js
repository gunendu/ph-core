var BaseErrors = require('./base');

var ControllerError = BaseErrors.ControllerError;

var ClientError = function (message) {
  ControllerError.call(this, message, ClientError);
};

ClientError.prototype = Object.create(ControllerError.prototype);


var ClientNotFoundError = function () {
  ClientError.call(this, "No Client found", ClientNotFoundError)
};
ClientNotFoundError.prototype = Object.create(ClientError.prototype);

var ClientCreationFailed = function () {
  ClientError.call(this, "Client creation failed", ClientCreationFailed);
};
ClientCreationFailed.prototype = Object.create(ClientError.prototype);

module.exports = {
  ClientError : ClientError,
  ClientNotFoundError: ClientNotFoundError,
  ClientCreationFailed: ClientCreationFailed
};
