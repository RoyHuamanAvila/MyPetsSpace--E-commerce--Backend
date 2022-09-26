const auth = require('../auth/local/index.js');
const user = require('../api/user/index.js');
const product = require('../api/index.js');

const routesConfig = function (app) {
    app.use('/auth/local', auth);
    app.use('/user', user);
    app.use('/api/product', product);
}

module.exports = routesConfig;
