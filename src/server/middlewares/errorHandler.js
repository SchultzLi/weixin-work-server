const errorHandler = {
  error(app, logger) {
    // 处理node服务器报错500
    app.use(async (ctx, next) => {
      try {
        await next();
      } catch (error) {
        logger.error(error);
        ctx.status = error.status || 500;
        ctx.body = await ctx.render('error');
      }
    });
    // 处理404错误
    app.use(async (ctx, next) => {
      await next();
      if (ctx.status !== 404) {
        return;
      }
      ctx.body = '404';
    });
  }
};

module.exports = errorHandler;
