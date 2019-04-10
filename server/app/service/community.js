'use strict';

const Service = require('egg').Service;

class Community extends Service {
  async findList(query) {
    const community = await this.app.knex('community')
      .leftJoin('student', 'community.chairman_stu_id', 'student.stu_id') // 左连接学生表
      .leftJoin('community_type', 'community.type', 'community_type.id')  // 左连接类型表
      .select('community.*', 'student.stu_name', 'community_type.type_name')  // 查询社团的所有信息、主席姓名和类型名称
      .where('community_name', 'like', `%${query.community_name || ''}%`) // 查询关键字
      .orderBy('id', 'asc') // 按id升序
      .orderBy('create_time', 'asc')  //  按创建时间升序 
      .offset(query.page * query.limit || 0)  // 分页
      .limit(query.limit || 10) // 查询条数
    const count = (await this.app.knex('community').count('*'))[0]['count(*)']  // 总量
    return {community, count};
  }

  async updateCommunity(id, data) {
    const updateCal = await this.app.knex('community')
      .update(data)
      .where('id', id)    // 更新id为传入id的社团
    return updateCal === 1
  }

  async createCommunity(data) {
    const updateCal = await this.app.knex.insert(data).into('community')
    return updateCal === 1  // 创建社团
  }

  async findDept() {
    const dept = await this.app.knex('dept').where({ isDel: 0 })
    return dept;  // 查询未被删除的部门
  }

  async findType() {
    const community_type = await this.app.knex('community_type').where({ isDel: 0 })
    return community_type;  // 查询未被删除的类型
  }

  async updateType(id, data) {  // 没用到
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

  async createType(data) {  // 没用到
    const updateCal = await this.app.knex.insert(data).into('community_type')
    return updateCal === 1
  }

  async findMember(community_id) {  // 没用到
    const member = await this.app.knex.select('student.stu_id', 'student.stu_name', 'student.tel', 'community_student.role', 'community_student.id')
      .from('community_student')
      .where({community_id, isDel: 0})
      .leftJoin('student', 'community_student.stu_id', 'student.stu_id')
    return member
  }

  async createMember(data) {  // 没用到
    const createCal = await this.app.knex.insert(data).into('community_student')
    return createCal === 1
  }

  async updateMember(id, data) {  // 没用到
    const updateCal = await this.app.knex('community_student').update(data).where('id', id)
    return updateCal === 1
  }

}

module.exports = Community;
