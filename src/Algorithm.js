/*
 * @Author: etf 
 * @Date: 2018-05-03 21:57:01 
 * @Last Modified by: etf
 * @Last Modified time: 2018-06-26 14:12:02
 * 简单的算法专题
 */
console.warn(' ------------------------------------算法专题begin----------------------------------')
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

/**
 * 二分查找算法 
 * 什么叫二分查找？ 二分查找也称为折半查找。是指在有序的数组里找出指定的值，返回该值在数组中的索引。
 * （1）从有序数组的最中间元素开始查找，如果该元素正好是指定查找的值，则查找过程结束。否则进行下一步; 
 * （2）如果指定要查找的元素大于或者小于中间元素，则在数组大于或小于中间元素的那一半区域查找，然后重复第一步的操作; 
 * （3）重复以上过程，直到找到目标元素的索引，查找成功;或者直到子数组为空，查找失败。
 * 注意： 这个先要把数组排序一下 在有序数组中查找
 * 优点是比较次数少，查找速度快，平均性能好；
 * 其缺点是要求待查表为有序表，且插入删除困难。因此，折半查找方法适用于不经常变动而查找频繁的有序列表。
 */
/**
 * 非递归实现
 * @param {*} arr 
 * @param {*} target 
 */
function binarySearcNoRecursive(arr, target){
  let low = 0, high = arr.length-1
  while(low <= high) {
    // 首先找到中间位置
    let middle = parseInt((high + low ) / 2)
    if( target === arr[middle]){
      return middle
    } else if (target > arr[middle]){
      low = middle + 1
    } else if ( target < arr[middle] ){
      high = middle -1
    }else { 
      return -1
    }
  }
}
const result = binarySearcNoRecursive( [1,2,3,4,5,6,7,8,9,10,11,23,44,86], 23)
console.log(`二分查找不用循环找到的位置:${result}`)
/**
 * 递归实现
 * @param {*} arr 
 * @param {*} target 
 */
function binarySearcRecursive(arr, low, high, target){
  if(low > high){
    return -1
  }
  let middle = parseInt((high + low ) / 2)
  if(arr[middle] === target){
    return middle
  } else if(arr[middle] > target){
    high = middle -1
    binarySearcRecursive(arr, low, high, target)
  } else if(arr[middle] < target){
    low = middle + 1
    binarySearcRecursive(arr, low, high, target)
  }
}
const  recursiveRes = binarySearcNoRecursive( [1,2,3,4,5,6,7,8,9,10,11,23,44,86], 3)
console.log(`二分查找不用循环找到的位置:${recursiveRes}`)

console.warn(' ------------------------------------算法专题end----------------------------------')