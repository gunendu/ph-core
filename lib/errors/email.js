var BaseErrors = require('./base');

var InternalServerError = BaseErrors.InternalServerError;

var EmailError = function (message) {
  InternalServerError.call(this, message, EmailError);
};

EmailError.prototype = Object.create(InternalServerError.prototype);


var TemplateReadFailedError = function () {
  EmailError.call(this, "No Template found", TemplateReadFailedError)
};
TemplateReadFailedError.prototype = Object.create(EmailError.prototype);

var EmailSendFailedError = function () {
  EmailError.call(this, "No Email found", EmailSendFailedError)
};
EmailSendFailedError.prototype = Object.create(EmailError.prototype);

module.exports = {
  EmailError : EmailError,
  EmailSendFailedError: EmailSendFailedError,
  TemplateReadFailedError: TemplateReadFailedError
};
