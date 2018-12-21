import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import './service/http'
import 'lib-flexible/flexible.js'
import 'reset.less'

Vue.config.productionTip = false
Vue.use(require('vue-wechat-title'))

Vue.filter('money', x => {
    var f = parseFloat(x)
    if (isNaN(f)) {
        return false
    }
    f = Math.round(x * 100) / 100
    let s = f.toString()
    var rs = s.indexOf('.')
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

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
