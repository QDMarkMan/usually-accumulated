# Python 中的类
# Doc https://docs.python.org/zh-cn/3/tutorial/classes.html

# 作用域和命名空间

def scope_test():
  def do_local():
   spam = "local spam"
  
  def do_nonlocal():
    # nonlocal 语句表明特定变量生存于外层作用域中并且应当在其中被重新绑定
    nonlocal spam
    spam = "nonlocal spam"

  def do_global():
    # global 语句表明当前变量存在全局作用域中并且应当在其中被重新绑定
    global spam
    spam = "global spam"

  spam = "test spam"
  do_local()
  print("After local assignment:", spam)
  do_nonlocal()
  print("After do_nonlocal assignment:", spam)
  do_global()
  print("After global assignment:", spam)

scope_test()
print("In global scope:", spam)
# 请注意 局部 赋值（这是默认状态）不会改变 scope_test 对 spam 的绑定。 nonlocal 赋值会改变 scope_test 对 spam 的绑定，而 global 赋值会改变模块层级的绑定。

## 定义简单类
class MyClass:
  counter = 1 # 类变量 类变量用于类的所有实例共享的属性和方法
  i = 123
  # 相当于构造参数
  def __init__(self, name, ticks = []):
    self.name = name
    self.ticks = ticks # 实例变量 实例变量用于每个实例的唯一数据

  def f(self):
    return "Hello class"

clazz = MyClass("Class")

print(clazz.name)
print(clazz.f())

clazz.counter = 2
while clazz.counter < 4:
  clazz.counter = clazz.counter + 1
print(clazz.counter)
del clazz.counter

class Warehouse():
    purpose = 'storage'
    region = 'west'

w1 = Warehouse()
w1.region = 'east'
print(w1.purpose, w1.region)

w2 = Warehouse()
print(w2.purpose, w2.region)

