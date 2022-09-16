const auth = require('../auth/local/index');
const user = require('../api/user/index');

const routesConfig = function (app) {
    app.use('/auth/local', auth);
    app.use('/user', user);
}

module.exports = routesConfig;
