/**
 * Array API模块回顾 ⭐⭐⭐⭐⭐  array模块相当重要
 * MDN文档为主
 * Array具有两个属性
 * Array.prototype
 * Array.length
 */

//************数组中的thisArg是传递进去的执行上下文，如果不穿数组内的callback中的this是undefined 传了就是具体的this指向********************* */
 /**
  * ⭐⭐⭐
  * from(arrayLike,mapFn,thisArg) 方法从一个类似数组或可迭代对象中创建一个新的数组实例。
  * 注意：返回一个新的数组实例
  * arrayLike：要转化的对象
  * mapFn：map方法 可以对数组进行遍历
  * thisArg：他执行回掉函数时的this对象
  */
let fromArr = Array.from('fooasd',x => x + 'a')
console.log('from 方法返回的值为一个新的数组实例');
console.log(fromArr);

/**
 * ⭐⭐⭐
 * isArray()
 * 用于确定传递的值是否是一个 Array。
 * 注意：返回true或者false
 * 
 * // 鲜为人知的事实：其实 Array.prototype 也是一个数组。
    Array.isArray(Array.prototype); 
 */
console.log('鲜为人知的事实：其实 Array.prototype isArray:' +  Array.isArray(Array.prototype))

/**
 * ⭐⭐⭐⭐
 * concat()方法用于合并两个或多个数组或数值。
 * 注意：不会修改原数组 会返回一个新数组 而且生成的数组还是一个浅拷贝 ，生成的新数组会随着原数组的改变
 */
let num1 = [[2],5]
let num2 = [2,[2]]
let num3 =  [[7]]
let nums = num1.concat(num1,num2,9)
console.log('concat 方法返回的是一个原数组浅拷贝生成的新数组：');
console.log(nums);
num1[0].push(7)
console.log('修改原数组之后新数组也会改变：');
console.log(nums);

/**
 * ⭐⭐⭐
 * copyWithin(target,start,end)方法浅复制数组的一部分到同一数组中的另一个位置，并返回它，而不修改其大小。
 * target:目标位置开始
 * start：复制的开始位置
 * end：复制的结束位置
 * 注意：修改原数组  start和end一般都是要头不要尾
 */
console.log([1, 2, 3, 4, 5].copyWithin(-2))// [1, 2, 3, 1, 2]
console.log([1, 2, 3, 4, 5].copyWithin(0,3));// [4, 5, 3, 4, 5]
console.log([1, 2, 3, 4, 5].copyWithin(0,2,3));// [3, 2, 3, 4, 5]

/**
 * ⭐⭐⭐
 * entries() 方法返回一个新的Array Iterator对象，该对象包含数组中每个索引的键/值对。
 * 注意：返回一个新的 Array 迭代器对象。Array Iterator是对象，它的原型（__proto__:Array Iterator）上有一个next方法，可用用于遍历迭代器取得原数组的[key,value]。
 * 返回的对象中的value才是真正的遍历的值
 */
let arr = ["a", "b", "c"]
let iteator  = arr.entries()
console.log(iteator);
/*{value: Array(2), done: false}
          done:false
          value:(2) [0, "a"]
           __proto__: Object
*/
// iterator.next()返回一个对象，对于有元素的数组，
// 是next{ value: Array(2), done: false }；
// next.done 用于指示迭代器是否完成：在每次迭代时进行更新而且都是false，
// 直到迭代器结束done才是true。
// next.value是一个["key":"value"]的数组，是返回的迭代器中的元素值。
// 遍历iteator
for(let item of iteator){
  console.log(item);
}
//Iterator的方法运行
let forArr = ["a", "b", "c"]
let forIter = forArr.entries()
var a = [];
for (let index = 0; index < forArr.length + 1; index++) { // 注意，是length+1，比数组的长度大
  let element =forIter.next() //  每次迭代时更新next
  console.log(element.done); // 这里可以看到更新后的done都是false
  if(element.done !== true){
      console.log(element.value);
      a.push(element.value)
  }
}
console.log(a);

