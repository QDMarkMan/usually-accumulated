"""
**************************************************************************
*  @Copyright 2021 Tongfu.E.
*  @Date [2021-11-02 09:57:39].
*  @Description 进程和线程相关.
**************************************************************************
"""
from os import getpid
from random import randint
from time import sleep, time
from multiprocessing import Process

def download_task(filename):
 print('启动下载任务, [%d].' % getpid())
 print('开始下载%s' % filename)
 time_to_download = randint(5, 10)
 print('%s下载完成! 耗费了%d秒' % (filename, time_to_download))

def main():
  start = time()
  p1 = Process(target=download_task, args=("Test.pdf"))
  p1.start()
  p2 = Process(target=download_task, args=("Test2.pdf"))
  p2.start()

  p1.join()
  p2.join()
  
  end = time()
  print('总共耗费了%.2f秒.' % (end - start))


if __name__ == '__main__':
    main()
    