// 回调函数

function f1(callback) {
    setTimeout(function(){
        let name="charlie"
        callback(name)
    },1000)
}

f1((name)=>{
    console.log(name)
})
