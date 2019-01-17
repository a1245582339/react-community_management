import React, { useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Layout } from 'antd';
import '@/style/main.scss'

import SideMenu from './layout/sideMenu'
import HeaderBar from './layout/headerBar'

import Pages from './pages'


const { Header, Sider, Content } = Layout;
const style = {height: '100%'}

const Main = () => {
    const [collapsed, useCollapsed] = useState(false)
    
    const [openKeys, useOpenKeys] = useState([]);
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
                        <img src={ require("@/assets/react_logo.png") }  alt="logo" />
                    </div> 
                    : 
                    <div className="sidebar-logo">
                        <img src={ require("@/assets/logo.svg") }  alt="logo" />
                        <span>&</span>
                        <img src={ require("@/assets/react_logo.png") }  alt="logo" />
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
                        <Route path="/main/admin" component={ Pages.Admin } />
                    </Switch>
                </Content>
            </Layout>
        </Layout>
        
    )
}

export default Main