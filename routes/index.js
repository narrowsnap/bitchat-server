const router = require('koa-router')();
const users = require('./api/users');
const verify = require('./api/verify');

router.use('/users', users.routes(), users.allowedMethods());
router.use('/verify', verify.routes(), verify.allowedMethods());

module.exports = router;
