'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  // 鉴权成功后的回调页面
  router.get('/admin/callback', controller.auth.authCallback);

  // 渲染登录页面，用户输入账号密码
  router.get('/admin/login', controller.auth.login);
  // 登录校验
  router.post('/admin/login', app.passport.authenticate('local', { successRedirect: '/admin/callback' }));
};
