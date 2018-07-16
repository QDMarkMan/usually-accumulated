/**
 * 迭代器和生成器
 * 可迭代性
 * 当一个对象实现了Symbol.iterator属性时，我们认为它是可迭代的。 
 * 一些内置的类型如 Array，Map，Set，String，Int32Array，Uint32Array等都已经实现了各自的Symbol.iterator。 
 * 对象上的 Symbol.iterator函数负责返回供迭代的值。
 */
console.warn(`-------------------------Ts迭代器和生成器部分begin-------------------------`)
// 1 for...of 语句
/**
 * for of语句会遍历可迭代的对象
 */
let someArr = [0, 'asd', 'cesium', true]
for (const iterator of someArr) {
  console.log(iterator)
}

//for..of vs. for..in 语句
/**
 * for..of: 迭代的是对象的键的列表, for..of关注于迭代对象的值
 * for..in：迭代的是迭代对象的键对应的值, for..in可以操作任何对象；它提供了查看对象属性的一种方法
 */
let list = [4,5,6]
for(let item of list) {
  console.log(`for of 循环的值${item}`)
}
for (const key in list) {
  console.log(`for in 循环的值${key}`)
}

console.warn(`-------------------------Ts迭代器和生成器部分end----------------------------`)
