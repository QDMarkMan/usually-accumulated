// import 'dart:convert';

class User {
  final String name;
  final num age;

  User(this.name, this.age);
  // 构造函数, 用于从一个map构造出一个 User实例 map structure
  User.fromJson (Map<String, dynamic> json):name = json['name'], age = json['age'];

  // 一个toJson 方法, 将 User 实例转化为一个map.
  Map<String, dynamic> toJSON () => {
    'name':name,
    'age':age
  };
}


main(List<String> args) {
  
}