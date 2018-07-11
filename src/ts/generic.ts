/**
 * 泛型 说直白点 就是传型 只有在大型得项目中才能体现出优势
 * 要创建一个可重用的组件，其中的数据类型就必须要兼容很多的类型，那么如何兼容呢，TypeScript提供了一个很好的方法：泛型
 * 软件工程中，我们不仅要创建一致的定义良好的API，同时也要考虑可重用性。 
 * 组件不仅能够支持当前的数据类型，同时也能支持未来的数据类型，这在创建大型系统时为你提供了十分灵活的功能。
 * 
 * 要兼容多种数据格式，可能会有人想到any,即
 * function identify(arg: any): any{
    return arg;
  }
  使用any存在一个问题，有可能传入的值和返回的值不是同一种值，例如，传入数字，但是不确定返回的是什么值
  要解决这个问题，我们需要引入类型变量-一种特殊的变量，只用于表示类型不表示值
  而且any是类型随便， 泛型还是有范围得

  给identify添加了类型变量T，用来捕获传入值的类型，然后将返回值的类型也设置为T,就实现了传入值和返回值为同一类型值的需求
  我们把identify这个函数叫做泛型，因为它适用于所有类型，并且不会有any类型存在的问题
 */
console.warn(`-------------------------Ts泛型部分begin-------------------------`)

/**
 * 使用泛型的方法有两种
 * 1 传入所有的参数，包括类型参数
 * let output = identify<string>('qwe');
 * 
 * 2: 利用类型推论--即编译器会根据传入的参数自动地帮助我们确定T的类型
 * let output = identify('qwe');
 */
// 其实Array是一个最典型得泛型 interface Array<T>{}

// 1: 类型变量
/**
 * 我们给identity添加了类型变量T。 T帮助我们捕获用户传入的类型（比如：number），之后我们就可以使用这个类型。 之后我们再次使用了 T当做返回值类型。
 * 现在我们可以知道参数类型与返回值类型是相同的了。 这允许我们跟踪函数里使用的类型的信息。
 */
// 翻译过来就是  传递String类型的参数 返回String类型的值
function identity<String>(arg: String): String {
  return arg
}
// 第一种方法调用:限定类型
let output = identity<String>('限定类型')
// 第二种方法更普遍。利用了类型推论 -- 即编译器会根据传入的参数自动地帮助我们确定T的类型：
let output2 = identity('类型推论')
// 这里我们明确的指定了T是string类型，并做为一个参数传给函数，使用了<>括起来而不是()。

// 1 使用泛型变量 如果不指定类型我们直接去调用length 那么会报错 T doesn't have .length
/**
 * 你可以这样来理解 logIdentity的类型： 泛型函数logIdentity，接收参数类型T，和参数args，他是个元素类型是T的数组，并返回元素类型是T的数组。
 * 如果我们传入数字数组，将返回一个数字数组，因为此时T的类型为number，这可以让我们把泛型变量T当做类型的一部分使用，而不是整个类型，增加了灵活性。
 * 
 * @param arg 
 */
function logIdentity<T>(arg: Array<T>): Array<T> {
  console.log(arg.length)
  return arg
}


// 2 泛型类型
function typeIdentity<T>(arg: T): T{
  return arg
}
// 泛型函数的类型与非泛型函数的类型没什么不同，只是有一个类型参数在最前面，像函数声明一样：
let myIdentity: <T>(arg: T) => T = typeIdentity
// 我们也可以使用不同的泛型参数名，只要在数量上和使用方式上能对应上就可以。
let myIdentityC: <U>(arg: U) => U = typeIdentity

// 3 泛型接口
interface GenericIdentityFn {
  <T>(arg: T): T;
}
function genIndetity<T>(arg: T): T{
  return arg
}
let genMyIndentity: GenericIdentityFn = genIndetity

//4 泛型类 泛型类看上去与泛型接口差不多。 泛型类使用（ <>）括起泛型类型，跟在类名后面。

class GenericClss<T> {
  zeroValue: T
  add: (x: T, y: T) => T
}
let myGenericNumber = new GenericClss<number>();
myGenericNumber.zeroValue = 1
console.log(myGenericNumber)
let stringGenericNumber = new GenericClss<string>()
stringGenericNumber.zeroValue = '我是字符串的泛型'
console.log(stringGenericNumber)



// 5 泛型约束
interface LengthWise {
  length: number
}
function indetityBind<T extends LengthWise>(arg: T): T{
  console.log(arg.length)
  return arg
}
identity(123); //error
identity('qwe'); //true



console.warn(`-------------------------Ts泛型部分end-------------------------`)
