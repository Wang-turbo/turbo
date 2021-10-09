(function() {
    const clearTimer = function clearTimer(timer) {
        if(timer) clearTimeout(timer)
        return null;
    }
    // 防抖
    const debounce = function debounce(func, wait, immediate ) {
        // 校验格式&&默认值处理
        if(typeof func !== 'function') throw new TypeError('func is not a function!');
        if(typeof wait === 'boolean') immediate = wait;
        if(typeof wait !== 'number') wait = 300;
        if(typeof immediate !== 'boolean') immediate = false;
        // 设置定时器初始值
        let timer = null;
        // 控制func只执行一次
        return function operate(...params) {
            let now = !timer && immediate, result;
            // 清除定时器
            timer = clearTimer(timer);
            timer = setTimeout(() => {
                // 最后执行---结束边界
                if(!immediate) func.call(this, ...params);
                // 清除最后一次设定的定时器
                timer = clearTimer(timer);
            }, wait);
            // 立即执行----开始边界
            if(now) result = func.call(this, ...params);
            return result;
        };
    };
    // 节流
    const throttle = function throttle(func,wait) {
        //默认的触发频率：浏览器最快反应时间  谷歌反应时间 --> 5~7ms
        if(typeof func !== 'function') throw new TypeError('func is not a function!');
        if(typeof wait !== 'number') wait = 300;
        let timer = null, previous = 0;
        return function operate(...params) {
            let now = +new Date(), remaining = wait - (now -previous), result;
            if(remaining <= 0) {
                func.call(this, ...params);
                previous = +new Date();
            } else if(!timer){
                timer =setTimeout(() => {
                    func.call(this, ...params);
                    previous = +new Date();
                    timer = clearTimer(timer);
                }, remaining);
            }
    
            return result;
        }
    }
    let utils = {
        debounce,
        throttle
    };
    if(typeof module === 'object' && typeof module.exports === 'object') module.exports = utils; // commonjs
    if(typeof window !== 'undefined') window.utils = utils; // es6
})()
