const auth = require('../auth/local/index');
const user = require('../api/user/index');
const product = require('../api/product/index');

const routesConfig = function (app) {
    app.use('/auth/local', auth);
    app.use('/user', user);
    app.use('/api/product', product);
}

module.exports = routesConfig;
