/*
 * @Author: etongfu
 * @Email: 13583254085@163.com
 * @Date: 2019-02-15 10:38:19
 * @LastEditors: etongfu
 * @LastEditTime: 2019-02-18 15:40:11
 * @Description: dart基础篇
 */
import 'dart:math';
// 1: 声明变量
// 一种不指定类型声明变量的方式。 大概是有一种类型推断的机制
// 1.1 变量： 变量是一个引用 下面名字为 name 的变量引用了 一个内容为 dartDemo 的 String 对象。
var name = "dartDemo";
// 1.2 没有初始化值的变量会自动获取一个null的的默认值
int count;
// 1.3 Final and const 一个 final 变量只能赋值一次；一个 const 变量是编译时常量。 （Const 变量同时也是 final 变量。） 顶级的 final 变量或者类中的 final 变量在 第一次使用的时候初始化。
// 注意： 实例变量可以为 final 但是不能是 const 。 const比较好用  它可以创建任何数据类型的数据结构
final finalStr = 'finalStr';
// finalStr = 'name'; //  Uncommenting this causes an error
const arrConsts = const []; 
// 1.4 Built-in types(内置的类型)
/*
Dart 具有以下的内置类型
numbers
strings
booleans
lists/arrays
maps
runes
symbols
由于 Dart 中每个变量引用的都是一个对象 – 一个类的实例， 你通常使用构造函数来初始化变量。 一些内置的类型具有自己的构造函数。例如， 可以使用 Map()构造函数来创建一个 map， 就像这样 new Map()。
 */
// 1.4.1 Number  Number支持两种类型 int/double
int intNum = 1;
double douNum = 1.1;
// 1.4.2 String
String typeName = 'String type';
// 1.4.3  Boolean
bool boolType = false;
// 1.4.4 List  在 Dart 中数组就是 List 对象。所以 通常我们都称之为 lists。
var list = [1,2,3];
// 定义不变的数组
const constList = const [1,2,3,4];
// 1.4.5 Maps Map 是一个键值对相关的对象。 键和值可以是任何类型的对象。每个 键 只出现一次， 而一个值则可以出现多次。Dart 通过 map 字面量 和 Map 类型支持 map。
// 创建maps
var map = {
  // Keys      Values
  'first' : 'partridge',
  'second': 'turtledoves',
  'fifth' : 'golden rings'
};
// 1.4.6 Symbols 一个 Symbol object 代表 Dart 程序中声明的操作符或者标识符

// 2：Functions Dart 是一个真正的面向对象语言，方法也是对象并且具有一种 类型， Function。 这意味着，方法可以赋值给变量，也可以当做其他方法的参数。 也可以把 Dart 类的实例当做方法来调用

// 定义一个返回静态的方法
void printString (String str) {
  print('file name is $str');
}
// 定义一个有返回值的方法
bool isNoble (int atomicNumber) {
  return atomicNumber > 5;
}
// 可选的参数[String old]
String say(String first, String last,  [String old]) {
  return first + last + old;
}
// 参数默认值 默认的参数一般其他语言的传参差别不大
void defaultValue ({bool bold = false, bool hidden = false}) {
  print('default bold is $bold');
  print('default hidden is $hidden');
}
// 静态作用域
// Dart 是静态作用域语言，变量的作用域在写代码的时候就确定过了。 基本上大括号里面定义的变量就只能在大括号里面访问，和 Java 作用域 类似。

// Lexical closures（词法闭包）
// 一个 闭包 是一个方法对象，不管该对象在何处被调用， 该对象都可以访问其作用域内 的变量。
Function makeAdder(num addBy) {
  return (num i ) => addBy + i;
}


// 3 条件表达式
// Dart 有两个特殊的操作符可以用来替代 if-else 语句：
//1：condition ? expr1 : expr2 三元表达式
//2：expr1 ?? expr2  如果 expr1 是 non-null，返回其值； 否则执行 expr2 并返回其结果。
//测试一个字符串是否为null
// String toString(msg) => msg ?? super.toString()

// 4 class(面向对象)
// Dart 是一个面向对象编程语言，同时支持基于 mixin 的继承机制。 每个对象都是一个类的实例，所有的类都继承于 Object.。 基于 Mixin 的继承 意味着每个类（Object 除外） 都只有一个超类，一个类的代码可以在其他 多个类继承中重复使用。

// 使用 new 关键字和构造函数来创建新的对象。 构造函数名字可以为 ClassName 或者 ClassName.identifier。例如：
// var jsonData = JSON.decode('{"x":1, "y":2}');
// 每个实例变量都会自动生成一个 getter 方法（隐含的）。 Non-final 实例变量还会自动生成一个 setter 方法。详情， 参考 Getters and setters。

