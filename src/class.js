/*
 * @Author: etongfu 
 * @Date: 2018-10-25 16:18:22 
 * @Last Modified by: etongfu
 * @Last Modified time: 2018-10-25 17:53:25
 */
console.warn(' ------------------------------------捋清楚ES6中的Class begin----------------------------------')
// 关键字定义
class Person {
  constructor () {
    this.name = '关键字定义'
  }
  sayName () {
    console.log(this.name)
  }
}
// 使用extends
class Children extends Person {
  constructor (...args) {
    super(...args)
    // 在子类中使用this 必须要在super之后使用
    this.childrenName = '使用extends关键字定义'
  }
}
const boy = new Children()
boy.sayName()
// 类表达式定义
const NewPerson = class NamedPerson {
  constructor () {
    this.name = '表达式定义'
  }
  showName () {
    console.log(this.name)
  }
}
// console.log(NamedPerson.name) // NamedPerson is undefined
let instance = new NewPerson();
instance.showName()// "表达式定义"
// 自执行类
let AutoClass = new class Auto {
  constructor (name) {
    this.name = name
  }
  sayName () {
    console.log(this.name)
  }
}('自执行类')
AutoClass.sayName()
// 类其实就是函数
class Point {

}
const ponit = new Point()
console.log(typeof Point)// "function"
Point = Point.prototype.constructor // true

// 修改constructor中的this
class Foo {
  constructor () {
    return Object.create(null)
  }
}
console.log(new Foo() instanceof Foo) //false

// 实例一个对象
class Instance {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }
}
const single = new Instance(1,2)
single.toString()
console.log(single.hasOwnProperty('x')) // true
console.log(single.hasOwnProperty('y'))// true
console.log(single.hasOwnProperty('toString'))// false
console.log(single.__proto__.hasOwnProperty('toString')) // true

// 私有方法和属性
// 1: 简单方式
class Self {
  // 公共方法
  say (name) {
    this._say(name)
  }
  // 私有方法
  _say (name) {
    return this.my = name
  }
}
// 2: 使用symbol实现
const bar = Symbol('bar')
const name = Symbol('name')
class MyClass {
  // 公共方法
  foo(bar) {
    this[bar](bar)
  }
  // 私有方法  bar和snaf都是Symbol值，导致第三方无法获取到它们，因此达到了私有方法和私有属性的效果。
  [bar](bar) {
    return this[name] = bar
  }
}
// 私有属性提案
/* class NewSelf {
  #name
  constructor(){
    #name = '私有属性提案'
  }
} */

// ES5闭包实现实现私有属性
const SelfEs5Func = function (name) {
  let temp = name
  this._name = function (){
    return temp
  }
}
let es5 = new SelfEs5Func('闭包中的私有属性')
console.log(es5._name())
// 使用object来实现
let SelfObject = {}
Object.defineProperty(SelfObject, 'freeze', {
  get () {
    return '我是个只读的对象'
  },
  set () {
    console.log('this is readonly')
  }
})
console.log(SelfObject.freeze);
SelfObject.freeze = '测试'
console.warn(' ------------------------------------捋清楚ES6中的Class end  ----------------------------------')
