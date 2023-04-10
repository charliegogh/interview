// var 变量提升
console.log(name) // undefined  变量提升 js在编译阶段会找到 var 关键字声明的变量会添加到词法环境中，初始化为undefined
var name = 'charlie'
console.log(name) //  charlie

// 函数提升
f()
function f(){
    console.log('hi')
}


function f2(a1){
    // var a1
    // let a1 // 使用let 会出现暂时性死去，因为实参已经定义了
}
f2(null)


/**
 * 执行上下文栈
 */

