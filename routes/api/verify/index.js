/**
 * Created by richard on 18-1-1.
 */
'use strict';
const router = require('koa-router')();
const controller = require('./controller');

router.post('/sendVerify', controller.sendVerify);
router.post('/updateVerify', controller.updateVerify);
router.post('/agreeVerify', controller.agreeVerify);
router.post('/disagreeVerify', controller.disagreeVerify);

module.exports = router;