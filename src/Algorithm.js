/*
 * @Author: etf 
 * @Date: 2018-05-03 21:57:01 
 * @Last Modified by: etf
 * @Last Modified time: 2018-05-30 15:20:45
 * 简单的算法专题
 */
/**
 * 交换参数
 * @param {*} arr 
 * @param {*} a 
 * @param {*} b 
 */
function swap(arr,a,b) {
  let curr = arr[a]
  arr[a] = arr[b]
  arr[b] = curr
}
/**
 * 
 * @param {选择排序算法} arr 
 */
function sort(arr) {
  console.time()
  for (let i = 0; i < arr.length; i++) {
    //假设遍历的当前第一个是最小的
    let minIndex = i
    //第二次遍历把arr[minIndex]和数组中的其他的值进行遍历
    for (let j = 0; j < arr.length; j++) {
      if(arr[minIndex] > arr[j]){
        minIndex = j
      }
    }
    //外层循环做交换
    swap(arr,minIndex,i)
  }
  console.log(arr)
  console.timeEnd()
}
sort([3,6,28,123,34])

// 冒泡排序算法
/**
 * 
 * @param {*冒泡排序算法} arr 
 */
function bubbleSort(arr){
  console.log('冒泡算法开始时间:')
  console.time()
  for (let i = 0; i < arr.length; i++) {
    // 这个循环时获取到之后的项进行比较
    for (let j = i+1; j > 0; j--) {
      // 这个核心就是 如果当前项小于前一项那么当前项向上冒泡
      if(arr[i] < arr[j-1]){
        // 冒泡交换
        swap(arr,j,j-1)
      }
      
    }
    
  }
  console.timeEnd()
  console.log(arr)
}
bubbleSort([3,123,6,28,34])

/**
 * 
 * @param {插入排序} arr 
 */
function insertSort(arr){
  console.time()
  for (let i = 0; i < arr.length; i++) {
    // 在一次循环的时候首先缓存下来当前的值和上一个index 缓存上一个index用来比较
    let compareIndex = i -1
    let currentValue = arr[i]
    // 在当前位置可以比较并且当前的值小于前一项的值的时候插入缓存的值然后修改index
    while (compareIndex >=0 && arr[compareIndex] > currentValue) {
      arr[compareIndex + 1] = arr[compareIndex]
      compareIndex--
    }
    arr[compareIndex + 1 ] = currentValue
  }
  console.timeEnd()
  console.log(arr)
}
insertSort([3,2,1])