// 预览公告的组件
import React from 'react'
import { timestampToTime } from '@/utiles/time';    // 时间戳转时间工具
import '@/style/components/notice/article.scss' // 预览组件的样式文件

const Article = (props) => {
    return (
        <>
            <section className="article">
                <h1>{props.data.title}</h1>
                <div className="desc">
                    <span>作者：{props.data.author}</span><br/><span>发布时间：{timestampToTime(props.data.create_time)}</span>
                </div>
                {/* 将html文件放到页面中 */}
                <div dangerouslySetInnerHTML={{__html: props.data.content}}></div>
            </section>
        </>
    )
}

export default Article