/*
 * @Author: etongfu 
 * @Date: 2018-10-19 17:33:59 
 * @Last Modified by: etongfu
 * @Last Modified time: 2018-10-23 15:07:00
 * closure
 */
console.warn(' ------------------------------------我眼中的闭包begin----------------------------------')
// 执行上下文理解下的闭包
function createCounter () {
  let count = 0
  const myFunction = function() {
      count = count + 1 
      return count
  }
  return myFunction
}
const increment = createCounter()
const c1 = increment()
const c2 = increment()
const c3 = increment()

console.log(increment,c1,c2,c3);

// 词法词法作用域下理解的闭包
function initScope () {
  let name = 'init variable' // name 是一个被 init 创建的局部变量
  function innerFunc () {    // innerFunc是内部函数，一个闭包
    console.log(name)        // 使用父函数中的变量
  }
  innerFunc()
}
initScope()

// 改造后代码

function outerFunc () {
  let name = 'outerfunc scope'
  function innerFunc(){
    console.log(name)
  }
  return innerFunc
}
let func = outerFunc()
func()

// 设置字号
function sizeConstructor (size) {
  return function () {
    document.body.style.fontSize = `${size}px`
  }
}
// 字号
const size12 = sizeConstructor(12)
const size14 = sizeConstructor(14)
const size16 = sizeConstructor(16)
// 挂载
document.getElementById('size12').onclick = size12
document.getElementById('size14').onclick = size14
document.getElementById('size16').onclick = size16

// 模拟私有属性
function Person (name) {
  let _name = name
  // 通过闭包把_name字段变为私有属性，这个_name在构造函数内并不是属性，而是一个变量。在实例中无法修改_name,我们仅仅提供了读取_name的方法
  this.getName = function () {
    return this._name
  }
  // 现在外部没有办法来修改这个为构造函数传入的name了
}

// 模拟私有方法/封装命名空间
const PrivateMethods = function(){
  let privateValue = 0
  // 私有方法
  function _private (value) {
    privateValue += value
  }
  // 公共方法
  return {
    increment: function() {
      _private(1)
    },
    decrement: function() {
      _private(-1)
    },
    value: function() {
      return privateValue
    }
  }
}
const method = new PrivateMethods()
// console.log(PrivateMethods.privateValue) // undefined
console.log(method.value())         // 0
method.decrement()
console.log(method.value())         // -1
method.increment()
method.increment()
console.log(method.value())         // 1

// 闭包中常见的注意点
const num = 10
let arr = []
for (var i = 0; i < num; i++) {
  arr[i] = function () {
    console.log(i)
  }
}
for (let i = 0;  i < num; i++) {
  arr[i]()
}
// 修改后的代码
let funs = []
for (var j = 0; j < num; j++) {
  funs[j] = (function(){
    let i = j
    return function () {
      console.log(i)
    }
  })()
}
for (let i = 0;  i < num; i++) {
  funs[i]()
}
console.warn(' ------------------------------------我眼中的闭包end----------------------------------')
