/**
 * 平时问题的积累
 */
//2017年8月14日17:46:07
/**
 * target，currentTarget和this三者的区别
 * 
 * target在事件流的目标阶段；currentTarget在事件流的捕获，目标及冒泡阶段。只有当事件流处在目标阶段的时候，两个的指向才是一样的， 而当处于捕获和冒泡阶段的时候，target指向被单击的对象而currentTarget指向当前事件活动的对象(注册该事件的对象)（一般为父级）。this指向永远和currentTarget指向一致（只考虑this的普通函数调用）。
 */
/* let get = function(id) {
    return document.getElementById(id);
} */
let get = (id) => document.getElementById(id);
//兼容的事件处理
let addEvent = function(obj, ev, handler) {
    if (window.attachEvent) {
        obj.attachEvent("on" + ev, handler);
    } else if (window.addEventListener) {
        obj.addEventListener(ev, handler, false);
    }
}

//测试
let test = function(e) {
    alert("e.target.tagName : " + e.target.tagName + "\n e.currentTarget.tagName : " + e.currentTarget.tagName);
}

let outer = get("outer");
let inner = get('inner');
//addEvent(inner, "click", test);
addEvent(outer, "click", test);


/**
 * 事件委托
 * 概述：

那什么叫事件委托呢？它还有一个名字叫事件代理，JavaScript高级程序设计上讲：事件委托就是利用事件冒泡，只指定一个事件处理程序，就可以管理某一类型的所有事件。那这是什么意思呢？网上的各位大牛们讲事件委托基本上都用了同一个例子，就是取快递来解释这个现象，我仔细揣摩了一下，这个例子还真是恰当，我就不去想别的例子来解释了，借花献佛，我摘过来，大家认真领会一下事件委托到底是一个什么原理：

有三个同事预计会在周一收到快递。为签收快递，有两种办法：一是三个人在公司门口等快递；二是委托给前台MM代为签收。现实当中，我们大都采用委托的方案（公司也不会容忍那么多员工站在门口就为了等快递）。前台MM收到快递后，她会判断收件人是谁，然后按照收件人的要求签收，甚至代为付款。这种方案还有一个优势，那就是即使公司里来了新员工（不管多少），前台MM也会在收到寄给新员工的快递后核实并代为签收。

这里其实还有2层意思的：

第一，现在委托前台的同事是可以代为签收的，即程序中的现有的dom节点是有事件的；

第二，新员工也是可以被前台MM代为签收的，即程序中新添加的dom节点也是有事件的。

为什么要用事件委托：

一般来说，dom需要有事件处理程序，我们都会直接给它设事件处理程序就好了，那如果是很多的dom需要添加事件处理呢？比如我们有100个li，每个li都有相同的click点击事件，可能我们会用for循环的方法，来遍历所有的li，然后给它们添加事件，那这么做会存在什么影响呢？

在JavaScript中，添加到页面上的事件处理程序数量将直接关系到页面的整体运行性能，因为需要不断的与dom节点进行交互，访问dom的次数越多，引起浏览器重绘与重排的次数也就越多，就会延长整个页面的交互就绪时间，这就是为什么性能优化的主要思想之一就是减少DOM操作的原因；如果要用事件委托，就会将所有的操作放到js程序里面，与dom的操作就只需要交互一次，这样就能大大的减少与dom的交互次数，提高性能；

每个函数都是一个对象，是对象就会占用内存，对象越多，内存占用率就越大，自然性能就越差了（内存不够用，是硬伤，哈哈），比如上面的100个li，就要占用100个内存空间，如果是1000个，10000个呢，那只能说呵呵了，如果用事件委托，那么我们就可以只对它的父级（如果只有一个父级）这一个对象进行操作，这样我们就需要一个内存空间就够了，是不是省了很多，自然性能就会更好。

事件委托的原理：

事件委托是利用事件的冒泡原理来实现的，何为事件冒泡呢？就是事件从最深的节点开始，然后逐步向上传播事件，举个例子：页面上有这么一个节点树，div>ul>li>a;比如给最里面的a加一个click点击事件，那么这个事件就会一层一层的往外执行，执行顺序a>li>ul>div，有这样一个机制，那么我们给最外面的div加点击事件，那么里面的ul，li，a做点击事件的时候，都会冒泡到最外层的div上，所以都会触发，这就是事件委托，委托它们父级代为执行事件。
 */

