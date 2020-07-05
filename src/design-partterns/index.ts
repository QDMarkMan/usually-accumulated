console.log(`%c===> design-partterns start`, 'color: #409EFF;')
import './behavior-mode/strategy'
import './structure-mode/proxy'
console.log(`%c===> 测试测试原则`, 'color: #409EFF;')
// 里式替换原则
class A {
  /**
   * add
   */
  public add(a: number, b: number): number {
    return a + b
  }
}

class B extends A {
  /**
   * add
   */
  public add(a: number, b: number) :number {
      return a - b
  }

  /**
   * count
   */
  public count(a: number, b: number): number {
    return a * b
  }
}

class Client {
  a: number;
  b: number;
  constructor(a: number, b: number) {
    this.a = a
    this.b = b
  }
  
  /**
   * name
   */
  public show() : void {
    const b = new B()
    console.log(b.add(this.a, this.b), b.count(this.a, this.b))
  }

  /**
   * showA
   */
  public showA() {
    const a = new A()
    console.log(a.add(this.a, this.b))
  }
}

const client = new Client(3, 1)

client.show()
client.showA()