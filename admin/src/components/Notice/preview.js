import React, { useState, useEffect } from 'react'
import { Modal } from 'antd';
import { getNotice } from '@/http/notice';  // 获取公告接口，在这里获取详情
import '@/style/components/notice/preview.scss';    // 预览框的样式
import Article from './article'

const NoticePreview = (props) => {
    const [data, useData] = useState({})    // 公告详情数据
    useEffect(() => {
        fetchData() // 获取公告详情数据
    }, [props.noticeId])    // 父组件的noticeId变化的时候调用，即点击详情按钮时

    const fetchData = async () => {
        useData((await getNotice({id: props.noticeId})).data.data)  // 调用获取接口
    }
    return (
        <Modal
            title="预览"
            visible={props.show}
            style={{ top: 20 }}
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