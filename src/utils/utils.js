export const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    // return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
    return [year, month, day].map(formatNumber).join('.')
}
const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}

/*
 * @Author: iLonge
 * @Date: 2018-07-02 08:47:55
 * @Last Modified by: iLonge
 * @Last Modified time: 2018-12-07 13:36:42
 * 日常用函数的封装
*/

// localStorage
export let Storage = {
    /**
    * 获取
    * 在获取时处理，如果是JSON格式，那么将其转换为JSON，而不是字符串
    */
    get: function (key) {
        var value = localStorage.getItem(key);
        if (value) {
            try {
                var value_json = JSON.parse(value);
                if (typeof value_json === 'object') {
                    return value_json;
                } else if (typeof value_json === 'number') {
                    return value_json;
                }
            } catch (e) {
                return value;
            }
        } else {
            return false;
        }
    },
    /**
    * 设置
    * 考虑到可能会达到大小限制，因此加上错误捕捉
    */
    set: function (key, value) {
        let curTime = new Date().getTime();
        try {
            localStorage.setItem(key, JSON.stringify({
                data: value,
                time: curTime
            }));
        } catch (e) {
            if (this.isQuotaExceeded(e)) {
                console.log('Storage full');
            }
        }
    },
    // 删除
    remove: function (key) {
        localStorage.removeItem(key);
    },
    // 清除
    clear: function () {
        localStorage.clear();
    },
    /**
    * 批量保存，data是一个字典
    */
    setList: function (list) {
        for (var i in list) {
            localStorage.setItem(i, list[i]);
        }
    },
    /**
    * 批量删除
    */
    removeList: function (list) {
        for (var i = 0, len = list.length; i < len; i++) {
            localStorage.removeItem(list[i])
        }
    },
    /**
    * 大小限制
    */
    isQuotaExceeded: function (e) {
        var quotaExceeded = false;
        if (e) {
            if (e.code) {
                switch (e.code) {
                    case 22:
                        quotaExceeded = true;
                        break;
                    case 1014:
                        // Firefox
                        if (e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
                            quotaExceeded = true;
                        }
                        break;
                }
            } else if (e.number === -2147024882) {
                // Internet Explorer 8
                quotaExceeded = true;
            }
        }
        return quotaExceeded;
    },
    /**
    * 是否支持localStorage存储
    */
    isSupport: function () {
        if (window.localStorage) {
            alert('支持')
            return true;
        } else {
            alert('您的浏览器不支持localStorage存储')
            return false
        }
    }
}