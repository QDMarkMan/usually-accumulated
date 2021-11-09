"""
**************************************************************************
*  @Copyright 2021 Xtalpi Systems.
*  @Date [2021-11-09 09:29:34].
*  @Description 进阶特性, 比较重要的知识点.
**************************************************************************
"""

# 1：通过生成式生成列表，集合和字典

prices = {
    'AAPL': 191.88,
    'GOOG': 1186.96,
    'IBM': 149.24,
    'ORCL': 48.44,
    'ACN': 166.89,
    'FB': 208.09,
    'SYMC': 21.29
}

prices2 = { key: value for key, value in prices.items() if value > 100 }

print('prices2', prices2)

# 2：嵌套列表的坑
names = ['关羽', '张飞', '赵云', '马超', '黄忠']
courses = ['语文', '数学', '英语']
scores = [[None] * len(courses) for _ in range(len(names))]
for row, name in enumerate(names):
  for col, course in enumerate(courses):
     scores[row][col] = float(input(f'请输入{name}的{course}成绩: '))
     print(scores)
 