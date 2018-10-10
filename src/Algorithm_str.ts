/*
 * @Author: mark 
 * @Date: 2018-09-10 10:25:02 
 * @Last Modified by: etongfu
 * @Last Modified time: 2018-09-29 15:34:21
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
/**
 * 6:字符串转整数 (atoi)
 * 实现 atoi，将字符串转为整数。
 * 该函数首先根据需要丢弃任意多的空格字符，直到找到第一个非空格字符为止。如果第一个非空字符是正号或负号，选取该符号，并将其与后面尽可能多的连续的数字组合起来，这部分字符即为整数的值。如果第一个非空字符是数字，则直接将其与之后连续的数字字符组合起来，形成整数。
 * 字符串可以在形成整数的字符后面包括多余的字符，这些字符可以被忽略，它们对于函数没有影响。
 * 当字符串中的第一个非空字符序列不是个有效的整数；或字符串为空；或字符串仅包含空白字符时，则不进行转换。
 * 若函数不能执行有效的转换，返回 0。
 * 说明：
 * 假设我们的环境只能存储 32 位有符号整数，其数值范围是 [−231,  231 − 1]。如果数值超过可表示的范围，则返回  INT_MAX (231 − 1) 或 INT_MIN (−231) 。
 * 示例1：
 * 输入: "42"
 * 输出: 42
 * 
 * 示例2：
 * 输入:  "   -42"
 * 输出: -42
 * 
 * 示例3：
 * 输入: "4193 with words"
 * 输出: 4193
 * 解释: 转换截止于数字 '3' ，因为它的下一个字符不为数字。
 * 
 * 示例4：
 * 输入: "words and 987"
 * 输出: 0
 * 解释: 第一个非空字符是 'w', 但它不是数字或正、负号。因此无法执行有效的转换。
 * 
 * 示例5：
 * 输入: "-91283472332"
 * 输出: -2147483648
 * 解释: 数字 "-91283472332" 超过 32 位有符号整数范围。 
 * 因此返回 INT_MIN (−231) 。
 */
const myAtoi = (str: string) :number => {
  let temp:string = ''
  let num:number
  let isPlura = false // 是否是复数
  str = str.trim() // 去除前后空格
  // 正负号提取
  if (str[0] === '-' || str[0] === '+') {
    isPlura = str[0] === '-' ? true : false
    str = str.slice(1)
  }
  // 首字母不是数字的话进行拦截
  if (parseInt(str[0]) !== 0 && !parseInt(str[0])) {
    return num = 0
  }
  // 取数字
  for (let i = 0; i < str.length; i++) {
    if (parseInt(str[i]) === 0 || parseInt(str[i])) {
      temp += str[i]
    } else {
      break
    }
  }
  // 正负数转换
  num = isPlura ? -(Number(temp)) : Number(temp)
  // 判断大小
  if (num < Math.pow(-2, 31) ||  num > (Math.pow(2, 31) - 1)) {
    num =  isPlura ?  Math.pow(-2, 31) : (Math.pow(2, 31) - 1)
  }
  return num
}
/**
 * 解析：
 * 这个算法简单，但是要考虑的地方多一点
 */
console.log('=================字符串转整数 (atoi)算法===================');
console.log(myAtoi("+42"));
console.log(myAtoi("    -42"));
console.log(myAtoi("  -4193 with words"))
console.log(myAtoi("with words  -4193"))
console.log(myAtoi("-91283472332"))
console.log('====================================');
/**
 * 7：实现strStr()
 * 实现 strStr() 函数。
 * 给定一个 haystack 字符串和一个 needle 字符串，在 haystack 字符串中找出 needle 字符串出现的第一个位置 (从0开始)。如果不存在，则返回  -1。
 * 示例1：
 * 输入: haystack = "hello", needle = "ll"
 * 输出: 2
 * 示例2：
 * 输入: haystack = "aaaaa", needle = "bba"
 * 输出: -1
 */
const strStr = (haystack:string, needle:string) :number => {
  let index = -1
  index = haystack.indexOf(needle)
  return index
}
/**
 * 解析： 这他吗是个什么鸡儿算法 ? 还尼玛搞得这么高大上
 */
console.log('===============实现strStr()算法=====================');
console.log(strStr("aaaaaaaaa", 'ba'));
console.log('====================================');
/**
 * 8：报数
 * 报数序列是指一个整照其中的整数的顺序进数序列，按行报数，得到下一个数。其前五项如下：
    1.     1
    2.     11
    3.     21
    4.     1211
    5.     111221
    6:     21112211
  1 被读作  "one 1"  ("一个一") , 即 11。
  11 被读作 "two 1s" ("两个一"）, 即 21。
  21 被读作 "one 2",  "one 1" （"一个二" ,  "一个一") , 即 1211。

  给定一个正整数 n（1 ≤ n ≤ 30），输出报数序列的第 n 项。

  注意：整数顺序将表示为一个字符串。

  示例1:
  输入: 1
  输出: "1"

  示例2：
  输入: 4
  输出: "1211"
 */
const countAndSay= (n: number) :string => {
  let str = '1'
  if ( n === 1) return str = '1'
  for (let i = 2; i <= n; i++) {
    let temp = '' // 临时字符串
    const tempArr = str.split('') // 临时数组
    for (let j = 0; j < tempArr.length; j++) {
      let repeat = 0
      /* if (str[j + 1] === str[j]) {
        // repeat ++
        temp += `2${str[j]}`
        tempArr.splice(j+1, 1)
      } else {
        temp += `1${str[j]}`
      } */
      if(tempArr[j] === tempArr[repeat]) {
        repeat ++
        if (repeat === tempArr.length) {
          temp += `${repeat}${tempArr[repeat]}`
        }
      } else {
        temp += `${repeat + 1}${tempArr[repeat]}`
        tempArr.slice(j)
        repeat = 0
      }
      console.log(temp)
    }
    console.log(`${i} =======> ${temp}`)
    str = temp
  }
  return str
}
console.log('================实现报数算法====================');
console.log(countAndSay(6))
console.log('====================================');
console.warn('leet code String 专题结束')
