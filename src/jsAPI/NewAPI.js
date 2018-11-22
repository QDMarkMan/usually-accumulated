/*
 * @Author: etongfu 
 * @Date: 2018-11-06 14:37:11 
 * @Last Modified by: etongfu
 * @Last Modified time: 2018-11-22 14:07:58
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
console.log(Symbol.keyFor(sfor1)) // string
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


// Set And Map
// set
const set1 = new Set([1,2,2,3,3,3,3])
console.log(set1) // Set(3)
const arrayLikes = document.getElementsByTagName('div')
console.log(arrayLikes) // HTMLCollection
const set2 = new Set(arrayLikes)
console.log(set2.size) // 27
// 先创建set
const setFirst = new Set()
const setArr = [1,2,3,1,12,3,4,3,4,3,4]
setArr.forEach(element => {
  setFirst.add(element)
})
console.log(setFirst) //  Set(5) {1, 2, 3, 12, 4}
// Api操作示例
let setMethod = new Set()
setMethod.add(1).add(2).add(2) // Set(2) {1, 2}
console.log(setMethod) // 
setMethod.has(1) // true
setMethod.delete(1) //
console.log(setMethod) // Set(1) {2}
setMethod.clear() 
console.log(setMethod) // Set(0) {}
// 遍历方法
let setFor = new Set(['red', 'green', 'blue'])
console.log(setFor.keys()) // SetIterator {"red", "green", "blue"}
for (const iterator of setFor.keys()) {
  console.log(iterator) // red green blue
}
console.log(setFor.values()) // SetIterator {"red", "green", "blue"}
for (const iterator of setFor.values()) {
  console.log(iterator) // red green blue
}
console.log(setFor.entries())
for (const iterator of setFor.entries()) {
  // entries方法返回的遍历器，同时包括键名和键值，所以每次输出一个数组，它的两个成员完全相等。
  console.log(iterator) //  ["red", "red"] ["green", "green"] ["blue", "blue"]
}
// forEach 方法
setFor.forEach((value, key) => console.log(key + ' : ' + value))
// set的应用
// arrary.from转化
const setArrays = new Set([1, 2, 3, 4, 5])
let arraySets = Array.from(setArrays)
console.log(arraySets) // [1, 2, 3, 4, 5]
// 配合`...`展开运算符快速去重。
let numbers = [1,2,1,1,23,4,12,1,1]
console.log([...new Set(numbers)])// [1, 2, 23, 4, 12]
//求两个数组的集合
const arrayA = [1,2,3], arrayB= [2,3,4]
let setA = new Set(arrayA), setB = new Set(arrayB)
// 并集
const union = new Set(arrayA.concat(arrayB))
console.log(union) //  Set(4) {1, 2, 3, 4}
// 交集
const intersect = new Set(arrayA.filter(x => setB.has(x)))
console.log(intersect) // Set(2) {2, 3}
// 差集
const differenceA = arrayA.filter(x => !setB.has(x))
const diefferenceB = arrayB.filter(x => !setA.has(x))
const difference = new Set([...differenceA, ...diefferenceB])
console.log(difference) // set(2) {1, 4}

// Map
// Map的基本使用
const map = new Map()
const mapObj = {m: 'map'}
map.set(mapObj, 'this is value')
console.log(map.get(mapObj)) // this is value

console.log(map.has(mapObj)) // true
console.log(map.delete(mapObj)) // true
console.log(map.has(mapObj)) // fasle
// 数组入参
const arrMap = new Map([
  ['name', 'arr'],
  ['title', 'map']
])
console.log(arrMap.has('name'))
console.log(arrMap.get('name')) // arr
console.log(arrMap.get('title'))// map
// 语法趟
const arr = [
  ['name', '张三'],
  ['title', 'Author']
]
let map2 = new Map()
arr.forEach(
  ([key, value]) => map2.set(key, value)
)
console.log(map2) // Map(2) {"name" => "张三", "title" => "Author"}
// set和map作为构造函数
const mapSet = new Set([
  ['foo', 1],
  ['bar', 2]
])
const setMap = new Map(mapSet)
console.log(setMap) // Map(2) {"foo" => 1, "bar" => 2}
const mapMap = new Map([['name', 'mapMap']]) 
const mapMap2 = new Map(mapMap)
console.log(mapMap2) // Map(1) {"name" => "mapMap"}
// 键的引用问题
const b = ['b']
const refMap = new Map()
refMap.set(['a'], 555)
refMap.set(b, '指向同一地址')
console.log(refMap);
console.log(refMap.get(['a'])) // undefined
console.log(refMap.get(b)) // 指向同一地址
// Map属性
console.log(refMap.size) // 2

// 遍历
const forMap = new Map([
  ['for', 'no'],
  ['map',  'yes'],
])
// key
for (const key of forMap.keys()) {
  console.log(key) // for map
}
for (const key of forMap.values()) {
  console.log(key) // no yes
}
for (const key of forMap.entries()) {
  console.log(key) //  ["for", "no"] ["map", "yes"]
}
// 结构显示
for (let [key, value] of forMap.entries()) {
  console.log(key, value) // for no, map yes
}
// forEach
forMap.forEach(function(value, key, map) {
  console.log("Key: %s, Value: %s", key, value);
},this) // Key: for, Value: no  , Key: map, Value: yes

// 数据结构间的转换
const mapToArr = [...forMap]
console.log(mapToArr) // ) [Array(2), Array(2)]
// 对象和Map
function mapToObject(map) {
  let obj = {}
  for (const [k, v] of map.entries()) {
    obj[k] = v
  }
  return obj
}
console.log(mapToObject(forMap)) // {for: "no", map: "yes"}
function objToMap(object) {
  const map = new Map()
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      map.set(key, object[key])
    }
  }
  return map
}
console.log(objToMap({ka:'va', kb: 'vb'})) // Map(2) {"ka" => "va", "kb" => "vb"}
// JSON和MAP
// 2 数组json
let jsonMap = new Map().set(true, 7).set({foo: 3}, ['abc'])
function mapToJson (map) {
  return JSON.stringify([...map])
}
console.log(mapToJson(jsonMap)) // [[true,7],[{"foo":3},["abc"]]]
// weakMap
let weakObj = {
  a: 1
}
const weakMap = new WeakMap()
weakMap.set(weakObj, 1)
console.log(weakMap.get(weakObj)) //  1
weakObj = null
console.log(weakMap.get(weakObj)) //  undefined 这个key会跟着weakObj的销毁而销毁
//但是值却不被影响
let valueObj = {
  a: '我是 value object key'
}
let value = {
  a: 'value '
}
weakMap.set(valueObj, value)
console.log(weakMap.get(valueObj)) // {a: "value "}
value = null
console.log(weakMap.get(valueObj)) // {a: "value "} 
// Proxy
// 下面代码对一个空对象架设了一层拦截，重定义了属性的读取（get）和设置（set）行为
const proxyObj = new Proxy({}, {
  /**
   * 读取行为
   * @param {*目标对象} target
   * @param {*目标key} key 
   * @param {*接收对象(Symbol值)} receiver 
   */
  get (target, key, receiver) {
    console.log(target) // {count: 1}
    console.log(`getting ${key}!`); // getting count!
    return Reflect.get(target, key, receiver);
  },
  /**
   * 设置行为
   * @param {*目标对象} target 
   * @param {*属性名} key 
   * @param {*设置value} value 
   * @param {*proxy实例本身(Symbol)} receiver 
   */
  set (target, key, value, receiver) {
    console.log(target) // {}
    console.log(receiver) // Proxy {}
    console.log(`getting ${key} ${value}!`);
    return Reflect.set(target, key, value, receiver);
  }
})
proxyObj.count = 1 // getting count 1!
console.log(proxyObj.count) // 1
// 更实际的拦截
const objForPro1 = {
  a: 1
}
const proxyObj1 = new Proxy(objForPro1, {
  set (target, key) {
    return 1
  }
})
// 拦截针对的是Proxy对象！
proxyObj1.a = 4
proxyObj1.a = 5
console.log(proxyObj1.a) // 1
// 如果handler没有设置任何拦截，那就等同于直接通向原对象。
const proxyObj2 = new Proxy(objForPro1, {})
proxyObj2.a = 2
console.log(proxyObj2.a) // 2

