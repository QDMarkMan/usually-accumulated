/*
 * @Author: etongfu
 * @Email: 13583254085@163.com
 * @Date: 2019-01-25 14:53:35
 * @LastEditors: etongfu
 * @LastEditTime: 2019-01-25 15:07:46
 * @Description: 简易版Promise实现
 * @youWant: add you want info here
 */
console.warn(' ------------------------------------简单Promise begin----------------------------------')
class EasePromise {
  // 调用相应方法
  constructor (fn) {
    this.status = 'Pending'
    setTimeout (() => {
      fn((data) => {
        this.resolve(data)
      }, (error) => {
        this.reject(error)
      })
    })
  }
  /**
   * reslove 处理函数
   * @param {*} data 
   */
  resolve(data) {
    if (this.status = 'Pending') {
      this.success (data)
      this.status = 'Fulfilled'
    }
  }
  /**
   * 错误处理页面
   * @param {*} data 
   */
  reject(error) {
    if (this.status = 'Pending') {
      this.error(error)
      this.status = 'Rejected'
    }
  }
  /**
   * 传递处理函数
   * @param {*function} success 
   * @param {*function} reject 
   */
  then(success, reject) {
    this.success = success
    this.reject = reject
  }
  /**
   * 错误捕捉
   * @param {*} err 
   */
  catch(reject) {
    return this.then(null, reject);
  }
}
// 测试
let easePromoise = new EasePromise((reslove, reject) => {
  setTimeout(() => {
    reslove('hello ease promise')
  }, 1000)
})
easePromoise.then((result) => {
  debugger
  console.log(result)
}, (err) => {
  console.error(error)
})
console.warn(' ------------------------------------简单Promise end----------------------------------')
