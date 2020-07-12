/** ---------------------------------------------------------------------------------------------
 *  @Author [ETongfu].
 *  @Des [Observer mode].
 *-------------------------------------------------------------------------------------------- */
console.log(`%c===> Start Observer mode`, 'color: #409EFF;')
interface Observer {
  update (ObserverSubject: ObserverSubject): void; 
}
// The ObserverSubject interface declares a set of methods for managing subscribers.ß
interface ObserverSubject {
  attach (observer: Observer): void;
  detach (observer: Observer): void;
  notify ():void;
}
class ConcreteSubject implements ObserverSubject {
  public state:number;
  private observers: Observer[] = [];

  /**
   * attach
   */
  public attach(observer: Observer): void {
    const isExit = this.observers.includes(observer)
    if (isExit) {
      return console.log('ObserverSubject: Observer has been attached already.');
    }
    this.observers.push(observer)
  }

  /**
   * detach
   */
  public detach(observer: Observer): void {
    const index = this.observers.indexOf(observer)
    if (index === -1) {
      return console.log('ObserverSubject: Nonexistent observer.');
    }
    this.observers.splice(index, 1)
    console.log('ObserverSubject: Detached an observer.');
  }

  /**
   * notify
   */
  public notify(): void {
    for (const observer of this.observers) {
      observer.update(this)
    }
  }

  /**
   * logic
   */
  public logic() {
    this.state = Math.floor(Math.random() * (100  + 1))
    console.log(`%c===> Put some logic here`, 'color: #409EFF;')
    this.notify()
  }
}

class Observer1 implements Observer {
  update (subject: ObserverSubject): void {
    if (subject instanceof ConcreteSubject) {
      console.log(`%c===> Observer1 state ${subject.state}`, 'color: #409EFF;')
    }
  }
}

const subject = new ConcreteSubject()
const observer1 = new Observer1()
subject.attach(observer1) // 监听事件
subject.logic() // notify
subject.detach(observer1) // 卸载事件
subject.logic() // notify
