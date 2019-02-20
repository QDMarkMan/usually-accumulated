/*
 * @Author: etongfu
 * @Email: 13583254085@163.com
 * @LastEditors: etongfu
 * @Description: Dart库预览
 * @youWant: add you want info here
 * @Date: 2019-02-20 09:49:42
 * @LastEditTime: 2019-02-20 11:18:45
 */
/* import 'dart:html';
var url = 'http://iats.ronganfarm.com/iats/login/doLogin';
getHttpInfo () {
  var data = HttpRequest.getString(url);
  return data;
} */
main(List<String> args) async {
  /* await getHttpInfo();
  print(getHttpInfo()); */
  //数值类型的转化
  print(num.parse('33'));
  var numStr = 33.toString();
  var fixdStr = 33.33.toStringAsFixed(1);
  print(numStr);
  print(fixdStr);

  // 字符串
  // 在字符串内搜索
  var str = " this is my dart core ";
  print(str.contains('dart'));
  print(str.startsWith('this'));
  print(str.endsWith('core'));
  print(str.indexOf('dart'));
  //　在字符串中提取数据
  var subStr =str.substring(0,4); // 同样的包括开始不包括结束 而且不会修改源对象
  print(subStr);
  print(str);
  var parts =str.split(' ');
  print(parts);
  // 在字符串中裁剪
  var trimStr =str.trim(); // 删除的是前后的空字符串
  print(trimStr);
  print(''.isEmpty);
  print(' '.isEmpty); // 空字符串不算是empty
 
  // Collections集合中一些特殊的api
  var lists = ['a', 'b', 'c', 'd'];
  lists.add('e'); // 新增元素
  print(lists);
  lists.addAll(['f', 'g']); // 增加多个元素 相当于拼接数组 
  print(lists);
  var cIndex =lists.indexOf('c');
  print(cIndex);
  lists.removeAt(cIndex);// 删除指定元素
  print(lists);
  lists.clear(); // 清除全部元素
  print(lists);
  
}