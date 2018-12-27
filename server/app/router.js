'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // 管理员登录校验
  router.post('/login/admin', controller.admin.login);
  // 管理员获取用户信息
  router.get('/info/admin', controller.admin.getUserInfo);

  // 获取管理员列表
  router.get('/admin', controller.admin.getUserList)
  // 获取管理员列表
  router.get('/admin/password', controller.admin.checkPassword)
  // 更新管理员信息
  router.post('/admin', controller.admin.updateAdmin);
  
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
  // 上传图片
  router.post('/notice/upload', controller.notice.upload)
  // 获取公告日志
  router.get('/notice/log', controller.notice.getNoticeLog)
  // 新增公告日志
  router.post('/notice/log', controller.notice.createNoticeLog)

  // 用户登录校验
  router.post('/login/student', controller.student.login);
  // 更新学生信息
  router.get('/student/password', controller.student.checkPassword)
  // 管理员获取用户信息
  router.get('/info/student', controller.student.getUserInfo);
  // 获取学生信息
  router.get('/student', controller.student.getStudent)
  // 更新学生信息
  router.post('/student', controller.student.updateStu)
  // 获取学生参加的社团
  router.get('/student/community', controller.student.getCommunity)
};
