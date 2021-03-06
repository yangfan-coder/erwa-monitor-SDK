/**
 * @file 本地serve接口测试
 * @author yangfan19
 * @version 1.0
 */

const Koa = require('koa');
const bodyParser = require('koa-bodyparser'); // 解析post的参数
const Router = require('koa-router');
const cors = require('koa2-cors');
const app = new Koa();
const router = new Router();

app.use(
  cors({
    // 指定一个或多个可以跨域的域名
    origin: function (ctx) {
      console.log(ctx);
      // 设置允许来自指定域名请求
      if (ctx.url === '/test') {
        return '*'; // 允许来自所有域名请求, 这个不管用
      }
      return 'http://localhost:8080'; // 这样就能只允许 http://localhost:8000 这个域名的请求了
    },
    maxAge: 5, // 指定本次预检请求的有效期，单位为秒。
    credentials: true, // 是否允许发送Cookie
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // 设置所允许的HTTP请求方法
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'], // 设置服务器支持的所有头信息字段
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'], // 设置获取其他自定义字段
  }),
);

router.get('/ajaxerror', async (ctx) => {
  ctx.body = {
    code: 200,
    massage: '请求接口成功',
  };
});

router.get('/serveError', async (ctx) => {
  ctx.response.status = 500;
  // ctx.throw(500, 'name required');
});

router.get('/serveErrorTime', async (ctx) => {
  const wait = function () {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('我得到结果了');
      }, 3000);
    });
  };

  const res = await wait();

  console.log(res);
  ctx.body = {
    code: 200,
  };
});

app.use(bodyParser()).use(router.routes()).use(router.allowedMethods());

app.listen(3003);

console.log('server is http://localhost:3003/');
