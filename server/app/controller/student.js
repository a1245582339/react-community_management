'use strict';

const Controller = require('egg').Controller;

class Student extends Controller {
  async getStudent() {
    const ctx = this.ctx;
    const query = ctx.request.query
    const data = await ctx.service.student.findStu(query)
    this.ctx.body = { code: 20000, msg: '学生', data }
  }
}

module.exports = Student;
