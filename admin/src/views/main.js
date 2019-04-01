import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { Layout, message } from 'antd';
import { getToken } from '@/utiles/js-cookie'
import '@/style/main.scss'
import { getMe } from '@/http/admin';

import SideMenu from './layout/sideMenu'
import HeaderBar from './layout/headerBar'

import Pages from './pages'
import NoFound from './404'
import NoPermission from './401'



const { Header, Sider, Content } = Layout;
const style = {height: '100%'}

const Main = (props) => {
    
    useEffect(() => {
        LoginOut()
    }, [props.history.location.pathname])   // 路径变化时验证

    const LoginOut = () => {
        if (!getToken() || getToken() === 'undefined') {
            message.warning('登录过期！请重新登登录！');
            props.history.push('/login')
        }
    }

    const [collapsed, useCollapsed] = useState(false)
    
    const [openKeys, useOpenKeys] = useState([]);
    const [role, useRole] = useState(1)
    useEffect(async () => {
        const currRole = (await getMe()).role
        useRole(currRole)
    }, [])
    const handleCollapsedChange = () => {
        useCollapsed(!collapsed)
        if (!collapsed) {
            useOpenKeys([])
        }
    }
    return (
        <Layout style={style}>
            <Sider className="sider" collapsed={collapsed} >
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