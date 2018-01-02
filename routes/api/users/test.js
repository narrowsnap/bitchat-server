/**
 * Created by richard on 17-7-8.
 */
'use strict';
const router = require('koa-router');
const mongoose = require('mongoose');
require('./../../../models/user.model');
const User = mongoose.model('User');

require('../../../models/verify.model');
const Verify = mongoose.model('Verify');

let agreeTest = async () => {
    const verify = await Verify.findByIdAndUpdate(
        ctx.request.body.verifyId,
        {
            status: 1
        }
    );
    console.log('verify:');
    console.log(verify);
    // 更新联系人消息
}