'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1540883393211_8180';

  // add your config here
  config.middleware = [];

  config.security = {
    csrf: {
      enable: false,
    },
  };

  config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: 'localhost',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: '1',
      // 数据库名
      database: 'community_management',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };
  config.passportGithub = {
    key: 'c9f0fb769d2b542ac3f8',
    secret: '622301f684d8371a19590389ee84744ed7afbd43',
    // callbackURL: '/passport/github/callback',
    // proxy: false,
  };

  return config;
};

