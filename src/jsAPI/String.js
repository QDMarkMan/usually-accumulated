/**
 * STring API模块回顾
 * MDN文档为主
 * String具有两个属性
 * String.prototype
 * String.length
 */
let str = 'etfdemostring'//测试string
/**
 * ⭐⭐⭐⭐⭐
 * charAt(index)  index是数字
 * 从一个字符串中返回指定得字符
 * @return 特定字符
 */
let c_str = str.charAt(1)
console.log(c_str)

/**
 * ⭐⭐⭐
 * concat(str1,str2) 用于连接字符串形成一个新的字符串返回不影响源字符串
 * @return 返回新的字符串不影响之前字符串
 */
let old = 'woshi '
let newStr = old.concat(str)
console.log(newStr)

/**
 * ⭐⭐⭐
 * endsWith(searchString [, position])方法用来判断当前字符串是否是以另外一个给定的子字符串“结尾”的，
 * startsWith(searchString [, position]) 方法用来判断当前字符串是否是以另外一个给定的子字符串“开头”的，position开始位置
 * 根据判断结果返回 true 或 false。  searchString是要搜索得字符串 position是结束位置  默认是str.length
 * @return true/fasle
 */
let s_str = "To be, or not to be, that is the question"

console.log(s_str.endsWith('question'))

/**
 * ⭐⭐⭐  es6方法
 * includes(searchString [, position]) 方法用于判断一个字符串是否包含在另一个字符串中，
 * 根据情况返回true或false。 用法和endsWith类似 可选。position：从当前字符串的哪个索引位置开始搜寻子字符串；默认值为0。
 * @return true/fasle
 */
console.log(s_str.includes('question',0))

/**
 * ⭐⭐⭐⭐⭐
 * indexOf(searchValue[, fromIndex])
 * 获取string中第一次出现得指定值得索引  注意是指定值 找到返回值 未找到返回-1
 * 注意：区分大小写 ，可以用来检测字符串是否存在
 * @return number/-1
 */
console.log(s_str.indexOf('yes'))

/**
 * ⭐⭐⭐
 * lastIndexOf(searchValue[, fromIndex])
 * 返回指定值在调用该方法得字符串中得最后出现的位置 没找到返回-1
 * fromIndex默认是str.length
 * @return number/-1
 */
console.log(s_str.lastIndexOf('1'))

/**
 * ⭐
 * link() 方法创建一个 <a> HTML 元素，用该字符串作为超链接的显示文本，参数作为指向另一个 URL 的超链接。
 * 这个几乎是没有什么用处
 * @return html
 */
var hotText = "MDN";
var URL = "https://developer.mozilla.org/";

document.write("Click to return to " + hotText.link(URL));

/**
 *⭐⭐⭐
  match(regexp) 当一个字符串与一个正则表达式匹配时， match()方法检索匹配项。
  如果匹配成功返回数组，匹配失败返回null
 */
let m_str =  'For more information, see Chapter 3.4.5.1';
let re = /see (chapter \d+(\.\d)*)/i;
console.log(m_str.match(re))

/**
 * ⭐⭐⭐
 * padEnd(targetLength [, padString])
 * padStart(targetLength [, padString])
 * targetLength：当前字符串需要填充到的目标长度。如果这个数值小于当前字符串的长度，则返回当前字符串本身。
 * 用于从结尾/开始填充字符串到目标长度padString要填充得字符串 如果填充过长则保留左边
 * @returns 新的字符串
 */
console.log('abc'.padEnd(10, "foo"))
console.log('abc'.padStart(10, "foo"))

/**
 * ⭐⭐⭐
 *repeat(count)
 *用于循环当前字符串 count为Number类型  当count小于0 则返回空  cout为循环得次数
 *@return 返回新的字符串
 */
console.log('abc'.repeat(10))

/**
 * ⭐⭐⭐⭐⭐
 * replace(regexp|substr, newSubStr|function) 
 * 方法返回会一个由替换之后替换一些或者所有匹配模式后得字符串（返回新的字符串）
 * 模式可以是一个字符串或者一个正正则表达式，替换之可以是一个字符串或者一个函数
 * @return 返回一个新字符串而且原字符串不会改变！
 * regexp (pattern)
  一个RegExp 对象或者其字面量。该正则所匹配的内容会被第二个参数的返回值替换掉。
  substr (pattern)  原字符串
  一个要被 newSubStr 替换的字符串。其被视为一整个字符串，而不是一个正则表达式。仅仅是第一个匹配会被替换。
  newSubStr (replacement) 需要替换的新字符串
  用于替换掉第一个参数在原字符串中的匹配部分的字符串。该字符串中可以内插一些特殊的变量名。参考下面的使用字符串作为参数。
  function (replacement)
  一个用来创建新子字符串的函数，该函数的返回值将替换掉第一个参数匹配到的结果。参考下面的指定一个函数作为参数。
 */
