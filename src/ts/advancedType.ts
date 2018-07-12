/**
 * 高级类型
 */
console.warn(`-------------------------Ts高级类型部分begin-------------------------`)

// 1 交叉类型（Intersection Types）
/**
 * 交叉类型是将多个类型合并为一个类型。 这让我们可以把现有的多种类型叠加到一起成为一种类型，它包含了所需的所有类型的特性。 例如， Person & Serializable & Loggable同时是 Person 和 Serializable 和 Loggable。 
 * 就是说这个类型的对象同时拥有了这三种类型的成员。
 */
function extend<T,U>(first:T, second:U): T & U{
  // 定义一个交叉类型的对象
  let result =  <T & U>{}

  for (const key in first) {
    (<any>result)[key] = (<any>first)[key]
  }
  for (const id in second) {
    if (!Object.hasOwnProperty(id)) {
      (<any>result)[id] = (<any>second)[id]
    }
  }
  return result
}
class typePerson {
  name: string
  constructor(name){
    this.name = name
  }
}
interface LogPerson {
  log(): void;
}
class ConsoleLog implements LogPerson {
  log(){

  }
}
let jim = extend(new typePerson('jim'), new ConsoleLog())
const n = jim.name

// 2 联合类型（Union Types） 这个再实际的开发过程中还是很有用的
/**
 * 联合类型与交叉类型很有关联，但是使用上却完全不同。 
 * 偶尔你会遇到这种情况，一个代码库希望传入 number或 string类型的参数。 例如下面的函数：
 */
function padLeft(value: string, padding: string | number): void{
  // ...联合类型
}
/**
 * 联合类型表示一个值可以是几种类型之一。 
 * 我们用竖线（ |）分隔每个类型，所以 number | string | boolean表示一个值可以是 number， string，或 boolean。
 */

// 如果一个值是联合类型，我们只能访问此联合类型的所有类型里共有的成员。
interface Bird {
  name: string,
  fly(),
  layEggs()
}
interface Fish {
  name: string,
  swim(): void,
  layEggs()
}
function getPets(): Bird | Fish{
  let obj: Bird | Fish
  return obj
}
/* 
let pet = new getPets()
pet.swim() // error
pet.layEggs() // yes  */
/**
 *  如果一个值的类型是 A | B，我们能够 确定的是它包含了 A 和 B中共有的成员。 这个例子里， Bird具有一个 fly成员。 
 * 我们不能确定一个 Bird | Fish类型的变量是否有 fly方法。 如果变量在运行时是 Fish类型，那么调用 pet.fly()就出错了。
 */

// 3 类型保护与区分类型（Type Guards and Differentiating Types）
/**
 * 联合类型适合于那些值可以为不同类型的情况。 但当我们想确切地了解是否为 Fish时怎么办？ 
 * JavaScript里常用来区分2个可能值的方法是检查成员是否存在。 如之前提及的，我们只能访问联合类型中共同拥有的成员。
 */
// let pet = getSmallPet();

// 每一个成员访问都会报错
/* if (pet.swim) {
    pet.swim();
}
else if (pet.fly) {
    pet.fly();
}
 */
// 为了让这段代码工作，我们要使用类型断言：
/**
 * let pet = getSmallPet();

if ((<Fish>pet).swim) {
    (<Fish>pet).swim();
}
else {
    (<Bird>pet).fly();
}
 */

console.warn(`-------------------------Ts高级类型部分end-------------------------`)
