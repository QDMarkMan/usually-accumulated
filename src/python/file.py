"""
**************************************************************************
*  @Copyright 2021 Tongfu.E.
*  @Date [2021-10-28 09:54:08].
*  @Description 文件专题.
**************************************************************************
"""

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

# 按照行进行读取


if __name__ == '__main__':
    main()
    


