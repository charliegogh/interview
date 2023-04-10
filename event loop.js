// 主线程1
console.log(1)
// 宏任务进行5  遇到定时器，属于新的宏任务，留着后面执行
setTimeout(()=>{
    console.log(2)
}, 0)
// 主线程2 遇到 new Promise，这个是直接执行的，打印 'new Promise'
new Promise((resolve, reject)=>{
    console.log('new Promise')
    resolve()
// 微任务进行4 .then 属于微任务，放入微任务队列，后面再执行
}).then(()=>{
    console.log('then')
})
// 主线程3
console.log(3)

// async 和 await 情况
async function fn1 (){
    console.log(1)
    await fn2()
    console.log(2) // 阻塞
}

async function fn2 (){
    console.log('fn2')
}

fn1()
console.log(3)

// 综合
async function async1() {
    console.log('async1 start') // 2
    await async2()
    console.log('async1 end') // 6
}
async function async2() {
    console.log('async2') // 3
}
console.log('script start')  // 1
setTimeout(function () {
    console.log('settimeout') // 8
})
async1()
new Promise(function (resolve) {
    console.log('promise1') // 4
    resolve()
}).then(function () {
    console.log('promise2') // 7
})
console.log('script end') // 5












