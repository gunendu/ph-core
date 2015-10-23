function ControllerError(message){
  Error.call(this, message, ControllerError);
}
ControllerError.prototype = Object.create(Error.prototype);

function InvalidResponseCodeError(message) {
  ControllerError.call(this, message, InvalidResponseCodeError);
}
InvalidResponseCodeError.prototype = Object.create(ControllerError.prototype);

function InternalServerError(message) {
  ControllerError.call(this, message, InternalServerError);
}
InternalServerError.prototype = Object.create(ControllerError.prototype);

function QuotaExceededError(message){
  ControllerError.call(this, message, QuotaExceededError);
}
QuotaExceededError.prototype = Object.create(ControllerError.prototype);

function FailedResponse(message) {
  ControllerError.call(this, message, FailedResponse);
}
FailedResponse.prototype = Object.create(ControllerError.prototype);


module.exports = {
  ControllerError: ControllerError,
  InvalidResponseCodeError: InvalidResponseCodeError,
  InternalServerError : InternalServerError,
  QuotaExceededError: QuotaExceededError,
  FailedResponse: FailedResponse
};