/**
 * 用事件委托来写  优化减少资源消耗  用事件委托就可以只用一次dom操作就能完成所有的效果，比上面的性能肯定是要好一些的 
 */
let oBox = get('box');
oBox.onclick = function(event) {
    event = event || window.event;
    let target = event.target || event.srcElement;
    if (target.nodeName.toLocaleLowerCase() == 'input') {
        switch (target.id) {
            case 'add':
                alert('添加');
                break;
            case 'remove':
                alert('删除');
                break;
            case 'move':
                alert('移动');
                break;
            case 'select':
                alert('选择');
                break;
        }
    }
}

/**
 *  现在讲的都是document加载完成的现有dom节点下的操作，那么如果是新增的节点，新增的节点会有事件吗？ 有可以有但是消耗就很大了
 */
let oBtn = document.getElementById("btn");
let oUl = document.getElementById("ul1");
let aLi = oUl.getElementsByTagName('li');
let num = 4;
//事件委托，添加的子元素也有事件
oUl.onmouseover = function(ev) {
    var ev = ev || window.event;
    var target = ev.target || ev.srcElement;
    if (target.nodeName.toLowerCase() == 'li') {
        target.style.background = "red";
    }

};
oUl.onmouseout = function(ev) {
    var ev = ev || window.event;
    var target = ev.target || ev.srcElement;
    if (target.nodeName.toLowerCase() == 'li') {
        target.style.background = "#fff";
    }

};

//添加新节点
oBtn.onclick = function() {
    num++;
    var oLi = document.createElement('li');
    oLi.innerHTML = 111 * num;
    oUl.appendChild(oLi);
};
/**
 * 看，上面是用事件委托的方式，新添加的子元素是带有事件效果的，我们可以发现，当用事件委托的时候，根本就不需要去遍历元素的子节点，只需要给父级元素添加事件就好了，其他的都是在js里面的执行，这样可以大大的减少dom操作，这才是事件委托的精髓所在。
 * 
 * 
 * 那什么样的事件可以用事件委托，什么样的事件不可以用呢？

适合用事件委托的事件：click，mousedown，mouseup，keydown，keyup，keypress。

值得注意的是，mouseover和mouseout虽然也有事件冒泡，但是处理它们的时候需要特别的注意，因为需要经常计算它们的位置，处理起来不太容易。

不适合的就有很多了，举个例子，mousemove，每次都要计算它的位置，非常不好把控，在不如说focus，blur之类的，本身就没用冒泡的特性，自然就不能用事件委托了。
 */


/**
 * 2017年8月16日17:00:52
 */
/**
 * 闭包到底是什么
 * 在理解闭包之前，务必要理解执行上下文
 * 执行上下文:
 *  在运行JavaScript代码的时候，它的运行环境是非常重要的，运行环境可能是如下几种中的一种：
 *  全局代码：首次执行代码的默认环境
 *  函数代码：每当执行流程进入函数体的时候
 *  我们将执行上下文定义当前代码的执行环境或者是作用域
 * 
 * 换句话说，当我们启动程序的时候，我们从全局执行上下文开始。我们在全局执行上下文中声明一些变量，这些都是全局变量。当程序调用函数的时候，会发生以下几个步骤：
 * 1：Javascript创建按一个新的本地执行上下文。
 * 2：本地执行上下文将拥有子集的变量集。
 * 3：新的执行上下文被抛到执行栈上。我们可以将执行栈是为一种用于跟踪程序执行位置的机制。
 * 
 * 函数会在遇到 return 语句或结束括号}时结束执行，并发生以下情况：
 *  1：本地执行上下文从执行栈中跳出。
 *  2：函数将返回值发送给调用上下文。调用上下文是调用此函数的执行上下文，它可以是全局执行上下文或是另一个本地执行上下文。掉偶用上下文将负责处理返回值。返回值可以是对象，数组，函数，布尔值或者是其他任何东西。如果函数没有return语句，
 * 则返回undefined
 *  3：本地执行上下文被销毁，这个很重要。在本地执行上下文中声明的所有的变量都将被删除，它们不可再用，这就是问什么它们被称为局部变量。
 * 
 * 
 * 一个函数可以访问在其调用上下文中定义的变量，这种现象的正式名称是词法作用域。
 * 下面是一个基础的闭包
 */
