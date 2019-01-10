import React, { useState, useEffect } from 'react'
import { List, Pagination, Input, Skeleton } from 'antd'
import { getNotice } from '@/http/notice';
import { timestampToTime } from '@/utiles/time';
import NoticePreview from '@/components/Notice/preview'

const Search = Input.Search;
const Notice = () => {
    const [page, usePage] = useState(0);
    const [limit, useLimit] = useState(10); 
    const [data, useData] = useState([]);
    const [count, useCount] = useState(0);
    const [searchWord, useSearchWord] = useState('');
    const [loading, useLoading] = useState(true);
    const [previewShow, usePreviewShow] = useState(false)
    const [noticeId, useNoticeId] = useState('')
    useEffect(async () => {
        fetchData()
    }, [page, limit, searchWord])
    const fetchData = async () => {
        useLoading(true)
        const {data, count} = (await getNotice({page, limit, title: searchWord})).data
        useData(data)
        useCount(count)
        setTimeout(() => {
            useLoading(false)
        }, 800)
    }
    const delNotice = async (id) => {
        
    }
    return (
        <>
            <Search
                style={{width: '300px'}}
                placeholder="请输入公告标题"
                onSearch={value => useSearchWord(value)}
                enterButton
            />
            
            <List
                itemLayout="horizontal"
                bordered
                size="large"
                dataSource={data}
                style={{marginTop: '20px'}}
                renderItem={item => (
                    <List.Item
                        key={item.title}
                        actions={loading ? [] :[<span style={{color: '#1890ff'}} onClick={() => {useNoticeId(item.id); usePreviewShow(true)}}>预览</span>, <span onClick={() => delNotice(item.id)} style={{color: '#f5222d'}}>删除</span>]}
                    >
                        <Skeleton loading={loading} active paragraph={{ rows: 1 }}>
                            <List.Item.Meta
                                title={<a href={item.href}>{item.title}</a>}
                                description={`作者：${item.author + ' '}发布时间：${timestampToTime(item.create_time)}`}
                            />
                        </Skeleton>
                    </List.Item>
                )}
            />,

            <Pagination style={{marginTop: '20px', float: 'right'}} showSizeChanger onChange={page => usePage(page - 1)} onShowSizeChange={(current, pageSize) => useLimit(pageSize)} defaultCurrent={1} total={count} />
            
            <NoticePreview show={previewShow} noticeId={noticeId} onClose={() => usePreviewShow(false)} />

        </>
    )
}

export default Notice