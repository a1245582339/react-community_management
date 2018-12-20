'use strict';

const Service = require('egg').Service;

class Student extends Service {
  async findStu(query) {
    const stu = await this.app.knex('student')
      .where(query.stu_id ? { stu_id: query.stu_id } : {})
      .select('stu_id', 'stu_name', 'tel', 'sex')
    return stu
  }
}

module.exports = Student
