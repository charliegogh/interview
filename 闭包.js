const foo = (function(){
    var v=0
    return ()=>{
        return v++
    }
}())

// console.log(foo)
// console.log(foo())  // 两者啥区别 ？
// 执行
for (let i=0; i<10; i++){
    foo()
}

console.log(foo())  // 10
