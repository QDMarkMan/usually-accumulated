/*
 * @Author: etongfu
 * @Email: 13583254085@163.com
 * @LastEditors: etongfu
 * @Description: 链表相关部分简单算法
 * @youWant: add you want info here
 * @Date: 2019-03-15 09:02:27
 * @LastEditTime: 2019-03-15 17:35:41
 * 
 * 在开始对链表算法的了解之前，我们先来了解数组和链表的区别
 * 
 * 数组：可以通过Memory Controller按照下标随机的访问元素。所以时间复杂度仅仅是O(1),因为有硬件保证。
 *       但是在改变一个数组（插入，删除）的时候，要挪动目标位置之后的元素(然而，JS中数组却不存在上述问题，主要是因为他们被实现了成了对象，但是效率会低很多)。所以平均时间复杂度是O(n)的。
 * 
 * 链表：一般来说应用于1：改善插入和删除操作速度 2：不知道有多少个元素，每一个新的元素都链到后面去。
 *      插入和删除只需要改变当前和下一个元素的Next指针。所以时间复杂度都是常数级别O（1）
 *      但是查询起来就比较耗时了，需要一个一个往下找，O(n)。
 * 
 */
// 首先我们通过Javascript来实现链表
function ListNode (val) {
  this.val = val           // 当前节点链接
  this.next  = null        // 下一个节点的链接
}
// LinkedList类提供了对链表进行操作的方法，包括插入删除节点，查找给定的值等。值得注意的是，它只有一个 属性，那就是使用一个 Node 对象来保存该链表的头节点。
function LinkList () {
  // 因为 链表的起始点确定起来比较麻烦。因此很多链表的实现都会在链表的最前面添加一个特殊的节点，称为 头节点，表示链表的头部
  this.head = new ListNode('head')    // 头节点
  this.display = insert               // 插入节点

}
/**
 * 查询节点
 * @param item 
 */
function find (item) {
  // 从头开始查
  let currNode = this.head;
  while (currNode.val !== item.val) {
    currNode = currNode.next
  }
  return currNode
}
/**
 * 插入节点
 * @param nodeValue 节点值
 * @param item 插入位置
 */
function insert (nodeValue , item) {
  //首先创建新node
  const newNode = new ListNode(nodeValue)
  const currNode = this.find(item)
  // 切断next链之后重新链接
  newNode.next = currNode.next
  currNode.next = newNode
}

console.warn('leet code 链表 专题开始')
/**
 * 删除链表中的节点
 * 请编写一个函数，使其可以删除某个链表中给定的（非末尾）节点，你将只被给定要求被删除的节点。
 * 现有一个链表 -- head = [4,5,1,9]
 * 输入: head = [4,5,1,9], node = 5
 * 输出: [4,1,9]
 * 解释: 给定你链表中值为 5 的第二个节点，那么在调用了你的函数之后，该链表应变为 4 -> 1 -> 9.
 * @param node 
 */
const deleteNode = function (node) {
  //本题设计很巧妙 ，就给一个节点，怎么删除节点呢？
  //借鉴网上的思路，先用后一个节点覆盖掉前一个节点，然后再删除后一个节点
  node.val = node.next.val
  node.next = node.next.next
}
// 解析 题目的意思是不给单链表，给的是单链表中要删除的节点node，这个node已经存在单链表中，即这个节点的前一个节点是未知的，但下一个节点是可以知道的
console.warn(`leet code 链表 专题结束`)
