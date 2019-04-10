// 入口文件
import React from 'react';
import ReactDOM from 'react-dom';
import { LocaleProvider } from 'antd'   // 国际化
import zhCN from 'antd/lib/locale-provider/zh_CN';  // 国际化语言文件，选择中文
import './index.css';   // 样式文件
import App from './App';    // app主体
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';   // 路由跳转用的

ReactDOM.render(
    <BrowserRouter>
        <LocaleProvider locale={zhCN}>
            <App />
        </LocaleProvider>
    </BrowserRouter>
    , document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
