'use strict';

const Service = require('egg').Service;

class Student extends Service {
  async findStu(query) {
    const stu = await this.app.knex('student')
      .where(query)
      .select('stu_id', 'stu_name', 'tel', 'sex')
    return stu
  }

  async update(id, data) {
    const updateStu = await this.app.knex('student')
      .update(data)
      .where('id', id)
    return updateStu === 1
  }
}

module.exports = Student
