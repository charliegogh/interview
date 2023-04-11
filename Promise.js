/**
 * 基本原理
 * 1. Promise 是一个类，在执行这个类的时候会传入一个执行器，执行器会立即执行。
 * 2. Promise 会有三个状态
 *    Pending 等待
 *    Fulfilled 完成
 *    Rejected 失败
 * 3. 状态只能由 Pending --> Fulfilled 或者 Pending --> Rejected，且一但发生改变便不可二次修改；
 * 4. Promise 中使用 resolve 和 reject 两个函数来更改状态
 * 5. then 方法内部做但事情就是状态判断
 *    如果状态成功，调用成功回调函数
 *    如果状态失败，调用失败回调函数
 */

/**
 * 1. 创建构造函数，存储经过resolve及reject处理后的值并管理Promise实例的状态，executor传入resolve和reject方法
 * 2. then方法中，定义两个参数，分别是onfulfilled 和 onrejected
 * 3. 引入异步方法，保证异步执行
 * 4. 实现then方法多次调用添加多个处理函数，将所有then方法中的onFulfilledFunc及onRejectedFunc存储到数组中
 * 5. 实现链式调用，
 */
function _Promise(executor) {
  this.status = "pending"; // 状态：Promise 实例状态（pending、fulfilled、rejected）
  this.value = null; //
  this.reason = null;
  // 存储成功或回调函数
  this.onFulfilledArray = [];
  this.onRejectedArray = [];
  this.onFulfilledFunc = Function.prototype;
  this.onRejectedFunc = Function.prototype;
  const resolve = (value) => {
    //   这块不懂
    if (value instanceof _Promise) {
      return value.then(resolve, reject);
    }
    setTimeout(() => {
      if (this.status === "pending") {
        this.value = value;
        this.status = "fulfilled";
        this.onFulfilledArray.forEach((func) => {
          func(value);
        });
      }
    });
  };

  const reject = (reason) => {
    setTimeout(() => {
      if (this.status === "pending") {
        this.reason = reason;
        this.status = "rejected";
        this.onRejectedArray.forEach((func) => {
          func(reason);
        });
        // 使用while
        // while (this.onRejectedArray.length){
        // this.onRejectedArray.shift()(value)
        // }
      }
    });
  };

  try {
    // 一个构造器，会立即执行
    executor(resolve, reject);
  } catch (e) {
    reject(e);
  }
}

// 第二步：then方法中，定义两个参数，分别是onfulfilled 和 onrejected

_Promise.prototype.then = function (onfulfilled, onrejected) {
  // 对参数进行判断，实参不为函数类型时，赋予函数默认值
  onfulfilled =
    typeof onfulfilled === "function" ? onfulfilled : (data) => data;
  onrejected =
    typeof onrejected === "function"
      ? onrejected
      : (error) => {
          throw error;
        };
  if (this.status === "fulfilled") {
    onfulfilled(this.value);
  }
  if (this.status === "rejected") {
    onrejected(this.reason);
  }
  if (this.status === "pending") {
    this.onFulfilledArray.push(onfulfilled);
    this.onRejectedArray.push(onrejected);
  }
};

let promise = new _Promise((resolve, reject) => {
  resolve("data");
});
// 异步实现
// promise.then((data) => {
//   console.log(data);
// });
// console.log(1);
//  多个then
promise.then((value) => {
  console.log(1, "then");
  console.log("resolve", value);
});
promise.then((value) => {
  console.log(2, "then");
  console.log("resolve", value);
});
promise.then((value) => {
  console.log(3, "then");
  console.log("resolve", value);
});