function createCounter () {
    let count = 0
    const myFunction = function() {
      count = count + 1 
      return count
    }
    return myFunction
  }
  const increment = createCounter()
  const c1 = increment()
  const c2 = increment()
  const c3 = increment()
  
  console.log(increment,c1,c2,c3);
  /**
   * 完整的解释
   * 1：第1-8行，我们在全局执行上下文中创建了一个新的变量createCounter，它包含一个函数定义。
   * 2：第9行，我们在全局执行上下文中声明一个名为increment的新变量。
   * 3：第9行，我们调用createCounter函数并返回赋值给increment变量。
   * 4：第1-8行，调用函数，创建新的本地执行上下文。
   * 5：第2行，在本地执行上下文中声明了一个变量count并赋值为0
   * 6：第3-6行，在本地执行上下文中声明名为myFunction的新变量。变量的内容是另一个函数的定义。即第4，5行所定义的内容
   * 7：第七行，返回myFunction变量的内容，删除本地执行上下本。myFunction和counter不再存在，控制权返回到调用上下文。所以我们返回函数定义极其闭包，比保重包含创建函数时声明的变量。
   * 8：第9行，在调用上下文（全局执行上下文）中，createCounter
   * 9：第 10 行，声明一个新变量（c1）。
   * 10：第10行，查找变量increment，发现它是一个函数，调用它，它包含之前返回的函数定义，也就是4-5行所定义的内容（还有一个带变量的闭包）
   * 11：创建新得执行上下文，没有参数，开始执行这个函数
   * 12：第4行，count = count+1 此时我们需要寻找count变量。在查看本地或者全局执行上下文之前，先让我们来看看闭包。请注意：闭包包含一个名为count得变量，值是0.再第4行表达式之后
   * ，它得值被设置为1，然后再次保存在闭包中。闭包现在包含了值为1得变量count。
   * 13：第5行，我们返回count得值或者数值1，销毁本地执行上下文。
   * 14：返回第10行，返回值(1)被分配给c1
   * 15：第11行，我们重复步骤11到14.这次我们可以看到变量count得值为1，这个值是在第4行代码中设置得。它得值加一，并在increment函数得闭包中存为2.c2被赋值为2
   * 16：第 12 行，我们重复步骤 10-14，c3 被设为 3。
   * 17：第 13 行，我们记录变量 c1、c2 和 c3 的内容。
   */
//闭包的工作原理：当声明一个函数时，它包含一个函数定义和一个闭包。闭包是函数创建时声明的变量的集合。
/**
 * 在全局范围中创建的函数也会创建一个闭包。但是由于这些函数是在全局范围内创建的，所以全局范围内的变量也就都可以访问了，无所谓闭包不必闭包了。
 * 
 * ⭐⭐⭐⭐⭐： 当一个函数返回另一个函数的时候才会真正的涉及闭包。返回的函数可以访问仅存在于闭包中的变量。
 * 按照背包的理论来理解的话：
 * 当创建和传递一个函数或将其从另一个函数返回时，这个函数就带有一个背包，背包中就是所有在创建函数时声明的变量。
 */


/**
 * 1，理解闭包
 * 先看下官方的解释：闭包是一个拥有许多变量和绑定了这些变量的环境的表达式（通常是一个函数），因而这些变量也是该表达式的一部分。 
 * 看另外一种解释： 
 * JavaScript闭包就是在另一个作用域中保存了一份它从上一级函数或者作用域得到的变量，而这些变量是不会随上一级函数的执行完成而销毁。 
 * 闭包就是在函数内对外部作用域上的变量引用，使其常驻内存中，得不到释放。（当然这只是闭包的表现） 
 * 
 * 闭包：
 *  1：现象
 *  2：产生
 **/

