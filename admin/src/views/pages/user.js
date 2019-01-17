import React, { useEffect, useState } from 'react'
import { getMe, updateAdmin } from '@/http/admin';
const User = () => {
    const [info, useInfo] = useState({})
    useEffect(async () => {
        useInfo(await getMe())
    }, [])
    return(
        <>
            MyForm
        </>
    )
}

export default User