function _new (ctx, ...args) {
    // 创建空对象
    let obj = {}
    // 空对象的__proto__指向构造函数的原型
    Object.setPrototypeOf(obj, ctx.prototype)

    /* Object.create 写法 */
    // const obj = Object.create(ctx.prototype)

    // this 指向空对象
    let rs = ctx.apply(obj, args)
    // 对构造函数的结构进行返回
    return rs instanceof Object ? rs : obj
}
// 创建构造函数
function Test (name) {
    this.name = name
    // 构造函数返回对象类型的数据时，会直接返回这个数，new 操作符此时无效
    // 构造函数返回基础类型的数据，则会被忽略
    return {
        a:12
    }
}

let _test = _new(Test,'charlie')
console.log(_test)

