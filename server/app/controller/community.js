'use strict';

const Controller = require('egg').Controller;

class Community extends Controller {
  async getCommunity() {
    const ctx = this.ctx;
    const query = ctx.request.query
    const {community, count} = await ctx.service.community.findList(query)
    this.ctx.body = { code: 20000, msg: '社团列表', data: community, count }
  }

  async updateCommunity() {
    const ctx = this.ctx;
    const id = ctx.request.body.id
    const data = ctx.request.body.data
    if (id) {
      await ctx.service.community.updateCommunity(id, data)
    } else {
      data.create_time = (new Date()).getTime()
      await ctx.service.community.createCommunity(data)
    }
    this.ctx.body = { code: 20000, msg: '更新成功' }
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
  async updateType() {
    const ctx = this.ctx;
    const id = ctx.request.body.id
    const data = ctx.request.body.data
    if (id) {
      await ctx.service.community.updateType(id, data)
      ctx.body = { code: 20000, msg: '修改成功' }
    } else {
      await ctx.service.community.createType(data)
      ctx.body = { code: 20000, msg: '新增成功' }
    }
  }
  async getCommunityMember() {
    const ctx = this.ctx
    const community_id = ctx.request.query.community_id
    const member = await ctx.service.community.findMember(community_id)
    ctx.body = { code: 20000, msg:'社团成员', data: member }
  }

  async updateCommunityMember() {
    const ctx = this.ctx
    const id = ctx.request.body.id
    const data = ctx.request.body.data
    const res = id ? await ctx.service.community.updateMember(id, data) : await ctx.service.community.createMember(data)
    ctx.body = { code: 20000, msg:'更新成功' }
  }
}

module.exports = Community;
