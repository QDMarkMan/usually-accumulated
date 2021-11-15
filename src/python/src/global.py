"""
**************************************************************************
*  @Copyright 2021 Tongfu.E.
*  @Date [2021-11-11 09:47:12].
*  @Description Python 内置函数 挑一些重要的出来讲 .
**************************************************************************
"""
# all: 如果 iterable 的所有元素均为真值（或可迭代对象为空）则返回 True 。 等价于：
print(all([True, False, True]))
# any: 如果 iterable 的任一元素为真值则返回 True。 如果可迭代对象为空，返回 False。 等价于:
print(any([True, False]))

# filter: (function, iterable) 用 iterable 中函数 function 返回真的那些元素，构建一个新的迭代器。iterable 可以是一个序列，一个支持迭代的容器，或一个迭代器。如果 function 是 None ，则会假设它是一个身份函数，即 iterable 中所有返回假的元素会被移除。
list1 = [1, 123,123,123,12,3]
def filterMethod(value):
  return value > 3
list2 = list(filter(filterMethod, list1))
print(list1, list2)
# map  (function, iterable) 返回一个将 function 应用于 iterable 中每一项并输出其结果的迭代器。 如果传入了额外的 iterable 参数，function 必须接受相同个数的实参并被应用于从所有可迭代对象中并行获取的项。 当有多个可迭代对象时，最短的可迭代对象耗尽则整个迭代就将结束。 对于函数的输入已经是参数元组的情况，请参阅 itertools.starmap()。
def mapMethod(value):
  return value+5
list3 = list(map(mapMethod, list1))
print(list3)

# next
# 通过调用 iterator 的 __next__() 方法获取下一个元素。如果迭代器耗尽，则返回给定的 default，如果没有默认值则触发 StopIteration。
# next(iterator, default)
marks = [65, 71, 68, 74, 61]
# convert list to iterator
marks_iter = iter(marks)
marks1 = next(marks_iter)
print('next', marks1)
marks2 = next(marks_iter)
print('next2', marks2)

# open
# open(file, mode='r', buffering=- 1, encoding=None, errors=None, newline=None, closefd=True, opener=None)
# 打开 file 并返回对应的 file object。 如果该文件不能被打开，则引发 OSError。 请参阅 读写文件 获取此函数的更多用法示例。

# reversed
# 返回一个反向的 iterator。 seq 必须是一个具有 __reversed__() 方法的对象或者是支持该序列协议（具有从 0 开始的整数类型参数的 __len__() 方法和 __getitem__() 方法）。

# string
seq_string= 'Python'
print('seq_string', list(reversed(seq_string)))

# tuple
seq_tuple = ('P', 'y', 't', 'h', 'o', 'n')
print('seq_tuple', list(reversed(seq_tuple)))

# range
seq_range =range(5, 9)
print('seq_range', list(reversed(seq_range)))

# list
seq_list = [1, 2, 3, 4,5]
print('seq_list', list(reversed(seq_list)))

# sum

# zip

# list
# class list([iterable])  虽然被称为函数，list 实际上是一种可变序列类型