/**
 * Created by richard on 18-1-1.
 */
'use strict';
const router = require('koa-router');
const mongoose = require('mongoose');
require('../../../models/verify.model');
const Verify = mongoose.model('Verify');
require('./../../../models/user.model');
const User = mongoose.model('User');

// 申请验证
exports.sendVerify = async (ctx) => {
    const verify = ctx.request.body;
    try {
        const find_verify = await Verify.findOne({
            sender: verify.sender,
            receiver: verify.receiver
        });
        if(!find_verify || find_verify.status == 2) {
            let newVerify = new Verify(verify);
            newVerify.save();

            ctx.response.body = {status: 200, message: '发送申请成功'};
        } else {
            ctx.response.body = {status: 404, message: '已经发过申请'};
        }
    } catch (err) {
        ctx.response.body = {status: 500, message: '服务器错误: '+err};
    }
};

// 更新验证信息
exports.updateVerify = async (ctx) => {
    const username = ctx.request.body.username;
    const verifies = await Verify.find({receiver: username, status: 0});
    ctx.response.body = {status: 200, message: '更新验证信息成功', verifies: verifies}
};

// 同意申请
exports.agreeVerify = async (ctx) => {
    const verify = await Verify.findByIdAndUpdate(
        ctx.request.body.verify_id,
        {
            status: 1
        }
    );
    console.log('verify: &&&&&&&&&&&');
    console.log(verify);
    const sender = await User.findOne({username: verify.sender});
    // 更新receiver联系人消息
    const receiver = await User.update(
        {
            username: verify.receiver
        },
        {
            $push: {
                contacts: {
                    id: sender._id,
                    nickname: verify.sender,
                    avatar: verify.sender_avatar,
                    pinyin: verify.sender_pinyin
                }
            }
        }
    );

    // 更新 sender 联系人消息
    await User.findByIdAndUpdate(
        sender._id,
        {
            $push: {
                contacts: {
                    id: receiver._id,
                    nickname: verify.receiver,
                    avatar: receiver.avatar,
                    pinyin: verify.receiver_pinyin
                }
            }
        }
    );

    ctx.response.body = {status: 200, message: '回复成功'};
};

// 拒绝申请
exports.disagreeVerify = async (ctx) => {
    await Verify.findByIdAndUpdate(
        ctx.request.body.verify_id,
        {
            status: 2
        }
    );
    ctx.response.body = {status: 200, message: '回复成功'};
};