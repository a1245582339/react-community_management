import React from 'react'
import { Card } from 'antd';

import LoginForm from './LoginForm'

const LoginCard = () => {
    return (
        <Card
            className="login-card"
            hoverable
            style={{ width: '20%', margin: '0 auto' }}
        >
            <div className="login-title">
                <img width="30" src={ require("@/assets/logo.svg") } alt="logo"/>
                XX管理系统
            </div>
            <LoginForm />
        </Card>
    )
}

export default LoginCard 