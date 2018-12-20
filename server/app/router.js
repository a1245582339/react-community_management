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

  // 获取社团
  router.get('/community', controller.community.getCommunity)
  // 更新社团
  router.post('/community', controller.community.updateCommunity)

  // 获取部门
  router.get('/dept', controller.community.getDept)
  // 获取分类
  router.get('/community/type', controller.community.getType)
  // 编辑分类
  router.post('/community/type', controller.community.updateType)

  // 获取公告
  router.get('/notice', controller.notice.getNotice)
  // 更新公告
  router.post('/notice', controller.notice.updateNotice)
  // 获取公告日志
  router.get('/notice/log', controller.notice.getNoticeLog)
  // 新增公告日志
  router.post('/notice/log', controller.notice.createNoticeLog)

  // 获取学生信息
  router.get('/student', controller.student.getStudent)
};
