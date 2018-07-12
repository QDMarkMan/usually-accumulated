/**
 * 类型兼容性
 * TypeScript里的类型兼容性是基于结构子类型的。 结构类型是一种只使用其成员来描述类型的方式。 它正好与名义（nominal）类型形成对比。
 * （译者注：在基于名义类型的类型系统中，数据类型的兼容性或等价性是通过明确的声明和/或类型的名称来决定的。这与结构性类型系统不同，它是基于类型的组成结构，且不要求明确地声明。)
 */
interface Named {
  name: string
}
class PersonName{
  name: string
}
let p:Named
p = new PersonName()
// 这样是可行的
/**
 * 在使用基于名义类型的语言，比如C#或Java中，这段代码会报错，因为PersonName类没有明确说明其实现了Named接口。
 * 
 * TypeScript的结构性子类型是根据JavaScript代码的典型写法来设计的。 
 * 因为JavaScript里广泛地使用匿名对象，例如函数表达式和对象字面量，所以使用结构类型系统来描述这些类型比使用名义类型系统更好。
 */
