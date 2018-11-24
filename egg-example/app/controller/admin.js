'use strict';

const Controller = require('egg').Controller;

class Admin extends Controller {
  async login() {
    const ctx = this.ctx;
    const res = await ctx.model.admin.findAll()
    console.log(res);
    this.ctx.body = res
  }
}

module.exports = Admin;
