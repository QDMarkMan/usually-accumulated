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

/**
 * 3： 字符串中的第一个唯一字符
 * 给定一个字符串，找到它的第一个不重复的字符，并返回它的索引。如果不存在，则返回 -1。
 * 示例：
 * s = "leetcode"
 * 返回 0
 * s = "loveleetcode",
 * 返回 2.
 * @param s
 */
// 这个方法在字符串很长得情况会超时
const firstUniqChar = function (s:string) :number {
  let index = -1
  if (s === '') {
    return index = -1
  }
  if (s.length === 1) {
    return index = 0
  }
  for (let i = 0; i < s.length; i++) {
    let countArr = []
    for (let j = 0; j < s.length; j++) {
      if (i !== j) {
        countArr.push(s[j])
      }
    }
    if(countArr.indexOf(s[i]) === -1) {
      index = i
      break
    }
  }
  return index
}
/**
 * 优化之后得算法
 * @param str 
 */
const firstUniqCharGood = (str: string):number => {
  let index = -1
  if (str === '') {
    return index = -1
  }
  if (str.length === 1) {
    return index = 0
  }
  let obj:any = {}
  for (let i = 0; i < str.length; i++) {
    obj[str[i]] ? obj[str[i]]++ : obj[str[i]] = 1
  }
  for (const key in obj) {
    if (obj[key] === 1) {
      return index = str.indexOf(key)
    }
  }
  return index
}
/**
 * 如果我们使用两个数组去进行对比得话，难免会造性能上得大量开销。所以不合适
 * 我们使用一个对象去存储每个key出现得个数。第一个出现得1就是这个第一个出现一次得字符串
 */
console.log('================字符串中的第一个唯一字符算法====================');
console.log(firstUniqChar(''))
console.log(firstUniqCharGood('leetcode'));
console.log('====================================');
/**
 * 4：有效的字母异位词
 * 给定两个字符串 s 和 t ，编写一个函数来判断 t 是否是 s 的一个字母异位词。
 * 输入: s = "anagram", t = "nagaram"
 * 输出: true
 * 输入: s = "rat", t = "car"
 * 输出: false
 * 你可以假设字符串只包含小写字母。
 * 
 */
const isAnagram = function (s:string, t:string) :boolean {
  let objS: any = {}, objT: any = {}
  let result = true
  // 首先排除极端情况
  if (s === "" && t === "") {
    return result = true
  }
  if (s.length !== t.length) {
    return result = false
  }
  // 构建成相应的对象
  for (let i = 0; i < s.length; i++) {
    objS[s[i]] ? objS[s[i]] ++ : objS[s[i]] = 1
    objT[t[i]] ? objT[t[i]] ++ : objT[t[i]] = 1
  }
  for (const key in objS) {
    if (objS[key] !== objT[key]) {
      return result = false
    }
  }
  return result
}
/**
 * 解析：
 * 在解答这个之前首先我们要了解什么是字母异位词：长度一样出现的字母一样而且同一字母出现次数也是相同的。
 */
console.log('=================有效的字母异位词算法输出===================')
console.log(isAnagram("anagram", "nagaram"))
console.log('====================================')
/**
 * 5： 验证回文字符串
 * 给定一个字符串，验证它是否是回文串，只考虑字母和数字字符，可以忽略字母的大小写。
 * 说明：本题中，我们将空字符串定义为有效的回文串。
 * 示例 1:
 * 输入: "A man, a plan, a canal: Panama"
 * 输出: true
 * 示例 2:
 * 输入: "race a car"
 * 输出: false
 */
const isPalindrome = function (str: string) :boolean {
  let result = true , current = []
  const reg = /\d|[a-z]|[A-Z]/g
  if (str.trim().length === 0 || str.trim().length === 1) {
    return result = true
  }
  // 生成的处理过的字符串
  if (str.match(reg)) {
    current = str.match(reg)
  } else {
    // 在没有字母或者数字出现的情况下也返回true
    return result = true
  }
  current = current.map(el => {
    return el = el.toUpperCase()
  })
  // 判断reverse之后是否相等
  if (current.join('') === ((current.reverse()).join(''))) {
    result = true
  } else {
    result = false
  }
  return result
}
/**
 * 解析：
 * 首先回文字符串指定是正着反着读都是一样的字符串，知道了这个剩下的就好办了
 */
console.log('=================验证回文字符串算法===================');
console.log(isPalindrome('A man, a plan, a canal: Panama'))
console.log('====================================');


console.warn('leet code String 专题结束')