// 二维数组中的数组排序可以使用
function sortDubble(arr){
  let goNext = true
  let entries = arr.entries()
  while(goNext){
    let result = entries.next()
    if(result.done !== true){
        result.value[1].sort((a,b) => a -b)
        goNext = true
    }else{
      goNext = false
    }
  }
  return arr
}
let dArr = [[1,34],[456,2,3,44,234],[4567,1,4,5,6],[34,78,23,1]];
console.log(sortDubble(dArr));

/**
 * ⭐⭐⭐
 * every(callback(元素值，元素的索引，原数组),thisArg) 用于测试数组得所有元素是否都通过了指定函数得测试
 * callback：测试函数
 * thisArg：执行callback中得this函数
 * 注意：every不会改变数组 返回得是ttue或者false
 */
function bigEnough(item,index,arr){
  return item > 10
}
let passed = [12, 5, 8, 130, 44].every(bigEnough,this)
console.log(passed);
/**
 * ⭐⭐⭐
 * some(callback(元素值，元素的索引，原数组),thisArg)方法测试数组中的某些元素是否通过由提供的函数实现的测试。
 * 和every差不多
 * 也是返回true或者false
 */
let pass = [1, 5, 8, 2, 3].some(bigEnough,this)
console.log(pass);

/**
 * ⭐⭐⭐⭐
 * fill(value,start,end)方法用一个固定值填充一个数组中从起始索引到终止索引内的全部元素。
 * value：值
 * start：开始索引
 * end：结束索引
 * 注意：修改的是当前的数组
 * 如果 start 是个负数, 则开始索引会被自动计算成为 length+start, 其中 length 是 this 对象的 length 属性值. 如果 end 是个负数, 则结束索引会被自动计算成为 length+end.
 */
console.log(['qw','qwe','wqe','wqe','wqe','wqe'].fill('fill',3,5));

/**
 * ⭐⭐⭐⭐⭐
 * filter(callback(element, index, array),thisArgs) 数组过滤器 方法创建一个新数组, 其包含通过所提供函数实现的测试的所有元素。 
 * 注意：返回的是新数组
 */
let filtered =  [12, 5, 8, 130, 44].filter(bigEnough,this)
console.log(filtered);

/**
 * ⭐⭐⭐⭐
 * find(callback(元素值，元素的索引，原数组),thisArg)方法返回数组中满足提供的测试函数的第一个元素的值。否则返回 undefined。
 * 注意：在不满足条件的时候返回的是undefined
 * 返回得是数组中得一个值
 * 注意这个和string.indexOf一样是第一个出现得值 ：注意 这个是返回的是值
 */
//用对象得属性查找数组中得对象
var inventory = [
  {name: 'apples', quantity: 2},
  {name: 'bananas', quantity: 0},
  {name: 'cherries', quantity: 5}
];
function findObj(fruit){
  return fruit.name === 'cherries';
}
console.log(inventory.find(findObj));

/**
 * ⭐⭐⭐⭐
 * findIndex(callback,thisArg)返回的是满足回掉函数的第一个值得索引
 * 注意：返回得是一个索引  find方法返回得是值 没找到就返回-1  和string得indexOf()返回值一样
 */
console.log(inventory.findIndex(findObj));

/**
 * ⭐⭐⭐⭐⭐
 * forEach(callback(currentValue, index, array),thisArg)遍历数组得方法 
 * 注意：没有返回一个新数组! & 没有返回值!  修改得是原数组得值
 * 没有办法中止或者跳出 forEach 循环，除了抛出一个异常。这个是需要注意得。如果你需要这样，使用forEach()方法是错误的，你可以用一个简单的循环作为替代。
 * 如果您正在测试一个数组里的元素是否符合某条件，且需要返回一个布尔值，那么可使用 Array.every 或 Array.some。
 * 如果可用，新方法 find() 或者findIndex() 也可被用于真值测试的提早终止。
 * 应用场景：为一些相同的元素，绑定事件处理器！ 主要用于对数组得遍历
 */
let i  = 1
inventory.forEach((item,index,arr) =>{
  item.id = i++
})
console.log('foreach');
console.log(inventory)

