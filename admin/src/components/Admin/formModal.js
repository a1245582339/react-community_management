import React from 'react';
import { Modal, Form, Input, Select, message } from 'antd';
import { updateAdmin } from '@/http/admin';
import md5 from 'js-md5';

const Option = Select.Option;
const formItemLayout = {
    labelCol: {
        span: 5
    },
    wrapperCol: {
        span: 16,
        offset: 2
    }
};

const FormModal = (props) => {
    const { getFieldDecorator } = props.form
    
    const handleOk = async () => {
        const form = props.form
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            let id
            if (props.formData) {
                id = props.formData.id
            }
            values.password = md5(values.password)
            updateAdmin(values, id).then(res => {
                if (res.data.code === 20003) {
                    message.error(res.data.msg);
                } else {
                    props.onClose()
                    props.onSuccess( id ? '更新成功' : '新增成功' )
                }
            })
        });
    }

    return (
        
        <Modal
            title={ props.formData ? '编辑管理员' : '新增管理员' }
            visible={props.formShow}
            onOk={handleOk}
            onCancel={() => {props.form.resetFields(); props.onClose()}}
        >
            <Form onSubmit={() => handleOk()}>
                <Form.Item
                    {...formItemLayout}
                    label="登录名"
                >
                    {getFieldDecorator('login_name', {
                        initialValue: props.formData ? props.formData.login_name : '',
                        rules: [{
                            required: true, message: '请输入登录名！'
                        }]
                    })(
                        <Input />
                    )}
                </Form.Item>
                <Form.Item
                    {...formItemLayout}
                    label="姓名"
                >
                    {getFieldDecorator('name', {
                        initialValue:  props.formData ? props.formData.name : '',
                        rules: [{
                            required: true, message: '请输入姓名！'
                        }]
                    })(
                        <Input />
                    )}
                </Form.Item>
                <Form.Item
                    {...formItemLayout}
                    label="密码"
                >
                    {getFieldDecorator('password', {
                        initialValue:  props.formData ? props.formData.password : '',
                        rules: [{
                            required: true, message: '请输入密码！'
                        }]
                    })(
                        <Input type="password" />
                    )}
                </Form.Item>
                
                <Form.Item
                    {...formItemLayout}
                    label="角色"
                >
                    {getFieldDecorator('role', {
                        initialValue:  props.formData ? props.formData.role : '',
                        rules: [{
                            required: true, message: '请选择角色！'
                        }]
                    })(
                        <Select style={{ width: 200 }} placeholder="请选择">
                            {[{value: 1, label: '管理员'}, {value: 2, label: '超级管理员'}].map(d => <Option key={d.value} value={d.value}>{d.label}</Option>)}
                        </Select>
                    )}
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default Form.create()(FormModal)