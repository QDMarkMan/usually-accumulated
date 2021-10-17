"""
*  @Author [ETongfu].
*  @Des [].
"""


list = [1,3, 5,3,2,12,123,123,123,123,12]
print(list)
list2 = ['hello'] * 3
print(list2)
# 通过下标循环
for index in range(len(list)):
  print(index, list[index])
    
for item in list:
    print(item)

for index, el in enumerate(list):
  print(index, el)
  
# 增删改查处理
list.append(1000)
list.insert(0, 999)
print(list)

list3 = [3]
# list3.extend([11111, 2222])
list3 += [1111, 2222, 3333]
list3[0] = 0
if 0 in list3:
  list3.remove(0)
  
list3.pop() # 不提供参数会默认删除最后一个
print(list3)