// 4.1 我们接下来看看 怎么实现一个类
class Point {
  num x; // 初始值为null
  num y;
  num z = 0;
  //　正常定义Constructors
  /* Point (num x, num y) {
    // this 关键字指当前的实例。
    // 注意： 只有当名字冲突的时候才使用 this。否则的话， Dart 代码风格样式推荐忽略 this。
    this.x = x;
    this.y = y;
  } */
  // 语法糖方式定义Constructors
  // Point(this.x, this.y);
  /**
   * 关于构造函数
   * 1：默认构造函数 => 如果你没有定义构造函数，则会有个默认构造函数。 默认构造函数没有参数，并且会调用超类的 没有参数的构造函数。
   * 2：构造函数不会继承 => 子类不会继承超类的构造函数。 子类如果没有定义构造函数，则只有一个默认构造函数 （没有名字没有参数）。
   * 3：命名构造函数 => 使用命名构造函数可以为一个类实现多个构造函数， 或者使用命名构造函数来更清晰的表明你的意图
   * 4: 调用超类构造函数 => 默认情况下，子类的构造函数会自动调用超类的 无名无参数的默认构造函数。 超类的构造函数在子类构造函数体开始执行的位置调用。 如果提供了一个 initializer list（初始化参数列表） ，则初始化参数列表在超类构造函数执行之前执行
   *    执行顺序
   *    1. initializer list（初始化参数列表）
   *    2. superclass’s no-arg constructor（超类的无名构造函数）
   *    3. main class’s no-arg constructor（主类的无名构造函数）
   * 在调用的过程中可以简单的理解为：调用子类得先通过了父亲的同意
   */
  // 3： 命名构造函数
  // 注意：构造函数不能继承，所以超类的命名构造函数 也不会被继承。如果你希望 子类也有超类一样的命名构造函数， 你必须在子类中自己实现该构造函数。
  Point.fromJSON (Map json) {
    print('1:父类point中的命名构造函数');
    x =json['x'];
    y =json['y'];
  }
}
class PointChild extends Point {
  PointChild.fromJSON(Map data):super.fromJSON(data) {
    print('子类中的构造函数');
    print('2: Point 没有默认的构造器，你必须调用super的fromJSON');
  }
}

// 4.2 重定向构造函数
class Redirect {
  num x;
  num y;
  Redirect(this.x, this.y);
  // 有时候一个构造函数会调动类中的其他构造函数。 一个重定向构造函数是没有代码的，在构造函数声明后，使用 冒号调用其他构造函数。
  Redirect.alongXAxis(num x) : this(x, 0);
}
//4.3 常量构造函数 
// 如果你的类提供一个状态不变的对象，你可以把这些对象定义为编译时常量。要实现这个功能，需要定义一个 const 构造函数， 并且声明所有类的变量为 final。
class ImmutableClass {
  final num x;
  final num y;
  const ImmutableClass (this.x, this.y);
  static final ImmutableClass origin = const ImmutableClass(0, 0);
}
//4.4 工厂方法构造函数
// 如果一个构造函数并不总是返回一个新的对象，则使用 factory 来定义 这个构造函数。例如，一个工厂构造函数 可能从缓存中获取一个实例并返回，或者 返回一个子类型的实例。
class Logger {
  final String name;
  bool mute = false;
  static final Map<String, Logger> _cache = <String, Logger>{};
  // 注意： 工厂构造函数无法访问 this。
  factory Logger(String name) {
    if (_cache.containsKey(name)) {
      return _cache[name];
    } else {
      final logger = new Logger._internal(name);
      _cache[name] = logger;
      return logger;
    }
  }
  // 具名的构造函数
  Logger._internal(this.name);
  
  void log (String msg) {
    if (!mute) {
      print(msg);
    }
  }
}
//4.5 隐式接口
//  每个类都隐式的定义了一个包含所有实例成员的接口， 并且这个类实现了这个接口。如果你想创建类 A 来支持 类 B 的 api，而不想继承 B 的实现， 则类 A 应该实现 B 的接口。
class Person {
  final _name;
  Person(this._name);
  void Say() {
    print('Person say');
  }
  String greet(who) => 'Hi $who. Person?';
}
class Child implements Person {
  // 必须要定义这个变量
  final _name = "";
  void Say() {
    print('Person say');
  }
  String greet(who) => 'Hi $who. Do you know who I am?';
}

greetBoy(Person person) {
  return person.greet(person._name == '' ? 'default': person._name);
}
// 实现多个接口
/* class Mutiple implements Redirect, Person {
  
} */

// 4.6 扩展类 使用 extends 定义子类， supper 引用 超类：

