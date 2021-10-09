# Python Function

# Python 中推荐可选形参尽量在后面
def get_formatted_name(first_name, middle_name = '', last_name = ''):
  full_name = f"{first_name} {middle_name} {last_name}"
  return full_name.title()

name =  get_formatted_name('john', 'dail', 'json')
print(name)

def greet_users(names):
 for name in names:
   index = names.index(name)
   name = "Greet " + name
   print(f"Welcome {name} {index}")

greet_users(['john', 'dail', 'json'])

# 传递任意个数的实参
# 形参名*toppings中的星号让Python创建一个名为toppings的空元组，并将收到的所有值都封装到这个元组中
def make_pizza(*toppings):
  print(toppings)
    
make_pizza("Pepo")
make_pizza("demo", "test")

def john_make_pizza(isJohn, *users):
  cooker = "john"
  if (isJohn == False):
    cooker = "not john"
  print(cooker, users)

john_make_pizza(True, "test")
john_make_pizza(False, "False")

# 使用任意数量的关键字实参  形参**user_info中的两个星号让Python创建一个名为user_info的空字典，并将收到的所有名称值对都放到这个字典中
def build_profile(first, last, **user_info):
  user_info['first_name'] = first
  user_info['last_name'] = last
  return user_info

user = build_profile("demo", "test", tall=1)
print(user)

  