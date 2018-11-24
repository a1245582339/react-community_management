'use strict';

const Service = require('egg').Service;

class AdminAuth extends Service {
  async find(query) {
    const admin = await this.app.mysql.get('admin', query);
    return { admin };
  }
}

module.exports = AdminAuth;
