'use strict';

const Controller = require('egg').Controller;

class Community extends Controller {
  async getCommunity() {
    const ctx = this.ctx;
    const data = await ctx.service.community.findList({})
    this.ctx.body = { code: 20000, msg: '社团列表', data }
  }

  async getDept() {
    const ctx = this.ctx;
    const data = await ctx.service.community.findDept({})
    this.ctx.body = { code: 20000, msg: '部门列表', data }
  }

  async getType() {
    const ctx = this.ctx;
    const data = await ctx.service.community.findType({})
    this.ctx.body = { code: 20000, msg: '社团分类列表', data }
  }
}

module.exports = Community;
