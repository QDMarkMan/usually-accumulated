/*
 * @Author: etongfu 
 * @Date: 2018-11-06 14:37:11 
 * @Last Modified by: etongfu
 * @Last Modified time: 2018-11-07 16:02:30
 * ES6 中新特性
 */
console.warn('ES6中新API专题开始')
console.log('====================================');
console.log('==================> Symbol相关')
console.log('====================================');
// 创建Symbol
let s = Symbol()
console.log(typeof s) // symbol 所以标识Symbol是一个原始类型

let s1 = Symbol('s1')
let s2 = Symbol('s2')
console.log(s1, s1.toString())// Symbol(s1) "Symbol(s1)"
console.log(s2, s2.toString())// Symbol(s2) "Symbol(s2)"
const obj = {
  a: 1
}
let s3 = Symbol(obj)
console.log(s3) // Symbol([object Object])
// 计算symbol
// console.log('Symbol is' + s3) // Uncaught TypeError: Cannot convert a Symbol value to a string
// 转化为Boolean值
let sym = Symbol()
console.log(Boolean(sym)) // true
console.log(!sym) // false
//symbol.for
let sfor1 = Symbol.for('string')
let sfor2 = Symbol.for('string')
console.log(sfor1 === sfor2) // true
console.log(Symbol.keyFor(sfor1))
// 当作键名来使用
let objSymbol = Symbol()
let obj1 = {}
obj1[objSymbol] = '第一种写法'
let obj2 = {
  [objSymbol]: '第二种写法'
}
let obj3 = {}
Object.defineProperty(obj3, objSymbol, {
  value: '第三种写法'
})
const obj4 = {}
obj4.objSymbol = '字符串属性!' // 这个是加上了个普通的字符串属性，并不是个Symbol属性
obj4[objSymbol] // undefined
obj4['objSymbol'] // "字符串属性!"
// 作为常量使用
const RED = Symbol('red')
const GREEN = Symbol('green')
function getComputed (color) {
  switch (color) {
    case RED: // 保证条件是唯一的
        return RED
      break;
    case GREEN:
      return GREEN
    break;
    default:
      throw new Error('Color is undefined')
      break;
  }
}
console.log(getComputed(RED)) // Symbol(red)
// 魔术字符串
/* function getArea(shape, options) {
  let area = 0;

  switch (shape) {
    case 'Triangle': // 魔术字符串
      area = .5 * options.width * options.height;
      break;
  }
  return area;
}
getArea('Triangle', { width: 100, height: 100 }); // 魔术字符串 */
// 使用Symbol代替
const symbolType = {
  triangle: Symbol('triangle')
}
function getArea (shape, options) {
  let a = 0
  switch (shape) {
    case symbolType.triangle:
     a =  options.width * options.height
    break
  }
  return a
}
getArea(symbolType.triangle, {width: 100, height: 100})

// 循环遍历
const symObj = {
  [s1]: 's1',
  [s2]: 's2'
}  
for (const key in symObj) {
  console.log('symbol key') // 不会输出 甚至检测不到key
  console.log(key) // 没有作用
}
const objectSymbols = Object.getOwnPropertySymbols(symObj)
console.log(objectSymbols) // [Symbol(s1), Symbol(s2)]
// 和`getOwnPropertyNames`对比
const obj5 = {}
let s4 = Symbol('s4')
Object.defineProperty(obj5, s4, { 
  value: 'value'
})
for (const key in obj5) {
  console.log(key) // 无输出
}
console.log(Object.getOwnPropertyNames(obj5)) // []
console.log(Object.getOwnPropertySymbols(obj5)) // [Symbol(s4)]
// 获取全部的keys
const allKeys = {
  [Symbol('key')] : 'symbol',
  num: 1
}
console.log(Reflect.ownKeys(allKeys)) // ["num", Symbol(key)]
console.warn('ES6中新API专题结束')
