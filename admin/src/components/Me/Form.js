import React from 'react'
import { Form, Icon, Input, Button, Select } from 'antd';
import { withRouter } from 'react-router-dom';


const formItemLayout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 10, offset: 1 }
};

const FormItem = Form.Item;
const LoginFrom = (props) => {

    const handleSubmit = (e) => {
        e.preventDefault();
        props.form.validateFields(async (err, values) => {
            if (!err) {
                
            }
        });
    }
    const { getFieldDecorator } = props.form;
    return (
        <Form onSubmit={handleSubmit} className="login-form">
            <FormItem label="姓名"
                {...formItemLayout}>
            
                {getFieldDecorator('name', {
                    initialValue: 'admin',
                    rules: [{ required: true, message: '姓名' }]
                })(
                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入用户名" />
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
