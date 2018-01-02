/**
 * Created by richard on 17-5-30.
 */
'use strict';
const router = require('koa-router')();
const controller = require('./controller');

router.post('/register', controller.register);
router.post('/login', controller.login);
router.post('/search', controller.search);
router.post('/showVerifyNumber', controller.showVerifyNumber);
router.post('/getVerify', controller.getVerify);
router.post('/getContacts', controller.getContacts);
router.post('/updateUser', controller.updateUser);

module.exports = router;