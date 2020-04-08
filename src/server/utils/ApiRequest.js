const fetch = require('node-fetch');

class ApiRequest {
  constructor(url) {
    this.url = url;
  }
  fetch(options) {
    return new Promise((resolve, reject) => {
      let result = {
        code: 0,
        message: '',
        data: []
      };
      let api;
      if (options && options.params) {
        api = fetch(this.url, {
          method: options.method,
          body: options.params
        })
      } else {
        api = fetch(this.url)
      }
      api.then(res => {
        try {
          return res.json()
        } catch (e) {
          result.code = 0;
          result.message = '解析JSON失败';
          reject(result);
        }
      }).then(json => {
        result.code = 1;
        result.message = '请求成功';
        result.data = json;
        resolve(result);
      }).catch(error => {
        result.code = 2;
        result.message = 'node-fetch请求失败';
        result.data = error;
        reject(result);
      })
    })
  }
};

module.exports = ApiRequest;
