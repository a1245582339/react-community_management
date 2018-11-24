'use strict';

const LocalStrategy = require('passport-local').Strategy;

module.exports = app => {
  // 挂载 strategy
  app.passport.use(new LocalStrategy({
    passReqToCallback: true,
  }, (req, username, password, done) => {
    // format user
    const user = {
      provider: 'local',
      username,
      password,
    };
    app.passport.doVerify(req, user, done);
  }));

  // 处理用户信息
  app.passport.verify(async (ctx, user) => {
    const auth = await ctx.service.adminAuth.find({
      name: user.username,
      password: user.password,
      provider: user.provider,
    });
    return auth
    // console.log(auth, app.passport)
  });
  app.passport.serializeUser(async (ctx, user) => {
    console.log('serializeUser: ' + JSON.stringify(user))
  });
  app.passport.deserializeUser(async (ctx, user) => {
    console.log('deserializeUser: ' + user)
  });
};
