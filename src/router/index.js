//路由配置
import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../component/login/Login.vue'
import Admin from '../component/admin/Admin.vue'
//商品管理组件
import GoodsList from '../component/admin/goods/list/List.vue'
import GoodsDetail from '../component/admin/goods/detail/Detail.vue'
import GoodsComment from '../component/admin/goods/comment/Comment.vue'
//elementUI组件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'

const goods =[
    { name: 'list', path: 'goods/list', component: GoodsList},
    { name: 'detail', path: 'goods/detail/:id', component: GoodsDetail},
    { name: 'comment', path: 'goods/comment', component: GoodsComment}
]

Vue.use(VueRouter)
Vue.use(ElementUI)

//导出路由实例
export default new VueRouter({
    routes:[
        {name:'login',path:'/login',component:Login},
        { name: 'admin', path: '/admin', component: Admin, children: [...goods]}
    ]
})

