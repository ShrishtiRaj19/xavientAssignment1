var user = require('../controllers/users');

module.exports = (router) => {
    router.post('/users', user.signup);
    router.post('/login', user.login);
}