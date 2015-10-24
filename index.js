var PhApi = {};

PhApi.Controllers = {
    UserController: require('./controllers/UserController'),
    PostController: require('./controllers/PostController')
};

PhApi.Errors = {
    Base: require('./lib/errors/base'),
    Object: require('./lib/errors/object'),
    Auth: require('./lib/errors/auth'),
    User: require('./lib/errors/user'),
    Zippr: require('./lib/errors/zippr'),
    Api: require('./lib/errors/api'),
    Verify: require('./lib/errors/verify'),
    Validation: require('./lib/errors/validation'),
    Client: require('./lib/errors/client'),
    ClientDataStoreError: require('./lib/errors/clientdatastore')
};

PhApi.Logger = require('./lib/logging');

module.exports = PhApi;
