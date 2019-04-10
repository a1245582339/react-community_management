'use strict';

const Controller = require('egg').Controller;

class Community extends Controller {
  async getCommunity() {
    const ctx = this.ctx;
    const query = ctx.request.query // 获取请求体
    const {community, count} = await ctx.service.community.findList(query)  // 用请求体查社团表
    this.ctx.body = { code: 20000, msg: '社团列表', data: community, count }  // 给前端返回数据
  }

  async updateCommunity() {
    const ctx = this.ctx;
    const id = ctx.request.body.id  // 获取请求体的id
    const data = ctx.request.body.data  // 获取请求体中的数据
    if (id) { // 如果有id
      await ctx.service.community.updateCommunity(id, data) // 更新这一条
    } else {  // 如果没有
      data.create_time = (new Date()).getTime() // 创建时间设置为当前时间
      await ctx.service.community.createCommunity(data) // 创建这一条
    }
    this.ctx.body = { code: 20000, msg: '更新成功' }
  }

  async getDept() {
    const ctx = this.ctx;
    const data = await ctx.service.community.findDept({}) // 直接获取所有部门
    this.ctx.body = { code: 20000, msg: '部门列表', data }
  }

  async getType() {
    const ctx = this.ctx;
    const data = await ctx.service.community.findType({}) // 同上
    this.ctx.body = { code: 20000, msg: '社团分类列表', data }
  }
  async updateType() {  // 同updateCommunity
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
  async getCommunityMember() {  // 没用到
    const ctx = this.ctx
    const community_id = ctx.request.query.community_id
    const member = await ctx.service.community.findMember(community_id)
    ctx.body = { code: 20000, msg:'社团成员', data: member }
  }

  async updateCommunityMember() { // 这个也没用到
    const ctx = this.ctx
    const id = ctx.request.body.id
    const data = ctx.request.body.data
    const res = id ? await ctx.service.community.updateMember(id, data) : await ctx.service.community.createMember(data)
    ctx.body = { code: 20000, msg:'更新成功' }
  }
}

module.exports = Community;
