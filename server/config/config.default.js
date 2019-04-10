'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1540883393211_8180';

  // add your config here
  config.middleware = [
    'jwt',  // 使用json web token中间件
  ];
  config.jwt = {
    ignore: ['/login'],   // 请求登录接口的时候不通过中间件
  }

  config.security = {
    csrf: {
      enable: false,
    },
  };

  exports.knex = {  // kenx的数据库配置
    // database configuration
    client: {
      // database dialect
      dialect: 'mysql',
      connection: {
        // host
        host: 'localhost',
        // port
        port: '3306',
        // username
        user: 'root',
        // password
        password: '1',
        // database
        database: 'community_management',
      },
      // connection pool
      pool: { min: 0, max: 5 },
      // acquire connection timeout, millisecond
      acquireConnectionTimeout: 30000,
    },
    // load into app, default is open
    app: true,
    // load into agent, default is close
    agent: false,
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