/**
 * ⭐⭐⭐
 * includes(searchElement,fromIndex)方法用来判断一个数组是否包含一个指定的值，根据情况，如果包含则返回 true，否则返回false。
 * 注意：返回的是true或者false
 * fromIndex大于数组的长度时直接返回false
 */
let inArr = [1, 2, 3];
console.log(inArr.includes(2))
// true 
console.log(a.includes(4));
// false
//includes()可以使用一个通用方法 不仅仅可以用于数组对象，也可以用于类数组对象
(function(){
  // 通用的自执行方法
  console.log([].includes.call(arguments,'a'));
  console.log([].includes.call(arguments,'m'));
})('a','b','c')

/**
 * ⭐⭐⭐
 * indexOf(elem,fromIndex)方法返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回-1。
 * 他和findIndex()不同的是参数不同，这个是具体的element，而findIndex查找的是满足回掉函数条件的元素的位置索引
 * 和string的字符串的使用方法类似 
 */
let indexArr = [1, 2, 3];
console.log(indexArr.indexOf(2));
//查找一个元素出现的所有位置
let po = [];
let arrs = ['a', 'b', 'a', 'c', 'a', 'd']
let element = 'a'
let idx = arrs.indexOf(element)
while(idx != -1){
  po.push(idx)
  idx = arrs.indexOf(element,idx+1)
}
console.log('用indexOf查找出现的位置');
console.log(po);

/**
 * ⭐⭐⭐⭐⭐
 * join(separator) 将一个数组或者类数组对象转化为以separator分割的字符串
 * 注意：不会改变原数组，会返回一个新的字符串 参数默认的是 , 也可以是空字符串
 * 如果arr的length是0 则返回空字符串
 */
console.log(arrs.join('分割'));
//分割类数组对象
(function(){
  let str = Array.prototype.join.call(arguments)
  console.log(str);
})('a','b','c')

/**
 * ⭐⭐⭐
 * keys()方法返回一个新的Array迭代器，它包含数组中每个索引的键。
 * 注意：返回的是一个新的array迭代器对象
 * 和Array.entries()差不多 但是这个只有key 也就是迭代器value只有下标索引
 */
let keyArr =  [1, 2, 3];
let keyIter = keyArr.keys()
console.log('key 方法的返回值是一个包括key的数组迭代器');
console.log(keyIter.next());

/**
 * ⭐⭐⭐
 * values() 方法返回一个新的 Array Iterator 对象，该对象包含数组每个索引的值。
 * 注意：Chrome 未实现，Firefox未实现，Edge已实现。 测试该方法建议使用edge
 * Chrome 及Firefox可以用"arr[Symbol.iterator]()"方法来代替values()方法
 */
let valueArr = ["angel", "clown", "mandarin", "surgeon"]
// let valueIter = valueArr.values()
console.log('values 方法的返回值是一个包括value的数组迭代器')
// console.log(valueIter.next());

/**
 * ⭐⭐⭐
 * lastIndexof(searchElement,开始位置，默认为数组的长度-1)方法返回指定元素（也即有效的 JavaScript 值或变量）在数组中的最后一个的索引，如果不存在则返回 -1。
 * 从数组的后面向前查找，从 fromIndex 处开始。
 * 注意：这个方法是逆向查找， 找到是一个元素在数组中最后一次出现为止的索引，和indexOf一样返回索引 如果没找到返回-1 
 */
let lastArr  =  [2, 5, 9, 2]
let lastIndex  =lastArr.lastIndexOf(9);
console.log(lastIndex);
//查找当前元素在数组中的出现的位置
/**
 * 注意，我们要单独处理idx==0时的情况，因为如果是第一个元素，忽略了fromIndex参数则第一个元素总会被查找。这不同于indexOf方法
 */
let idy = arrs.lastIndexOf(element)
let lastIndexArr = []
while(idy != -1){
  lastIndexArr.push(idy)
  idy = idy > 0 ? arrs.lastIndexOf(element,idy-1) : -1;
}
console.log('用lastIndexOf查找出现的位置');
console.log(lastIndexArr);

