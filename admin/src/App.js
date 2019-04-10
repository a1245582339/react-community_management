import React, { Component } from 'react';
import './App.css';     // App的样式
import { Switch, Route, Redirect } from 'react-router-dom';     // 路由跳转的组件
import Views from './views' // 全部页面文件
class App extends Component {
    render() {
        return (
            // 路由跳转控制器
            <Switch>
                {/* 当访问 / 的时候，强制定向到 /main */}
                <Redirect exact from='/' to='/main' />
                {/* 访问 /main 的时候，去首页 */}
                <Route path="/main" component={ Views.Main } />
                {/* 访问 /login 的时候，去登录页 */}
                <Route path="/login" component={ Views.Login } />
                {/* 访问 /401 的时候，去无权限页 */}
                <Route path="/401" component={ Views.NoPermission } />
                {/* 上面都没匹配到的话，去nofound页 */}
                <Route component={ Views.NoFound } />
            </Switch>
        );
    }
}

// 导出app供别的地方调用
export default App;
