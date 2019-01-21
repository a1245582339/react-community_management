import React, { useEffect, useState } from 'react'
import { Card } from 'antd';
import { getMe } from '@/http/admin';
import MyForm from '@/components/Me/BaseForm';
import PasswordForm from '@/components/Me/PasswordForm';
const User = () => {
    const [info, useInfo] = useState({})
    useEffect(async () => {
        useInfo(await getMe())
    }, [])
    return( 
        <>
            <Card
                title="基本信息"
                style={{ width: 1000 }}
            >
                <MyForm formData={info} />
            </Card>

            <Card
                title="密码修改"
                style={{ width: 1000, marginTop: 50 }}
            >
                <PasswordForm formData={info} />
            </Card>
            
        </>
    )
}

export default User