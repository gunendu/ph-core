var BaseErrors = require('./base');

var ControllerError = BaseErrors.ControllerError;

var ZipprError = function (message) {
  ControllerError.call(this, message, ZipprError)
};

ZipprError.prototype = Object.create(Error.prototype);
                        
var ZipprNotFoundError = function (message) {
  ZipprError.call(this, "Zippr "+ message +" not found", ZipprNotFoundError);
};

var ZipprExists = function (message) {
  ZipprError.call(this, "Zippr already Exists", ZipprAlreadyExists); 
};

var ImageUploadLimitError = function (message) {
  ZipprError.call(this, message, ImageUploadLimitError); 
};

var ImageUploadSizeError = function (message) {
  ZipprError.call(this, message, ImageUploadSizeError);
};

ZipprNotFoundError.prototype = Object.create(ZipprError.prototype);

ZipprExists.prototype = Object.create(ZipprError.prototype);

ImageUploadLimitError.prototype = Object.create(ZipprError.prototype);

ImageUploadSizeError.prototype = Object.create(ZipprError.prototype);

var ZipprCreationFailed = function (message) {
  ZipprError.call(this, message, ZipprCreationFailed);
};

ZipprCreationFailed.prototype = Object.create(ZipprError.prototype);

var ValidationError = function (message) {
  ZipprError.call(this, message, ValidationError)
};

ValidationError.prototype = Object.create(ZipprError.prototype);

var SearchZipprNotFoundError = function (message) {
  ZipprError.call(this, "Zippr "+ message +" not found", SearchZipprNotFoundError);
};
SearchZipprNotFoundError.prototype = Object.create(ZipprError.prototype);

var InvalidReferenceIdError = function (message) {
  ZipprError.call(this, "Invalid Location Id "+ message +" passed or Location already used.", InvalidReferenceIdError);
};
InvalidReferenceIdError.prototype = Object.create(ZipprError.prototype);

module.exports = {
  ZipprError: ZipprError,
  ZipprNotFoundError: ZipprNotFoundError,
  SearchZipprNotFoundError: SearchZipprNotFoundError,
  ZipprCreationFailed: ZipprCreationFailed,
  ImageUploadLimitError: ImageUploadLimitError,
  ImageUploadSizeError: ImageUploadSizeError,
  ValidationError: ValidationError,
  InvalidReferenceIdError: InvalidReferenceIdError,
};
