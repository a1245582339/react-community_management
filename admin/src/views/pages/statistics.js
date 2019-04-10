// 统计页面
import React, { useState, useEffect } from 'react'
import ReactEcharts from 'echarts-for-react';   // echarts，画图表用的
import moment from 'moment';    // 时间转换工具
import { DatePicker } from 'antd';
import { timestampToDate } from '@/utiles/time';    
import { getNoticeLog } from '@/http/notice';   // 获取公告日志接口
// import NoData from '@/components/Notice/noData'

const dateFormat = 'YYYY/MM/DD';

const Statistics = () => {
    const [start_time, useStartTime] = useState(new Date().getTime() - 604800000)       // 默认一周前开始
    const [end_time, useEndTime] = useState(new Date().getTime())       // 默认当前时间结束
    const [label, useLabel] = useState([])
    const [data, useData] = useState([])        // 放到饼图里的数据
    const [totalData, useTotalData] = useState([])      // 原始数据
    useEffect(() => {
        fetchData() // 获取数据
    }, [start_time, end_time])  // 当开始时间或结束时间变化时
    const fetchData = async () => {
        const {label, data, totalData} = (await getNoticeLog({start_time, end_time}))   // 获取数据，并拿到标题，访问量和总数居
        useLabel(label) // 赋值，下面两个一样
        useData(data)
        useTotalData(totalData)
    }
    const onTimeChange = (date) => {    // 时间变化时
        useStartTime(date[0]._d.getTime())  // 把新日期开始转换为时间戳赋值给开始时间
        useEndTime(date[1]._d.getTime())    // 把新日期结束转换为时间戳赋值给结束时间
    }
    const onClickBlock = (params) => {  // 没啥用
        // useModalShow(true)
        console.log(totalData.find((_, index) => index === params.dataIndex).notice_id)
    }
    const onEvents = {
        click: onClickBlock
    }
    return (
        <>
            {/* 日期范围选择器 */}
            <DatePicker.RangePicker defaultValue={[moment(timestampToDate(start_time), dateFormat), moment(timestampToDate(end_time), dateFormat)]} format={dateFormat} onChange={onTimeChange} />
            {/* <NoData /> */}
            <div style={{marginTop: '50px', height: '100%', width: '100%'}}>
                <ReactEcharts   // 饼图
                    option={{
                        tooltip: {
                            trigger: 'item',
                            formatter: "{a} <br/>{b}: {c} ({d}%)"
                        },
                        legend: {
                            orient: 'vertical',
                            x: 'right',
                            data: label
                        },
                        series: [
                            {
                                name:'公告标题',
                                type:'pie',
                                radius: ['50%', '70%'],
                                avoidLabelOverlap: true,
                                data: data
                            }
                        ]
                    }}
                    onEvents={onEvents}
                />
            </div>
        </>
    )
}

export default Statistics