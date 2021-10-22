"""
练习题专题
"""
import os
import time
# 1: 在屏幕上显示跑马灯文字。
def marquee_show():
    content = "This is python"
    # 循环调用
    while True:
      os.system('cls')
      print(content)
      time.sleep(0.2)
      # 持续的修改字符串
      content = content[1:] + content[0] 

# marquee_show()

# 2: 设计一个函数产生指定长度的验证码，验证码由大小写字母和数字构成。

# 3: 设计一个函数返回给定文件名的后缀名。

# 4: 设计一个函数返回传入的列表中最大和第二大的元素的值。

# 5: 计算指定的年月日是这一年的第几天。

# 6: 打印杨辉三角。

# 7: 双色球选号。

# 8: 约瑟夫环问题

# 9: 井字棋游戏。