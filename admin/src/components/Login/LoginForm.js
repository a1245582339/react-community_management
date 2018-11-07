import React from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { withRouter } from 'react-router-dom';
const FormItem = Form.Item;
const LoginFrom = (props) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                props.history.push('/')
            }
        });
    }
    const { getFieldDecorator } = props.form;
    return (
        <Form onSubmit={handleSubmit} className="login-form">
            <FormItem label="用户名">
                {getFieldDecorator('userName', {
                    rules: [{ required: true, message: '请输入用户名' }]
                })(
                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入用户名" />
                )}
            </FormItem>
            <FormItem label="密码">
                {getFieldDecorator('password', {
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
export default LoginFromComponent;