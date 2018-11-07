import React, { useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Layout } from 'antd';
import '@/style/main.scss'

import SideMenu from './layout/sideMenu'
import HeaderBar from './layout/headerBar'

import { Pages } from './index'


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
                <Content>
                    <Switch>
                        <Redirect exact from='/main' to='/main/home' />
                        <Route path="/main/home" component={ Pages.Home } />
                        <Route path="/main/user" component={ Pages.User } />
                    </Switch>
                </Content>
            </Layout>
        </Layout>
        
    )
}

export default Main