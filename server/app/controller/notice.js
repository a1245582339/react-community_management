'use strict';

const Controller = require('egg').Controller;
const fs = require('fs');
const path = require('path');
const awaitWriteStream = require('await-stream-ready').write;

class Notice extends Controller {
  async getNotice() {
    const ctx = this.ctx;
    const query = ctx.request.query
    const {notice, count} = await ctx.service.notice.findNotice(query)
    this.ctx.body = { code: 20000, msg: '公告', data:notice , count }
  }

  async updateNotice() {
    const ctx = this.ctx;
    const id = ctx.request.body.id
    const data = ctx.request.body.data
    if (id) {
      await ctx.service.notice.updateNotice(id, data)
    } else {
      const create_time = (new Date()).getTime()
      await ctx.service.notice.createNotice({...data, create_time})
    }
    this.ctx.body = { code: 20000, msg: '更新成功' }
  }

  async getNoticeLog() {
    const ctx = this.ctx;
    let { notice_id, start_time, end_time } = ctx.request.query
    start_time = start_time || (new Date()).getTime() - 604800000
    end_time = end_time || (new Date()).getTime()
    const data = (await ctx.service.notice.findNoticeLog(notice_id, start_time, end_time)).reduce((total, curr) => {
      // console.log('notice_id>>>>>',total, curr.notice_id)
      const index = total.findIndex(item => item.notice_id === curr.notice_id)    // 已存在curr中title的index
      if (index > -1) {
        total[index].data.push(curr)
        return [...total]
      } else {
        return [...total, {title: curr.title, notice_id: curr.notice_id, data: [curr]}]
      }
    }, [])
    this.ctx.body = { code: 20000, msg: '公告日志', data }
  }

  async createNoticeLog() {
    const ctx = this.ctx;
    const data = ctx.request.body
    data.create_time = (new Date()).getTime()
    await ctx.service.notice.createNoticeLog(data)
    this.ctx.body = { code: 20000, msg: 'logok' }
  }

  async upload() {
    const ctx = this.ctx
    const stream = await ctx.getFileStream()
    
    const filename = 'notice_' + Date.now() + Math.random().toString(36).substr(2) + path
            .extname(stream.filename)
            .toLocaleLowerCase();
    const target = './app/public/img/' + filename
    const writeStream = fs.createWriteStream(target);
    try {
      await awaitWriteStream(stream.pipe(writeStream));
      ctx.body = {msg: 'ok', url: 'http://localhost:3000/public/img/' + filename}
    } catch (err) {
      throw err
    }
  }

}

module.exports = Notice;