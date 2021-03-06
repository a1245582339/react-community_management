import React, { useState, useEffect } from 'react';
import { Button, Table, Pagination, Input, message } from 'antd'
import FormModal from '@/components/Community/formModal';
import DetailModal from '@/components/Community/detailModal'
import { getCommunity, getDept, getType } from '@/http/community';

const ButtonGroup = Button.Group;
const Search = Input.Search;

  
const Community = () => {
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
                        <Button type="primary" icon="edit" onClick={() => (handleClickForm(record))} />
                        <Button type="primary" icon="file-text" onClick={() => (handleShowDetail(record))} />
                    </ButtonGroup>
                </span>
            )
            
        }
    }];

    const [page, usePage] = useState(0);
    const [limit, useLimit] = useState(10); 
    const [data, useData] = useState([]);
    const [count, useCount] = useState(0);
    const [searchWord, useSearchWord] = useState('');
    const [loading, useLoading] = useState(true);
    const [formShow, useFormShow] = useState(false);
    const [detailShow, useDetailShow] = useState(false);
    const [detail, useDetail] = useState({})
    const [form, useForm] = useState({})
    const [dept, useDept] = useState([])
    const [type, useType] = useState([])
    useEffect(async () => {
        useDept(await getDept())
        useType(await getType())
    }, [])
    useEffect(async () => {
        fetchData()
    }, [page, limit, searchWord])

    const fetchData = async () => {
        useLoading(true)
        const {data, count} = await getCommunity({page, limit, community_name: searchWord})
        useData(data)
        useCount(count)
        useLoading(false)
    }
    const handleClickForm = (form) => {
        useForm(form)
        useFormShow(true)
    }

    const onEditSuccess = (msg) => {
        message.success(msg)
        fetchData()
    }

    const handleShowDetail = (data) => {
        useDetailShow(true)
        useDetail(data)
    }
    
    return (
        <>
            <Search
                style={{width: '300px'}}
                placeholder="请输入社团名称"
                onSearch={value => useSearchWord(value)}
                enterButton
            />
            <Button icon="plus-circle" style={{float: 'right'}} type="primary" onClick={() => handleClickForm()}>添加社团</Button>
            <Table pagination={false} style={{marginTop: '20px',background: '#fff'}} dataSource={data} columns={columns} loading={loading} />
            <Pagination style={{marginTop: '20px', float: 'right'}} showSizeChanger onChange={page => usePage(page - 1)} onShowSizeChange={(current, pageSize) => useLimit(pageSize)} defaultCurrent={1} total={count} />
            
            <FormModal dept={dept} type={type} formData={form} formShow={formShow} onClose={() => useFormShow(false)} onSuccess={(msg) => onEditSuccess(msg)} />
            <DetailModal detail={detail} show={detailShow} onClose={() => useDetailShow(false)} />
        </>
    )
}

export default Community