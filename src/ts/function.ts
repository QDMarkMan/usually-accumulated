/**
 * 函数
 * 函数是JavaScript应用程序的基础。 它帮助你实现抽象层，模拟类，信息隐藏和模块。 
 * 在TypeScript里，虽然已经支持类，命名空间和模块，但函数仍然是主要的定义 行为的地方。 
 * TypeScript为JavaScript函数添加了额外的功能，让我们可以更容易地使用。
 * 
 */
console.warn(`-------------------------Ts函数部分begin-------------------------`)
// 1: 为函数定义类型
/**
 * 函数类型包含两部分：参数类型和返回值类型。 当写出完整函数类型的时候，这两部分都是需要的。 我们以参数列表的形式写出参数类型
 */
let myAdd :(value: number, increment?: number) => number = function(x: number, y: number): number { return x + y; };

// 2: 剩余参数
/**
 * 剩余参数会被当做个数不限的可选参数。 可以一个都没有，同样也可以有任意个。 
 * 编译器创建参数数组，名字是你在省略号（ ...）后面给定的名字，你可以在函数体内使用这个数组。
 * @param firstName 
 * @param restOfName 
 */
function buildName(firstName: string, ...restOfName: string[]): string{
  return firstName + '' + restOfName.join(' ')
}
// 箭头函数实现
let buildNameFun: (fname: string, ...rest: string[]) => string = buildName
let employeeName = buildName("Joseph", "Samuel", "Lucas", "MacKinzie");
console.log(employeeName)

/**
 * this 指向问题
 */
let deck = {
  suits: ["hearts", "spades", "clubs", "diamonds"],
  cards: Array(52),
  createCardPicker: function() {
      // 箭头函数绑定一个作用域
      return () => {
          console.log(`this指向${this}`)
          console.log(this.suits)
          return this.suits
      }
  }
}
// 因为我们没有去绑定this 所以这个时候得this指向是指向得window 注意：在严格模式下， this为undefined而不是window
let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();
// let pickedCard = cardPicker();
/**
 * 我们添加一些接口 让类型重用的更加明显
 */
interface Card {
  suit: string
  card: number
}
interface Deck {
  suits: string[]
  cards: number[]
  /**
   * 现在TypeScript知道createCardPicker期望在某个Deck对象上调用。 
   * 也就是说 this是Deck类型的，而非any，因此--noImplicitThis不会报错了
   * @param this 
   */
  create(this: Deck): () => Card
}
let deckNew:Deck ={
  suits: ["hearts", "spades", "clubs", "diamonds"],
  cards: Array(52),
  create: function(this: Deck){
    return () => {
      let pickedCard = Math.floor(Math.random() * 52);
      let pickedSuit = Math.floor(pickedCard / 13);
      return {
        suit: this.suits[pickedSuit],
        card: pickedCard % 13
      }
    }
  }
}
let cardPickerNew = deckNew.create();
let pickedCardNew = cardPickerNew();
console.log("使用接口重写this指向之后的： card: " + pickedCardNew.card + " of " + pickedCardNew.suit);

/**
 * this 参数在回调函数里面的时候
 */
interface UIElement {
  addClickListener(onclick: (this: void, e: Event) => void): void;
}

console.warn(`-------------------------Ts函数部分end-------------------------`)