/**
 * ⭐⭐⭐⭐⭐
 * map(callback(currentValue, index, array),thisArg)遍历数组的方法，返回通过每一项回掉函数修改之后的新数组
 * 注意：返回的是新数组 不修改原数组 这个值返回得是callback主执行完得返回 没有返回就返回undefined
 * map 方法会给原数组中的每个元素都按顺序调用一次  callback 函数。callback 每次执行后的返回值（包括 undefined）组合起来形成一个新数组。 
 * callback 函数只会在有值的索引上被调用；那些从来没被赋过值或者使用 delete 删除的索引则不会被调用。
 */
let  mapInventory = [
  {name: 'apples', quantity: 2},
  {name: 'bananas', quantity: 0},
  {name: 'cherries', quantity: 5}
];
let mapArr = mapInventory.map((item,index,mapInventory) => {
  item.operate= 'map操作'
  item.index = index
  return item
})
console.log(mapArr);

/**
 * ⭐⭐⭐⭐
 * pop()删除数组得最后一项并返回最后一项得值
 * 注意：返回值是数组中得最后一项得值，而且修改了原数组
 */
let pop =  mapInventory.pop()
console.log(pop);

/**
 * ⭐⭐⭐⭐⭐
 * push(item)方法将一个或多个元素添加到数组的末尾，并返回新数组的长度。
 * 注意：这个是添加到末尾 新数组length 属性值将被返回。 并且修改远数组
 */
let push = mapInventory.push({
  name: 'cherries', quantity: 5
})
console.log(push);
//可以用来合并两个数组  通过call方法
let vegetables = ['parsnip', 'potato']
let moreVegs = ['celery', 'beetroot']
// 这就相当于 vegetables.push('celery', 'beetroot');
Array.prototype.push.call(vegetables,moreVegs)
console.log(vegetables)
// Array.prototype.push可以在一个对象上面使用
let obj = {
  length:0,
  addElem(elem){
    [].push.call(this,elem) // 这个key是数组得索引
  }
}
obj.addElem('add') 
obj.addElem('123')
console.log(obj)

/**
 * ⭐⭐⭐⭐⭐
 * reduce(callback(accumulator,currentValue,currentIndex,array),initialValue)方法对累加器和数组中的每个元素（从左到右）应用一个函数，将其减少为单个值。
 * reduceRight(callback(accumulator,currentValue,currentIndex,array),initialValue) 方法接受一个函数作为累加器（accumulator）和数组的每个值（从右到左）将其减少为单个值。 PS：这个方法和reduce方法执行顺序相反
 * callback处理方法
 * accumulator：累加器累加回掉得返回值
 * currentValue：当前得value
 * currentIndex：当前下标
 * array：当前数组
 * initialValue:累加器默认值
 * 注意: IE9以下不支持，
 * 注意：回调函数第一次执行时，accumulator 和currentValue的取值有两种情况：
 * 1：调用reduce时提供initialValue，accumulator取值为initialValue，currentValue取数组中的第一个值；
 * 2：没有提供 initialValue，accumulator取数组中的第一个值，currentValue取数组中的第二个值。
 * 如果没有提供initialValue  reduce 会从索引1的地方开始执行 callback 方法，跳过第一个索引。如果提供initialValue，从索引0开始。
 * 如果数组为空且没有提供initialValue，会抛出TypeError 。如果数组仅有一个元素（无论位置如何）并且没有提供initialValue， 或者有提供initialValue但是数组为空，那么此唯一值将被返回并且callback不会被执行。
 */
