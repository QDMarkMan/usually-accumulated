# 错误和异常

# DOC https://docs.python.org/zh-cn/3/tutorial/errors.html

# 错误分类

# 句法错误
# 句法错误又称解析错误，是学习 Python 时最常见的错误：
# while True print('Hello world')


# 异常
# 即使语句或表达式使用了正确的语法，执行时仍可能触发错误。执行时检测到的错误称为 异常，异常不一定导致严重的后果
# 常见内置异常 https://docs.python.org/zh-cn/3/library/exceptions.html#bltin-exceptions
# 10 * (1/0)


# 处理异常
while True:
  try:
    x = int(input("Please input number"))
    print(x)
    break
  except ValueError:
    print('Oops!  That was no valid number.  Try again...')


# 出发异常
a = 2
while a > 1:
  raise ValueError('Value is error')