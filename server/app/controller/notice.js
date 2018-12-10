'use strict';

const Controller = require('egg').Controller;

class Notice extends Controller {
  async getNotice() {
    const ctx = this.ctx;
    const query = ctx.query
    const data = await ctx.service.notice.findNotice(query)
    this.ctx.body = { code: 20000, msg: '公告', data }
  }

  async getNoticeLog() {
    const ctx = this.ctx;
    let { notice_id, start_time, end_time } = ctx.query
    start_time = start_time || 0
    end_time = end_time || (new Date()).getTime()
    const data = await ctx.service.notice.findNoticeLog(notice_id, start_time, end_time)
    this.ctx.body = { code: 20000, msg: '公告日志', data }
  }
}

module.exports = Notice;
