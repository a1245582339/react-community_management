// 登录表单
import React from 'react'
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
import { withRouter } from 'react-router-dom';
import { login } from '@/http/login';   // 登录接口
import { setToken } from '@/utiles/js-cookie';  // 存放令牌
import md5 from 'js-md5';   // 加密工具

const FormItem = Form.Item;
const LoginFrom = (props) => {

    const handleSubmit = (e) => {
        // 手动点击登录时调用的方法
        e.preventDefault();     // 阻止button默认的提交事件，并使用下面的代码提交
        props.form.validateFields(async (err, values) => {  // 验证表单是否合法
            if (!err) {     // 如果合法
                values.password = md5(values.password)  // 密码加密
                const res = await login(values)     // 用户名密码发送给后台
                if (res.data.code === 20000) {      // 如果登录成功
                    const token = res.data.token    // 拿到后台响应数据中的token
                    setToken('bare ' + token)       // 存到cookie中
                    props.history.push('/')     // 跳转到 / 页面，也就是 /main 页面
                    message.success('登录成功！')   // 提示登录成功
                } else {       // 如果登录失败
                    message.error(res.data.msg)     // 提示失败的原因
                }
            }
        });
    }

    const { getFieldDecorator } = props.form;   // 表单验证工具
    return (
        <Form onSubmit={handleSubmit} className="login-form">
            <FormItem label="用户名">
                {getFieldDecorator('login_name', {
                    // 默认值是admin
                    initialValue: 'admin',
                    // 必填，如果没填提示'请输入用户名'
                    rules: [{ required: true, message: '请输入用户名' }]
                })(
                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入用户名" />
                )}
            </FormItem>
            <FormItem label="密码">
                {getFieldDecorator('password', {
                    // 默认值六个1
                    initialValue: '111111',
                    // 必填，如果没填提示'请输入密码！'
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
