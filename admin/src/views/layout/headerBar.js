import React from 'react'
import { Button, Icon } from 'antd';
import DropMenu from '@/components/Header/dropMenu'

const HeaderBar = (props) => {
    return (
        <>
            <Button onClick={props.handleCollapsedChange} type="primary">
                <Icon type={props.collapsed ? "menu-unfold" : "menu-fold"} theme="outlined" />
            </Button>
            <DropMenu />
        </>
    )
}

export default HeaderBar