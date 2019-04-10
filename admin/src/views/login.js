// 登陆页面整体
import React from 'react';
import '../style/login.scss'

import LoginCard from '@/components/Login/LoginCard'    // 登录的卡片部分

const Login = () => {
    return (
        <div className="login">
            <LoginCard />
        </div>
    )
}

export default Login