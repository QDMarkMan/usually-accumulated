/**
 * 枚举 这个说白了其实就是一组常量
 * 使用枚举我们可以定义一些带名字的常量。 使用枚举可以清晰地表达意图或创建一组有区别的用例。 TypeScript支持数字的和基于字符串的枚举。
 */
console.warn(`-------------------------Ts枚举部分begin-------------------------`)

// 1 数字枚举
/**
 * 我们定义了一个数字枚举， Up使用初始化为 1。 其余的成员会从 1开始自动增长。 
 * 换句话说， Direction.Up的值为 1， Down为 2， Left为 3， Right为 4。
 */
enum Directin {
  Top = 1,
  Down,
  Left,
  Right
}
console.log(Directin.Right)
// 我们还可以完全不使用初始化器：
enum NoDirection {
  Up,
  Down,
  Left,
  Right,
}
console.log(NoDirection.Right)
/**
 * 现在， Up的值为 0， Down的值为 1等等。 当我们不在乎成员的值的时候，这种自增长的行为是很有用处的，但是要注意每个枚举成员的值都是不同的。
 */

 // 2 使用枚举 使用枚举很简单：通过枚举的属性来访问枚举成员，和枚举的名字来访问枚举类型：
enum Result {
  No = 0,
  Yes = 1
}
function respond(recipient: number, message: Result): number {
  // ...
  console.log(message)
  return recipient
}
respond(1, Result.Yes)
// 简短地说，不带初始化器的枚举或者被放在第一的位置，或者被放在使用了数字常量或其它常量初始化了的枚举后面。 换句话说，下面的情况是不被允许的：
enum E {
  A = respond(1, Result.Yes),
  // B,//  error! 因为A不是一个constant-initialized，所以B需要一个初始值
}

// 3 字符串枚举
/**
 * 字符串枚举的概念很简单，但是有细微的 运行时的差别。 在一个字符串枚举里，每个成员都必须用字符串字面量，或另外一个字符串枚举成员进行初始化。
 */
enum stringResult {
  YES = 'yes',
  NO = 'no'
}
/**
 * 由于字符串枚举没有自增长的行为，字符串枚举可以很好的序列化。 换句话说，如果你正在调试并且必须要读一个数字枚举的运行时的值，这个值通常是很难读的 - 它并不能表达有用的信息（尽管 反向映射会有所帮助），
 * 字符串枚举允许你提供一个运行时有意义的并且可读的值，独立于枚举成员的名字。
 */

 // 4 异构枚举（Heterogeneous enums） 并不建议你这么做
enum BooleanLikeHeterogeneousEnum {
    No = 0,
    Yes = "YES",
}


// 5 计算或者是常量成员
// 每个枚举成员都带有一个值，它可以是 常量或 计算出来的。 当满足如下条件时，枚举成员被当作是常量：
/**
 * 1  它是枚举的第一个成员且没有初始化器，这种情况下它被赋予值 0：
 * 2  它不带有初始化器且它之前的枚举成员是一个 数字常量。 这种情况下，当前枚举成员的值为它上一个枚举成员的值加1。
 */
enum One {A}
enum Two {
  A = 1,
  B,
  C
}
console.log(`未初始化时A得值${One.A}`)
console.log(`有初始化时A得值${Two.A}   B的值${Two.B}`)
/**
 * 3 枚举成员使用 常量枚举表达式初始化。 
 * 常数枚举表达式是TypeScript表达式的子集，它可以在编译阶段求值。当一个表达式满足下面条件之一时，它就是一个常量枚举表达式：
 * 3.1:一个枚举表达式字面量（主要是字符串字面量或数字字面量）
 * 3.2:一个对之前定义的常量枚举成员的引用（可以是在不同的枚举类型中定义的）
 * 3.3:带括号的常量枚举表达式
 * 3.4:一元运算符 +, -, ~其中之一应用在了常量枚举表达式
 * 3.5:常量枚举表达式做为二元运算符 +, -, *, /, %, <<, >>, >>>, &, |, ^的操作对象。 若常数枚举表达式求值后为 NaN或 Infinity，则会在编译阶段报错。
 */
enum FileAccess{ 
  None, // 自动赋值
  Read = 1 << 1,
  Write = 1 << 2,
  ReadWrite = Read | Write,
  G = '123'.length // 计算值
}
console.log(FileAccess.ReadWrite)

// 6 联合枚举与枚举成员的类型
/**
 * 存在一种特殊的非计算的常量枚举成员的子集：字面量枚举成员。 
 * 字面量枚举成员是指不带有初始值的常量枚举成员，或者是值被初始化为
 * 
 * 任何字符串字面量（例如： "foo"， "bar"， "baz"）
   任何数字字面量（例如： 1, 100）
   应用了一元 -符号的数字字面量（例如： -1, -100）
 */
enum ShapeEnum {
  A,
  B,
}
interface EnumInterA {
  kind: ShapeEnum.A,
  lang: number
}
interface EnumInterB {
  kind: ShapeEnum.B,
  length: number
}
let enmuc: EnumInterA = {
  kind: ShapeEnum.A,
  lang: 1
}

// 7 运行时枚举  枚举是在运行时真正存在的对象

// 8 const枚举 ⭐⭐⭐⭐⭐
/**
 * 大多数情况下，枚举是十分有效的方案。 然而在某些情况下需求很严格。 为了避免在额外生成的代码上的开销和额外的非直接的对枚举成员的访问，我们可以使用 const枚举。 
 * 常量枚举通过在枚举上使用 const修饰符来定义。
 */
const enum EnumConst{
  A = 1,
  B = A * 2
}
/**
 * 常量枚举只能使用常量枚举表达式，并且不同于常规的枚举，它们在编译阶段会被删除。 
 * 常量枚举成员在使用的地方会被内联进来。 之所以可以这么做是因为，常量枚举不允许包含计算成员。
 */
const enum DirectionsConst {
  Up,
  Down,
  Left,
  Right
}
let directions = [DirectionsConst.Up, DirectionsConst.Down, DirectionsConst.Left, DirectionsConst.Right]
console.log(directions)

// 9 外部枚举 外部枚举用来描述已经存在的枚举类型的形状。
declare enum DeclareEnum {
  A = 1,
  B,
  C = 2
}

console.warn(`-------------------------Ts枚举部分begin-------------------------`)
