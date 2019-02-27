/*
 * @Author: etongfu
 * @Email: 13583254085@163.com
 * @LastEditors: etongfu
 * @Description: Vue响应式原理
 * @youWant: add you want info here
 * @Date: 2019-02-25 17:29:13
 * @LastEditTime: 2019-02-26 16:32:12
 */
console.warn(`------------Vue响应式原理部分Start------------`)
// 第一步实现一个简单的对象拦截
const data = {
  a: 1,
  b:2,
  name: 'Vue',
  age: 2
}
let target = null
for (const key in data) {
  // 拦截列表
  const dep = []
  // 缓存val
  let val = data[key]
  Object.defineProperty(data, key,  {
    // set赋值
    set (newVal) {
      if (newVal == val) return;
      val = newVal
      dep.forEach(fn => fn())
    },
    get () {
      dep.push(target)
      return val // 返回值
    }
  })
}
/**
 * 简易版watch
 * @param {*} exp 
 * @param {*} fn 
 */
function easyWatch (exp, fn) {
  target = fn
  data[exp]
}

// 第二部完善watch
// 在上一步我们的watch只能监听没有嵌套的对象， 下面我们呢实现嵌套对象的监听 嵌套监听也很简单，递归一下就行了
/**
 * 递归监听
 * @param {*} data 
 */
function walk (data) {
  for (const key in object) {
    // 拦截列表
    const dep = []
    // 缓存val
    let val = data[key]
    // 如果当前的val是个对象那么开始递归调用
    const nativeStr = Object.prototype.toString.call(val)
    if (nativeStr === '[object object]') {
      walk(val)
    }
    Object.defineProperty(data, key,  {
      // set赋值
      set (newVal) {
        if (newVal == val) return;
        val = newVal
        dep.forEach(fn => fn())
      },
      get () {
        dep.push(target)
        return val // 返回值
      }
    })
  }
}
walk(data)
// 改造了之后之前的watch也肯定是不好用的
//读取字段值的时候我们直接使用 data[exp]，如果按照 $watch('a.b', fn) 这样调用 $watch 函数，
// 那么 data[exp] 等价于 data['a.b']，这显然是不正确的，正确的读取字段值的方式应该是 data['a']['b']。所以我们需要稍微做一点小小的改造：
function walkWatch(exp, fn){
  target = fn
  let pathArr, obj = data
  //　如果是函数那么直接执行
  if (typeof(exp) === 'function') {
    exp()
    return
  }
  // 检查exp中是否有.
  if (/\./.test(exp)) {
    pathArr = exp.split('.')
    // 循环读取
    pathArr.forEach(o => {
      obj = obj[o]
    })
    return 
  }
  //正常读取
  data[exp]
}
function render () {
  return document.write(`姓名：${data.name}; 年龄：${data.age}`)
}
walkWatch(render, render)
// 监听之后会自动更新dom
/* setTimeout(() => {
  data.name = 'Vue Observe'
}, 2000); */

// 第三步 observe 工厂函数
// 上面的是实现的基本思路 下面我们来讨论具体的实现，首先实现Observer 类
class Observer {

  constructor(value) {
    // 赋值
    this.value = value
    this.dep = []
    this.vmCount = 0
    // 
  }
  walk () {

  }
  observeArray () {

  }
}



console.warn(`------------Vue响应式原理部分End--------------`)
