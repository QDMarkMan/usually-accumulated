/**
 * 泛型
 * 软件工程中，我们不仅要创建一致的定义良好的API，同时也要考虑可重用性。 
 * 组件不仅能够支持当前的数据类型，同时也能支持未来的数据类型，这在创建大型系统时为你提供了十分灵活的功能。
 */
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

// 2 泛型接口
interface GenericIdentityFn {
  <T>(arg: T): T;
}
// function 
