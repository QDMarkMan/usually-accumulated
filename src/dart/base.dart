/*
 * @Author: etongfu
 * @Email: 13583254085@163.com
 * @Date: 2019-02-15 10:38:19
 * @LastEditors: etongfu
 * @LastEditTime: 2019-02-15 14:30:57
 * @Description: dart基础篇
 */
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
// Dart 是静态作用域语言，变量的作用域在写代码的时候就确定过了。 基本上大括号里面定义的变量就 只能在大括号里面访问，和 Java 作用域 类似。

// Lexical closures（词法闭包）
// 一个 闭包 是一个方法对象，不管该对象在何处被调用， 该对象都可以访问其作用域内 的变量。
Function makeAdder(num addBy) {
  return (num i ) => addBy + i;
}

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
}


