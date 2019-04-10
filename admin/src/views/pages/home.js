import React from 'react'
// 首页
const Home = () => {
    return(
        <>
            <div style={{textAlign: 'center'}}>
                {/* 一个iframe引入的静态html页面，这个页面通过http-server跑在8081端口号上 */}
                <iframe title="iframe" frameborder="0" scrolling="no" style={{height: '700px', width: '100%'}} src="http://localhost:8081"></iframe>
            </div>
        </>
    )
}

export default Home