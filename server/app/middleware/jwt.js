'use strict'
const jwt = require('jsonwebtoken') // 引入jsonwebtoken

module.exports = () => {
  return async (ctx, next) => {
    if (ctx.request.header.authorization) { // 如果请求头中有权限字段
      const token = ctx.request.header.authorization.split(' ')[1]; // 取出token
      try { // 尝试进行解析
        const decoded = jwt.verify(token, 'secret');  // 用密钥 'secret' 进行解析
        await next()  // 解析成功后放行这一请求
      } catch (err) { // 如果解析失败了
        if (err.message === 'invalid token') {  // 如果解析出来是个无效token
          ctx.body = {  
            code: 20001,
            message: '身份认证过期请重新登录!',
          }
          ctx.status = 401;
        } else {  // 如果不是这个错误，给后台抛出日志方便查看
          throw err
        }
      }
    } else {  // 如果请求头中没带着权限字段
      ctx.body = {  // 直接提示请登录
        code: 20001,
        message: '请登录!',
      }
      ctx.status = 401;
    }
  }
}

