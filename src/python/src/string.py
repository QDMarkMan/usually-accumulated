
str1 = 'hello, python!'

print(len(str1))

# 获得字符串首字母大写的拷贝
print(str1.capitalize()) 

# 获得字符串每个单词首字母大写的拷贝
print(str1.title())

# 获得字符串变大写后的拷贝
print(str1.upper())
# 获得字符串变小写后的拷贝
print(str1.lower())

# 从字符串中查找子串所在位置
print(str1.find('python'))

print(str1.startswith('a'))
print(str1.endswith('a'))

# 将字符串以指定的宽度居中并在两侧填充指定的字符
print(str1.center(30, '*'))

# 将字符串以指定的宽度靠右放置左侧填充指定的字符
print(str1.rjust(20, '*'))

# 检查字符串是否由数字构成
print('123123'.isdigit())
print(str1.isdigit())

# 检查字符串是否以字母构成
print(str1.isalpha())

# 检查字符串是否以数字和字母构成
print(str1.isalnum())

# 获得字符串修剪左右两侧空格之后的拷贝
print(('           ' + str1).strip())

