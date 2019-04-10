'use strict';

const Service = require('egg').Service;

class Admin extends Service {

  async find(query) {
    const admin = await this.app.knex.select('id', 'login_name', 'password', 'name', 'role').from('admin')
      .where({
        ...query,
        isDel: 0
      })  // 查询admin表中满足请求要求的并且没删掉的'id', 'login_name', 'password', 'name', 'role'字段
    return admin;
  }

  async update(id, data) {
    const updateAdmin = await this.app.knex('admin') 
      .update(data)
      .where('id', id)  // 查询id为请求的id的那条管理员信息并修改数据
    return updateAdmin === 1
  }

  async create(data) {
    const createAdmin = await this.app.knex
      .insert({...data, password: '0b4e7a0e5fe84ad35fb5f95b9ceeac79'})
      .into('admin')  // 创建一条数据，密码设置为六个1（md5加密了）
    return createAdmin === 1
  }
}

module.exports = Admin;
