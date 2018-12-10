import axios from 'axios' // 引入axios
import QS from 'qs' // 引入qs模块，用来序列化post类型的数据

// 环境的切换 https://www.apiopen.top/novelApi
if (process.env.NODE_ENV === 'development') {
    axios.defaults.baseURL = 'http://elm.cangdu.org'
} else if (process.env.NODE_ENV === 'debug') {
    axios.defaults.baseURL = 'www.apiopen.top'
} else if (process.env.NODE_ENV === 'production') {
    axios.defaults.baseURL = 'www.apiopen.top'
}

axios.defaults.timeout = 10000
// post请求头的设置
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-from-urlencoded;charset=UTF-8'

// 封装axios的get方法和post方法
export function get (url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, { params: params })
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                reject(err.data)
            })
    })
}

export function post (url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, QS.stringify(params))
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                reject(err.data)
            })
    })
}
