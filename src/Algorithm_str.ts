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
console.log('=================反转字符串===================');
console.log(reverseString('hello'));
console.log('====================================');

console.warn('leet code String 专题结束')
