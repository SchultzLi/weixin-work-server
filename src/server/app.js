const Koa = require('koa');
const render = require('koa-swig');
const co = require('co');
const bodyParser = require('koa-bodyparser');
const { join } = require('path');
const log4js = require('log4js');
const errorHandler = require('./middlewares/errorHandler');

const app = new Koa();
app.use(bodyParser());

app.context.render = co.wrap(render({
  root: join(__dirname, '.', 'views'),
  autoescape: true,
  cache: 'memory',
  ext: 'html',
  writeBody: false,
  varControls: ['[[', ']]']
}));
log4js.configure({
  appenders: {
    kis: {
      type: 'file',
      filename: './log/kis.log'
    }
  },
  categories: {
    default: {
      appenders: ['kis'],
      level: 'error'
    }
  }
});
const logger = log4js.getLogger('kis');

errorHandler.error(app, logger);
require('./controllers/index')(app);

app.listen(8888, function () {
  console.log('*****端口8888已打开******');
});
