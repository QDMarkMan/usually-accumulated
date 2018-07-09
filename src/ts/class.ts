/**
 * ts 类
 * 传统的JavaScript程序使用函数和基于原型的继承来创建可重用的组件，但对于熟悉使用面向对象方式的程序员来讲就有些棘手，因为他们用的是基于类的继承并且对象是由类构建出来的。 
 * 从ECMAScript 2015，也就是ECMAScript 6开始，JavaScript程序员将能够使用基于类的面向对象的方式。 
 * 使用TypeScript，我们允许开发者现在就使用这些特性，并且编译后的JavaScript可以在所有主流浏览器和平台上运行，而不需要等到下个JavaScript版本。
 */
console.warn(`-------------------------Ts类部分begin-------------------------`)
// 面向对象的方式创建一个类
class Greeter {
  greeting:string // 属性成员
  constructor (message: string) { // 构造函数
    this.greeting = message
  }
  greet(){ // 方法成员
    return `Hello，${this.greeting}`
  }
}
// 意思是 Greeter类的实例的类型是 Greeter。
let greeter:Greeter = new Greeter("world")  // 

// 2 继承 公共，私有与受保护的修饰符
// 父类
class AnimalObj {
  // public name: string
  private type: string //当成员被标记成 private时，它就不能在声明它的类的外部访问
  readonly legs: number // 你可以使用 readonly关键字将属性设置为只读的。 只读属性必须在声明时或构造函数里被初始化。
  protected age: number // protected修饰符与 private修饰符的行为很相似，但有一点不同， protected成员在派生类中仍然可以访问。
  /**
   * 我们是如何舍弃了 theName，仅在构造函数里使用 private name: string参数来创建和初始化 name成员。 
   * 我们把声明和赋值合并至一处。
   * @param name 
   */
  public constructor (private name: string) {
    // this.name = theName
  }
  public move (distance: number = 0){
    console.log(`Animal moved ${distance}m.`);
  }
}
// 派生子类
class Dog extends AnimalObj {
  bark () {
    console.log('Woof! Woof!');
  }
}
const dog = new Dog('')
// 调用父类方法
dog.move(10)
// 更加复杂一点的例子
/**
 * 与前一个例子的不同点是，派生类包含了一个构造函数，它 必须调用 super()，它会执行基类的构造函数。 
 * 而且，在构造函数里访问 this的属性之前，我们 一定要调用 super()。 这个是TypeScript强制执行的一条重要规则。
 */
class Snake extends AnimalObj {
  constructor (name: string){
    super(name)
  }
  /**
   * 调用重写move方法 使得move 在不同的子类里面有不同的行为
   * @param distanceInMeters 
   */
  move(distanceInMeters = 5) {
    console.log("在子类中调用父类的方法")
    super.move(distanceInMeters)
  }
}
let sam = new Snake("Sammy the Python");
sam.move()

// 构造函数也可以被标记成 protected。 这意味着这个类不能在包含它的类外被实例化，但是能被继承。
class Person {
  protected name: string;
  protected constructor(theName: string) { this.name = theName; }
}

// Employee 能够继承 Person
class Employee extends Person {
  private department: string;

  constructor(name: string, department: string) {
      super(name);
      this.department = department;
  }

  public getElevatorPitch() {
      return `Hello, my name is ${this.name} and I work in ${this.department}.`;
  }
}

let howard = new Employee("Howard", "Sales");
// let john = new Person("John"); // 错误: 'Person' 的构造函数是被保护的.

// 3: 存取器 一般是为了保护对象内部属性  使得内部得属性不能无条件得随意修改
/**
 * 把一个简单的类改写成使用 get和 set。
 */
let passcode = "secret passcode"
class EmployeeGS {
  private _fullName: string
  get fullName () {
    return this._fullName
  }
  set fullName (newName: string) {
    if(passcode && passcode === 'secret passcode'){
      this._fullName = newName
    }else {
      console.log("Error: Unauthorized update of employee!");
    }
  }
}
let employee = new EmployeeGS()
employee.fullName = "Bob Smith"
/* if (employee.fullName) {
    alert(employee.fullName);
} */


// 4：抽象类
/**
 * 1：抽象类做为其它派生类的基类使用。 它们一般不会直接被实例化。 
 * 2：不同于接口，抽象类可以包含成员的实现细节。 
 * 3：abstract关键字是用于定义抽象类和在抽象类内部定义抽象方法。
 * 
 * 抽象类中的抽象方法不包含具体实现并且必须在派生类中实现。 抽象方法的语法与接口方法相似。 
 * 两者都是定义方法签名但不包含方法体。 然而，抽象方法必须包含 abstract关键字并且可以包含访问修饰符。
 */
abstract class DepartMent {
  constructor (public name: string) {}
  printName() :void {
    console.log(`Department name:${this.name}`)
  }
  /**
   * 这个抽象的修饰符表示的是不能直接实现 必须在派生类中实现
   */
  abstract printMeeting(): void; // 必须在派生类中实现
}
class AccountingDepartment extends DepartMent {
  constructor (){
    super('抽象类的派生类中必须要调用super')
  }
  printMeeting(): void {
    console.log(`子类中实现抽象父类中的方法: ${this.name}`)
  }
}
let department: DepartMent // 允许创建一个抽象类型的引用
// department = new DepartMent() // 错误：不允许创建一个抽象类的实例
department = new AccountingDepartment(); // 允许对一个抽象子类进行实例化和赋值
department.printMeeting()

/**
 * 高级技巧部分
 */
// 可以把类当作接口来使用
class Point {
  x: number
  y: number
}
interface Point3d extends Point {
  z: number
}
let point3d: Point3d = {x: 1, y: 2, z: 3};



console.warn(`-------------------------Ts类部分end-------------------------`)
