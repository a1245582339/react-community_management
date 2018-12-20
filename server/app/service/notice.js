'use strict';

const Service = require('egg').Service;

class Notice extends Service {
  async findNotice(query) {
    const notice = query.id
      ? await this.app.knex('notice')
        .where({ id: query.id, isDel: 0 })
        .select('title', 'content', 'author', 'create_time')
      : await this.app.knex('notice')
        .where('title', 'like', `%${query.title || ''}%`)
        .select('title', 'author', 'create_time')
        .andWhere({ isDel: 0 })
        .orderBy('create_time', 'desc')
        .offset(query.page * query.limit || 0)
        .limit(query.limit || 10)
    return notice;
  }

  async updateNotice(id, data) {
    const updateCal = await this.app.knex('notice')
      .update(data)
      .where('id', id)
    return updateCal === 1
  }

  async createNotice(data) {
    const updateCal = await this.app.knex.insert(data).into('notice')
    return updateCal === 1
  }

  async findNoticeLog(notice_id, start_time, end_time) {
    const log = await this.app.knex('notice_log')
      .select('notice.title', 'notice.author', 'notice.create_time', 'student.stu_id', 'student.stu_name', 'student.sex')
      .leftJoin('notice', 'notice_log.notice_id', 'notice.id')
      .leftJoin('student', 'notice_log.stu_id', 'student.stu_id')
      .where({ notice_id })
      .whereBetween('notice_log.create_time', [ start_time, end_time ])
    return log
  }

  async createNoticeLog(data) {
    const updateCal = await this.app.knex.insert(data).into('notice_log')
    return updateCal === 1
  }
}

module.exports = Notice;

