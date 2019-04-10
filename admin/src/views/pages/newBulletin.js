// 创建公告的页面
import React, { useCallback, useState } from 'react';
import { Button, Input, Modal, message } from 'antd';
import RichText from '@/components/RichText';   // 富文本编辑器的组件
import { updateNotice } from '@/http/notice';   // 创建公告的接口
import '@/style/pages/newBulletin.scss';    // 页面样式

const NewBulletin = (props) => {
    const [title, useTitle] = useState('')  // 标题
    const [author, useAuthor] = useState('')    // 作者
    const [richText, useRichText] = useState('<p></p>') // 富文本内容，默认是个p标签
    const [visible, useVisible] = useState(false)   // 弹框显示与否
    const [confirmLoading, useConfirmLoading] = useState(false) // 提交后的loading
    const [confirmText, useConfirmText] = useState('')  // 确认显示的提示文字

    const titleChange = useCallback((e) => {
        useTitle(e.target.value)    // 修改title变量
    }, [title]) // 当title的文本框内容变化时

    const authorChange = useCallback((e) => {
        useAuthor(e.target.value)   // 同上
    }, [author])
    
    const richTextChange = useCallback((richTextcb) => {
        useRichText(richTextcb) // 再一次同上
    }, [richText])

    const handleSubmit = () => {
        if (richText === '<p></p>') {   // 点击提交时，如果富文本内就是个空的p标签
            useConfirmText('该公告没有添加正文，是否确认提交？')    // 提示内容
        } else {    // 如果有内容
            useConfirmText('是否确认提交？')    // 另一个提示内容
        }
        useVisible(true)    // 提示文字确定好之后，显示弹框
    }

    const handleOk = async () => {  // 点击确认提交时调用
        const data = {
            title, 
            author,
            content: richText
        }   // 要提交的数据体
        useConfirmLoading(true) // 开始loading
        await updateNotice(data)    // 调用提交接口
        message.success('创建成功');    // 提示成功
        useConfirmLoading(false)    // 结束loading
        props.history.push({pathname: '/main/notice'}) // 跳转到公告列表页
    }

    const handleCancel = () => {    // 弹框中点击取消按钮
        useVisible(false)   // 关闭弹框
    }
    
    return (
        <>  
            <div className="from-item">
                <p>标题</p>
                <Input onChange={titleChange} placeholder="请输入标题" />
            </div>
            <div className="from-item">
                <p>作者</p>
                <Input onChange={authorChange} placeholder="请输入作者" />
            </div>
            <div className="from-item">
                <p>内容</p>
                {/* 富文本组件 */}
                <RichText onChange={richTextChange}/>
            </div>
            
            {/* 标题或作者有一个是空，则允许点击 */}
            <Button disabled={!title || !author} onClick={handleSubmit} style={{float: 'right', marginTop: '20px'}} size="large" type="primary">发布</Button>

            <Modal title="Title"
                visible={visible}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <p>{confirmText}</p>
            </Modal>
        </>
    )
}

export default NewBulletin