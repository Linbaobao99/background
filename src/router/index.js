//路由配置
import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../component/login/Login.vue'
import Admin from '../component/admin/Admin.vue'
import Shopcart from '../component/admin/shopcart/Shopcart.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'

const shopcart =[
    { name: 'shopcart', path:'shopcart', component: Shopcart}
]

Vue.use(VueRouter)
Vue.use(ElementUI)

//导出路由实例
export default new VueRouter({
    routes:[
        {name:'login',path:'/login',component:Login},
        {name:'admin',path:'/admin',component:Admin,children:[...shopcart]}
    ]
})

