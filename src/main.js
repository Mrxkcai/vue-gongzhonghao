import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import './service/http'
import 'lib-flexible/flexible.js'
import 'reset.less'

Vue.config.productionTip = false
Vue.use(require('vue-wechat-title'))

Vue.filter('money', x => {
    let f = parseFloat(x)
    if (isNaN(f)) {
        return false
    }
    f = Math.round(x * 100) / 100
    let s = f.toString()
    let rs = s.indexOf('.')
    if (rs < 0) {
        rs = s.length
        s += '.'
    }
    while (s.length <= rs + 2) {
        s += '0'
    }
    return s
})

Vue.filter('mdformate', x => {
    let value = x.split('-').splice(1).join('-')
    return value
})

Vue.filter('formatDate', input => {
    let d = new Date(input)
    let year = d.getFullYear()
    let month = d.getMonth() + 1
    let day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate()
    let hour = d.getHours()
    let minutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()
    let seconds = d.getSeconds()
    return month + '-' + day + ' ' + hour + ':' + minutes // + ':' + seconds
})
new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
