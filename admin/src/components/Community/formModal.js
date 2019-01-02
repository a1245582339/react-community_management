import React, { useState } from 'react';
import debounce from 'lodash/debounce';
import { Modal, Form, Input, Select, Spin } from 'antd';
import { getStu, postCommunity } from '@/http/community';

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
    const [fetching, useFetching] = useState(false)
    const [stu, useStu] = useState([])

    const fetchStu = async (val) => {
        useFetching(true)
        useStu(await getStu(val))
        useFetching(false)
    }
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
            const res = postCommunity(id, values)
            props.onClose()
            form.resetFields()
            console.log('Received values of form: ', res)
        });
    }

    return (
        
        <Modal
            title={ props.formData ? '编辑社团' : '新增社团' }
            visible={props.formShow}
            onOk={handleOk}
            onCancel={() => props.onClose()}
        >
            <Form onSubmit={() => handleOk()}>
                <Form.Item
                    {...formItemLayout}
                    label="社团名称"
                >
                    {getFieldDecorator('community_name', {
                        initialValue: props.formData ? props.formData.community_name : '',
                        rules: [{
                            required: true, message: '请输入社团名称！'
                        }]
                    })(
                        <Input />
                    )}
                </Form.Item>
                <Form.Item
                    {...formItemLayout}
                    label="社团描述"
                >
                    {getFieldDecorator('desp', {
                        initialValue:  props.formData ? props.formData.desp : '',
                        rules: [{
                            required: true, message: '请输入社团描述！'
                        }]
                    })(
                        <Input />
                    )}
                </Form.Item>
                
                <Form.Item
                    {...formItemLayout}
                    label="所属单位"
                >
                    {getFieldDecorator('belong_dept', {
                        initialValue:  props.formData ? props.formData.belong_dept : '',
                        rules: [{
                            required: true, message: '请选择所属单位！'
                        }]
                    })(
                        <Select style={{ width: 200 }} placeholder="请选择">
                            {props.dept.map(d => <Option key={d.id}>{d.dept_name}</Option>)}
                        </Select>
                    )}
                </Form.Item>
                <Form.Item
                    {...formItemLayout}
                    label="主管单位"
                >
                    {getFieldDecorator('manage_dept', {
                        initialValue:  props.formData ? props.formData.manage_dept : '',
                        rules: [{
                            required: true, message: '请选择主管单位！'
                        }]
                    })(
                        <Select style={{ width: 200 }} placeholder="请选择">
                            {props.dept.map(d => <Option key={d.id}>{d.dept_name}</Option>)}
                        </Select>
                    )}
                </Form.Item>
                <Form.Item
                    {...formItemLayout}
                    label="分类"
                >
                    {getFieldDecorator('type', {
                        initialValue:  props.formData ? props.formData.type : '',
                        rules: [{
                            required: true, message: '请选择分类！'
                        }]
                    })(
                        <Select style={{ width: 200 }} placeholder="请选择">
                            {props.type.map(d => <Option key={d.id}>{d.type_name}</Option>)}
                        </Select>
                    )}
                </Form.Item>
                <Form.Item
                    {...formItemLayout}
                    label="社团主席"
                >
                    {getFieldDecorator('chairman_stu_id', {
                        initialValue:  props.formData ? props.formData.chairman_stu_id : '',
                        rules: [{
                            required: true, message: '输入学号并选择学生！'
                        }]
                    })(
                        <Select
                            showSearch
                            placeholder="输入学号并选择学生"
                            notFoundContent={fetching ? <Spin size="small" /> : null}
                            filterOption={false}
                            onSearch={debounce(fetchStu, 800)}
                            style={{ width: '100%' }}
                        >
                            {stu.map(d => <Option key={d.value}>{d.text}</Option>)}
                        </Select>
                    )}
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default Form.create()(FormModal)