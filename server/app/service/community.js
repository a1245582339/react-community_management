'use strict';

const Service = require('egg').Service;

class Community extends Service {
  async findList(query) {
    const community = await this.app.knex('community')
      .leftJoin('student', 'community.chairman_stu_id', 'student.stu_id')
      .leftJoin('community_type', 'community.type', 'community_type.id')
      .select('community.*', 'student.stu_name', 'community_type.type_name')
      .where('community_name', 'like', `%${query.community_name || ''}%`)
      .orderBy('id', 'asc')
      .orderBy('create_time', 'asc')
      .offset(query.page * query.limit || 0)
      .limit(query.limit || 10)
    const count = (await this.app.knex('community').count('*'))[0]['count(*)']
    return {community, count};
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

  async updateType(id, data) {
    const updateCal = await this.app.knex('community_type')
      .update(data)
      .where('id', id)
    if (data.isDel) {
      const delCommunity = await this.app.knex('community')
        .update({isDel: 1})
        .where('type', id)  // 级联删除
      return delCommunity === 1
    }
    return updateCal === 1
  }

  async createType(data) {
    const updateCal = await this.app.knex.insert(data).into('community_type')
    return updateCal === 1
  }
}

module.exports = Community;
