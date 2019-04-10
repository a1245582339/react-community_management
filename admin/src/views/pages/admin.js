import React, { useState, useEffect } from 'react';
import { Button, Table, message, Modal } from 'antd'
import FormModal from '@/components/Admin/formModal';   // 表单弹窗
import { getAdmin, updateAdmin, getMe } from '@/http/admin';    // 获取管理员、更新管理员、获取个人信息接口

const ButtonGroup = Button.Group;

  
const Admin = () => {
    const columns = [{  // 表格表头
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
            if (record.id === me.id) {  // 如果这一条是自己，不允许在此处操作
                return (
                    <span>请在个人信息页面操作</span>
                )
            } else if (record.role === 2) { // 如果是超级管理员，不允许操作
                return (
                    <span>不可操作超级管理员</span>
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

    const [data, useData] = useState([]);   // 管理员信息
    const [loading, useLoading] = useState(true);   // loading状态
    const [formShow, useFormShow] = useState(false);    // 弹窗状态
    const [form, useForm] = useState({})    // 表单内容
    const [me, useMe] = useState({})    // 个人信息
    useEffect(async () => { // 进入页面后立即执行
        fetchData() // 获取管理员列表
        useMe(await getMe())    // 获取个人信息
    }, [])

    const fetchData = async () => { // 获取管理员列表的方法
        useLoading(true)    // 开始loading
        const data = await getAdmin()   // 获取管理员列表
        useData(data)   // 将列表数据赋值给页面
        useLoading(false)   // 停止loading
    }
    const handleClickForm = (form) => { // 点击新建或编辑时的弹框
        useForm(form)   // 把这一条管理员信息放到表单中
        useFormShow(true)   // 打开表单弹窗
    }

    const onEditSuccess = (msg) => {
        message.success(msg)    // 成功后的调试信息
        fetchData() // 成功后重新获取数据
    }

    const handleDel = (data) => {
        Modal.confirm({ // 删除弹窗
            title: '确定删除此管理员？',
            onOk() {
                updateAdmin({isDel: 1}, data.id).then(() => {   // 删除用户
                    message.success('删除成功');
                })
                fetchData() // 删除后重新获取数据
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