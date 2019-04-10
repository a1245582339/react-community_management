// 表单弹框组件
import React, { useState } from 'react';
import debounce from 'lodash/debounce';     // 防抖工具
import { Modal, Form, Input, Select, Spin } from 'antd';
import { getStu, postCommunity } from '@/http/community';   // 获取学生、修改社团接口

const Option = Select.Option;
const formItemLayout = {
    // 栅格布局工具，一行会被分为24个格子
    labelCol: {
        span: 5     // 表单的左侧标题占5个格
    },
    wrapperCol: {
        span: 16,   // 表单的右侧内容占16个格
        offset: 2   // 右侧内容偏移2个格
    }
};

const FormModal = (props) => {
    const { getFieldDecorator } = props.form    // 表单验证工具
    const [fetching, useFetching] = useState(false)     // 搜索学生的loading状态
    const [stu, useStu] = useState([])  // 搜索到的学生数据

    const fetchStu = async (val) => {   // 获取学生信息的方法
        useFetching(true)   // 开始loading
        useStu(await getStu(val))   // 获取学生
        useFetching(false)  // 结束loading
    }
    const handleOk = async () => {  // 手动点击确认时调用的方法
        const form = props.form // 将表单拷贝一份，放到当前函数的局部变量中
        form.validateFields((err, values) => {  // 检验表单是否通过验证
            if (err) {  // 没通过就直接return
                return;
            }
            let id 
            if (props.formData) {   // 打开表单时如果父级组件传过来了formData，则为编辑，否则是新增
                id = props.formData.id  // 如果是编辑，就把这一条的id赋值给当前的id
            }
            const res = await postCommunity(id, values)   // 调用更新社团接口
            props.onClose() // 成功后关闭弹框
            props.onSuccess( id ? '更新成功' : '新增成功' ) // 根据有没有id，判断更新成功后的提示信息并显示
            props.form.resetFields()    // 清空表单内容和表单验证
            console.log('Received values of form: ', res)
        });
    }

    return (
        
        <Modal
            title={ props.formData ? '编辑社团' : '新增社团' }
            visible={props.formShow}
            onOk={handleOk}
            onCancel={() => {props.form.resetFields(); props.onClose()}}
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
                        initialValue:  props.formData ? props.formData.desp : ''
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
                            {props.dept.map(d => <Option key={d.id} value={d.id}>{d.dept_name}</Option>)}
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
                            {props.dept.map(d => <Option key={d.id} value={d.id}>{d.dept_name}</Option>)}
                        </Select>
                    )}
                </Form.Item>
                <Form.Item
                    {...formItemLayout}
                    label="分类"
                >
                    {getFieldDecorator('type', {
                        initialValue: props.formData ? props.formData.type : '',
                        rules: [{
                            required: true, message: '请选择分类！'
                        }]
                    })(
                        <Select style={{ width: 200 }} placeholder="请选择">
                            {props.type.map(d => <Option key={d.id} value={d.id} >{d.type_name}</Option>)}
                        </Select>
                    )}
                </Form.Item>
                <Form.Item
                    {...formItemLayout}
                    label="状态"
                >
                    {getFieldDecorator('status', {
                        initialValue:  props.formData ? props.formData.status : '',
                        rules: [{
                            required: true, message: '请选择分类！'
                        }]
                    })(
                        <Select style={{ width: 200 }} placeholder="请选择">
                            <Option value={0}>{'未审核'}</Option>
                            <Option value={1}>{'已审核'}</Option>
                            <Option value={2}>{'已注销'}</Option>
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
                            notFoundContent={fetching ? <Spin size="small" /> : null}   // 判断是否在获取中，如果在获取中则显示loading，否则显示无数据
                            filterOption={false}
                            onSearch={debounce(fetchStu, 800)}  // 每次延迟800毫秒再做搜索，防抖
                            style={{ width: '100%' }}
                        >
                            {/* 显示学生的名字+学号 */}
                            {stu.map(d => <Option key={d.value}>{d.text}</Option>)}
                        </Select>
                    )}
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default Form.create()(FormModal)