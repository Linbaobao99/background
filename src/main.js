import Vue from 'vue'

import App from './component/App.vue'

import router from './router'


new Vue({
    el:'#app',
    render: createElement => createElement(App),
    router:router
})