const ApiRequest = require('../utils/ApiRequest');

class WeixinWorkModel {
  constructor() { }
  /**
   * 获取access_token
   * @param {string} corpid 
   * @param {string} corpsecret 
   */
  getAccessToken(corpid, corpsecret) {
    const token_url = `https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=${corpid}&corpsecret=${corpsecret}`;
    const api = new ApiRequest(token_url);
    return api.fetch();
  }
  /**
   * 获取企业的jsapi_ticket。正常情况下，jsapi_ticket的有效期为7200秒，通过access_token来获取。
   * 由于获取jsapi_ticket的api调用次数非常有限（一小时内，一个企业最多可获取400次，且单个应用不能超过100次），频繁刷新jsapi_ticket会导致api调用受限，影响自身业务，开发者必须在自己的服务全局缓存jsapi_ticket。
   * @param {string} accessToken
   */
  getJsapiTicket(accessToken) {
    const jsapi_ticket_url = `https://qyapi.weixin.qq.com/cgi-bin/get_jsapi_ticket?access_token=${accessToken}`;
    const api = new ApiRequest(jsapi_ticket_url);
    return api.fetch();
  }
  /**
   * 根据code获取成员信息
   * @param {string} accessToken 
   * @param {string} code 
   */
  getUserInfo(accessToken, code) {
    const url = `https://qyapi.weixin.qq.com/cgi-bin/user/getuserinfo?access_token=${accessToken}&code=${code}`;
    const api = new ApiRequest(url);
    return api.fetch();
  }
}

module.exports = WeixinWorkModel;
