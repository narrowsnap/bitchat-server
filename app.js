const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const mongoose = require('mongoose');
const bluebird = require('bluebird');
const cors = require('koa2-cors')

const routes = require('./routes/index')

mongoose.Promise = bluebird;
//连接数据库
mongoose.connect('mongodb://127.0.0.1:27017/bitchat', function (err) {
    console.log('connect success');
    if (err) {
        console.error('connect to %s error: ', 'test', err.message);
        process.exit(1);
    }
});

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))
// 只在特定路径下开启
// app.use('/users/*', cors());
app.use(cors());
app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(routes.routes(), routes.allowedMethods())

module.exports = app
