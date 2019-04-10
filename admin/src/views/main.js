// 登录进入后的页面主体部分

import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { Layout, message } from 'antd';
import { getToken } from '@/utiles/js-cookie'   // 获取令牌的工具
import '@/style/main.scss'
import { getMe } from '@/http/admin';   // 获取个人信息的接口

import SideMenu from './layout/sideMenu'    // 侧边栏组件
import HeaderBar from './layout/headerBar'  // 顶部导航栏组件

import Pages from './pages' // 所有内容页面
import NoFound from './404' // NoFound页面
import NoPermission from './401'    // 无权限页面



const { Header, Sider, Content } = Layout;
const style = {height: '100%'}

const Main = (props) => {
    
    useEffect(() => {
        LoginOut()  // 调用下面的登出方法
    }, [props.history.location.pathname])   // 路径变化时验证

    const LoginOut = () => {
        // 用来强制退出登录
        if (!getToken() || getToken() === 'undefined') {
            // 如果getoken找不到token或者找到的是个undefined，那么强制跳转到登录页并提示
            message.warning('登录过期！请重新登登录！');
            // 跳转到 /login
            props.history.push('/login')
        }
    }

    const [collapsed, useCollapsed] = useState(false)   // 定义侧边栏收起状态和改变收起状态的方法，默认false
    
    const [openKeys, useOpenKeys] = useState([]);   // 侧边栏中打开的页签，默认全部收起
    const [role, useRole] = useState(1)     // 定义当前的角色，默认是1普通管理员
    useEffect(async () => {
        // 进入页面后立即执行这一块代码
        const currRole = (await getMe()).role   // 获取用户信息
        useRole(currRole)   // 将获取到的用户权限赋值给页面中的权限
    }, [])  // 这里传一个空数组，即只执行一次
    const handleCollapsedChange = () => {
        // 手动控制打开和关闭侧边栏的方法
        useCollapsed(!collapsed)
        if (!collapsed) {
            // 如果侧边栏关上了，将所有侧边栏打开的页签全合上
            useOpenKeys([])
        }
    }
    return (
        <Layout style={style}>
            <Sider className="sider" collapsed={collapsed} >
                {/* 侧边栏打开了 ？ 如果打开了，显示小的图标 ： 如果没打开，显示大图标 */}
                {collapsed  
                    ? 
                    <div className="sidebar-logo-collapsed">
                        <img src={ require("@/assets/avater.png") }  alt="logo" />
                    </div> 
                    : 
                    <div className="sidebar-logo">
                        <img src={ require("@/assets/logo.png") }  alt="logo" />
                    </div>} 
                <SideMenu collapsed={collapsed} openKeys={openKeys} useOpenKeys={useOpenKeys} />
            </Sider>
            <Layout>
                <Header>
                    <HeaderBar collapsed={collapsed} handleCollapsedChange={handleCollapsedChange} />
                    
                </Header>
                <Content className="content">
                    <Switch>
                        <Redirect exact from='/main' to='/main/home' />
                        <Route path="/main/home" component={ Pages.Home } />
                        <Route path="/main/user" component={ Pages.User } />
                        <Route path="/main/newBulletin" component={ Pages.NewBulletin } />
                        <Route path="/main/community" component={ Pages.Community } />
                        <Route path="/main/notice" component={ Pages.Notice } />
                        <Route path="/main/statistics" component={ Pages.Statistics } />
                        {/* 权限验证，如果是普通管理员，访问这里直接显示无权限页面，如果是超级管理员，可进入管理员管理页面 */}
                        { role === 1 ? <NoPermission /> : <Route path="/main/admin" component={ Pages.Admin } />}
                        <Route path="/main/admin" component={ Pages.Admin } />
                        <Route component={ NoFound } />
                    </Switch>
                </Content>
            </Layout>
        </Layout>
        
    )
}

export default withRouter(Main)