// 提供初始值通常更安全，正如下面的例子，如果没有提供initialValue，则可能有三种输出：
let maxCallback = (pre,cur) => Math.max(pre.x,cur.x)
let maxCallback2 = (pre,cur) => Math.max(pre,cur)
// reduce() without initialValue
// [{ x: 22 }, { x: 42 }].reduce( maxCallback ); // 42
// [ { x: 22 }            ].reduce( maxCallback ); // { x: 22 }
// [                      ].reduce( maxCallback ); // TypeError
// // map/reduce; better solution, also works for empty arrays
[ { x: 22 }, { x: 42 } ].map( el => el.x ).reduce( maxCallback2, -Infinity );
//reduce是如何运行的
let accumulator = [0, 1, 2, 3, 4].reduce(function(pre,cur,index,arr){
  return pre + cur
})
console.log(accumulator);
// 这个reduce执行4次 没有初始值从index为1的部分开始执行每次累加 最终返回callback处理完的accumulator
//用途
//1：将二维数组转换为一维数组
let reduceTran = [[0, 1], [2, 3], [4, 5]].reduce((pre,cur) => pre.concat(cur),[])
console.log(reduceTran);
//2：计算数组中每个元素出现的次数
let names = ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice']
let countNames = names.reduce(function(allName, name){
  if(name in allName){
    allName[name]++ 
  }else{
    allName[name] = 1;
  }
  return allName
},{})
console.log(countNames);
// 3：利用扩展运算符和initialValue绑定包含在对象数组中的数组
let friends = [{
  name: 'Anna',
  books: ['Bible', 'Harry Potter'],
  age: 21
}, {
  name: 'Bob',
  books: ['War and peace', 'Romeo and Juliet'],
  age: 26
}, {
  name: 'Alice',
  books: ['The Lord of the Rings', 'The Shining'],
  age: 18
}];
let friendList = friends.reduce((pre,cur) =>{
  return [...pre,...cur.books]
},['begin'])
console.log(friendList);
//数组去重 借助一个外部的对象的方式
let reduceArr = [1,2,1,2,3,5,4,5,3,4,4,4,4]
let reduceObj = {}
let norepeats = reduceArr.reduce(function(pre,cur){
  if(!reduceObj[cur]){
    reduceObj[cur] = cur
    pre.push(cur)
  }
  return pre
},[])
console.log('reduce和对象组合数组去重');
console.log(norepeats);

/**
 * ⭐⭐⭐⭐
 * reverse 方法颠倒数组中元素的位置，并返回该数组的引用。
 * 注意：返回的是当前数组的引用 不是一个完全的新数组 会修改原数组
 */
let myArray = ['one', 'two', 'three' ,'four']
console.log(myArray.reverse());
console.log(myArray);

/**
 * ⭐⭐⭐⭐
 * shift()删除数组中的第一个元素并返回这个元素的值
 * 注意：返回的是数组中第一项的值
 */
let shiftArr = [1, 2, 3]
let shiftArrb = shiftArr.shift()
console.log('shift 返回值为第一项元素的值');
console.log(shiftArrb);
/**
 * ⭐⭐⭐⭐
 * unshift() 将一个或者多个元素添加到数组的开头，并返回新数组的长度
 * 注意：返回的是新数组的长度，和上面那个返回值是不一样的
 * 当这个方法是用在对象身上的时候返回的是对象的length属性
 */
let unshiftArr = [1,2,3]
let unshiftBack = unshiftArr.unshift(5,6)
console.log(unshiftArr);
console.log('unshift 返回值为调用之后该数组的长度');
console.log(unshiftBack);

/**
 * slice(startIndex,endIndex)方法返回一个从开始到结束（不包括结束）选择的数组的一部分浅拷贝到一个新数组对象。且原始数组不会被修改。
 * 注意：返回的是一个浅拷贝的新数组 但是不会修改原数组 包括看来是不包括结束  总结来说：返回的是一个含有提取元素的数组 也就是现有元素的一部分
 */
let sliceArr =  [1, 2, 3].slice(2,3)
console.log('slice 返回值')
console.log(sliceArr);
// 类数组对象同样可以使用
/**
 * 除了使用 Array.prototype.slice.call(arguments)，你也可以简单的使用 [].slice.call(arguments) 来代替。
 */
function list(){
  return Array.prototype.slice.call(arguments)
}
console.log(list(1,23,23,23,23))
//另外，你可以使用 bind 来简化该过程。
var unboundSlice  = Array.prototype.slice
var slice = Function.prototype.call.bind(unboundSlice)
function bindList(){
  return slice(arguments)
}
console.log(bindList(23,213,33,3,4,4));

