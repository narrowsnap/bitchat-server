/**
 * Created by richard on 17-7-7.
 */
/**
 * 申请验证表
 */
'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let VerifySchema = new Schema({
    sender: {
        type: String,
        required: true
    },
    receiver: {
        type: String,
        required: true
    },
    verify_msg: {
        type: String,
        required: true
    },
    sender_avatar: {
        type: String,
        default: ''
    },
    sender_pinyin: {
        type: String,
        required: true
    },
    receiver_pinyin: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Verify', VerifySchema);