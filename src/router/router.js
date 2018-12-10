import Vue from 'vue'
import Router from 'vue-router'
import Index from '../views/index/index'
import My from '../views/my'
import MyInfo from '../views/my/myInfo'
import Deposit from '../views/my/deposit'
import CustomService from '../views/my/customerService'
import Remind from '../views/my/remind'
import Compete from '../views/my/compete'

Vue.use(Router)

const routes = [
    {
        path: '/',
        name: 'index',
        component: Index
    }, {
        path: '/my',
        name: 'my',
        component: () => import('../views/my/index.vue'),
        children: [
            {
                path: '/',
                component: My
            },
            {
                path: '/myInfo',
                component: MyInfo
            }, {
                path: '/deposit',
                component: Deposit
            }, {
                path: '/customerService',
                component: CustomService
            }, {
                path: '/remind',
                component: Remind
            }, {
                path: '/compete',
                component: Compete
            }
        ]
    }
]

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})
