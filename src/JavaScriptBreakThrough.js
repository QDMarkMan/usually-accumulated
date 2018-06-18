/**
 * JavaScript闯关记Demo
 */
console.warn("------------------------------------这个是JavaScript闯关记Demo Begin----------------------------------");
//《JavaScript 闯关记》之 BOM
//window对象
// var age = 26;
// //var sayAge = () => console.log(this.age);
// function sayAge(){
//     console.log(this.age);
// }


// console.log(window.age);
// window.sayAge();


//setTimeout 和 setInterval都是window的方法
//对于这两个方法 都会有一个超时ID标识
//设置超时id
let setTimeoutId  = setTimeout(function() {
    console.log("set timeout调用");
}, 100);
//清除定时执行
clearTimeout(setTimeoutId);

//
let num = 0;
let max = 10;
let setIntervalId = null;

let creasenumber = function(){
    num++;
    console.log(num);
    if(num == max){
        clearInterval(setIntervalId);
        console.log("interval done");
    }
};

setIntervalId = setInterval(creasenumber,500);

//《JavaScript 闯关记》之 DOM上
/**
 * Node 属性概述
 * Node 常用属性主要有以下10个，接下来我们会着重讲解部分属性。  折都是JS原声的属性
 * 
    nodeType：显示节点的类型
    nodeName：显示节点的名称
    nodeValue：显示节点的值
    attributes：获取一个属性节点
    firstChild：表示某一节点的第一个节点
    lastChild：表示某一节点的最后一个子节点
    childNodes：表示所在节点的所有子节点
    parentNode：表示所在节点的父节点
    nextSibling：紧挨着当前节点的下一个节点
    previousSibling：紧挨着当前节点的上一个节点
 */

 //下面的例子展示了如何访问保存在 NodeList 中的节点——可以通过方括号，也可以使用 item() 方法。
let node = document.getElementById('demo');
//这种node必须是唯一的node才能使用以下的方法
let firstChild = node.childNodes[0];
let secChild = node.childNodes.item(1);
let count = node.childNodes.length;
console.log(firstChild);
console.log(secChild);
console.log(count);
//操作节点
/**
 * 因为关系指针都是只读的，所以 DOM 提供了一些操作节点的方法。其中，最常用的方法是 appendChild()，用于向 childNodes 列表的末尾添加一个节点。
 * 添加节点后，childNodes 的新增节点、父节点及以前的最后一个子节点的关系指针都会相应地得到更新。
 * 更新完成后，appendChild() 返回新增的节点。来看下面的例子
 */
var returnNode = node.appendChild(secChild)
console.log(returnNode == secChild);  










console.warn("------------------------------------这个是JavaScript闯关记Demo end------------------------------------");