// 顶部栏右侧下拉菜单
import React from 'react'
import { Menu, Dropdown, Icon } from 'antd';
import { withRouter } from 'react-router-dom';
import { delToken } from '@/utiles/js-cookie';

const DropMenu = (props) => {
    const LoginOut = () => {
        delToken()  // 删除cookie中的token
        props.history.push('/login')    // 跳转到登录页
    }
    const menu = (
        <Menu>
            {/* 点击个人信息跳转到 /user */}
            <Menu.Item key="1" onClick={() => props.history.push('/main/user')}><Icon type="user" theme="outlined" /><span>个人信息</span></Menu.Item>
            {/* 点击退出登录调用loginout方法 */}
            <Menu.Item key="2" onClick={LoginOut}><Icon type="export" theme="outlined" /><span>退出登录</span></Menu.Item>
        </Menu>
    );
    return(
        <Dropdown style={{cursor: 'point'}} overlay={menu}>
            <div className="drop-link">
                <img src={ require('@/assets/avater.png') } alt="avater"/>
                <Icon style={{color: '#f8f8f9'}} type="down" />
            </div>
        </Dropdown>
    )
}

export default withRouter(DropMenu)