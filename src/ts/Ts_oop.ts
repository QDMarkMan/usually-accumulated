/**
 * Ts中的面向对象编程
 */
// 具名对象写法
// let NewPerson = class Person{
// 匿名对象写法
class Person{
  //对象属性
  name:string
  age:number
  //对象构造器
  constructor(...args){
    console.log(args)
    // this.name = 
  }
  //对象方法
  say(){
    console.log(`我的名字是${this.name},今年${this.age}岁`)
  }
}