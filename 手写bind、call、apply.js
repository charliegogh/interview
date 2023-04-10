// https://github.com/mqyqingfeng/Blog/issues/12

// call

Function.prototype._call = function(ctx) {
    ctx = ctx || window
    // fn 需要保证唯一
    let fn =  Symbol()
    ctx[fn] = this // 给ctx添加一个方法指向 this
    // 类数据变成数组，
    let arg = [...arguments].slice(1)
    // 执行fn
    ctx[fn](...arg)
    // 删除方法
    delete ctx[fn]
}

// apply 接收数组

Function.prototype._apply = function(ctx) {
    if (typeof ctx === 'undefined' || ctx === null) {
        ctx = window
    }
    let fn = Symbol()
    ctx[fn] = this // 给 ctx 添加一个方法 指向 this
    let arg = [...arguments].slice(1)
    ctx[fn](arg) // 执行fn
    delete ctx[fn]
}

// bind 实现

Function.prototype._bind = function (ctx) {
    // 返回绑定 this 的函数，保存this
    let self = this
    // 支持柯里化传参，保存参数   获取_bind函数从第二个参数到最后一个参数
    let args = [...arguments].slice(1)
    return function () {
        // 次获取存储参数  指bind返回的函数传入的参数
        let newArg = [...arguments]
        // 返回函数绑定this，传入两次保存的参数
        // 考虑返回函数有返回值做了 return
        return self.apply(ctx,args.concat(newArg))
    }
}


let Person = {
    name: 'John',
    say(age){
        console.log(this.name)
        console.log(this.name,age)
    }
}
let Person1 = {
    name: 'charlie'
}
Person.say._call(Person1,18)


//
