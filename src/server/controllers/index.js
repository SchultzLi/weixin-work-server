const router = require('koa-simple-router');
const IndexController = require('./IndexController');
const indexController = new IndexController();
const WeixinWorkController = require('./WeixinWorkController');
const weixinWorkController = new WeixinWorkController();

module.exports = (app) => {
  app.use(router(_ => {
    _.get('/', indexController.actionIndex());

    _.get('/weixinwork', weixinWorkController.actionIndex());
    _.get('/weixinwork/setting', weixinWorkController.actionSetting());
    _.get('/weixinwork/getAccessToken', weixinWorkController.actionGetAccessToken());
    _.post('/weixinwork/getJsapiSignature', weixinWorkController.actionGetJsapiSignature());
    _.get('/weixinwork/getUserInfo', weixinWorkController.actionGetUserInfo());
  }))
};
