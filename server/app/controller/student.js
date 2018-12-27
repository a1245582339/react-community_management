'use strict';

const Controller = require('egg').Controller;
const jwt = require('jsonwebtoken');

class Student extends Controller {
  async login() {
    const ctx = this.ctx;
    const { stu_id, password } = ctx.request.body
    const res = await ctx.service.student.findStu({ stu_id, password })
    if (res.length) {
      const token = jwt.sign({
        stu_id,
        password,
      }, 'secret', { expiresIn: '604800s' })
      ctx.body = { code: 20000, token }
    } else {
      ctx.body = { code: 20002, msg: '用户名密码错误！' }
    }
  }

  async getUserInfo() {
    const ctx = this.ctx;
    const { stu_id, password } = jwt.verify(ctx.request.header.authorization.split(' ')[1], 'secret');
    const res = await ctx.service.student.findStu({ stu_id, password })
    if (res.length) {
      ctx.body = { code: 20000, res }
    } else {
      ctx.status = 401
      ctx.body = { code: 20001, msg: '用户失效，请重新登录！' }
    }
  }

  async getStudent() {
    const ctx = this.ctx;
    const query = ctx.request.query
    const data = await ctx.service.student.findStu(query)
    this.ctx.body = { code: 20000, msg: '学生', data }
  }

  async updateStu() {
    const ctx = this.ctx;
    const {id, data} = ctx.request.body;
    try { 
      await ctx.service.student.update({id, data})
      ctx.body = {code: 20000, msg: '更新成功'}
    } catch (err) {
      throw err
    }
  }
}

module.exports = Student;
