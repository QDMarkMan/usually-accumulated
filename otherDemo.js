/**
 * 部分demo
 */
console.warn("------------------------------------这个是demo输出的begin----------------------------------");
/**
 * 交换值
 */

let a = 100;
let b = 200;
[a,b] = [b,a];
console.log(a  + " + " + b);
/**
 * 返回多个值的函数_返回一个数组或者对象
 */
let getArr =  function  () {
    return [1,2,3,4];
}
let [x,y,z,q] =  getArr();
console.log(x + " + " + y + " + " + z + " + " + q );

let getObj = function(){
    return {
        id: '007',
        name:'etf',
        age:21
    }
}
let {id,name,age} = getObj();
console.log(id + " + " + name + " + " + age);
/**
 * 解析json
 */
let jsonData = {
    cid:1,
    cname:"mm",
    cage:21,
    score :{
        Chinese:98,
        English:98,
        Math:20
    }
}
//ES6解析开始
let {cid:number,cage,cname,score} = jsonData;
console.log(number);
console.log(cage);
console.log(cname);
console.log(score);
/**
 * 解析map结构
 */
let map = new Map();
map.set("user","007");
map.set("pass",'123');
for(let [key,value] of map){
    console.log(key +"is" + value);
}
//获取键名
for(let [key] of map){
    console.log(key);
}
//获取value
for(let [,item] of map){
    console.log(item);
}
/**
 * class专题 
 */
class Point{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
    newToString(){
        return x + "," + y; 
    }
}
//class表达式
const MyClass = class Me{
    constructor(name){
        this.name = name;
    };
    getClassName(){
        //Me只能在内部使用
        return console.log(Me.name);
    }
}
//如果内部没用到类的话可以省略Me
const NewClass = class {

}
//还可以写出自执行的Class 自执行的class本质上是自动创建一个object
let Person = new class{
    constructor(name){
        this.name = name;
    }
    sayName(){
        console.log(this.name);
    }
}('张三');
Person.sayName();
let newPoint = new Point();
//私有方法
//私有方法是常见需求，但 ES6 不提供，只能通过变通方法模拟实现。
//一种做法是在命名上加以区别。
//_bar方法前面的下划线，表示这是一个只限于内部使用的私有方法。但是，这种命名是不保险的，在类的外部，还是可以调用到这个方法。
class Widget {
    //公用方法
    foo(baz){
        this._baz(baz);
    }
    //私有方法
    _baz(baz){
        return this.snaf = baz;
    }
}
//另一种方法就是索性将私有方法移出模块，因为模块内部的所有方法都是对外可见的。
class twoWidget {
    foo(baz){
        bar.call(this,baz);
    }
}
function bar(baz){
    return this.snaf = baz;
}
//还有一种方法是利用Symbol值的唯一性，将私有方法的名字命名为一个Symbol值。
const tBar  = Symbol('tBar');
const tSnaf = Symbol('tSnaf');

export default class threeClass{
    // 公有方法
    foo(baz) {
        this[bar](baz);
    }
    //私有方法
    [bar](baz){
        return this[snaf] = baz;
    }
}
//this的指向
class Logger{
    printName(name = 'there'){
        this.print(`hello ${name}`);
    }
    print(text){
        console.log(text);
    }
}

const logger = new Logger();
const { printName } = logger;
//printName(); // TypeError: Cannot read property 'print' of undefined this指向改变
/**
 * 上面代码中，printName方法中的this，默认指向Logger类的实例。但是，如果将这个方法提取出来单独使用，this会指向该方法运行时所在的环境，因为找不到print方法而导致报错。
 */

 //一个比较简单的解决方法是，在构造方法中绑定this，这样就不会找不到print方法了。
class loggerTwo {
    constructor(){
        //bind绑定this指向
        this.printName = this.printName.bind(this);
    }
}
/**
 * class继承
 * 
 */
//Class 可以通过extends关键字实现继承，这比 ES5 的通过修改原型链实现继承，要清晰和方便很多。
class EPoint {
}
class ColorPoint extends EPoint{
    constructor(x,y,color){
        //this.color = color; ReferenceError
        //在子类的构造函数中，只有调用super之后，才可以使用this关键字，否则会报错。这是因为子类实例的构建，是基于对父类实例加工，只有super方法才能返回父类实例。
        super(x,y)//调用父类 的constructor(x,y) super用来新建弗雷的this对象
        this.color = color;
    }
    toString(){
        return this.color + "" + super.toString();//调用父类方法
    }
}
/**
 * super关键字
 * super这个关键字，既可以当作函数使用，也可以当作对象使用。在这两种情况下，它的用法完全不同。
 *第一种情况，super作为函数调用时，代表父类的构造函数。ES6 要求，子类的构造函数必须执行一次super函数。像上面的继承那种用法
 */

 /**
  * 第二种情况，super作为对象时，在普通方法中，指向父类的原型对象；在静态方法中，指向父类。
  */
class A {
    m(){
        return 2;
    }
}
class B extends A{ 
    constructor(){
        super();
        console.log(super.m());
    }
}
let newb = new B();

//ES6规定，通过super调用父类的方法时，super会绑定子类的this。
class A1 { 
    constructor(x){
        this.x = 1;
    }
    print(){
        console.log(this.x);
    }
}
class B1 extends A1{
    constructor() {
        super();
        this.x = 2;
    }
    m() {
        super.print();
    }
}
let b1 = new B1();
b1.m() // 2

