'use strict';

const Controller = require('egg').Controller;
const fs = require('fs');
const path = require('path');
const awaitWriteStream = require('await-stream-ready').write;

class Notice extends Controller {
  async getNotice() {
    const ctx = this.ctx;
    const query = ctx.request.query // 获取请求体
    const {notice, count} = await ctx.service.notice.findNotice(query)  // 用请求体查表获取公告
    this.ctx.body = { code: 20000, msg: '公告', data:notice , count } // 返回给前端
  }

  async updateNotice() {
    const ctx = this.ctx;
    const id = ctx.request.body.id  // 获取请求体id
    const data = ctx.request.body.data  // 获取请求体数据
    if (id) { // 如果有id
      await ctx.service.notice.updateNotice(id, data) // 更新这一条数据
    } else {  // 如果没有
      const create_time = (new Date()).getTime()  // 设定创建时间为当前时间
      await ctx.service.notice.createNotice({...data, create_time}) // 创建数据
    }
    this.ctx.body = { code: 20000, msg: '更新成功' }
  }

  async getNoticeLog() {
    const ctx = this.ctx;
    let { notice_id, start_time, end_time } = ctx.request.query // 获取请求体
    start_time = start_time || (new Date()).getTime() - 604800000 // 开始时间默认为一周前
    end_time = end_time || (new Date()).getTime() // 结束时间默认为现在 
    const data = (await ctx.service.notice.findNoticeLog(notice_id, start_time, end_time)).reduce((total, curr) => {  // 由于查表拿到的数据是一条一条的，在这里要做聚合，把同一个公告的日志放到一起
      // console.log('notice_id>>>>>',total, curr.notice_id)
      const index = total.findIndex(item => item.notice_id === curr.notice_id)    // 数据的聚合操作
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
    const data = ctx.request.body // 获取请求体中数据
    data.create_time = (new Date()).getTime() // 创建时间为当前时间
    await ctx.service.notice.createNoticeLog(data)  // 创建日志
    this.ctx.body = { code: 20000, msg: 'logok' }
  }

  async upload() {
    const ctx = this.ctx
    const stream = await ctx.getFileStream()  // 获取前端发送至后台的文件
    
    const filename = 'notice_' + Date.now() + Math.random().toString(36).substr(2) + path   // 重命名
            .extname(stream.filename)   // 拓展名
            .toLocaleLowerCase();   // 文件名+后缀中的大写字母转为小写
    const target = './app/public/img/' + filename   // 存放位置
    const writeStream = fs.createWriteStream(target);   // 将文件存放到对应路径
    try {
      await awaitWriteStream(stream.pipe(writeStream)); // 尝试写入文件
      ctx.body = {msg: 'ok', url: 'http://localhost:3000/public/img/' + filename} // 将文件路径响应回前端
    } catch (err) {
      throw err
    }
  }
}

module.exports = Notice;