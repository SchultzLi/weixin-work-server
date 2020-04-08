class IndexController{
  constructor() { }
  actionIndex() {
    return async (ctx, next) => {
      ctx.body = await ctx.render('index');
    }
  }
}

module.exports = IndexController;
