'use strict';

const Controller = require('egg').Controller;
const fs = require('fs');
const path = require('path');
const awaitWriteStream = require('await-stream-ready').write;

class Notice extends Controller {
  async getNotice() {
    const ctx = this.ctx;
    const query = ctx.request.query
    const data = await ctx.service.notice.findNotice(query)
    this.ctx.body = { code: 20000, msg: '公告', data }
  }

  async updateNotice() {
    const ctx = this.ctx;
    const id = ctx.request.body.id
    const data = ctx.request.body.data
    if (id) {
      await ctx.service.notice.updateNotice(id, data)
    } else {
      data.create_time = (new Date()).getTime()
      await ctx.service.notice.createNotice(data)
    }
    this.ctx.body = { code: 20000, msg: '更新成功' }
  }

  async getNoticeLog() {
    const ctx = this.ctx;
    let { notice_id, start_time, end_time } = ctx.request.query
    start_time = start_time || 0
    end_time = end_time || (new Date()).getTime()
    const data = await ctx.service.notice.findNoticeLog(notice_id, start_time, end_time)
    this.ctx.body = { code: 20000, msg: '公告日志', data }
  }

  async createNoticeLog() {
    const ctx = this.ctx;
    const data = ctx.request.body.data
    data.create_time = Date.now()
    await ctx.service.notice.createNoticeLog(data)
    this.ctx.body = { code: 20000, msg: 'log' }
  }

  async upload() {
    const ctx = this.ctx
    const stream = await ctx.getFileStream()
    console.log(stream._readableState.buffer)
    const filename = 'notice_' + Date.now() + Math.random().toString(36).substr(2) + path
            .extname(stream.filename)
            .toLocaleLowerCase();
    const target = './app/file/img/' + filename
    const writeStream = fs.createWriteStream(target);
    try {
      await awaitWriteStream(stream.pipe(writeStream));
      // await fs.writeFile(target + filename, stream._readableState.buffer)
      ctx.body = {msg: 'ok'}
    } catch (err) {
      throw err
    }
  }

}

module.exports = Notice;
