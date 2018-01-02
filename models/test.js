/**
 * Created by richard on 17-5-31.
 */
const mongoose = require('mongoose');
const verify = require('./verify.model')
require('./user.model');
const User = mongoose.model('User');
mongoose.connect('mongodb://127.0.0.1:27017/test');
let zy = new User({
    username: 'zy1',
    password: '11'
});
zy.save(function (err) {
    if(err) {

    }
})