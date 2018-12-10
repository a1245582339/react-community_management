import React from 'react';
import { Table, Pagination } from 'antd'
import moment from 'moment'

const communityStatus = ['未审核', '已审核', '已注销']
const dataSource = [{
    key: '1',
    id: '1',
    community_name: '天津财经大学社团联合会',
    belong_dept: '学工部',
    manage_dept: '学工部',
    chairman: '张三(2014111634)',
    type: '其他',
    create_time: moment(1136044800000).format('YYYY-MM-DD'),
    status: communityStatus.find((item, index) => 1 === index)
}];
  
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
    dataIndex: 'belong_dept',
    key: 'belong_dept'
}, {
    title: '主管单位',
    dataIndex: 'manage_dept',
    key: 'manage_dept'
}, {
    title: '主席',
    dataIndex: 'chairman',
    key: 'chairman'
}, {
    title: '社团类别',
    dataIndex: 'type',
    key: 'type'
}, {
    title: '创建时间',
    dataIndex: 'create_time',
    key: 'create_time'
}, {
    title: '社团状态',
    dataIndex: 'status',
    key: 'status'
}];
  
const Community = () => {
    const onShowSizeChange = () => {

    }
    return (
        <>
            <Table pagination={false} style={{background: '#fff'}} dataSource={dataSource} columns={columns} />
            <Pagination showSizeChanger onShowSizeChange={onShowSizeChange} defaultCurrent={1} total={500} />
        </>
    )
}

export default Community