import React from 'react'
import { Menu, Dropdown, Icon } from 'antd';
import { withRouter } from 'react-router-dom';

const DropMenu = (props) => {
    const LoginOut = () => {
        props.history.push('/login')
    }
    const menu = (
        <Menu>
            <Menu.Item key="1" onClick={() => props.history.push('/main/user')}><Icon type="user" theme="outlined" /><span>个人信息</span></Menu.Item>
            <Menu.Item key="2" onClick={LoginOut}><Icon type="export" theme="outlined" /><span>退出登录</span></Menu.Item>
        </Menu>
    );
    return(
        <Dropdown style={{cursor: 'point'}} overlay={menu}>
            <div className="drop-link">
                <img src={ require('@/assets/avater.jpg') } alt="avater"/>
                <Icon style={{color: '#f8f8f9'}} type="down" />
            </div>
        </Dropdown>
    )
}

export default withRouter(DropMenu)