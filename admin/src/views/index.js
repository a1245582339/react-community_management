// 将所有内容的页面聚合到这一个文件里，然后一起导出，方便调用
import Main from './main'
import Login from './login'
import Pages from './pages'
import NoFound from './404'
import NoPermission from './401'

export default { Main, Login, Pages, NoFound, NoPermission }