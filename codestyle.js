/**
 * 关于ES6的编程风格
 */
'use strict'
console.log("ES6代码风格");
//1:块级作用域 (let取代var)
//ES6提出了两个新的声明变量的命令：let和const。其中，let完全可以取代var，因为两者语义相同，而且let没有副作用。
if (true) {
    //var命令存在变量提升效用，let命令没有这个问题。
    let x = "hello";
}
for (let i = 0; i < 10; i++) {
    console.log(i);
}
//上面代码如果用var替代let，实际上就声明了两个全局变量，这显然不是本意。变量应该只在其声明的代码块内有效，var命令做不到这一点。

// 1:块级作用域 (全局变量和线程安全)
//在let和const之间，建议优先使用const，尤其是在全局环境，不应该设置变量，只应设置常量。
//const优于let有几个原因。一个是const可以提醒阅读程序的人，这个变量不应该改变；另一个是const比较符合函数式编程思想，运算不改变值，只是新建值，而且这样也有利于将来的分布式运算；最后一个原因是 JavaScript 编译器会对const进行优化，所以多使用const，有利于提供程序的运行效率，也就是说let和const的本质区别，其实是编译器内部的处理不同。
//bad
var a = 1,
    b = 2;
//good
const a1 = 1;
const b1 = 2;
//best
const [a2, b2] = [1, 2];
//const声明常量还有两个好处，一是阅读代码的人立刻会意识到不应该修改这个值，二是防止了无意间修改变量值所导致的错误。
//所有的函数都应该设置为常量。 ???

//2:字符串
//静态字符串一律使用单引号或反引号，不使用双引号。动态字符串使用反引号
//bad
const stra = "bad";
const strb = 'this' + stra + 'style';
//acceptable
const strc = `thisbadstyle`;
//good
const stra1 = 'bad';
const strb1 = `this${stra1}style`;
const strc1 = 'thisbadstyle';

//解构赋值
//使用数组成员对变量赋值时，优先使用解构赋值。
const arr = [1, 2, 3, 4];
//bad
const first = arr[0];
const second = arr[1];
//good
const [first1, second1] = arr;
//函数的参数如果是对象的成员，优先使用解构赋值
//bad
function getFullName(user) {
    const firstName = user.firstName;
    const lastName = user.lastName;
}
//good
function getFullName1(obj) {
    const { firstName, lastName } = obj;
}
//best
function getFullName2({ firstName, lastName }) {

}
//如果函数返回多个值，优先使用对象的解构赋值，而不是数组的解构赋值。这样便于以后添加返回值，以及更改返回值的顺序。
// bad
function processInput(input) {
    return [left, right, top, bottom];
}
//good
function processInput1(input) {
    return { left, right, top, bottom };
}
//const {left,right} = processInput1(input);

//4：对象
//单行定义的对象，最后一个成员不以逗号结尾。多行定义的对象，最后一个成员以逗号结尾。
//good
const obja = { k1: 'v1', k2: 'v2' };
const obj2 = {
        k1: "v1",
        k2: "v2",
    }
    //对象尽量静态化，一旦定义，就不得随意添加新的属性。如果添加属性不可避免，要使用Object.assign方法。
const obja1 = {};
//bad
obja1.x = 3;
//if reshape unavoidable
Object.assign(obja1, { x: 3 });
//good
const obja2 = { x: null };
obja2.x = 3;
//如果对象的属性名是动态的，可以在创造对象的时候，使用属性表达式定义。
//bad
const obja3 = {
        id: 5,
        name: "zhangsan",
    }
    //obja3[getKey('enabled')] = true;
    //good
const obj4 = {
    id: 5,
    name: 'San Francisco',
    //[getKey('enabled')]: true,
};
//另外，对象的属性和方法，尽量采用简洁表达法，这样易于描述和书写。
var ref = 'some value';
//bad
const atom = {
        ref: ref,
        value: 1,
        addValue: function(value) {
            return atom.value + value;
        },
    }
    //good
const atomGood = {
    ref,
    value: 1,
    addValue(value) {
        return atomGood.value + value;
    },
}

//数组
//使用扩展运算符（...）拷贝数组。
//bad
const items = [1, 1, 1, 1, 1, 1];
const len = items.length;
const itemCopy = [];
let i;
for (i = 0; i < len; i++) {
    itemCopy[i] = items[i];
}
//good
const itemCopy1 = [...items]
    //使用Array.from方法，将类似数组对象转为数组

//6:函数
//立即执行的函数可以写成箭头函数的形式
/* (() => {
    console.log("自执行的函数可以使用箭头函数");
}); */
//需要使用函数表达式的场合，尽量使用箭头函数代替。因为这样更简洁，而且绑定了this
//bad
/* [1, 2, 3, 4].map(function(x) {
    return x * x;
}); */
//good
/* [1, 2, 3].map((x) => {
        return x * x;
    }) */
//best
//[1, 2, 3].map(x => x * x);
//箭头函数取代Function.prototype.bind，不应再用self/_this/that绑定 this。
//bad
const self = this;
const bindMethod = function(...params) {
        return method.apply(self, params);
    }
    //acceptable
    //const bindMethod1 = method.bind(this);
    //best
const bindMethod2 = (...params) => method.apply(this, params);
//简单的、单行的、不会复用的函数，建议采用箭头函数。如果函数体较为复杂，行数较多，还是应该采用传统的函数写法。
//所有配置项都应该集中在一个对象，放在最后一个参数，布尔值不可以直接作为参数。
//bad
function divide(a, b, option = false) {

}
//good
function divide1(a, b, { option = false } = {}) {

}
//不要在函数体内使用arguments变量，使用rest运算符（...）代替。因为rest运算符显式表明你想要获取参数，而且arguments是一个类似数组的对象，而rest运算符可以提供一个真正的数组。
//bad
function concatenateAll() {
    const args = Array.prototype.slice.call(arguments);
    return args.join('');
}
//good
function concatenateAll1(...args) {
    return args.join('');
}
//使用默认值语法设置函数参数的默认值。
//bad
function handleThings(opts) {
    opts = opts || {};
}
//good
function handleThings2(opts = {}) {

}

//7:Map结构
//注意区分Object和Map，只有模拟现实世界的实体对象时，才使用Object。如果只是需要key: value的数据结构，使用Map结构。因为Map有内建的遍历机制。
let map = new Map(arr);
for (let key of map.keys()) {
    console.log(key);
}
for (let value of map.values()) {
    console.log(value);
}
for (let item of map.entries()) {
    console.log(item);
}

//8：class
//总是用Class，取代需要prototype的操作。因为Class的写法更简洁，更易于理解。
//bad
function Queue(contents = []) {
    this._queue = [...contents];
}
Queue.prototype.po = function() {
        const value = this._queue[0];
        this._queue.splice(0, 1);
        return value;
    }
    //good
class Queue1 {
    constructor(contents = []) {
        this._queue = [...contents];
    }
    pop() {
        const value = this._queue[0];
        this._queue.splice(0, 1);
        return value;
    }
}
// 使用extends实现继承，因为这样更简单，不会有破坏instanceof运算的危险。