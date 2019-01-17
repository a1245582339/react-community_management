import React, { useState, useEffect } from 'react';
import { Button, Table, message, Modal } from 'antd'
import FormModal from '@/components/Admin/formModal';
import { getAdmin, updateAdmin, getMe } from '@/http/admin';

const ButtonGroup = Button.Group;

  
const Admin = () => {
    const columns = [{
        title: '登录名',
        dataIndex: 'login_name',
        key: 'login_name'
    }, {
        title: '姓名',
        dataIndex: 'name',
        key: 'name'
    }, {
        title: '角色',
        dataIndex: 'role_name',
        key: 'role_name'
    }, {
        title: '操作',
        key: 'action',
        render: (text, record) => {
            if (record.id === me.id) {
                return (
                    <span>不可操作自己</span>
                )
            }
            else {
                return (
                    <span>
                        <ButtonGroup>
                            <Button type="primary" icon="edit" onClick={() => (handleClickForm(record))} />
                            <Button type="danger" icon="close-circle" onClick={() => (handleDel(record))} />
                        </ButtonGroup>
                    </span>
                )
            }
        }
    }];

    const [data, useData] = useState([]);
    const [loading, useLoading] = useState(true);
    const [formShow, useFormShow] = useState(false);
    const [form, useForm] = useState({})
    const [me, useMe] = useState({})
    useEffect(async () => {
        fetchData()
        useMe(await getMe())
    }, [])

    const fetchData = async () => {
        useLoading(true)
        const data = await getAdmin()
        useData(data)
        useLoading(false)
    }
    const handleClickForm = (form) => {
        useForm(form)
        useFormShow(true)
    }

    const onEditSuccess = (msg) => {
        message.success(msg)
        fetchData()
    }

    const handleDel = (data) => {
        Modal.confirm({
            title: '确定删除此管理员？',
            onOk() {
                updateAdmin({isDel: 1}, data.id).then(() => {
                    message.success('删除成功');
                })
                fetchData()
            },
            onCancel() {}
        });
    }

    return (
        <>
            <Button icon="plus-circle" style={{float: 'right'}} type="primary" onClick={() => handleClickForm()}>添加管理员</Button>
            <Table pagination={false} style={{marginTop: '50px',background: '#fff'}} dataSource={data} columns={columns} loading={loading} />
            
            <FormModal formData={form} formShow={formShow} onClose={() => {useFormShow(false)}} onSuccess={(msg) => onEditSuccess(msg)} />
        </>
    )
}

export default Admin