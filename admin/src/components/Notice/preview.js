import React, { useState, useEffect } from 'react'
import { Modal } from 'antd';

const NoticePreview = (props) => {
    return (
        <Modal
            visible={props.show}
            onOk={() => props.onClose()}
            onCancel={() => props.onClose()}
            cancelButtonProps={{ style: {display: 'none'} }}
        >
            <div >

            </div>
        
        </Modal>
    )
}

export default NoticePreview