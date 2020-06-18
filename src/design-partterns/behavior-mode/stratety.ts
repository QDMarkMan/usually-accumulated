/** ---------------------------------------------------------------------------------------------
 *  @Author [ETongfu].
 *  @Des [Stratety Mode].
 *-------------------------------------------------------------------------------------------- */
// 策略接口
interface Strategy {
  doAlgorithm (data: number[]): number
}
/**
 * 策略接口
 * @class Context
 */
class Context {
  private strategy: Strategy // 上下文中的策略类
  constructor (strategy: Strategy) {
    this.strategy = strategy;
  }
  
  public setStrategy (strategy: Strategy) :void {
    this.strategy = strategy
  }
  
  public doSomeLogic (): void {
    console.log('Context: Counting data using the strategy (not sure how it\'ll do it)');
    const result = this.strategy.doAlgorithm([1,2,3,4])
    console.log(result)
  }
}
/**
 * 具体策略
 * @class MultiStrategy
 * @implements {Strategy}
 */
class MultiStrategy implements Strategy {
  /**
   * doAlgorithm
   */
  public doAlgorithm(data: number[]): number {
    if (data.length === 0) return 0
    let result = data.reduce((pre: number, next:number) => {
      pre = pre * next
      return pre
    }, 1)
    return result
  }
}
class AddStrategy implements Strategy {
  /**
   * doAlgorithm
   */
  public doAlgorithm(data: number[]): number {
    if (data.length === 0) return 0
    let result = data.reduce((pre: number, next:number) => {
      pre = pre + next
      return pre
    }, 0)
    return result
  }
}

// ------------------------------ usage ------------------------------ //
const context = new Context(new MultiStrategy())
context.doSomeLogic()
// update strategy
context.setStrategy(new AddStrategy())
context.doSomeLogic()
