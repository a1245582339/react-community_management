'use strict';

const Service = require('egg').Service;

class Community extends Service {
  async findList(query) {
    const community = await this.app.knex('community')
      .leftJoin('student', 'community.chairman_stu_id', 'student.stu_id')
      .select('community.*', 'student.stu_name')
      .where('community_name', 'like', `%${query.community_name || ''}%`)
      .orderBy('id', 'asc')
      .orderBy('create_time', 'asc')
      .offset(query.page * query.limit || 0)
      .limit(query.limit || 10)
    return community;
  }

  async updateCommunity(id, data) {
    const updateCal = await this.app.knex('community')
      .update(data)
      .where('id', id)
    return updateCal === 1
  }

  async createCommunity(data) {
    const updateCal = await this.app.knex.insert(data).into('community')
    return updateCal === 1
  }

  async findDept() {
    const dept = await this.app.knex('dept').where({ isDel: 0 })
    return dept;
  }

  async findType() {
    const community_type = await this.app.knex('community_type').where({ isDel: 0 })
    return community_type;
  }
}

module.exports = Community;