function funTest() {
    let tempNum = 100; //私有变量
    //在函数funcTest内
    //定义另外的函数作为funcTest的方法函数
    function innerFuncTest() {
        //引用外层函数funcTest的临时变量tmpNum
        console.log("我就是闭包部分输出的值" + tempNum);
    }
    //
    return innerFuncTest; //返回内部函数
}
//调用函数
var myFuncTest = funTest()
myFuncTest() //弹出100
/** 
 * 在函数体内定义另外的函数作为目标对象的方法函数（示例中就是在函数funcTest内定义另外的函数innerFuncTest作为funcTest的方法函数），而这个对象的方法函数反过来引用外层函数体中的临时变量（闭包是一种间接保持变量值的机制。示例中就是内部函数innerFuncTest引用外层函数funcTest的临时变量tmpNum,这里必须注意，临时变量可以包括外部函数中声明的所有局部变量、参数和声明的其他内部函数）。当其中一个这样的内部函数在包含它们的外部函数之外被调用时，就会形成闭包（示例中，调用函数的时候，myFuncTest实际调用的是innerFuncTest函数，也就是说funcTest的一个内部函数innerFuncTest在funcTest之外被调用，这时就创建了一个闭包）。 
 */
//2、闭包的例子 
/**
 * （1）因为闭包产生的问题 
 * 上面的HTML标记片断中有4个<a>元素，现在要给后三个指定事件处理程序，使它们在用户单击时报告自己在页面中的顺序，比如：当用户单击第2个链接时，报告“您单击的是第1个链接”  。为此，如果编写下列为后三个链接添加事件处理程序的函数：
    复制代码
 */
/* let badClosureExample = function() {
    var as = document.querySelectorAll('a');
    for (var i = 0; i < 4; i++) {
        //匿名函数无法传递参数
        as[i].onclick = function() {
            alert('单击第' + i + '个');
        }

    }
}
badClosureExample(); */
/**
 * 分析：因为在badClosureExample()函数中指定给element.onclick的事件处理程序，也就是onclick那个匿名函数是在badClosureExample()函数运行完成后（用户单击链接时）才被调用的。而调用时，需要对变量i求值，解析程序首先会在事件处理程序内部查找，但i没有定义。然后，又到 badClosureExample()函数中查找，此时有定义，但i的值是4（只有i大于4才会停止执行for循环）。因此，就会取得该值——这正是闭包（匿名函数）要使用其外部函（badClosureExample）作用域中变量的结果。而且，这也是由于匿名函数本身无法传递参数（故而无法维护自己的作用域）造成的
 */
//解决方法
/* let popNum = function(oNum) {
    return function() {
        alert('单击第' + oNum + '个');
    }
}
let badClosureExample = function() {
    var as = document.querySelectorAll('a');
    for (var i = 0; i < 4; i++) {
        as[i].onclick = new popNum(i);
    }
} */

/**
 * （2）、巧妙利用闭包绑定参数 
 */
let badClosureExample = function() {
    var as = document.querySelectorAll('a');
    for (var i = 0; i < 4; i++) {
        //as[i].onclick = new popNum(i);
        (function(i) {
            as[i].onclick = function() {
                alert('单击第' + i + '个');
            }
        })(i)
    }
}
badClosureExample();
/**
 * 3、javascript的垃圾回收原理 
 * （1）、在javascript中，如果一个对象不再被引用，那么这个对象就会被GC回收； 
 * （2）、如果两个对象互相引用，而不再被第3者所引用，那么这两个互相引用的对象也会被回收。在js中使用闭包，往往会给javascript的垃圾回收器制造难题。尤其是遇到对象间复杂的循环引用时，垃圾回收的判断逻辑非常复杂，搞不好就有内存泄漏的危险。 
其实，闭包就是读取scope罢了。
 */
/**
 * 2017年8月16日11:05:07
 * JS闭包可被利用的常见场景
 */

/**
 * 场景一：采用函数引用方式的setTimeout调用
 * 
 * 闭包的一个通常的用法是为一个在某一函数执行前先执行的函数提供参数。例如，在web环境中，一个函数作为setTimeout函数调用的第一个参数，是一种很常见的应用。
        setTimeout将要执行的函数(或者一段javascript代码，但这不是我们要讨论的情况)作为它的第一个参数，下一个参数是需要延迟执行的时间。如果一段代码想通过setTimeout来调用，那么它需要传递一个函数对象的引用来作为第一个参数。延迟的毫秒数作为第二个参数，但这个函数对象的引用无法为将要被延迟执行的对象提供参数。

    但是，可以调用另一个函数来返回一个内部函数的调用，将那个内部函数对象的引用传递给setTimeout函数。内部函数执行时需要的参数，在调用外部函数时传递给它。setTimeout在执行内部函数时无需传递参数，因为内部函数仍然能够访问外部函数调用时提供的参数：
 */
