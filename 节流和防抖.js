// 节流
function debounce(func, delay) {
    let timer = null
    return function() {
        if (timer){  // timer 会保存在内存里，直到最后触发
            clearTimeout(timer)
            timer = null
        }
        timer = setTimeout(function () {
            func()
        },delay)
    }
}

// 防抖
function throttle(fn, delay) {
    let timer = null
    return function(...args) {
        if (!timer){
            timer = setTimeout(()=>{
                fn.apply(this, args)
                timer = null
            },delay)
        }
    }
}
