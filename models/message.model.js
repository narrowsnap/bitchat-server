/**
 * Created by richard on 17-7-12.
 */
/**
 * 消息表
 */
'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let MessageSchema = new Schema({
    sender: {
        type: String,
        required: true
    },
    sender_avatar: {
        type: String,
        required: true
    },
    receiver: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    create_time: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Message', MessageSchema);