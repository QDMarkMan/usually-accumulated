/** ---------------------------------------------------------------------------------------------
 *  @Author [ETongfu].
 *  @Des [代理模式].
 *-------------------------------------------------------------------------------------------- */
/**
 * The Subject interface declares common operations for both RealSubject and the
 * Proxy. As long as the client works with RealSubject using this interface,
 * you'll be able to pass it a proxy instead of a real subject.
 */
interface Subject {
  request(str?: string) :void
}

/**
 * The RealSubject contains some core business logic. Usually, RealSubjects are
 * capable of doing some useful work which may also be very slow or sensitive -
 * e.g. correcting input data. A Proxy can solve these issues without any
 * changes to the RealSubject's code.
 */
class RealSubject implements Subject {
  /**
   * doSomeLogic
   */
  public request(): void {
    console.log(`%c===> do some logic`, 'color: #409EFF;')
  }
}

class ProxyCore implements Subject {
  private realSubject: RealSubject
  constructor (realSubject: RealSubject) {
    this.realSubject = realSubject
  }

  private checkAccess(): boolean {
    console.log('you can choose weather call request')
    return true
  }

  private logging():void {
    console.log('some service called request')
  }

  /**
   * request
   */
  public request() {
    // call service
    if (this.checkAccess()) {
      this.realSubject.request()
      this.logging()
    }
  }
}

function client(realSubject: RealSubject): void {
  // ... do something
  realSubject.request()
}
console.log('Client: Executing the client code with a real subject:');
const realSubject = new RealSubject()
client(realSubject)

console.log('\n')

console.log('Client: Executing the same client code with a proxy:');
const proxySubject = new ProxyCore(realSubject)
client(proxySubject)