/*
 * @Author: etongfu
 * @Email: 13583254085@163.com
 * @LastEditors: etongfu
 * @Description: Vue响应式原理
 * @youWant: add you want info here
 * @Date: 2019-02-25 17:29:13
 * @LastEditTime: 2019-02-25 17:48:54
 */
console.warn(`------------Vue响应式原理部分Start------------`)
const data = {
  a: 1
}
let dep = []
let Target = null
Object.defineProperty(data, 'a', {
  get () {
    dep.forEach(fn => fn())
  },
  set(val) {
    dep.push(Target)
  }
})
// watch函数
function watch (exp, fn) {
  // 将 Target 的值设置为 fn
  Target = fn
  // 读取对象属性
  data[exp]
}
watch('a', () => {
  console.log('第一次依赖')
})
watch('a', () => {
  console.log('第二次依赖')
})
data.a = 3
console.warn(`------------Vue响应式原理部分End--------------`)
