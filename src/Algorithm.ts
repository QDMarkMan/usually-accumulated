/*
 * @Author: etf 
 * @Date: 2018-05-03 21:57:01 
 * @Last Modified by: etf
 * @Last Modified time: 2018-08-21 09:38:45
 * 简单的算法专题
 */
console.warn(' ------------------------------------算法专题begin----------------------------------')
/**
 * 交换参数
 * @param {*} arr 
 * @param {*} a 
 * @param {*} b 
 */
function swap(arr: number[], a:number, b:number) {
  let curr = arr[a]
  arr[a] = arr[b]
  arr[b] = curr
}
/**
 * 
 * @param {选择排序算法} arr 
 */
function sort(arr: number[]) {
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
function bubbleSort(arr: number[]){
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
function insertSort(arr: number[]){
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
function binarySearcNoRecursive(arr: number[], target: number){
  let low: number = 0, high: number = arr.length-1
  while(low <= high) {
    // 首先找到中间位置
    let middle = ((high + low ) / 2)
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
 * 递归实现 循环调用自身
 * @param {*} arr 
 * @param {*} target 
 */
function binarySearcRecursive(arr: number[], low:number, high: number, target:number){
  if(low > high){
    return -1
  }
  let middle = ((high + low ) / 2)
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
console.warn(`leet code 专题开始`)
/**
 * leet code 算法专题
 */
/**
 * 1 删除排序数组中的重复项
 * 给定一个排序数组，你需要在原地删除重复出现的元素，使得每个元素只出现一次，返回移除后数组的新长度。
 * 不要使用额外的数组空间，你必须在原地修改输入数组并在使用 O(1) 额外空间的条件下完成。
 */
function removeDuplicates(nums: number[]): number {
  let i: number = 0
  for (let j = 0; j < nums.length; j++) {
    if(nums[j] !== nums[i]) {
      i++
      nums[i] = nums[j]
    }
  }
  nums.splice(i+1)
  console.log(nums)
  console.log(nums.length)
  return i + 1
}
/**
 * 解析
 * 方法 双指针法
 * i是慢指针，j是快指针 当我们遇到 nums[j] \neq nums[i]nums[j]≠nums[i] 时，跳过重复项的运行已经结束，
 * 因此我们必须把它（nums[j]nums[j]）的值复制到 nums[i + 1]nums[i+1]。然后递增 ii，接着我们将再次重复相同的过程，直到 jj 到达数组的末尾为止。
 * 复杂度分析：
 * 时间复杂度： O(n) 假设数组长度是n 那么i和j最多就是遍历n步
 * 空间复杂度： O(1)
 */
removeDuplicates([0,0,1,1,1,2,2,3,3,4])

/**
 * 2：  买卖股票的最佳时机
 * 给定一个数组，它的第 i 个元素是一支给定股票第 i 天的价格。
 * 设计一个算法来计算你所能获取的最大利润。你最多可以完成一次交易
 * 注意：你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）
 */
function maxProfit(prices: number[]): number {
  if(prices.length < 2) return 0
  // 定义利润
  let count: number = 0
  let PreMin:number =prices[0]
  // 获取最大的单天利润
  for (let i = 0; i < prices.length; i++) {
    count = Math.max(count, prices[i] - PreMin)
    PreMin = Math.min(PreMin, prices[i])
  }
  console.log(count)
  return count
}
/**
 * 解析： 贪心算法
 */
maxProfit([7,1,5,3,6,4])
/**
 * 3：  买卖股票的最佳时机
 * 给定一个数组，它的第 i 个元素是一支给定股票第 i 天的价格。
 * 设计一个算法来计算你所能获取的最大利润。你可以尽可能多的完成交易
 * 注意：你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）
 */
function maxProfitMore (prices: number[]) :number{
  if(prices.length < 2) return 0
  let ret = 0
  for (let i = 0; i < prices.length; i++) {
    if (prices[i+1] > prices[i]) {
      ret += prices[i+1] - prices[i]
    }
  }
  return ret
}
/**
 * 解析： 非贪心算法 
 * 只要下一天的价钱 大于今天的价钱 那我们就卖出当前天的 最终的结果就是我们的利润总和
 */
console.log(maxProfitMore([7,1,5,8,3,6,4]))

/**
 * 4： 给定一个数组，将数组中的元素向右移动 k 个位置，其中 k 是非负数。
 * 要求O(1)的空间复杂度，对原数组进行操作
 */
function rotate(nums: number[], k: number) {
  for (let i = 0; i < k; i++) {
    nums.unshift(nums[nums.length -1 - i])
  }
  nums.splice(nums.length - k, k)
}
rotate([1,2,3,4,5,6,7],3)

/**
 * 5： 存在重复 
 * 给定一个整数数组，判断是否存在重复元素。
 * 如果任何值在数组中出现至少两次，函数返回 true。如果数组中每个元素都不相同，则返回 false。
 */
var containsDuplicate = function (nums: number[]) :boolean{
    let judge = false
    if (nums.length <= 1) {
      return judge
    }
    let current :number[] =[]
    for (let i = 0; i < nums.length; i++) {
      if (current.indexOf(nums[i]) === -1) {
        current.push(nums[i])
      } else {
        return judge = true
      }
    }
    return judge
}
console.log(containsDuplicate([3,1]))
// 这个其实是非常常见而且简单得一个算法 但是要考虑到得情况多一点

console.warn(`leet code 专题结束`)
console.warn(' ------------------------------------算法专题end----------------------------------')