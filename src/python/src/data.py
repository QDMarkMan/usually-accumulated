# Python 数据结构
# Doc https://docs.python.org/zh-cn/3/tutorial/datastructures.html


# 第五部分 数据结构
list = [1, 2, 4, 3]
# API 
list.append(5)
list.insert(0, 0)
list.insert(8, 8)
list.insert(-1, -1) # -1 是倒数第一个
print(list)
list.remove(-1)
print(list)
# list.remove(-5) # 触发 ValueError 异常。
print(list)
# Pop默认是最后一个
print(list, list.pop()) 
# index(a, x, y) 在x和y之间查找a的索引
print(list.index(2))

list.sort()
print(list)

list2 = list.copy()
print(list2)

list[0] = -1
print(list ,list2)

# del 语句按索引，而不是值从列表中移除元素。与返回值的 pop() 方法不同， del 语句也可以从列表中移除切片，或清空整个列表（之前是将空列表赋值给切片）。 例如：

del list[0]
del list[2:3]
print(list)
del list
print(list)

# 元组 指的是一种标准序列类型
triple = 12345, 54321, 'hello!'
print(triple[0])


# 集合 由不重复元素组成的无序容器: 用于成员检测,消除重复元素.
basketSet = {'apple', 'orange', 'apple', 'pear', 'orange', 'banana'}
basketSetEmpty = set() # 创建空集合只能用set构造函数


# 字典 字典理解可以理解为 键值对 的集合，但字典的键必须是唯一的。花括号 {} 用于创建空字典。另一种初始化字典的方式是，在花括号里输入逗号分隔的键值对，这也是字典的输出方式。

knights = {'gallahad': 'the pure', 'robin': 'the brave'}

# 循环技巧
