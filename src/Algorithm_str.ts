/*
 * @Author: mark 
 * @Date: 2018-09-10 10:25:02 
 * @Last Modified by: etf
 * @Last Modified time: 2018-09-10 14:15:51
 */
console.warn('leet code String 专题开始')
/**
 * 1: 反转字符串
 * 编写一个函数，其作用是将输入的字符串反转过来
 * 示例：
 * 输入: "hello"
 * 输出: "olleh"
 * 
 * @param s 
 */
const reverseString = function(s:string) :string {
  const sArr = s.split('')
  const sum = sArr.length -1
  console.log(sArr)
  for (let i = 0; i < Math.ceil((sArr.length / 2)); i++) {
    // 交换
    let middle
    middle = sArr[sum -i]
    sArr[sum-i] = sArr[i]
    sArr[i] = middle
  }
  return sArr.join('')
}
/**
 * 解析
 * 对于字符串的操作我们根据下表获取的字符串中的值是只读的，所以我们需要将字符串转化为数组去进行处理
 */
console.log('=================反转字符串算法===================');
console.log(reverseString('hello'));
console.log('====================================');
/**
 * 2：颠倒整数
 * 给定一个 32 位有符号整数，将整数中的数字进行反转。
 * 示例：
 * 输入: 123
 * 输出: 321
 * @param x 
 * 假设我们的环境只能存储 32 位有符号整数，其数值范围是 [Math.pow(-2, 31),  Math.pow(2, 31) − 1]。根据这个假设，如果反转后的整数溢出，则返回 0。
 */
const reverseMath = function (x:number) {
  if (x === 0) {
    return x
  }
  // 生成数组
  let returnStr: string[] = []
  let strArr: string = x.toString()
  for (let i = strArr.length -1 ; i >= 0 ; i -- ) {
    returnStr.push(strArr[i])
  }
  // 判断正负
  if (x < 0 ) {
    returnStr.unshift('-')
  }
  // 转成数字
  x = parseInt(returnStr.join(''))
  if (x < Math.pow(-2, 31) || x > (Math.pow(2, 31) - 1) || x === 0) {
    return x = 0
  }
  return x
}
/**
 * 解析：
 * JavaScript中数字的颠倒： 倒叙循环push到一个数组中，然后进行 数组> 字符串 > number
 */
console.log('=================颠倒整数算法===================');
console.log(reverseMath(901000));
console.log('====================================');
console.warn('leet code String 专题结束')