// Proxy 实例也可以作为其他对象的原型对象。
const objByProxy = Object.create(proxyObj2)
console.log(objByProxy.a) // 2

// 同一个拦截器函数，设置拦截多个操作。
const mutiHandle = {
  get (target, name) {
    if (name === 'prototype') {
      return Object.prototype
    }
    console.log(`Hello ${name}`);
    return `Hello ${name}`
  },
  /**
   * 自定义apply 函数
   * @param {*目标对象} target 
   * @param {*目标this} thisBinding 
   * @param {*参数数组} args 
   */
  apply (target,thisBinding, args) {
    console.log(`rewrite call && args  = ${[...args]}`);
    return args[0]
  },
  /**
   * 自定义构造器函数
   * @param {*} target 
   * @param {*} args 
   */
  construct (target, args) {
    console.log(`rewrite construct && args  = ${[...args]}`);
    return {value: args[1]}
  }
}
let proxyObj3 = new Proxy(function(x, y) {
  return x + y
}, mutiHandle)
console.log(proxyObj3(1,2))// call： 调用函数被拦截 rewrite call && args  = 1,2
console.log(new proxyObj3(1, 2)) // {value: 2}  rewrite construct && args  = 1,2
console.log(proxyObj3.prototype === Object.prototype) // true 因为我们拦截了get 
console.log(proxyObj3.a === "Hello a") // true 因为我们同时也拦截了value

