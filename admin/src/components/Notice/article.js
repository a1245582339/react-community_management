import React from 'react'
import { timestampToTime } from '@/utiles/time';
import '@/style/components/notice/article.scss'

const Article = (props) => {
    return (
        <>
            <section className="article">
                <h1>{props.data.title}</h1>
                <div className="desc">
                    <span>作者：{props.data.author}</span><br/><span>发布时间：{timestampToTime(props.data.create_time)}</span>
                </div>
                <div dangerouslySetInnerHTML={{__html: props.data.content}}></div>
            </section>
        </>
    )
}

export default Article