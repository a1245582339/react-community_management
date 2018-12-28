import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'antd';

const FormModal = (props) => {
    const handleOk = () => {

    }
    const handleCancel = () => {
        
    }
    return (
        <Modal
            title="Basic Modal"
            visible={props.formShow}
            onOk={handleOk}
            onCancel={handleCancel}
        >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </Modal>
    )
}

export default FormModal