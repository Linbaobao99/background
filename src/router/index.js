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

const goods = [
    { name: 'list', path: 'goods/list', component: GoodsList },
    { name: 'detail', path: 'goods/detail/:id', component: GoodsDetail },
    { name: 'comment', path: 'goods/comment', component: GoodsComment }
]

Vue.use(VueRouter)
Vue.use(ElementUI)

//导出路由实例
let router = new VueRouter({
    routes: [
        { name: 'login', path: '/login', component: Login },
        { name: 'admin', path: '/admin', component: Admin, children: [...goods] }
    ]
})
//路由守卫
router.beforeEach((to, from, next) => {
    Vue.prototype.$axios.get(Vue.prototype.$api.islogin).then((res) => {
        let isLogin = false;
        //判断用户时候登录过
        if (res.data.code == "logined") {
            isLogin = true;
        }

        //访问登录页面
        if (to.name == "login") {
            if (isLogin) {
                //如果登录过就直接跳转后台管理页面
                next({ name: 'login' });
            } else {
                // alert("你还没登录,请先登录.","提示");
                //没有登录过就允许继续访问
                next();
            }
        }

        //访问后台管理页面
        if (to.name != "login") {
            if (isLogin) {
                // alert("你已登录过,无需再登录.")
                //如果登录过就允许访问
                next();
            } else {
                next({ name: 'login', query: { next: to.fullPath } })
            }
        }
    })
})
export default router;
