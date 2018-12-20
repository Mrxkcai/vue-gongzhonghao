import Vue from 'vue'
import Router from 'vue-router'
import Index from '../views/index/index'
import My from '../views/my'
import MyInfo from '../views/my/myInfo/index'
import Deposit from '../views/my/deposit'
import CustomService from '../views/my/customerService'
import Remind from '../views/my/remind'
import Compete from '../views/my/compete'
import CompeteChat from '../views/competeChat'
import { Storage } from '@/utils/utils'

Vue.use(Router)

const routes = [
    {
        path: '/',
        name: 'index',
        component: Index,
        meta: {
            title: '参赛号拍卖'
        }
    }, {
        path: '/competeChat',
        name: 'competeChat',
        meta: {
            requireAuth: true
        },
        component: CompeteChat
    }, {
        path: '/my',
        name: 'my',
        component: My,
        meta: {
            title: '我的',
            requireAuth: true
        }
    }, {
        path: '/myInfo',
        component: MyInfo,
        name: 'myInfo',
        meta: {
            title: '我的个人资料'
        }
    }, {
        path: '/deposit',
        component: Deposit,
        name: 'deposit',
        meta: {
            title: '我的保证金',
            requireAuth: true
        }
    }, {
        path: '/customerService',
        component: CustomService,
        name: 'customService',
        meta: {
            title: '客服与帮助'
        }
    }, {
        path: '/remind',
        component: Remind,
        name: 'remind',
        meta: {
            title: '我的提醒',
            requireAuth: true
        }
    }, {
        path: '/compete',
        component: Compete,
        name: 'compete',
        meta: {
            title: '我的拍卖',
            requireAuth: true
        }
    }, {
        path: '*',
        name: 'index',
        component: Index
    }
]
const router = new Router({
    mode: 'history',
    base: '/statics/compete',
    routes: routes
})

router.beforeEach((to, from, next) => {
    let token = Storage.get('token')
    let refreshToken = Storage.get('refreshToken')
    if (to.meta.requireAuth) {
        if (refreshToken !== undefined && token !== undefined) {
            next()
        } else {
            next({
                path: '/'
            })
        }
    } else {
        next()
    }
})

export default router
