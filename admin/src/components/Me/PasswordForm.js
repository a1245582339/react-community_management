import React from 'react'
import { Form, Icon, Input, Button, message } from 'antd';
import { withRouter } from 'react-router-dom';
import { updateAdmin, checkPassword } from '@/http/admin';
import md5 from 'js-md5';

const formItemLayout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 12, offset: 1 }
};

const FormItem = Form.Item;
const LoginFrom = (props) => {

    const handleSubmit = (e) => {
        e.preventDefault();
        props.form.validateFields(async (err, values) => {
            if (!err) {
                const {login_name, id} = props.formData
                const {password, newPassword} = values
                if((await checkPassword({login_name, password: md5(password)})).data.code === 20000) {
                    await updateAdmin({password: md5(newPassword)}, id)
                    message.success('更新成功！');
                } else {
                    message.error('原密码错误！修改失败！');
                }
            }
        });
    }

    const checkPasswordValidator = (rule, value, callback) => {
        if (!/^[a-zA-Z]\w{5,17}$/.test(value)) {
            callback(new Error('以字母开头，长度在6~18之间，只能包含字母、数字和下划线！'));
        } else {
            callback();
        }
    }

    const compareToFirstPassword = (rule, value, callback) => {
        const form = props.form;
        if (value && value !== form.getFieldValue('newPassword')) {
            callback('两次密码必须一致！');
        } else {
            callback();
        }
    }
    

    const { getFieldDecorator } = props.form;
    return (
        <Form onSubmit={handleSubmit} className="login-form">
            <FormItem label="原密码"
                {...formItemLayout}>
            
                {getFieldDecorator('password', {
                    rules: [{ required: true, message: '请输入原密码' }]
                })(
                    <Input type="password" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入原密码" />
                )}
            </FormItem>
            <FormItem label="新密码"
                {...formItemLayout}>
            
                {getFieldDecorator('newPassword', {
                    rules: [{ required: true, message: '请输入新密码' }, { validator: checkPasswordValidator }]
                })(
                    <Input type="password" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入新密码" />
                )}
            </FormItem>
            <FormItem label="重复密码"
                {...formItemLayout}>
            
                {getFieldDecorator('repeatPassword', {
                    rules: [{ required: true, message: '请重复新密码' }, { validator: compareToFirstPassword }]
                })(
                    <Input type="password" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请重复新密码" />
                )}
            </FormItem>
            <FormItem>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    确定
                </Button>
            </FormItem>
        </Form>
    )
}

const WrappedNormalLoginForm = Form.create()(LoginFrom);
const LoginFromComponent = withRouter(WrappedNormalLoginForm);
export default LoginFromComponent;
