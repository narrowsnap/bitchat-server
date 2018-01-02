/**
 * Created by richard on 17-7-5.
 */

'use strict';

const mongoose = require('mongoose');
require('../../../models/message.model');
const Message = mongoose.model('Message');

module.exports = async (io) => {
    io.sockets.on('connection', function (socket) {
        console.log('User connection');

        // 发送验证申请
        socket.on('send verify', (receiver) => {
            socket.broadcast.emit('receive verify', receiver);
        });

        socket.on('send message', (message) => {
            socket.broadcast.emit('receive message', message);
/*            let message = new Message(msg);

            let save = async (message) => {
                await message.save(message);
            };
            save(message);*/
        });
    });
};
