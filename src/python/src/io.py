# 输入与输出
# doc https://docs.python.org/zh-cn/3/tutorial/inputoutput.html

# 字符串输出
import math

year = 2016
event = "Referendum"

print(f'Results of the {year} {event}')

s = 'Hello, world.'

str(s)

hello = 'hello, world\n'

hellos = repr(hello)

print(hellos)

# 格式化输出
print(f'The value of pi is approximately {math.pi:.5f}')

table = {'Sjoerd': 4127, 'Jack': 4098, 'Dcab': 7678}

for name, job in table.items():
  # 在 ':' 后传递整数，为该字段设置最小字符宽度，常用于列对齐：
  print(f'{name:10} ===> {job:10d}')
 
