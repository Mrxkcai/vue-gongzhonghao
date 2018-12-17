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
        component: CompeteChat
    }, {
        path: '/my',
        name: 'my',
        component: My,
        meta: {
            title: '我的'
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
            title: '我的保证金'
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
            title: '我的提醒'
        }
    }, {
        path: '/compete',
        component: Compete,
        name: 'compete',
        meta: {
            title: '我的拍卖'
        }
    }, {
        path: '*',
        name: 'index',
        component: Index
    }
]

export default new Router({
    mode: 'history',
    //base: '/statics/compete',
    routes: routes
})
