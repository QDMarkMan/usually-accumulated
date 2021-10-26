"""
**************************************************************************
*  @Copyright 2021 Tongfu.E.
*  @Date [2021-10-26 09:25:01].
*  @Description # Python 中的类
*  @Document https://docs.python.org/zh-cn/3/tutorial/classes.html.
**************************************************************************
"""


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

class Battery:
    def __init__(self, size):
      self.size = size
# 继承
class Car:
    def __init__(self, model):
      self.model = model
    
    def fill_gas_tank(self):
      print("Car gas tank is filled")
        
# Electron car 继承Car 要在括号中表示出来
class ElectronCar(Car):
    def __init__(self, *args):
      # super()是一个特殊函数，让你能够调用父类的方法。这行代码让Python调用Car类的方法__init__()，让ElectricCar实例包含这个方法中定义的所有属性。
      super().__init__(*args)
      # 将实例用作属性
      self.battery = Battery(500) 

    def charge(self):
      print(f'Electron car {self.model} is charging now')

    # 重写/覆盖父类方法
    def fill_gas_tank(self):
      print("Electron Car has no gas tank")

electronCar = ElectronCar("tesla")
electronCar.charge()
electronCar.fill_gas_tank()


# 面向对象进阶

# 私有属性
class Student(object):
  def __init__(self, name, age, gender):
    self.name = name
    self.age = age
    self.__gender = gender

  def study(self, souse_name):
    print('%s正在学习%s.' % (self.name, course_name))

student = Student("mark", 18, 'female')

# print(student.__gender)

# @property包装器来包装getter和setter方法

class Person(object):

    #  Python是一门动态语言。通常，动态语言允许我们在程序运行时给对象绑定新的属性或方法。 使用__slots__可以限定Person对象只能绑定指定属性

    __slots__ = ('_name', '_age', '_gender')

    def __init__(self, name, age):
        self._name = name
        self._age = age
    
    # 访问器
    @property
    def name(self):
      return self._name 

    @property
    def age(self):
       return self._age

    @age.setter
    def age(self, age):
      self._age = age

    def play(self):
      if self._age <= 16:
          print('%s正在玩飞行棋.' % self._name)
      else:
          print('%s正在玩斗地主.' % self._name)

person = Person('Net', 20)

print(person.name)
person.age = 21
print(person.age)
person._gender = 'male'
print(person._gender)
# person._is_gay = False
# print(person._is_gay)
