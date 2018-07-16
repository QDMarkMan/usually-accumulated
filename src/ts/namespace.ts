/**
 * 命名空间
 * 这篇文章描述了如何在TypeScript里使用命名空间（之前叫做“内部模块”）来组织你的代码。 就像我们在术语说明里提到的那样，“内部模块”现在叫做“命名空间”。 
 * 另外，任何使用 module关键字来声明一个内部模块的地方都应该使用namespace关键字来替换。 这就避免了让新的使用者被相似的名称所迷惑。
 */
interface Valiadtor {
  isAcceptable(s: string): boolean
}
let lettersRegexp = /^[A-Za-z]+$/
let numberRegexp = /^[0-9]+$/
class ZipCodeValidator implements Valiadtor {
  isAcceptable(s: string) {
      return lettersRegexp.test(s)
  }
}
class NumberValidator implements Valiadtor {
  isAcceptable(s: string) {
      return numberRegexp.test(s)
  }
}
/**
 * 随着更多验证器的加入，我们需要一种手段来组织代码，以便于在记录它们类型的同时还不用担心与其它对象产生命名冲突。 
 * 因此，我们把验证器包裹到一个命名空间内，而不是把它们放在全局命名空间下。
 */
namespace NameValiadtor {
  export interface StringValidator {
    isAcceptable(s: string): boolean
  }
  const lettersRegexp = /^[A-Za-z]+$/
  const numberRegexp = /^[0-9]+$/
  export class LettersOnlyValidator implements StringValidator {
    isAcceptable(s: string) {
        return lettersRegexp.test(s);
    }
  }
}
// 使用
let validators: {[s: string]: NameValiadtor.StringValidator} = {}
validators['zip'] = new NameValiadtor.LettersOnlyValidator()

/**
 * 多文件中的命名空间
  现在，我们把Validation命名空间分割成多个文件。 尽管是不同的文件，它们仍是同一个命名空间，并且在使用的时候就如同它们在一个文件中定义的一样。 
  因为不同文件之间存在依赖关系，所以我们加入了引用标签来告诉编译器文件之间的关联。 我们的测试代码保持不变。
 */