//由于绑定子类的this，所以如果通过super对某个属性赋值，这时super就是this，赋值的属性会变成子类实例的属性。
class B2 extends A1 {
  constructor() {
    super();
    this.x = 2;
    super.x = 3;
    console.log(super.x); // undefined
    console.log(this.x); // 3
  }
}
//上面代码中，super.x赋值为3，这时等同于对this.x赋值为3。而当读取super.x的时候，读的是A.prototype.x，所以返回undefined。
/**
 * 修饰器  ES2017的内容
 */
console.log("{}类的修饰"); // 3
//修饰器（Decorator）是一个函数，用来修改类的行为。ES2017 引入了这项功能，目前 Babel 转码器已经支持。
//@testtable
class MyTesttableClass {}
function testtable(target){
    target.isTesttable = true;
}

/**
 * Module语法
 */
//除了指定加载某个输出值，还可以使用整体加载，即用星号（*）指定一个对象，所有输出值都加载在这个对象上面。
import * as cricle from './cricle.js';
//所以的模块对象的输出值都挂在cricle对象下
console.log('圆面积：' + cricle.area(4));
console.log('圆周长：' + cricle.circumference(14));
//export 与 import 的复合写法 § ⇧
//如果在一个模块之中，先输入后输出同一个模块，import语句可以与export语句写在一起。
// export { area, circumference } from './cricle.js';
// // 等同于
// import { area, circumference } from './cricle.js';
// export {  area, circumference  };
/**
 * import()
 * 
 * const path = './' + fileName;
 * const myModual = require(path);
 * 
 * 上面的语句就是动态加载，require到底加载哪一个模块，只有运行时才知道。import语句做不到这一点。
    引入import()函数，完成动态加载。
 */
//import(specifier);
//上面代码中，import函数的参数specifier，指定所要加载的模块的位置。import命令能够接受什么参数，import()函数就能接受什么参数，两者区别主要是后者为动态加载。
//importd的使用场合
//（1）按需加载 import()可以在需要的时候，再加载某个模块。
//import()加载模块成功以后，这个模块会作为一个对象，当作then方法的参数。因此，可以使用对象解构赋值的语法，获取输出接口。
// button.addEventListener('click', event => {
//   import('./cricle.js')
//   .then(({export1, export2}) => {
//     export1.open();
//   })
//   .catch(error => {
//   })
// });
//(2)条件加载 import()可以放在if代码块，根据不同的情况，加载不同的模块。
const condition = false;
if(condition){
    // import('./cricle.js').then().catch(error =>{});
}else{
    console.log('条件不达到不加载');
}
//(3)动态的模块路径  import()允许模块路径动态生成。


//如果想同时加载多个模块，可以采用下面的写法。
Promise.all([
  /* import('./cricle.js'),
  import('./person.js'), */
])
.then(([cricle, demo, person]) => {
   
});



/**
 * 箭头函数专题
 */
console.info("=>箭头函数专题");
//有参数
console.info("=> ES5 写法");
let curf1 = function(v) {
    return v;
};
console.info("=> ES6 写法");
let curf2 = v => v;
//无参数 
//es5
let f1 = function() {
    return "etf";
};
//es6
let f2 = () => "etf";
//如果箭头函数直接返回一个对象，必须在对象外面加上括号
//es5
let objf1 = function(){
    return{
        real_name: "etf",
        nick_name: "handsome"
    }
}
//es6
let objf2 = () => ({real_name: "etf",nick_name: "handsome"});
/**
 * 关于解构
 * 我们还可以使用到 ES6 解构赋值特性
 */
//es5
let conf1 = function(person){
    return person.first + ' ' + person.last;
}
//es6
const conf2 = ({first,last}) =>first + last;
/**
 * 回调函数
 */
//es5
let callF1 = [1,2,3].map(function(x){
    return x * x;
});
//es6
let callF2 = [1,2,3].map(x => x * x);

/**
 * 使用length相同的数组拼接成json
 */
let amountList = [3,3,3,3,3];//金额数组
let scoreList = [1,1,1,1,1];//积分数组
let idList = [2,2,2,2,2];//id数组
let jsonList = [];//ajax入参json对象
//拼接生成json
//jq写法
// $.each(amountList,function(i){
//     item = {id:idList[i],lowerLimit:amountList[i],score:scoreList[i]};
//     jsonList.push(item);
// });
//原生JS写法
for (let i = 0; i < amountList.length; i++) {
    var item = {id:idList[i],lowerLimit:amountList[i],score:scoreList[i]};
    jsonList.push(item);
}
JSON.stringify(jsonList);

/*
 * 这个函数用来解析来自URL的查询串中的name=value参数对
 * 它将name=value对存储在一个对象的属性中，并返回该对象
 * 这样来使用它
 *
 * var args = urlArgs(); // 从URL中解析参数
 * var q = args.q || ""; // 如果参数定义了的话就使用参数；否则使用一个默认值
 * var n = args.n ? parseInt(args.n) : 10;
 */
function urlArgs() {
    var args = {};                                  // 定义一个空对象
    var query = location.search.substring(1);       // 查找到查询串，并去掉'? '
    var pairs = query.split("&");                   // 根据"&"符号将查询字符串分隔开
    for (var i = 0; i < pairs.length; i++) {        // 对于每个片段
        var pos = pairs[i].indexOf('=');            // 查找"name=value"
        if (pos == -1) continue;                    // 如果没有找到的话，就跳过
        var name = pairs[i].substring(0, pos);      // 提取name
        var value = pairs[i].substring(pos + 1);    // 提取value
        value = decodeURIComponent(value);          // 对value进行解码
        args[name] = value;                         // 存储为属性
    }
    return args;                                    // 返回解析后的参数
}

console.warn("------------------------------------这个是demo输出的end------------------------------------");