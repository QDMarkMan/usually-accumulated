/**
 * 接口:约定  限制
 * TypeScript的核心原则之一是对值所具有的结构进行类型检查。 它有时被称做“鸭式辨型法”或“结构性子类型化”。 在TypeScript里，接口的作用就是为这些类型命名和为你的代码或第三方代码定义契约。
 */
console.warn(`-------------------------Ts接口部分begin-------------------------`)
// 1 定义一个接口
interface LabelledValue {
  label: String,
  size?: Number, // 可选属性
  readonly x: Number // 只读属性
  [propName: string]: any // 字符串索引签名
  /**
   * readonly vs const
    最简单判断该用readonly还是const的方法是看要把它做为变量使用还是做为一个属性。 做为变量使用的话用 const，若做为属性则使用readonly。
   */
}
//
function printLabel(obj: LabelledValue) {
  console.log(obj.label)
}
let myObj = {
  size: 10,
  label: 'label',
  x: 1
}
printLabel(myObj)
// 2 函数类型的接口
interface Search {
  (source: number, subString: number): boolean //函数类型
}
// 对于函数类型的类型检查来说，函数的参数名不需要与接口里定义的名字相匹配
/**
 * 函数的参数会逐个进行检查，要求对应位置上的参数类型是兼容的。 如果你不想指定类型，TypeScript的类型系统会推断出参数类型，因为函数直接赋值给了 SearchFunc类型变量。
 *  函数的返回值类型是通过其返回值推断出来的
 * @param _source 
 * @param _subString 
 */
let mySearch: Search = (_source: number, _subString: number) => {
  let result = _source + 1
  return result > -1
}
// 3 可索引的类型
/**
 * 我们定义了StringArray接口，它具有索引签名。 这个索引签名表示了当用 number去索引StringArray时会得到string类型的返回值
 * 
 * 
 * 共有支持两种索引签名：字符串和数字。 可以同时使用两种类型的索引，但是数字索引的返回值必须是字符串索引返回值类型的子类型。
 * 这是因为当使用 number来索引时，JavaScript会将它转换成string然后再去索引对象。
 */
interface StringArray {
  readonly  [index: number]: string // 只读索引
}
let myArray: StringArray = ["Bob", "Fred"];
console.log(myArray[0])

// 4：类类型接口
/**
 * 与C#或Java里接口的基本作用一样，TypeScript也能够用它来明确的强制一个类去符合某种契约。
 */
interface ClockInterface {
  currentTime: Date
  // 你也可以在接口中描述一个方法，在类里实现它，如同下面的setTime方法一样：
  setTime(d: Date): void
}
class Clock implements ClockInterface {
  currentTime: Date
  setTime(d: Date) {
      this.currentTime = d;
  }
  constructor (h:number, m: number) {

  }
}
// 类静态部分与实例部分的区别
// 因为当一个类实现了一个接口时，只对其实例部分进行类型检查。 constructor存在于类的静态部分，所以不在检查的范围内。

// 5：继承接口
/**
 * 和类一样，接口也可以相互继承。 这让我们能够从一个接口里复制成员到另一个接口里，
 * 可以更灵活地将接口分割到可重用的模块里。
 * 
 */
interface Animal {
  name: string;
}
interface Mountain {
  height: number;
}
interface Shape extends Animal{
  color: string
}
// 一个接口可以继承多个接口，创建出多个接口的合成接口。
interface MountainShape extends Shape, Mountain {
  size: string
} 
// 带初始化方式的定义对象
let m_shape: MountainShape = {
  size: '100',
  color: 'red',
  height: 100,
  name: 'shape'
}
// 空对象方式的定义
let n_shape =  <MountainShape> {}
n_shape.size = '100'
n_shape.color = 'red'
n_shape.height = 100
console.log(m_shape)

// 6:混合类型
/**
 * 先前我们提过，接口能够描述JavaScript里丰富的类型。 因为JavaScript其动态灵活的特点，
 * 有时你会希望一个对象可以同时具有上面提到的多种类型。
 */
interface Counter {
  (start: number): string,// 有返回值的函数
  interval: number,
  reset(): void // void类型方法
}
function getCounter(): Counter {
  let counter = <Counter>function (start: number) { };
  counter.interval = 100
  counter.reset = function(){}
  return counter
}
let c = getCounter()
console.log(c.interval)

// 7: 接口继承类
/**
 * 当接口继承了一个类类型时，它会继承类的成员但不包括其实现。 就好像接口声明了所有类中存在的成员，但并没有提供具体实现一样。 
 * 接口同样会继承到类的private和protected成员。 这意味着当你创建了一个接口继承了一个拥有私有或受保护的成员的类时，这个接口类型只能被这个类或其子类所实现（implement）。
 */

console.warn(`-------------------------Ts接口部分end-------------------------`)
