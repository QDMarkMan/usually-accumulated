/*
 * @Author: etongfu
 * @Email: 13583254085@163.com
 * @Version: 
 * @Date: 2019-05-23 14:44:27
 * @LastEditors: etongfu
 * @LastEditTime: 2019-05-23 17:36:10
 * @Description: 原型相关示例代码
 * @youWant: add you want info here
 */
console.warn("------------------------------------这个是原型相关Demo begin------------------------------------");
// 构造函数Person
function Person (name, age) {
  this.name = name
  this.age = age
  this.sayType = function () {
    console.log(this.type)
  }
}
// 原型中属性
Person.prototype.type = "human"

// 构造函数People
function People () {

}
People.prototype = new Person()
// 实例对象
const person = new Person()
person.sayType()
const people = new People()
// _proto_指向
console.log(person.__proto__) // ==> Person.prototype
// 实例对象的prototype
console.log(person.prototype) // undefined
// 构造函数的prorotype
console.log(Person.prototype) // ==> Person.prototype
// 指向对比
console.log(person.__proto__ === Person.prototype) // ==> true
// 原型属性的构造函数
console.log(Person.prototype.constructor === Person) // ==> true
// 同样的我们可以再进一步的访问Person.prototype.__proto__
console.log(Person.prototype.__proto__) // ==> 因为Person.prototype没有显式的定义， 那么__proto__就是`Object.prorotype`
// 验证
console.log(Person.prototype.__proto__ === Object.prototype) // ==> 因为Person.prototype没有显式的定义， 那么__proto__就是`Object.prorotype`
// 如果过显式的指定了Person.prototype
console.log(People.prototype.__proto__) // ==> 如果有显式的定义， 那么__proto__就是显式定义的值`Person.prorotype`
console.log(People.prototype.__proto__ === Person.prototype) // ==> true
// 同样的我们也会发现People和Person存在着继承关系
console.log([people instanceof People, people instanceof Person, people instanceof Object]); // ==> [true, true, true]
// 如果我们要查找people中的type， 那么他就会逐层的向上查找 People.prototype ==> Person.prototype ==> Object.prototype一旦匹配，就停止查找了。也就是在原型链上查找
console.log(people.type) // ==> human


// 通过原型链实现的继承
let Father = {
  name: 'father',
  sayName: function(){
    console.log(this.name)
  }
}
let child = Object.create(Father)
child.name = 'child'
child.sayName() // child


// 实现一个new
function myNew (Constructor, ...args) {
  /* // 生成新对象
  let _obj = Object.create({})
  // 链接到prototype
  _obj.__proto__ = arguments[0].prototype
  // 绑定 this 为当前创造的_obj
  const realArgs = [...arguments].splice(1) // 除了构造函数以外的其他参数
  let result = arguments[0].apply(_obj, realArgs)
  // 返回新对象
  return typeof result === 'object' ? result : _obj */
  let _obj = Object.create({})
  Object.setPrototypeOf(_obj, Constructor.prototype)
  let result = Constructor.apply(_obj, args)
  return result instanceof Object ? result : _obj
}
let personNew = myNew(Person,'personNew',2)
console.log(personNew.name) // ==>  personNew
console.log(personNew.__proto__) // ==> {type: "human", constructor: Person}


// 性能相关
let person3 = new Person("name", 1111)
for (const key in person3) {
  // hasOwnProperty 只查找直接属性 
  if (person3.hasOwnProperty(key)) {
    console.log(`对象中的key: ${key}`) // name age sayType
  } else {
    console.log(`prototype中的key: ${key}`) // type
  }
}
console.log(Object.keys(person3)) // ["name", "age", "sayType"] 排除prototype中的key

console.warn("------------------------------------这个是原型相关Demo  end------------------------------------");
