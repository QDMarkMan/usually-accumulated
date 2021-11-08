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
from threading import Thread, Lock


def download_task(filename):
 print('启动下载任务, [%d].' % getpid())
 print('开始下载%s' % filename)
 time_to_download = randint(5, 10)
 print('%s下载完成! 耗费了%d秒' % (filename, time_to_download))

def download_test ():
  start = time()
  p1 = Process(target=download_task, args=("Test.pdf"))
  p1.start()
  p2 = Process(target=download_task, args=("Test2.pdf"))
  p2.start()

  p1.join()
  p2.join()
  
  end = time()
  print('总共耗费了%.2f秒.' % (end - start))

# 多个线程之前的共享数据
"""
因为多个线程可以共享进程的内存空间，因此要实现多个线程间的通信相对简单，大家能想到的最直接的办法就是设置一个全局变量，多个线程共享这个全局变量即可。
但是当多个线程共享同一个变量（我们通常称之为“资源”）的时候，很有可能产生不可控的结果从而导致程序失效甚至崩溃
如果一个资源被多个线程竞争使用，那么我们通常称之为“临界资源”，对“临界资源”的访问需要加上保护，否则资源会处于“混乱”的状态。
"""

class Account(object):
    def __init__(self, *args):
      self._balance = 0
      self._lock = Lock()
    
    def deposit (self, money):
      self._lock.acquire() # 先获取锁才能执行后续的代码
      """
      我们可以通过“锁”来保护“临界资源”，只有获得“锁”的线程才能访问“临界资源”，
      而其他没有得到“锁”的线程只能被阻塞起来，直到获得“锁”的线程释放了“锁”，其他线程才有机会获得“锁”，
      进而访问被保护的“临界资源”。
      """
      try:
        new_balance = self.balance + money
        sleep(0.01) # 异步的耗时操作
        self._balance = new_balance
      finally:
        self._lock.release()
    
    @property
    def balance(self):
      return self._balance

class AddMoneyThread(Thread):
  def __init__(self, account, money):
    super().__init__()
    self._account = account
    self._money = money

  def run(self):
    self._account.deposit(self._money)
        
def share_data():
  account = Account()
  threads = []
  for index in range(100):
    t = AddMoneyThread(account, 1)
    threads.append(t)
    t.start()
  
  for item in threads:
    t.join()
  
  print('Balance is: %d ' % account.balance)

def main():
  print("Thread test")
  share_data()
if __name__ == '__main__':
    main()