/**
 * 关于JavaScript中的对象方面学习
 * ⭐⭐⭐⭐⭐
 */
//对象字面量
var obj_mode = {
        name: "zhangsan",
        sayName: function() {
            console.log(this.name);
        }
    }
    //弊端★ 这种方法在创建多个对象时会产生大量重复的代码，在创建单个对象时的首选模式。

//工厂模式
function factory_mode(name) {
    var o = new Object(); //创建新对象
    o.name = "mimi";

    return o;
}
//★ 这种方法没有解决对象识别的方法，一定程度上解决创建多个相似对象的问题吧，不常使用。

//构造函数模式
function constructor_mode(name) {
    this.name = name;
    this.sayName = function() {
        console.log(this.name);
    }
}
/**
 * 它没有显式的创建对象也没有返回语句，但在使用new操作符调用后经历了四个步骤：
    （1）创建一个对象
    （2）将函数的作用域赋给新对象（this指向了新对象）
    （3）执行函数中代码
    （4）返回新对象
    所有对象都有一个constructor属性，指向其构造函数。constructor可以用来标识对象类型，但是，要检测对象类型，instanceof操作符更可靠。
 */

//原型模式
function prototype_mode() {

}
prototype_mode.prototype.name = "mini";
prototype_mode.prototype.sayName = function() {
    console.log(this.name);
}

/**
 * 无论何时，创建一个函数，都会自动创建一个prototype属性，指向其原型对象，正如前面所说，每个对象都有一个constructor属性，指向其构造函数。所以Animal.prototype.constructor指向Animal。判断原型对象与实例间关系可用isPrototypeOf()方法:Animal.prototype.isPrototypeOf(animal1);
 * 判断属性存在于实例中，还是存在与原型中：
    属性存在于实例中时：
    animal1.hasOwnProperty(name);//true
 * 属性能通过对象访问：
 * name in animal1;//true
 */

//用字面量来实现更简单的原型语法
function easy_prototype_mode() {

}
easy_prototype_mode.prototype = {
    constructor: easy_prototype_mode, ////必须必须！因为这样相当于创建了一个新对象并赋值给Animal.prototype，
    //此时这个新对象的constructor为默认的构造函数Object啊盆友们( ﾟДﾟ)ﾉ
    name: 'mini',
    sayName: function() {
        console.log(this.name);
    }
}

/**
 * 另外，很重要的一点：调用构造函数是会为实例添加一个指向最初原型的[[prototype]]指针，这个连接存在与实例和构造函数的原型对象之间，而不是实例与构造函数间。
 */
//★ 这个方法的问题在于：1.它没办法传递初始化参数 2.对于引用类型值的属性（A）来说，改变一个实例的A属性会直接引起所有实例中的A属性的变化，因为实例中的A属性只是其原型中A属性的一个引用。

//组合使用构造函数模式和原型模式
//构造函数模式用于定义实例属性，原型模式用于定义方法和共享属性。
function combination_mode(name) { //添加实例属性
    this.name = name;
    this.color = ['red', 'blue'];
}
combination_mode.prototype = { //添加方法和共享属性
    constructor: combination_mode,
    sayName: function() {
        console.log(this.name);
    }
}

//★ 这个方法就是使用最广泛、认同度最高的创建自定义类型的方法啦。


/**
 * JavaScript中的继承  以组合模式生成的对象为父类
 */

//原型链继承
function combination_mode_child() {

}
combination_mode_child.prototype = new combination_mode(); ////将父类实例赋值给子类原型。
combination_mode_child.prototype.constructor = combination_mode_child;
var combination_mode_child1 = new combination_mode_child();
//★ 此方法存在问题前面已有提及，就是包含引用类型值的原型属性会被所有实例共享，且不能传参。

//借用构造函数继承
function father(name) { //父类
    this.name = name;
}

function child(name) { //子类
    father.call(this, name) ///执行了一遍父类型构造函数代码
}
//★ 此方法问题在于：1.方法都在构造函数中定义，函数复用无从谈起。2.在超类的原型中定义的方法对子类型也不可见。而且用instanceof也无法判定cat1与Animal的联系。

//组合继承
// /使用原型链实现对原型属性和方法的继承，使用借用构造函数实现对实例属性的继承。
function combination_father(name) { //父类添加实例属性
    this.name = name;
}
combination_father.prototype = {
    constructor: combination_father,
    sayName: function() {
        console.log(this.name);
    }
}

function combination_child(name) {
    combination_father.call(this, name); //继承属性
}
combination_child.prototype = new combination_father(); //继承属性
combination_child.prototype.constructor = combination_child; //将constructor指回子类
//★ 此方法是JS中最常用的继承模式。而且用instanceof 和isPrototypeOf() 也能识别。