/**
 * ⭐⭐⭐⭐
 * sort(compareFunction)数组排序 但是不一定稳定  是根据Unicode码点
 * compareFunction:可选。用来指定按某种顺序进行排列的函数。如果省略，元素按照转换为的字符串的各个字符的Unicode位点进行排序。
 * 注意：返回排序后的数组。原数组已经被排序后的数组代替。修改原数组
 */
var scores = [1, 10, 21, 2]; 
console.log(scores.sort());
function compare(a,b){
  if(a > b){
    return 1
  }
  
  if(a<b){
    return -1
  }

  return 0
}
let compareNumbers = (a,b) => a-b
scores = [1, 10, 21, 2]; 

// let comparF = scores.sort(compare)
let comparF = scores.sort(compareNumbers)
console.log(comparF);

/**
 * ⭐⭐⭐⭐⭐
 * splice(startIndex,delCout,item1,item2,item3...) 方法通过删除现有元素和/或添加新元素来更改一个数组的内容。
 * start:操作得开始位置
 * delCout:删除得个数
 * item1,item2,item3...:要添加进数组的元素,从start 位置开始。如果不指定，则 splice() 将只删除数组元素。
 * splice方法使用deleteCount参数来控制是删除还是添加：
 * start参数是必须得
 * splice(start) : 从start一直删除到数组末尾
 * splice(start, deleteCount) : 从start删除deleteCount个元素
 * splice(start, 0, item1, item2, ...)  : 从start增加0个item元素
 * 注意:这个方法可删可增加，而且修改得是原数组 ，但是它得返回值是由被删除元素组成得数组，删除0个返回一个空数组
 * 请注意，splice() 方法与 slice() 方法的作用是不同的，splice() 方法会直接对数组进行修改。
 */
let myFish = ["angel", "clown", "mandarin", "surgeon"]
let delArr = myFish.splice(2,1,'drum')
console.log(myFish);
console.log('splice返回值：')
console.log(delArr);

/**
 * ⭐⭐⭐⭐⭐
 * toString() 数组转字符串 返回一个字符串，表示指定的数组及其元素。
 * 注意：返回字符串，相当于join() 不会修改原数组
 */
let stringArr =  ["angel", "clown", "mandarin", "surgeon"]
console.log(stringArr.toString())
console.log('toString的返回值');
console.log(stringArr);

/**
 * 测试demo
 */
const jsonArr = [
  {id:1,name:'demo',num:1},
  {id:2,name:'demo',num:1},
  {id:1,name:'demo',num:1},
  {id:4,name:'demo',num:1},
]

let newJsonArr = [
  {id:1,name:'demo',num:1}
]

jsonArr.forEach((item,index) =>{
  let curIndex,isInArr = false
  isInArr = newJsonArr.some((sub,index) => {
    return sub.id === item.id
  })
  if(isInArr){
    newJsonArr.forEach(child =>{
      child.id == item.id ? child.num += 1 :''
    })
  }else{
    newJsonArr.push(item)
  }
})

console.log('====================================');
console.log('数组中的总结')
/**
 * 根据分类对数组的方法进行总结
 */
//1:不修改原数组，返回一个新数组的方法 ⭐⭐⭐⭐⭐
/**
 * 1:from(arrLike,mapFn.this) 类数组对象转为数组
 * 2:concat() 连接两个或者多个数组
 * 3:
 */
//2:返回一个浅拷贝的数组
/**
 * 
 */
//3:修改原数组 ⭐⭐⭐⭐⭐
/**
 * 1:copyWithin(targetIndex,startIndex,endIndex) 把从startIndex到endIndex的元素拷贝到targetIndex位置
 */
//4:返回一个Iterator对象的方法
/**
 * 1：entries()
 */
//5:返回boolean值得方法
/**
 * every(mapFn,thisArg) 对数组遍历进行 && 操作 之后结果
 * some(mapFn,thisArg) 对数组操作返回 || 操作之后结果
 */
console.log('====================================');