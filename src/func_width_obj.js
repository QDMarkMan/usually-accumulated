/*
 * @Author: etongfu
 * @Email: 13583254085@163.com
 * @Description: Javascript中函数和对象配合的魅力 示例代码
 * @youWant: add you want info here
 * @Date: 2019-04-09 13:59:48
 * @LastEditTime: 2019-04-09 16:28:46
 */
console.warn(' ------------------------------------javascript中函数和对象配合的魅力begin----------------------------------')
// 简单实验 函数作为对象的存在
let fn = function () {}
fn.prop = 'fnProp'
console.log(fn.prop) // fnProp

// 1：函数缓存示例
let store = {
  nextId: 1, // id
  cache: {}, // 缓存
  add (fn) {
    // 如果函数中没有id属性那么就缓存
    if (!fn.id) {
      console.log(`begin add func ${fn.name}`)
      fn.id = store.nextId ++
      // 设置完缓存之后返回true
      return !!(store.cache[fn.id] = fn)
    } else {
      console.log(`${fn.name} is already in cache`)
    }
  }
}
function storeCache() {}
store.add(storeCache) // begin add func storeCache
store.add(storeCache) // storeCache is already in cache

// 2: 缓存记忆函数
function isPrime (value) {
  if (!isPrime.anwers) isPrime.anwers = {}
  // 先从缓存里面取
  if (isPrime.anwers[value] != null ) {
    return isPrime.anwers[value]
  }
  // 开始进行判断和计算
  let prime = value != 1
  for (let index = 2; index < value; index++) {
    if (value % index == 0) {
      prime = false
      break;
    } 
  }
  // 保存计算出来的值
  return isPrime.anwers[value] = prime
}
console.log(isPrime(5))
console.log(`从函数记忆中直接读取${isPrime.anwers[5]}`)

// 3:缓存记忆DOM元素
function getElements (name) {
  if (!getElements.cache) getElements.cache = {}
  return getElements.cache[name] = getElements.cache[name] || document.getElementsByTagName(name);
}
console.log(getElements('div')) // HTMLCollection
console.log(getElements.cache['div']) // HTMLCollection

// 4：伪造数组方法
// <input type="button" id="add" >
// <input type="button" id="remove" >
let elems = {
  length: 0,
  add (elem) {
    Array.prototype.push.call(this, elem)
  },
  gather (id) {
    this.add(document.getElementById(id))
  }
}
elems.gather('add')
elems.gather('remove')
console.log(elems[0]); // <input type="button" id="add" >
console.log(elems[1]); // <input type="button" id="remove" >
console.log(elems.length); // 2
console.log(elems);
/**
  0: input#add
  1: input#remove
  add: ƒ add(elem)
  gather: ƒ gather(id)
  length: 2
 */

console.warn(' ------------------------------------javascript中函数和对象配合的魅力end----------------------------------')
