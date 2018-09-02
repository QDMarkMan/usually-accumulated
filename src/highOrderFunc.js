
/*
 * @Author: etf 
 * @Date: 2018-09-01 23:02:11 
 * @Last Modified by: etf
 * @Last Modified time: 2018-09-02 14:16:48
 * JavaScript高阶函数的实现
 */
/**
 * 织入执行前函数
 * @param {*} fn 
 */
Function.prototype.aopBefore = function(fn){
  console.log(this)
  // 第一步：保存原函数的引用
  const _this = this
  // 第四步：返回包括原函数和新函数的“代理”函数
  return function() {
    // 第二步：执行新函数，修正this
    fn.apply(this, arguments)
    // 第三步 执行原函数
    return _this.apply(this, arguments)
  }
}
/**
 * 织入执行后函数
 * @param {*} fn 
 */
Function.prototype.aopAfter = function (fn) {
  const _this = this
  return function () {
    let current = _this.apply(this,arguments)// 先保存原函数
    fn.apply(this, arguments) // 先执行新函数
    return current
  }
}
/**
 * 使用函数
 */
let aopFunc = function() {
  console.log('aop')
}
// 注册切面
aopFunc = aopFunc.aopBefore(() => {
  console.log('aop before')
}).aopAfter(() => {
  console.log('aop after')
})
// 真正调用
aopFunc()

/**
 * 函数柯里化（curring）
 */
// 未柯里化的函数计算开销
let totalCost = 0
const cost = function(amount, mounth = '') {
  console.log(`第${mounth}月的花销是${amount}`)
  totalCost += amount
  console.log(`当前总共消费：${totalCost}`)
}
cost(1000, 1) // 第1个月的花销
cost(2000, 2) // 第2个月的花销
// ...
cost(3000, 12) // 第12个月的花销

// 部分柯里化完的函数
const curringPartCost = (function() {
  // 参数列表
  let args = []
  return function (){
    /**
     * 区分计算求值的情况
     * 有参数的情况下进行暂存
     * 无参数的情况下进行计算
     */
    if (arguments.length === 0) {
      let totalCost = 0
      args.forEach(item => {
        totalCost += item[0]
      })
      console.log(`共消费：${totalCost}`)
      return totalCost
    } else {
      // argumens并不是数组，是一个类数组对象
      let currentArgs = Array.from(arguments)
      args.push(currentArgs)
      console.log(`暂存${arguments[1] ? arguments[1] : '' }月，金额${arguments[0]}`)
    }
  }
})()
curringPartCost(1000,1)
curringPartCost(100,2)
curringPartCost()

// 通用curring函数
const curring = function(fn) {
  let args = []
  return function () {
    if (arguments.length === 0) {
      console.log('curring完毕进行计算总值')
      return fn.apply(this, args)
    } else {
      let currentArgs = Array.from(arguments)[0]
      console.log(`暂存${arguments[1] ? arguments[1] : '' }月，金额${arguments[0]}`)
      args.push(currentArgs)
      // 返回正被执行的 Function 对象，也就是所指定的 Function 对象的正文，这有利于匿名函数的递归或者保证函数的封装性
      return arguments.callee
    }
  }
}
// 求值函数
let costCurring = (function() {
  let totalCost = 0
  return function () {
    for (let i = 0; i < arguments.length; i++) {
      totalCost += arguments[i]
    }
    console.log(`共消费：${totalCost}`)
    return totalCost
  }
})()
// 执行curring化
costCurring = curring(costCurring)
costCurring(2000, 1)
costCurring(2000, 2)
costCurring(9000, 12)
costCurring()

/**
 * 节流函数
 * @param {*} fn 
 * @param {*} interval 
 */
const throttle = function (fn, interval = 500) {
  let timer = null, // 计时器 
      isFirst = true // 是否是第一次调用
  return function () {
    let args = arguments, _me = this
    // 首次调用直接放行
    if (isFirst) {
      fn.apply(_me, args)
      return isFirst = false
    }
    // 存在计时器就拦截
    if (timer) {
      return false
    }
    // 设置timer
    timer = setTimeout(function (){
     console.log(timer)
     window.clearTimeout(timer)
     timer = null
     fn.apply(_me, args)
    }, interval)
  }
}
// 使用节流
window.onresize = throttle(function() {
  console.log('throttle')
},600)

/**
 * 分时函数
 * @param {*创建节点需要的数据} list 
 * @param {*创建节点逻辑函数} fn 
 * @param {*每一批节点的数量} count 
 */
const timeChunk = function(list, fn, count = 1){
  let insertList = [], // 需要临时插入的数据
      timer = null // 计时器
  const start = function(){
    // 对执行函数逐个进行调用
    for (let i = 0; i < Math.min(count, list.length); i++) {
      insertList = list.shift()
      fn(insertList)
    }
  }
  return function(){
    timer = setInterval(() => {
      if (list.length === 0) {
        return window.clearInterval(timer)
      }
      start()
    },200)
  }
}
// 分时函数测试
const arr = []
for (let i = 0; i < 94; i++) {
  arr.push(i)
}
const renderList = timeChunk(arr, function(data){
  let div =document.createElement('div')
  div.innerHTML = data + 1
  document.body.appendChild(div)
}, 20)
// 调用render函数
// renderList()
/**
 * 惰性函数
 */
// 常用的事件兼容
const addEvent = function(el, type, handler) {
  if (window.addEventListener) {
    return el.addEventListener(type, handler, false)
  }
  // for IE
  if (window.attachEvent) {
    return el.attachEvent(`on${type}`, handler)
  }
}
// 优化之后的事件兼容
const addEventOptimization = (function() {
  if (window.addEventListener) {
    return (el, type, handler) => {
      el.addEventListener(type, handler, false)
    }
  }
  // for IE
  if (window.attachEvent) {
    return (el, type, handler) => {
      el.attachEvent(`on${type}`, handler)
    }
  }
})()
// 惰性加载函数
let addEventLazy = function(el, type, handler) {
  if (window.addEventListener) {
    // 一旦进入分支，便在函数内部修改函数的实现
    addEventLazy = function(el, type, handler) {
      el.addEventListener(type, handler, false)
    }
  } else if (window.attachEvent) {
    addEventLazy = function(el, type, handler) {
      el.attachEvent(`on${type}`, handler)
    }
  }
  addEventLazy(el, type, handler)
}
addEventLazy(document.getElementById('eventLazy'), 'click', function() {
  console.log('lazy ')
})