import React from 'react'
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
import { withRouter } from 'react-router-dom';
import { login } from '@/http/login';
import { setToken } from '@/utiles/js-cookie';
import md5 from 'js-md5';

const FormItem = Form.Item;
const LoginFrom = (props) => {

    const handleSubmit = (e) => {
        e.preventDefault();
        props.form.validateFields(async (err, values) => {
            if (!err) {
                values.password = md5(values.password)
                const res = await login(values)
                if (res.data.code === 20000) {
                    const token = res.data.token
                    setToken('bare ' + token)
                    props.history.push('/')
                    message.success('登录成功！')
                } else {
                    message.error(res.data.msg)
                }
                
            }
        });
    }
    const { getFieldDecorator } = props.form;
    return (
        <Form onSubmit={handleSubmit} className="login-form">
            <FormItem label="用户名">
                {getFieldDecorator('login_name', {
                    initialValue: 'admin',
                    rules: [{ required: true, message: '请输入用户名' }]
                })(
                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入用户名" />
                )}
            </FormItem>
            <FormItem label="密码">
                {getFieldDecorator('password', {
                    initialValue: '111111',
                    rules: [{ required: true, message: '请输入密码!' }]
                })(
                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请输入密码" />
                )}
            </FormItem>
            <FormItem>
                {getFieldDecorator('remember', {
                    valuePropName: 'checked',
                    initialValue: true
                })(
                    <Checkbox>记住密码</Checkbox>
                )}
                <Button type="primary" htmlType="submit" className="login-form-button">
                    登录
                </Button>
            </FormItem>
        </Form>
    )
}

const WrappedNormalLoginForm = Form.create()(LoginFrom);
const LoginFromComponent = withRouter(WrappedNormalLoginForm);
export default withRouter(LoginFromComponent);
