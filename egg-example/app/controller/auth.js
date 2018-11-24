'use strict';

const Controller = require('egg').Controller;

class Admin extends Controller {
  async login() {
    const ctx = this.ctx;
    const res = await ctx.service.adminAuth.find(ctx.request.query)
    console.log(res);
    this.ctx.body = res
  }
  async authCallback() {
    this.ctx.body = 'ok'
    console.log(this.ctx.user)
  }
}

module.exports = Admin;
