'use strict';

const Service = require('egg').Service;

class Student extends Service {
  async findStu(query, page, limit) {
    const stu = await this.app.knex('student')
      .where('stu_id', 'like', `%${query.stu_id ? query.stu_id : ''}%`)
      .select('stu_id', 'stu_name', 'tel', 'sex')
      .offset(page * limit || 0)
      .limit(limit || 10)
      .orderBy('stu_id')
    return stu
  }

  async update(stu_id, data) {
    const updateStu = await this.app.knex('student')
      .update(data)
      .where({ stu_id })
    return updateStu === 1
  }

  async findCom(stu_id) {
    console.log(stu_id)
    const stu = await this.app.knex('student')
      .where({
        'student.stu_id': stu_id
      })
      .leftJoin('community_student', 'student.stu_id', 'community_student.stu_id')
      .leftJoin('community', 'community_student.community_id', 'community.id')
      .select('community.community_name')
    return stu
  }
}

module.exports = Student