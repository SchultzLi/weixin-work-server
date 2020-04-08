const WeixinWorkModel = require('../models/WeixinWorkModel');
const sha1 = require('sha1');

class WeixinWorkController{
  constructor() { }
  actionIndex() {
    return async (ctx, next) => {
      ctx.body = await ctx.render('index');
    }
  }

  actionSetting() {
    return async (ctx, next) => {
      ctx.body = await ctx.render('weixin-work-setting');
    }
  }

  actionGetAccessToken() {
    return async (ctx, next) => {
      const { corpid, corpsecret } = ctx.request.query;
      const weixinWorkModel = new WeixinWorkModel();
      const res = await weixinWorkModel.getAccessToken(corpid, corpsecret);
      ctx.body = {
        code: 200,
        status: 'success',
        data: res.data
      }
    }
  }

  actionGetJsapiSignature() {
    return async (ctx, next) => {
      const { corpid, corpsecret, url, timestamp, noncestr } = ctx.request.body;
      const weixinWorkModel = new WeixinWorkModel();
      const accessTokenRes = await weixinWorkModel.getAccessToken(corpid, corpsecret);
      const ticketRes = await weixinWorkModel.getJsapiTicket(accessTokenRes.data.access_token);
      const str = `jsapi_ticket=${ticketRes.data.ticket}&noncestr=${noncestr}&timestamp=${timestamp}&url=${url}`;
      const signature = sha1(str);
      ctx.body = {
        code: 200,
        status: 'success',
        data: {
          signature
        }
      }
    }
  }

  actionGetUserInfo() {
    return async (ctx, next) => {
      const { corpid, corpsecret, code } = ctx.request.query;
      const weixinWorkModel = new WeixinWorkModel();
      const accessTokenRes = await weixinWorkModel.getAccessToken(corpid, corpsecret);
      const userInfo = await weixinWorkModel.getUserInfo(accessTokenRes.data.access_token, code);
      ctx.body = {
        code: 200,
        status: 'success',
        data: { userInfo: userInfo.data }
      }
    }
  }
}

module.exports = WeixinWorkController;