function callLater(parmA, parmB, parmC) {
    /*使用函数表达式创建并放回一个匿名内部函数的引用*/
    return (function() {
        /*
        这个内部函数将被setTimeout函数执行；
        并且当它被执行时，
        它能够访问并操作外部函数传递过来的参数
        */
        parmA[parmB] = parmC;
    });
}
/*
调用这个函数将在它的执行上下文中创建，并最终返回内部函数对象的引用
传递过来的参数，内部函数在最终被执行时，将使用外部函数的参数
返回的引用被赋予了一个变量
*/
//let funRef = callLater(elStyle, "display", "none");
//hideMenu = setTimeout(funRef, 500);

/**
 * 场景二：将函数关联到对象的实例方法
 * 有很多这样的场景：需要分配一个函数对象的引用，以便在未来的某个时间执行该函数。那么闭包对于为这个将要执行的函数提供引用会非常有帮助。因为该函数可能直到执行时才能够被访问。
 * 有一个例子就是，一个javascript对象被封装用来参与一个特定DOM元素的交互。它有doOnClick、doMouseOver以及doMouseOut方法。并且想在DOM元素上对应的事件被触发时执行这些方法。但是，可能会有关联着DOM元素的任意数量的javascript对象被创建，并且单个的实例并不知道那些实例化它们的代码将如何处理它们。对象实例不知道怎样去“全局”地引用它们自己，因为它们不知道哪个全局变量(如果存在)的引用将被分配给它们。
 * 
 * 所以，问题是执行一个与特定javascript对象实例关联的事件处理函数，并且知道调用那个对象的哪个方法。
 * 
 * 接下来的一个例子，在有元素事件处理的对象实例的关联函数上使用一个简单的闭包。通过传递event对象以及要关联元素的一个引用，为事件处理器分配不同的对象实例方法以供调用。
 */
/**
 * 一个对象关联一个事件处理器的普通方法
 * 返回的内部函数被作为事件的处理器
 * 对象实例作为obj参数，对象上将要被调用的方法名称被作为第二个参数
 */
function associateObjWithEvent(obj, methodName) {
    /*返回的内部函数被用来作为一个DOM元素的事件处理器*/
    return (function(e) {
        /*
        事件对象在DOM标准的浏览器中将被转换为e参数，
        如果没有传递参数给事件处理内部函数，将统一处理成IE的事件对象
        */
        e = e || window.event;
        /*
        事件处理器调用obj对象上的以methodName字符串标识的方法
        并传递两个对象：通用的事件对象，事件处理器被订阅的元素的引用
        这里this参数能够使用，因为内部函数已经被执行作为事件处理器所在元素的一个方法
        */
        return obj[methodName](e, this);
    });
}
/*
这个构造器函数，通过将元素的ID作为字符串参数传递进来，
来创建将自身关联到DOM元素上的对象，
对象实例想在对应的元素触发onclick、onmouseover、onmouseout事件时
对应的方法被调用。
*/
function DhtmlObject(elementId) {
    /**
     * 调用一个方法来获取DOM元素的引用 如果没找到返回null
     */
    let el = document.getElementById(elementId);
    /**
     * 因为if语句块，el变量的值在内部进行了类型转换，变成了boolean类型
    所以当它指向一个对象，结果就为true,如果为null则为false
     */
    if (el) {
        el.onclick = associateObjWithEvent(this, "onDoClick");
        el.onmouseenter = associateObjWithEvent(this, "doOnMouseEnter");
        el.onmouseover = associateObjWithEvent(this, "doOnMouseOver");
    }
}
DhtmlObject.prototype.onDoClick = function(event, element) {
    /**
     * 任何DhtmlObject的实例都能够将它们自身关联到它们感兴趣的DOM元素上去，不需要去担心这些元素将被其他的代码怎么处理，以及被全局命名空间“污染”或者与其他的DhtmlObject的实例产生冲突。
     */
}

