'use strict';

const Service = require('egg').Service;

class Notice extends Service {
  async findNotice(query) {
    const notice = query.id // 如果查询的时候带id了
      ? await this.app.knex('notice') 
        .where({ id: query.id, isDel: 0 })
        .select('id', 'title', 'content', 'author', 'create_time')  // 查询的时候要带详情字段
      : await this.app.knex('notice')   // 如果没有带id
        .where('title', 'like', `%${query.title || ''}%`)   // 则根据关键字、页码与每页条数进行查询
        .select('id', 'title', 'author', 'create_time')
        .andWhere({ isDel: 0 })
        .orderBy('create_time', 'desc')
        .offset(query.page * query.limit || 0)
        .limit(query.limit || 10)
      if (query.id) {
        return {notice: notice[0]};
      }
      const count = (await this.app.knex('notice').where({isDel: 0}).count('*'))[0]['count(*)']   // 公告总量
      return {notice, count};
     
  }

  async updateNotice(id, data) {
    const updateCal = await this.app.knex('notice')
      .update(data)
      .where('id', id)  // 更新id为所传id的那条公告，本系统中只用来删除数据了
    return updateCal === 1
  }

  async createNotice(data) {
    const updateCal = await this.app.knex.insert(data).into('notice')   // 创建公告
    return updateCal === 1  
  }

  async findNoticeLog(notice_id, start_time, end_time) {
    const log = await this.app.knex('notice_log')
      .select('notice.title', 'notice_log.notice_id',  'notice.create_time', 'student.stu_id', 'student.stu_name', 'student.sex')
      .leftJoin('notice', 'notice_log.notice_id', 'notice.id')
      .leftJoin('student', 'notice_log.stu_id', 'student.stu_id')
      .where(notice_id ? { notice_id } : {})
      .whereBetween('notice_log.create_time', [ start_time, end_time ])   // 查询公告日志，左连接到公告表和学生表，查询创建日期在开始日期和结束日期直接的
      return log
  }

  async createNoticeLog(data) {
    const updateCal = await this.app.knex.insert(data).into('notice_log')   // 创建公告日志
    return updateCal === 1
  }
}

module.exports = Notice;

