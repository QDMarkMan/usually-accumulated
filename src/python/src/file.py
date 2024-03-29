"""
**************************************************************************
*  @Copyright 2021 Tongfu.E.
*  @Date [2021-10-28 09:54:08].
*  @Description 文件专题.
**************************************************************************
"""
import json

def main():
  f = open('./readme.md', 'r', encoding='utf-8')
  print(f.read())
  f.close()


def read_demo():
  f = None;
  try:
    with open('./readme.md', 'r') as f:
      lines = f.readlines()
      print(lines)
  except FileNotFoundError:
    print('FileNotFoundError!')
  except LookupError:
    print('指定了未知编码')
  except UnicodeDecodeError:
    print('读取文件解码错误')
  finally:
    if f:
      f.close()

read_demo()

# 读写JSON文件

def save_json():
  my_dict = {
    'name': 'XXX',
      'age': 38,
      'qq': 957658,
      'friends': ['王大锤', '白元芳'],
      'cars': [
          {'brand': 'BYD', 'max_speed': 180},
          {'brand': 'Audi', 'max_speed': 280},
          {'brand': 'Benz', 'max_speed': 320}
      ]
  }
  try:
    with open('data.json',  'w', encoding='utf-8') as fs:
      json.dump(my_dict, fs)
  except IOError as e:
      print(e)


save_json()

if __name__ == '__main__':
    main()
    