class Television{
  void say () {
    print('Iam father');
  }
  void defaultMethod () {
    print('Iam default');
  }
}
class SmartTv extends Television {
  // 可以使用 @override 注解来表明你的函数是想覆写超类的一个函数：
  @override
  void defaultMethod() {
    // ...
    print('I am child default');
  }
  // 子类可以通过super来调用父类。 子类可以覆写实例函数，getter 和 setter。 
  void say () {
    super.say();
    print('Iam child');
  }
}
//4.7 mixins:为类添加新的功能
// Mixins 是一种在多类继承中重用一个类代码的方法。
// 使用 with 关键字后面为一个或者多个 mixin 名字来使用 mixin。 下面是示例显示了如何使用 mixin：


// 5：函数  在Dart中 函数是类中定义的方法，是类对象的行为。

// 5.1 实例函数
// 对象的实例函数可以访问 this。 例如下面示例中的 distanceTo() 函数 就是实例函数：
class MathPoint {
  num a;
  num b;
  
  MathPoint(this.a, this.b);

  num distance(MathPoint point) {
    final num da = a - point.a;
    final num db = b - point.b;
    return sqrt(da*da + db*db);
  }
}
// 5.2 Getters and setters
// Getters 和 setters 是用来设置和访问对象属性的特殊函数。每个实例变量都隐含的具有一个 getter， 如果变量不是 final 的则还有一个 setter。 你可以通过实行 getter 和 setter 来创建新的属性， 使用 get 和 set 关键字定义 getter 和 setter。基本和js中的是一样。
class Rectangle  {
  num left;
  num top;
  num width;
  num height;
  Rectangle(this.left, this.top, this.width, this.height);
  // getter 和 setter 的好处是，你可以开始使用实例变量，后来 你可以把实例变量用函数包裹起来，而调用你代码的地方不需要修改。
  num get right => left + width;
  set right(num value) => left =value - width;
  num get bottom => top + height;
  set bottom(num value) => top =value - height;
}
// 5.3抽象函数 / 抽象类
// 抽象类 使用 abstract 修饰符定义一个 抽象类—一个不能被实例化的类。 抽象类通常用来定义接口， 以及部分实现。如果你希望你的抽象类 是可实例化的，则定义一个 工厂 构造函数。抽象类通常具有 抽象函数
// 实例函数、 getter、和 setter 函数可以为抽象函数， 抽象函数是只定义函数接口但是没有实现的函数，由子类来 实现该函数。如果用分号来替代函数体则这个函数就是抽象函数。

abstract class AbstractClass {
  // 抽象函数
  void doSome();
}
class Instance extends AbstractClass {
  // 如果调用一个没实现的抽象函数会导致运行时异常。
  void doSome () {
    print("我是子类中实现的抽象函数");
  }
}

// 6：枚举
// 枚举类型通常称之为 enumerations 或者 enums， 是一种特殊的类，用来表现一个固定 数目的常量。
/**
 * 枚举值的限制
 * 1:无法继承枚举类型、无法使用 mix in、无法实现一个枚举类型
 * 2:无法显示的初始化一个枚举类型
 */
enum Colors {
  red,
  green,
  blue
}
// 6.1 枚举类型中的每个值都有一个 index getter 函数， 该函数返回该值在枚举类型定义中的位置（从 0 开始）。 例如，第一个枚举值的位置为 0， 第二个为 1.
// assert(Color.red.index == 0);
// 6.2 枚举的 values 常量可以返回 所有的枚举值
/* List<Color> colors = Color.values;
assert(colors[2] == Color.blue); */

// 7 




// 每个应用都需要有个顶级的 main() 入口方法才能执行。 main() 方法的返回值为 void 并且有个可选的 List<String> 参数。
main(List<String> arguments) {
  // 级联调用 .. 语法为 级联调用（cascade）。 使用级联调用语法， 你可以在一个对象上执行多个操作。
  /* querySelector('#sample_text_id')
  ..text = "click me"
  ..onClick.listen(reverseText); */
  // 打印main方法的参数
  print(arguments);
  //
  printString(name);
  printString(typeName);
  print(count);
  
  print(intNum);
  print(douNum);

  if (!boolType) {
    print('boolean is ${boolType}');
  }
  print(list.length);
  print(map);
  defaultValue();

  // 匿名函数 lambda表达式
  list.forEach((i) {
    print(list.indexOf(i) + i);
  });
  // 测试闭包
  var add2 = makeAdder(2);
  var add3 = makeAdder(3);

  print(add2(2));
  print(add3(3));
  var jsonMap = {
    'x': 1,
    'y':2
  };
  // class中内容
  var point =new PointChild.fromJSON(jsonMap);
  print(point); // Instance of 'PointChild'

  //setter 和getter
  var rect = new Rectangle(3, 33, 11, 12);
  print('我是rect中的getter设置的值${rect.right}');
  
  var ins =new Instance();
  ins.doSome();
  // 隐式接口
  print(greetBoy(new Person('kathy')));
  print(greetBoy(new Child()));
  // 扩展类
  var smartTv =new SmartTv();
  smartTv.say();
}


