import React, { useState, useEffect } from 'react';
import { Button, Table, Pagination, Input, message } from 'antd'
import FormModal from '@/components/Community/formModal';   // 表单弹框
import { getCommunity, getDept, getType } from '@/http/community';  // 获取社团、获取部门、获取类型接口

const ButtonGroup = Button.Group;
const Search = Input.Search;

  
const Community = () => {
    // 定义表格的表头
    const columns = [{
        title: '社团编号',
        dataIndex: 'id',
        key: 'id'
    }, {
        title: '社团名称',
        dataIndex: 'community_name',
        key: 'community_name'
    }, {
        title: '所属单位',
        dataIndex: 'belong_dept_name',
        key: 'belong_dept_name'
    }, {
        title: '主管单位',
        dataIndex: 'manage_dept_name',
        key: 'manage_dept_name'
    }, {
        title: '主席',
        dataIndex: 'stu_name',
        key: 'stu_name'
    }, {
        title: '社团类别',
        dataIndex: 'type_name',
        key: 'type_name'
    }, {
        title: '创建时间',
        dataIndex: 'create_time',
        key: 'create_time'
    }, {
        title: '社团状态',
        dataIndex: 'status_text',
        key: 'status_text'
    }, {
        title: '操作',
        key: 'action',
        render: (text, record) => {
            return (
                <span>
                    <ButtonGroup>
                        {/* 点击这个按钮编辑社团 */}
                        <Button type="primary" icon="edit" onClick={() => (handleClickForm(record))} />
                    </ButtonGroup>
                </span>
            )
            
        }
    }];

    const [page, usePage] = useState(0);    // 定义页码变量和修改方法
    const [limit, useLimit] = useState(10);     // 定义每页条数的变量和修改方法
    const [data, useData] = useState([]);   // 定义表格中数据和修改方法
    const [count, useCount] = useState(0);  // 定义数据总数和修改方法
    const [searchWord, useSearchWord] = useState('');   // 定义搜索的关键字和修改方法
    const [loading, useLoading] = useState(true);   // 定义表格loading状态关键字和修改方法
    const [formShow, useFormShow] = useState(false);    // 定义表单弹窗出现消失状态和修改方法
    const [form, useForm] = useState({})    // 定义表单内容和修改方法
    const [dept, useDept] = useState([])    // 定义部门数据和修改方法
    const [type, useType] = useState([])    // 定义类型数据和修改方法
    useEffect(async () => {
        // 进入页面后立即获取部门与类型，并且只需执行一次
        useDept(await getDept())
        useType(await getType())
    }, [])
    useEffect(async () => {
        // 进入页面后获取社团数据
        fetchData()
    }, [page, limit, searchWord])   // 当页码、每页条数和关键字变化时获取数据

    const fetchData = async () => {
        useLoading(true)    // 开始loading
        const {data, count} = await getCommunity({page, limit, community_name: searchWord})     // 调用获取数据接口，发送页码，每页条数和关键字，拿到当前页数据和总数据量
        useData(data)   // 把拿到的数据放到页面里
        useCount(count) // 把拿到的数据总量放到页面
        useLoading(false)   // 结束loading
    }
    const handleClickForm = (form) => { // 点击新增或编辑时调用
        useForm(form)   // 把当前行的数据放到表单中，新增的话就是将空对象放到表单中
        useFormShow(true)   // 打开表单弹框
    }

    const onEditSuccess = (msg) => {
        message.success(msg)    // 编辑成功后提示成功信息
        fetchData() // 重新获取数据
    }
    
    return (
        <>
            {/* 搜索框 */}
            <Search
                style={{width: '300px'}}
                placeholder="请输入社团名称"
                onSearch={value => useSearchWord(value)}    // 点击搜索时把关键字赋值给页面的关键字变量
                enterButton // 支持点击键盘回车搜索
            />
            {/* 添加按钮 */}
            <Button icon="plus-circle" style={{float: 'right'}} type="primary" onClick={() => handleClickForm()}>添加社团</Button>
            {/* 表格 */}
            <Table pagination={false} style={{marginTop: '20px',background: '#fff'}} dataSource={data} columns={columns} loading={loading} />
            {/* 分页器 */}
            <Pagination 
                style={{marginTop: '20px', float: 'right'}} // 顶部20像素空白，并且居右显示
                showSizeChanger  // 这里控制显示页面的变化其
                onChange={page => usePage(page - 1)} // 当页码变化时，把新的页码给页码状态
                onShowSizeChange={(current, pageSize) => 
                    useLimit(pageSize)}     // 每页条数变化时改变页面的每页条数变量
                defaultCurrent={1} // 默认页码是1
                total={count}   // 总数
            />
            {/* 表单弹框 */}
            <FormModal dept={dept} type={type} formData={form} formShow={formShow} onClose={() => useFormShow(false)} onSuccess={(msg) => onEditSuccess(msg)} />
        </>
    )
}

export default Community