/**
 * 场景三：封装相关的功能集
 * 
 * 闭包可以创建额外的scope，这可以被用来组合相关的或有依赖性的代码。用这种方式可以最大限度地减少代码干扰的危害。假设，一个函数被用来创建一个字符串并且避免重复串联的操作(比如创建一系列的中间字符串)。一个想法是，用一个数组来顺序存储字符串的一部分，然后使用Array.prototype.join方法输出结果(使用一个空字符串作为它的参数)。数组将扮演着输出缓冲区的角色，但局部定义它又将会导致它在函数的每次执行时再次创建。如果这个数组只是作为唯一的变量被分配给每一个函数调用，这将会有点小题大做。
 一个解决方案是将数组提升为全局变量，让它不需要被再次创建也能够再次使用。但结果并不是想的那么简单，另外，一个全局变量关联这使用缓冲数组的函数，那将会有第二个全局属性(函数本身也是window对象的属性)关联这个数组，这将让代码失去一定的可控性。因为如果将它使用在其他地方。这段代码的创建者不得不记住包含函数的定义以及数组的定义逻辑。它也使得代码不那么容易与其他代码整合，因为将从原来只需要确定函数名是否在全局命名空间中唯一，变成有必要确定和该函数关联的数组的名称是否在全局命名空间中保持唯一。

一个闭包可以让缓冲数组关联(干净地包含)它依赖的函数，并且同时保持缓冲数组的属性名称，像被分配在全局空间中一样，同时能够避免名称冲突以及代码交互干扰的危险。

这里有一招就是通过执行一个内联的函数表达式创建一个额外的执行上下文，让那个函数表达式返回一个内联的函数，该函数被外部代码使用。缓冲数组被定义在内联执行的函数表达式中，作为一个局部变量。它仅被调用一次，所以该数组只被创建一次。但是对于依赖它的函数来说该数组是一直可访问的，并且可被重用的。

接一下的代码创建了一个函数，将返回一个HTML字符串，其中的一部分是不变的，但那些不变的字符串需要被穿插进作为参数传递进来的变量中。

一个内联执行的函数表达式返回了内部函数对象的一个引用。并且分配了一个全局变量，让它可以被作为一个全局函数来调用。而缓冲数组作为一个局部变量被定义在外部函数表达式中。它没有被扩展到全局命名空间中，并且无论函数什么时候使用它都不需要被再次创建。
 */

/*
 定义一个全局变量：getImgInPositionedDivHtml
 被赋予对外部函数表达式一次调用返回的一个内部函数表达式
 
 内部函数返回了一个HTML字符串，代表一个绝对定位的DIV
 包裹这一个IMG元素，而所有的变量值都被作为函数调用的参数
*/
let getImgInPositionedDivHtml = (function() {
    /*
    buffAr 数组被定义在外部函数表达式中，作为一个局部变量
    它只被创建一次。数组的唯一实例对内部函数是可见的，
    所以它可以被用于每一次的内部函数执行
    
    空字符串仅仅被用来作为一个占位符，它将被内部函数的参数代替
    */
    let buffAr = [
        '<div id="',
        '', //index 1, DIV ID attribute
        '" style="position:absolute;top:',
        '', //index 3, DIV top position
        'px;left:',
        '', //index 5, DIV left position
        'px;width:',
        '', //index 7, DIV width
        'px;height:',
        '', //index 9, DIV height
        'px;overflow:hidden;\"><img src=\"',
        '', //index 11, IMG URL
        '\" width=\"',
        '', //index 13, IMG width
        '\" height=\"',
        '', //index 15, IMG height
        '\" alt=\"',
        '', //index 17, IMG alt text
        '\"><\/div>'
    ];
    /*
    返回一个内部函数对象，他是函数表达式执行返回的结果
    */
    return (function(url, id, width, height, top, left, altText) {
        /*
        分配各种参数给对应的数组元素
        */
        buffAr[1] = id;
        buffAr[3] = top;
        buffAr[5] = left;
        buffAr[13] = (buffAr[7] = width);
        buffAr[15] = (buffAr[9] = height);
        buffAr[11] = url;
        buffAr[17] = altText;

        /*
        返回连接每个元素后创建的字符串
        */
        return buffAr.join('');
    });

})();