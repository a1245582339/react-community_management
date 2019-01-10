import React, { useState, useEffect } from 'react'
import { Modal } from 'antd';
import { getNotice } from '@/http/notice';
import '@/style/components/notice/preview.scss';
import Article from './article'

const NoticePreview = (props) => {
    const [data, useData] = useState({})
    useEffect(() => {
        fetchData()
    }, [props.noticeId])

    const fetchData = async () => {
        useData((await getNotice({id: props.noticeId})).data.data)
    }
    return (
        <Modal
            title="预览"
            visible={props.show}
            onOk={() => {props.onClose(); useData({})}}
            onCancel={() => {props.onClose(); useData({})}}
            width='480px'
            cancelButtonProps={{ style: {display: 'none'} }}
        >
            <div className="preview">
                <div className="preview-content-box">
                    <div className="preview-content">
                        <Article data={data} />
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default NoticePreview