/*
 * @Author: etongfu
 * @Email: 13583254085@163.com
 * @Date: 2019-01-25 11:00:44
 * @LastEditors: etongfu
 * @LastEditTime: 2019-01-25 14:40:25
 * @Description:  Promise 实现 遵循promise/A+规范
 * @youWant: add you want info here
 */
 // promise 三个状态
let pendingSym = Symbol('pending') , fulfilledSym = Symbol('fulfilled') , rejectedSym = Symbol('rejected') 
const STATUS = {
  [pendingSym]: "pending",
  [fulfilledSym]: "fulfilled",
  [rejectedSym]: "rejected"
}
/**
 * 构造函数
 * @param {*} excutor 
 */
function Promise(excutor) {
  let _this = this // 缓存当前promise实例对象
  _this.status = STATUS.pendingSym //初始状态
  _this.value = undefined // fulfilled状态时 返回的信息
  _this.reason = undefined // rejected状态时 拒绝的原因
  _this.onFulfilledCallbacks  = [] // fulfilled状态时的执行函数
  _this.onRejectedCallbacks = [] // rejected状态时的执行函数
  /**
   * reslove 函数
   * @param {*成功时接受的值} value 
   */
  function reslove(value) {
    // 先判断value是不是个value 是个value的话需要接着then出去
    if (value instanceof Promise) {
      return value.then(reslove, reject)
    }
    /**
    // 为什么resolve 加setTimeout?
    // 2.2.4规范 onFulfilled 和 onRejected 只允许在 execution context 栈仅包含平台代码时运行.
    // 注1 这里的平台代码指的是引擎、环境以及 promise 的实施代码。实践中要确保 onFulfilled 和 onRejected 方法异步执行，
      且应该在 then 方法被调用的那一轮事件循环之后的新执行栈中执行。
     */
    setTimeout(() => {
      if (_this.status === STATUS.pendingSym) {
        _this.status = STATUS.fulfilledSym //切换状态 避免多次调用
        _this.value =value
        // 执行then
        _this.onFulfilledCallbacks.forEach(cb => cb(_this.value))
      }
    })
  }
  /**
   * reject函数
   * @param {*} reason 
   */
  function reject(reason) {
    setTimeout(() => {
      if (_this.status = STATUS.pendingSym) {
        _this.status = STATUS.rejectedSym
        _this.reason = reason
        // 执行catch
        _this.onRejectedCallbacks.forEach(cb => cb(_this.reason))
      }
    })
  }
  //  捕获生成实例过程中的异常
  try {
    excutor(resolve, reject);
  } catch (error) {
    reject(e)
  }
}
/**
 * 对resolve 进行改造增强 针对resolve中不同值情况 进行处理
 * 针对不同的值的promise处理
 * @param {*promise} promise2  promise2 promise1.then方法返回的新的promise对象
 * @param {*} x   promise1中onFulfilled的返回值
 * @param {*} resolve  promise2的resolve方法
 * @param {*} reject  promise2的reject方法
 */
function reslovePromise (promise2, x, resolve, reject) {
  if(promise2 === x) {
    return reject(new TypeError('循环引用'));
  }
  let called = false
  
}
/**
 * then 方法
 * @param {*function} onFulfilledCb 成功回掉
 * @param {*function} onRejectedCb  异常回掉
 * @return {function} newPromsie  返回一个新的promise对象
 */
Promise.prototype.then = function (onFulfilledCb, onRejectedCb) {
  const _this = this
  let newPromise
  // 默认值处理
  // 注意这个value和reason 都是当前这个Promise实例中的对象
  onFulfilledCb = typeof onFulfilledCb === 'function' ? onFulfilledCb : value => value 
  onRejectedCb = typeof onRejectedCb === 'function' ? onRejectedCb : reason => {
    throw reason
  }

}