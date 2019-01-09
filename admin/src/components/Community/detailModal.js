import React, { useState, useEffect } from 'react';
import { Modal, List, Button, message } from 'antd';
import { getMemeber, removeMemeber } from '@/http/community'

const DetailModal = (props) => {
    const [member, useMember] = useState([])
    const [initLoading, useInitLoading] = useState(true)
    useEffect(async () => {
        if(props.show) {
            useMember((await getMemeber(props.detail.id)))
            useInitLoading(false)
        }
    }, [props.show])
    const handleRemove = async (id) => {
        await removeMemeber(id)
        let newMember = member.filter(item => item.id !== id)
        useMember(newMember)
        message.success('移除成功');
    }

    return (
        <Modal
            title={`${props.detail.community_name}成员`}
            visible={props.show}
            onOk={() => {props.onClose(); useMember([])}}
            onCancel={() => {props.onClose(); useMember([])}}
            cancelButtonProps={{ style: {display: 'none'} }}
        >
            <List
                header={<div>社团成员</div>}
                loading={initLoading}
                itemLayout="horizontal"
                size="small"
                bordered
                dataSource={member}
                renderItem={item =>(
                    <List.Item actions={[<Button type="danger" ghost onClick={() => handleRemove(item.id)}>移除</Button>]}>
                        <List.Item.Meta
                            title={item.stu_name}
                            description={`手机号：${item.tel}`}
                        />
                    </List.Item>
                ) 
                }
            />
        </Modal>
    )
}

export default DetailModal