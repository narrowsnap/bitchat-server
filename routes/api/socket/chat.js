/**
 * Created by richard on 17-7-5.
 */

'use strict';

const mongoose = require('mongoose');
require('../../../models/message.model');
const Message = mongoose.model('Message');
const chatbot = require('../../../utils/chatbot/chatbot');

module.exports = async (io) => {
    io.sockets.on('connection', function (socket) {
        console.log('User connection');

        // 发送验证申请
        socket.on('send verify', (receiver) => {
            console.log('send verify to: ', receiver);
            socket.broadcast.emit('receive verify', receiver);
        });

        socket.on('send message', (message) => {
            console.log('send message: ');
            console.log(message);
            socket.broadcast.emit('receive message', message);
/*            let message = new Message(msg);

            let save = async (message) => {
                await message.save(message);
            };
            save(message);*/
        });

        socket.on('notice sender', (sender) => {
            console.log('notice sender: ', sender);
            socket.broadcast.emit('receive notice', sender);
        });

        socket.on('group chat', (members_name) => {
            console.log('group chat: ', members_name);
            socket.broadcast.emit('update info', members_name);
        });

        socket.on('chatbot', (message) => {
            const out = chatbot.Chat(message.content);
            const tmp = message.sender;
            message.sender = message.receiver;
            message.receiver = tmp;
            message.content = out;
            message.sender_avatar = '/images/avatar/chatbot.png'
            console.log(message)
            socket.emit('chatbot', message);
        });
    });
};
