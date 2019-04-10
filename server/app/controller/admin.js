'use strict';

const Controller = require('egg').Controller;
const jwt = require('jsonwebtoken');

class Admin extends Controller {
  async login() {
    const ctx = this.ctx;
    const { login_name, password } = ctx.request.body // 获取请求体中的用户名密码
    const res = await ctx.service.admin.find({ login_name, password })  // 去数据库中查
    if (res.length) { // 如果查到
      const token = jwt.sign({  // 将用户名密码编译为token
        login_name,
        password,
      }, 'secret', { expiresIn: '604800s' })  // 密钥是 'secret'，有效时间是一周
      ctx.body = { code: 20000, token } // 将用户名返回给前端
    } else {  // 如果没查到
      ctx.body = { code: 20002, msg: '用户名密码错误！' } //提示错误
    }
  }

  async getUserInfo() {
    const ctx = this.ctx;
    console.log(jwt.verify(ctx.request.header.authorization.split(' ')[1], 'secret')) 
    const { login_name, password } = jwt.verify(ctx.request.header.authorization.split(' ')[1], 'secret');  // 将token进行解析
    const res = await ctx.service.admin.find({ login_name, password })  // 用用户名密码进行查库
    if (res.length) { // 如果查到
      ctx.body = { code: 20000, data: res[0] }  // 将用户信息返回前端
    } else {  // 如果没查到
      ctx.status = 401  // 状态码401，即无权限
      ctx.body = { code: 20001, msg: '用户失效，请重新登录！' } // 提示错误
    }
  }

  async getUserList() {
    const ctx = this.ctx;
    const query = ctx.request.query // 获取请求体
    const data = await ctx.service.admin.find(query)  // 用请求体查库
    ctx.body = {
      code: 20000,
      data,   // 将得到的数据返回给前端
      msg: '管理员列表',
    }
  }

  async updateAdmin() {
    const ctx = this.ctx;
    const {id, data} = ctx.request.body;  // 获取请求体
    if (id) { // 如果请求体里有id
      await ctx.service.admin.update(id, data)  // 更新所传的id的那条数据
      ctx.body = {code: 20000, msg: '更新成功'}
    } else {  // 如果没有id
      const isExsit = (await ctx.service.admin.find({login_name: data.login_name})).length  // 检查数据库中是否存在同登录名的用户
      if (isExsit) {  // 如果存在
        ctx.body = {code: 20003, msg: '用户名已存在，新增失败！'} // 提示错误
      } else {  // 如果不存在
        await ctx.service.admin.create(data)    // 写库
        ctx.body = {code: 20000, msg: '新增成功'} // 提示成功
      }
    }
  }

  async checkPassword() {
    const ctx = this.ctx;
    const { login_name, password } = ctx.request.query; // 获取请求体中用户名密码
    const res = await ctx.service.admin.find({ login_name, password })  // 用户名密码查库
    if (res.length) { // 如果查到
      ctx.body = {code: 20000, msg: '校验成功'}
    } else {
      ctx.body = {code: 20004, msg: '校验失败'}
    }
  }
}

module.exports = Admin;
