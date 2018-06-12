/**
 * Object API模块回顾
 * MDN文档为主
 * Object具有两个属性
 * Object.prototype:表示对象得object原型对象
 * Object.prototype.__proto__是一个访问器属性
 * Object.prototype.constructor：所有得对象都会从它得原型上继承一个constructor属性
 */
/**
 * ⭐⭐⭐⭐⭐
 * Object.assign(target,...sources) 将source对象中得可枚举得值复制到目标对象 source可以是一个或者多个
 * 注意：返回得是目标对象  如果目标对象中的属性具有相同的键，则属性将被源中的属性覆盖。后来的源的属性将类似地覆盖早先的属性。
 * 注意，Object.assign 不会跳过那些值为 null 或 undefined 的源对象。
 * 这个方法只是个浅拷贝，深拷贝需要使用其他方法 
 * 这个方法可以用来合并对象以及合并具有相同属性得对象
 */
//可以用来复制一个对象
let obj = {
  a:1
}
let copyObj = Object.assign({},obj)
//正常用法
let source = {
  b:2
}
let target = Object.assign(obj,source)
console.log(obj);
console.log('assign()返回得是目标对象 主要是修改了目标对象')
console.log(target);

// 深拷贝对象 通过JSON相关得API进行操作
let obj1 = { a: 0 , b: { c: 0}}
let objClone = JSON.parse(JSON.stringify(obj1))
objClone.a = 'clone'
console.log('原对象：');
console.log(obj1)
console.log('克隆出来得对象');
console.log(objClone)


/**
 * ⭐⭐⭐
 * Object.create(proto,propertiesObject)方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__。
 * proto:新创建对象得原型对象
 * propertiesObject：可选 如果没有则为undefined 对象得属性
 * 注意：返回一个新对象
 */
//使用Object.create实现类式继承
//父类  
function Shape(){
  this.x = 0
  this.y = 0
}
Shape.prototype.move = function(x,y){
  this.x += x
  this.y += y

}
//子类
function Rectangle(){
  return Shape.call(this) // call super constructor
}
// 子类继承父类
Rectangle.prototype = Object.create(Shape.prototype)
Rectangle.prototype.constructor = Rectangle// 构造函数

let rect = new Rectangle()
console.log('Is rect an instance of Rectangle?', rect instanceof Rectangle); // true

/**
 * 创建对象得方式
 */
// let o = {} 就像相当于下面的
let o = Object.create(Object.prototype)

//创建对象的时候使用第二个参数
let oPro = Object.create(Object.prototype, {
  // foo会成为所创建对象的数据属性
  foo: { 
    writable:true,
    configurable:true,
    value: "hello" 
  },
  // bar会成为所创建对象的访问器属性
  bar: {
    configurable: false,
    get: function() { return 10 },
    set: function(value) {
      console.log("Setting `o.bar` to", value);
    }
  }
})


function Constructor(){}
// oConstructor = new Constructor()就相当于
let oConstructor = Object.create(Constructor.prototype) // 如果在Constructor函数中有一些初始化代码,Object.create不能执行那些代码

/**
 * ⭐⭐⭐⭐⭐
 * defineProperties(obj,props)方法直接在一个对象上定义新的属性或修改现有属性，并返回该对象。
 * 返回当前属性
 */
let defineObj = {}
Object.defineProperties(defineObj,{
  'demo':{
    value:1,
    writable:true
  }
})

/**
 * ⭐⭐⭐⭐⭐
 * defineProperty(obj,prop,descriptor)方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性， 并返回这个对象。
 * obj:目标对象
 * prop: 目标对象要新增或者修改的名称
 * descriptor：定义被修改的属性描述符
 * 注意：这个是实现简单的数据双向绑定的原理和核心
 */
//简单的双向绑定的实现
let model = document.querySelector('#model')
let view = document.querySelector('#view')
var vm = {
  val:""
}
//核心部分
Object.defineProperty(vm,'val',{
  get(){
    return val
  },
  set(newVal){
    let val = newVal
    model.value = val;
    view.innerHTML = val;
  }
})
//事件的监听
document.addEventListener('keyup',function(e){
  vm.val = e.target.value || ""
})

/**
 * ⭐⭐⭐⭐
 * entries()方法返回一个给定对象自身可枚举属性的键值对数组，
 * 其排列与使用 for...in 循环遍历该对象时返回的顺序一致（区别在于 for-in 循环也枚举原型链中的属性）。
 * 注意：返回的是一个数组
 */
let enObj = {
  a:1213,
  b:212,
  c:3423
}
let enArr = Object.entries(enObj)
console.log('数组的entires返回的是一个二维的数组')
console.log(enArr)
// 将Objec转化为map
let mapobj = { foo: "bar", baz: 42 }
let map = new Map(Object.entries(mapobj))
console.log(map)