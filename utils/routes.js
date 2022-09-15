const auth = require('../auth/local/index');

const routesConfig = function (app) {
    app.use('/auth/local', auth);
}

module.exports = routesConfig;
