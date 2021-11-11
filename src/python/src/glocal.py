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


# open

# reversed

# sum

# zip