// proxy实例的的方法
// get方法的继承
let proto = new Proxy({}, {
  get (target, key) {
    console.log('GET ' + key)
    return target[key]
  }
})
let proxyObj4 = Object.create(proto) // proxyObj4直接继承了proto中的get 方法
proxyObj4.foo // foo 
// get 根据复索引取值
function createArr (...args) {
  let handler = {
    get (target, key, receiver) {
      const index = Number(key)
      // 构建真实的key
      if (key < 0) {
        key = String(target.length + index);
      }
      // Reflect以后再说
      return Reflect.get(target, key, receiver)
    }
  }
  let target = []
  target.push(...args)
  // 返回一个被proxy拦截的数组对象
  return new Proxy(target, handler);
}
const proxyArr = createArr('a','b', 'c', 'd')
console.log(proxyArr[-1]) // d 
// 如果目标对象自身的某个属性，不可写且不可配置，那么set方法将不起作用。
const readObj = {}
// 又是一种设置只读属性的方法
Object.defineProperty(readObj, 'name', {
  value: 'readOnly',
  writable: false,
})
const uselessHandle = {
  set (target, key, value, receiver) {
    target[key] = 'set by proxy'
  }
}
const uselessProxy = new Proxy(readObj, uselessHandle)
// uselessProxy.name = 'proxy' // Cannot assign to read only property 'name' of object '#<Object>
console.log(uselessProxy.name)// readOnly
// 简单的apply()
let applyFunc = function() {console.log(`I am target function`)}
const applyProxy = new Proxy(applyFunc, {
  /**
   * @param {*} target 
   * @param {*} targetThis 
   * @param {*} args 
   */
  apply (target, targetThis, args) {
    console.log(`i am proxy`)  
  }
})
applyProxy() // i am proxy
// 使用has() 隐藏部分属性
const hasHandle = {
  /**
   * 隐藏“_”开头的属性
   * @param {*} target 
   * @param {*} key 
   */
  has (target, key) {
    if (key[0] === '_') {
      return false
    }
    return key in target
  }
}
let hasObj = {name: 'has', _age: 'private'}
let hasProxy = new Proxy(hasObj, hasHandle)
console.log('_age' in hasProxy) // false
// 不可扩展的时候使用has会报错
let noHasObj = {a: 1}
Object.preventExtensions(noHasObj) // 禁止扩展
const noHasProxy = new Proxy(noHasObj, {
  has: function(target, prop) {
    return false
  }
})
// console.log('a' in noHasProxy) // Uncaught TypeError: 'has' on proxy: trap returned falsish for property 'a' but the proxy target is not extensible
// has对for in 循环是不起作用的
for (const key in hasProxy) {
  console.log(key)// name _age
}







console.warn('ES6中新API专题结束')
