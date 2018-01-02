/**
 * Created by richard on 17-5-30.
 */
'use strict';
const router = require('koa-router');
const mongoose = require('mongoose');
require('./../../../models/user.model');
const User = mongoose.model('User');

require('../../../models/verify.model');
const Verify = mongoose.model('Verify');


// 用户注册
exports.register = async (ctx) => {
    const username = ctx.request.body.username || '';
    const password = ctx.request.body.password || '';
    console.log(ctx.request.body);
    if(username == '' || password == '') {
        ctx.response.body = {status: 404, message: '用户名或密码为空'};
    } else {
        try {
            const user = await User.findOne({username: username});
            console.log(user);
            if(!user) {
                let img = 'assets/contactImg/00' + Math.ceil(Math.random()*5) + '.jpg';
                const newUser = new User({
                    username: ctx.request.body.username,
                    password: ctx.request.body.password,
                    img: img
                });
                const user = newUser.save();
                /*ctx.status = 200;
                 ctx.body = '注册成功';*/
                ctx.response.body = {status: 200, message: '注册成功'};
            } else {
                ctx.response.body = {status: 404, message: '用户名已存在'};
                /*ctx.status = 404;
                 ctx.body = '用户名已存在';*/
            }
        } catch (err) {
            ctx.response.body = {status: 500, message: '服务器错误: '+err};
        }
    }


};

// 用户登录
exports.login = async (ctx) => {
    const username = ctx.request.body.username || '';
    const password = ctx.request.body.password || '';

    if(username == '' || password == '') {
        ctx.response.body = {status: 404, message: '用户名或密码为空'};
    } else {
        try {
            const user = await User.findOne({username: username});
            // console.log(user);
            if(!user) {
                ctx.response.body = {status: 404, message: '用户不存在'};
            } else {
                if(user.password === password) {
                    ctx.response.body = {status: 200, message: '登录成功', user: {
                        _id: user._id,
                        username: user.username,
                        avatar: user.avatar,
                        contacts: user.contacts,
                    }};
                } else {
                    ctx.response.body = {status: 404, message: '密码错误'};
                }
            }
        } catch (err) {
            ctx.response.body = {status: 500, message: '服务器错误'};
            // ctx.throw(err);
        }
    }


};

//搜索用户
exports.search = async (ctx) => {
    const username = ctx.request.body.username || '';
    if(username == '') {
        ctx.response.body = {status: 404, message: '用户名为空'};
    } else {
        try {
            const user = await User.findOne({username: username});
            // console.log(user);
            if(!user) {
                ctx.response.body = {status: 404, message: '该用户不存在'};
            } else {
                ctx.response.body = {status: 200, message: '找到用户', user: {
                    username: user.username,
                    img: user.img
                }};
            }
        } catch (err) {
            ctx.response.body = {status: 500, message: '服务器错误'};
            // ctx.throw(err);
        }
    }
};


// 显示申请数量
exports.showVerifyNumber = async (ctx) => {
    try {
        const verify = await Verify.count({
            receiver: ctx.request.body.receiver,
            status: 0
        });
        ctx.response.body = {status: 200, verifyNumber: verify};
    } catch (err) {
        ctx.response.body = {status: 500, message: '服务器错误: '+err};
    }
};

// 显示申请信息
exports.getVerify = async (ctx) => {
    try {
        const verify = await Verify.find({
            receiver: ctx.request.body.receiver,
            status: 0
        });
        // console.log(verify);
        ctx.response.body = {status: 200, verifyInfo: verify};
    } catch (err) {
        ctx.response.body = {status: 500, message: '服务器错误: '+err};
    }
};


// 获取联系人
exports.getContacts = async (ctx) => {
    try {
        const user = await User.findOne({username: ctx.request.body.username});
        // console.log(verify);
        ctx.response.body = {status: 200, data: user.contacts};
    } catch (err) {
        ctx.response.body = {status: 500, message: '服务器错误: '+err};
    }
};

// 获取联系人
exports.updateUser = async (ctx) => {
   const user_id = ctx.request.body.user_id;
   console.log('id: &&&&&&&&&')
   console.log(ctx.request.body);
   const user = await User.findById(user_id, {username: 1, avatar: 1, contacts:1});
   ctx.response.body = user;
};
