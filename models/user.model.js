/**
 * Created by richard on 17-5-30.
 */
/**
 * 用户表
 */
'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const random = require('../utils/random');

let UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    pinyin: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
    },
    contacts: [
        {
            _id: String,
            username: String,
            avatar: String,
            pinyin: String
        }
    ],
    group_chat: [
        {
            name: String,
            avatar: String,
            members: [
                {
                    _id: String,
                    username: String,
                    avatar: String,
                    pinyin: String
                }
            ]
        }
    ]

});

module.exports = mongoose.model('User', UserSchema);