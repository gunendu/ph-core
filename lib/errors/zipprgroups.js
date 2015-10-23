var BaseErrors = require('./base');

var ControllerError = BaseErrors.ControllerError;

var ZipprGroupsError = function (message) {
  ControllerError.call(this, message, ZipprGroupsError)
};

ZipprGroupsError.prototype = Object.create(Error.prototype);
                        
var ZipprGroupAlreadyExist = function (message) {
  ZipprGroupsError.call(this, "Zippr Group EXist"+ message , ZipprGroupAlreadyExist);
};

ZipprGroupAlreadyExist.prototype = Object.create(ZipprGroupsError.prototype);

var ZipprGroupDoesNotExist = function (message) {
  ZipprGroupsError.call(this, "Zippr Group EXist"+ message , ZipprGroupDoesNotExist);
};

ZipprGroupDoesNotExist.prototype = Object.create(ZipprGroupsError.prototype);

module.exports = {
  ZipprGroupsError: ZipprGroupsError,
  ZipprGroupAlreadyExist: ZipprGroupAlreadyExist,
  ZipprGroupDoesNotExist:ZipprGroupDoesNotExist
};
