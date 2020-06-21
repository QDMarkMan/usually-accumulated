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

// ================================== 参数校验 ================================== //
interface Validator {
  doValidator () :boolean
}

interface ValidatorEntity {
  key: string,
  validators: Validator[],
  msg: String
}

class ValidatorContext {
  private entityList: ValidatorEntity[] = []

  /**
   * validators
   */
  public add(key: string, validators: Validator[], msg: string) {
    (!this.hasEntity(key)) && this.entityList.push({
      key,
      validators,
      msg
    })
  }
  /**
   * hasEntity
   */
  public hasEntity(key: string): boolean {
    return this.entityList.some((entity: ValidatorEntity) => entity.key === key)
  }

  /**
   * runEntity
   */
  public runValidator() {
    const len = this.entityList.length
    if (len > 0) {
      for (const value of this.entityList) {
        this.runEntity(value)
      }
    }
  }

  private runEntity(entity: ValidatorEntity): boolean {
    if (entity.validators.length > 0) {
      const values = entity.validators
      for (const value of values) {
        // if (!value.doValidator())
      }
    } else {
      return false
    }
  }
}