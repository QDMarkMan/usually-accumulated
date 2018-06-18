/**
 *   Promise
    一个promise代表了异步操作最终完成或者失败的对象。大多数人都在使用由其他函数创建并返回的promise
    本质上：Promise是一个函数的返回的对象，你可以把回掉函数绑定在这个对象上，而不是把回掉函数当作参数传递进去
    promise代替了旧式的处理回掉
 */
//旧式的函数
function successCb(){
  //todo
  console.log('success');
}
function failureCb(){
  //todo
  console.log('failure');
}
function doSomething(successCb,failureCb){
  // todo
}
// 新式函数返回一个你可以直接回掉函数的对象
const promise = doSomething()
promise.then(successCb,failureCb)
//或者更简单的形式
doSomething().then(successCb,failureCb) 
// 这种形式就称为异步函数调用 有以下的优点

/**
 * 1:保证
 * 不像旧式回掉那样传递回掉函数，promise会带来一些保证
 *     在Javascript事件队列的当前运行完成之前，回掉函数永远不会被调用
 *     通过 .then 形式添加的回调函数，甚至都在异步操作完成之后才被添加的函数，都会被调用，如上所示。
 *     通过多次调用 .then，可以添加多个回调函数，它们会按照插入顺序并且独立运行
 * 
 * 但是promise最直接的好处就是链式调用
 */

/**
 * 2:链式调用
 *  一个常见的需求就是连续执行两个或者多个异步操作，这种情况下，每一个后来的操作都在前面的操作执行成功之后，
 * 带着上一步操作所返回的结果开始执行。我们可以通过创造一个promise chain来完成这种需求。
 */
const promise1 = doSomething();
const promise2  = promise1.then(successCb,failureCb)
// promise2不仅代表着doSomething函数的完成，还代表着传入的success和fail的完成，这也可能是其他异步函数返回的promise
//这样的话 任何被添加给promise2的回掉函数都会排在success或fail的返回后面 基本上每一个promise代表了链式中的另外一个异步加载的过程

/**
 * 过去的多重赋值会导致回掉地狱
 * doSomething(function(result) {
  doSomethingElse(result, function(newResult) {
    doThirdThing(newResult, function(finalResult) {
      console.log('Got the final result: ' + finalResult);
    }, failureCallback);
  }, failureCallback);
}, failureCallback);
 */
//通过promise我们可以换成更简洁的promise链式写法
doSomething().then(function(result){
  return doSomethingElse(result);
}).then(function(newResult){
  console.log('newresult')
  return doThirdThing(newResult)
}).then(function(lastResult){
  return doLastThing(lastResult)
}).catch(failureCb)
// then里面的参数是可选的  catch(failureCallback) 是 then(null, failureCallback) 的缩略形式
//也可以是用箭头函数来简化
doSomething().then(result =>doSomethingElse(result) )
.then(newResult => doThirdThing(newResult))
.then(lastResult => doLastThing(lastResult)).catch(failureCb)
//在catch之后可以继续链式操作 即使链式中的一个动作失败之后还能有助于新的动作继续完成
new Promise((resolve, reject) => {
  console.log('ini')
  resolve()
})
.then(()=>{
  throw new Error('it is error')
  console.log('do this ');
}).catch(() => {
  console.log('do that')
}).then(() => {
  console.log('Do this whatever happened before');
})
/**
 * 错误传播
 * promise链只有底部的一次调用 基本上一个Promise链式遇到异常就会停止，查看链式底的catch回掉来执行
 * 在同步的代码执行之后这就非常模型化了
 */
try {
  let result = syncDoSomething();
  let newResult = syncDoSomethingElse(result);
  let finalResult = syncDoThirdThing(newResult);
  console.log(`Got the final result: ${finalResult}`);
} catch(error) {
  failureCallback(error);
}
/**
 * 在旧式的回掉API中创建Promise
 * Promise通过它的构造器从头开始创建，只需压迫包裹旧的API就行
 * 理想状态下，所有的异步函数都已经返回promise了，但有一些API仍然使用旧式的被传入的成功或者失败的回调。典型的例子就是setTimeout()函数
 */
function saySomething(str){
  console.log(str)
}
setTimeout(() => saySomething('10s 之后执行'),10000)
// 混合旧式回调和promise是会有问题的。如果 saySomething  函数失败了或者包含了编程错误，那就没有办法捕获它了。
// 但是我们可以用promise来包裹他 最佳实践是在尽可能底层的地方来包裹有问题的函数，并且永远不要再直接调用它们：
const wait = ms => new Promise(resolve => setTimeout(resolve,ms))
wait(10000).then(() => saySomething('10s promise')).catch(failureCb)
//通常，promise的构造器会有一个可以让我们手动操作resolve和reject的执行函数。
//既然 setTimeout 没有真的执行失败，那么我们可以在这种情况下忽略reject。

/**
 * 组成
 * Promise.resolve()和Promise.reject()是手动创建一个已经resolve或者reject的promise快捷方法。它们有时很有用。
 * Promise.all()和Promise.race()是并行运行异步操作的两个组合式工具。
 */
// 时序组合可以用一些优雅的JavaScript组合
[fun1,fun2].reduce((p,f) => p.then(f), Promise.resolve())
// 调用数组时就相当于
Promise.resolve.then(fun1).then(fun2)