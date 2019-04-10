// 公告列表文件
import React, { useState, useEffect } from 'react'
import { List, Pagination, Input, Skeleton, Modal, message  } from 'antd'
import { getNotice, updateNotice } from '@/http/notice';    // 获取公告、更新公告接口
import { timestampToTime } from '@/utiles/time';    // 时间戳转时间工具
import NoticePreview from '@/components/Notice/preview' // 预览组件

const Search = Input.Search;
const Notice = () => {
    const [page, usePage] = useState(0);    // 页码
    const [limit, useLimit] = useState(10);  // 每页条数
    const [data, useData] = useState([]);   // 数据
    const [count, useCount] = useState(0);  // 总数
    const [searchWord, useSearchWord] = useState('');   // 关键字
    const [loading, useLoading] = useState(true);   // loading状态
    const [previewShow, usePreviewShow] = useState(false)   // 预览弹框是否显示
    const [noticeId, useNoticeId] = useState('')    // 展示弹框的公告id
    useEffect(async () => {
        fetchData() // 获取数据
    }, [page, limit, searchWord])   // 当页码，每页条数，关键字变化时调用
    const fetchData = async () => { // 获取数据
        useLoading(true)    // 开始loading
        const {data, count} = (await getNotice({page, limit, title: searchWord})).data  // 获取当页数据和总数
        useData(data)   // 将获取到的数据赋值到页面
        useCount(count) // 将获取到的总数赋给页面
        setTimeout(() => {
            useLoading(false)   // 800毫秒后，停止loading
        }, 800)
    }
    const delNotice = (id) => { // 删除公告
        Modal.confirm({     // 删除提示
            title: '确定删除此条公告？',
            async onOk() {  // 点击确定后调用
                const res = await updateNotice({isDel: 1}, id)      // 调用更新接口，删除
                console.log(res)
                message.success('删除成功');    // 成功提示
                fetchData() // 重新获取数据
            },
            onCancel() {
                console.log('Cancel');
            }
        });
        

    }
    return (
        <>
            <Search
                style={{width: '300px'}}
                placeholder="请输入公告标题"
                onSearch={value => useSearchWord(value)}
                enterButton
            />
            {/* 列表 */}
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
                        {/* 骨架 */}
                        <Skeleton loading={loading} active paragraph={{ rows: 1 }}>
                            <List.Item.Meta
                                title={<a href={item.href}>{item.title}</a>}
                                description={`作者：${item.author + ' '}发布时间：${timestampToTime(item.create_time)}`}
                            />
                        </Skeleton>
                    </List.Item>
                )}
            />,
            {/* 分页器 */}
            <Pagination style={{marginTop: '20px', float: 'right'}} showSizeChanger onChange={page => usePage(page - 1)} onShowSizeChange={(current, pageSize) => useLimit(pageSize)} defaultCurrent={1} total={count} />
            {/* 预览公告组件 */}
            <NoticePreview show={previewShow} noticeId={noticeId} onClose={() => usePreviewShow(false)} />

        </>
    )
}

export default Notice