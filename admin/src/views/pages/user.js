import React, { useEffect, useState } from 'react'
import { getMe, updateAdmin } from '@/http/admin';
import MyForm from '@/components/Me/Form';
const User = () => {
    const [info, useInfo] = useState({})
    useEffect(async () => {
        useInfo(await getMe())
    }, [])
    return( 
        <>
            <MyForm formData={info} />
        </>
    )
}

export default User