var BaseErrors = require('./base');

var ControllerError = BaseErrors.ControllerError;

var ClientDataStoreError = function (message) {
  ControllerError.call(this, message, ClientDataStoreError)
};
ClientDataStoreError.prototype = Object.create(Error.prototype);

var TradeZoneNotFoundError = function (message) {
  ClientDataStoreError.call(this, message,TradeZoneNotFoundError);
};
TradeZoneNotFoundError.prototype = Object.create(ClientDataStoreError.prototype);

module.exports = {
  TradeZoneNotFoundError: TradeZoneNotFoundError
};