function replacer(match, p1, p2, p3, offset, string) {
  // p1 is nondigits, p2 digits, and p3 non-alphanumerics
  return [p1, p2, p3].join(' - ');
}
let newString = 'abc12345#$*%'.replace(/([^\d]*)(\d*)([^\w]*)/, replacer);
console.log(newString);  // abc - 12345 - #$*%

/**
 * ⭐
 * search(reg)
 * 用于对字符串进行正则搜索
 * @return number: 返回匹配字符串的索引/-1
 */

 /**
  * ⭐⭐⭐⭐⭐
  * slice(beginSlice,endSlice) 参数负数是倒数位置
  * 提取字符串的一部分并返回一个新的字符串 
  * beginSlice:开始位置
  * endSlice：结束位置 
  * 注意： 在截取的时候包括begin但是不包括end  同样的要头不要尾
  * @return 不会修改原来的字符串 返回一个新的字符串 
  */
 let sliceStr = str.slice(0,7);
 console.log(sliceStr)
 
 /**
  * ⭐⭐⭐⭐⭐
  * split(separator,limit)
  * 将字符串以指定分隔符分割并且返回一个数组
  * separator：分割符
  * limit：限制分割的数量
  * 注意： 不会修改原字符串 如果空字符串("")被用作分隔符，则字符串会在每个字符之间分割。
  * 当字符串为空时，split（）返回一个包含一个空字符串的数组，而不是一个空数组，如果字符串和分隔符都是空字符串，则返回一个空数组。
  * @return 返回的是一个新数组
  */
let myString = "Hello World. How are you doing?";
let newSplit  = myString.split(" ", 3);
let strSplit  = myString.split('are');
console.log(newSplit)
console.log("这个是split传一个字符串的用法")
console.log(strSplit)
/**
 * ⭐⭐⭐⭐⭐
 * substr(start[, length]) 
 * 方法返回一个字符串中从指定位置开始到指定字符数的字符。 和slice的区别就是第二个参数的不同
 * substr 从 start 位置开始提取字符，提取 length 个字符（或直到字符串的末尾）。
 * 如果 start 为正值，且大于或等于字符串的长度，则 substr 返回一个空字符串。
 * 如果 length 为 0 或负值，则 substr 返回一个空字符串。如果忽略 length，则 substr 提取字符，直到字符串末尾。
 * start：开始位置
 * length：结束长度
 * @return 修改后的源字符串
 */
myString.substr(2,3)
console.log(myString)

/**
 * ⭐⭐⭐⭐⭐
 * substring(indexStart,indexEnd)
 * 返回一个字符串在开始索引和结束索引之间的一个子集，或从开始索引到字符串末尾的一个子集  通常配合length属性来使用
 * 注意：和slice不同的是slice返回一个新字符串 和substr不同的是sustr第二个参数是长度 这个是索引
 * 如果 indexStart 等于 indexEnd，substring 返回一个空字符串。
  如果省略 indexEnd，substring 提取字符一直到字符串末尾。
  如果任一参数小于 0 或为 NaN，则被当作 0。
  如果任一参数大于 stringName.length，则被当作 stringName.length。
  // 会自动的调整参数
  如果 indexStart 大于 indexEnd，则 substring 的执行效果就像两个参数调换了一样。例如，str.substring(1, 0) == str.substring(0, 1)。
  @return 修改后的源字符串
  */
let subStringStr = 'asdasd asdhakh'
console.log(subStringStr.substring(3,9));
//这个方法可以用来替换字符串
let replaceBySubstring =  function(old,newS,full){
  for(let i=0;i<full.length;i++){
    if(full.substring(i,i+old.length) == old){
      full = full.substring(0,i) + newS + full.substring(i + old.length, full.length)
    }
  }
}
replaceBySubstring("World", "Web", "Brave New World");
// 但是这个如果替换的字符串和新字符串一样会出现死循环 所以一般使用下面的方式  更多是时候使用replae()原生方法
let commonReplae = function(oldStr,newStr,fullStr){
  return fullStr.split(oldStr).join(newStr)
}

/**
 * ⭐⭐⭐⭐⭐
 * toLowerCase():toLowerCase 会将调用该方法的字符串值转为小写形式，并返回。toLowerCase 不会影响字符串本身的值。 不会修改源字符串
 * toUpperCase() 将调用该方法的字符串值转换为大写形式，并返回。
 * 
 */

 /**
  * ⭐⭐⭐
  * str.toString()
  * String对象的转string  object会转成string
  */
let x = new String ('woshi zi fuchuan duixaing')
console.log(typeof(x))
console.log(typeof(x.toString()) + '是' + x.toString())

/**
 * trim() 方法会从一个字符串的两端删除空白字符。
 * 注意:返回的是一个新字符串，不影响源字符串
 * @return 一个新的字符串
 */

 /**
  * ⭐⭐⭐⭐⭐
  * raw(callSite, ...substitutions) 
  * callSite:一个模板字符串的“调用点对象”。类似{ raw: ['foo', 'bar', 'baz'] }。
  * ...substitutions  任意个可选的参数 表示任意个内插表达式对应的值。
  * 
  * @return 给定模板字符串的原始字面量值
  */
console.log(String.raw `Hi\n!`)