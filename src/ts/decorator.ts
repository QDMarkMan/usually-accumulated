/**
 * 装饰器
 */
/**
 * 装饰器是一种特殊类型的声明，它能够被附加到类声明，方法， 访问符，属性或参数上。 
 * 装饰器使用 @expression这种形式，expression求值后必须为一个函数，它会在运行时被调用，被装饰的声明信息做为参数传入。
 */
// 定义装饰器
/**
 * 装饰器本身就是个函数，理论上忽略参数得话，任何函数都可以当作装饰器使用
 */
/* function path(value: string){
  console.log('我可以是一个装饰器')
}
@path('hello')
class HelloService {

} */
// 5种装饰器
// 在TypeScript中装饰器可以修饰四种语句：类，属性，访问器，方法以及方法参数。


// 装饰器工厂
function color(value: string) { // 这是一个装饰器工厂
  return function (target) { //  这是装饰器
      // do something with "target" and "value"...
  }
}
 // 方法装饰器
 /**
  * 方法装饰器声明在一个方法的声明之前（紧靠着方法声明）。 它会被应用到方法的 属性描述符上，可以用来监视，修改或者替换方法定义。 
  * 方法装饰器不能用在声明文件( .d.ts)，重载或者任何外部上下文（比如declare的类）中。
  */
 // 方法装饰器表达式会在运行时当作函数被调用，传入下列3个参数：
/**
 * 1:对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
   2:成员的名字。
   3:成员的属性描述符。
 */
function enumerable(value: boolean){
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor){
    descriptor.enumerable = value
  }
}
// 下面是一个方法装饰器的实例 应用于Decorator的方法上
class Decorator {
  name: string
  constructor(name) {
    this.name = name
  }

  /* @enumerable(false)
  greet():string{
    return `hello,${ this.name}`
  } */
}

