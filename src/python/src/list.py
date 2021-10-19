"""
*  @Author [ETongfu].
*  @Des [].
"""


list1 = [1,3, 5,3,2,12,123,123,123,123,12]
print(list1)
list2 = ['hello'] * 3
print(list2)
# 通过下标循环
for index in range(len(list1)):
  print(index, list1[index])
    
for item in list1:
    print(item)

for index, el in enumerate(list1):
  print(index, el)
  
# 增删改查处理
list1.append(1000)
list1.insert(0, 999)
print(list1)

list3 = [3]
# list3.extend([11111, 2222])
list3 += [1111, 2222, 3333]
list3[0] = 0
if 0 in list3:
  list3.remove(0)
  
list3.pop() # 不提供参数会默认删除最后一个
print(list3)

list1.sort()
print(list1)
# sorted函数返回列表排序后的拷贝不会修改传入的列表， 函数的设计就应该像sorted函数一样尽可能不产生副作用
list4 = sorted(list3)
print(list4)
# 统计计算
print(max(list4))

print(list(range(10)))