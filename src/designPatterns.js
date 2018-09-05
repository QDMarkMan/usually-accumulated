/*
* @Author: mark
* @Date: 2017-08-30 18:09:03
 * @Last Modified by: mark
 * @Last Modified time: 2018-07-16 11:13:36
* @description JavaScript设计模式详解 使用ES5语法
*/

/**
* 让系统代码可重用、可扩展、可解耦、更容易被人理解且保证代码可靠性。设计模式使代码真正工程化。
*
* 设计原则：

开闭原则： 对扩展开放，对修改关闭

里氏转换原则： 子类继承父类，单独完全可以运行

依赖倒转原则： 引用一个对象，如果这个对象有底层类型，直接引用底层类型

接口隔离原则： 每一个接口应该是一种角色

合成/聚合复用原则： 新的对象应使用一些已有的对象，使之成为新对象的一部分

迪米特原则： 一个对象应对其他对象有尽可能少的了解
*/

/**
 * 一
 * 单例模式 保证一个类只有一个实例，实现方法是先判断实例存在与否，如果存在直接返回，如果不存在就创建了再返回，确保一个类只有一个实例对象。
 *
 * 在 JavaScript 中，单例作为一个命名空间提供者，从全局命名空间里提供一个唯一的访问点来访问该对象。
 */
console.warn(
  "------------------------------------这个是JavaScript设计模式Demo begin------------------------------------"
);
let Singleton = (function() {
  let instantiated;

  function init() {
    //这里定义单例代码
    return {
      publicMethord: function() {
        console.log("welcome to singleton");
      },
      publicProperty: "test"
    };
  }

  return {
    getInstance: function() {
      if (!instantiated) {
        //确保只有一个实例
        instantiated = init(); //使用init方法，是使publicMethod和publicProperty只在要使用的时候才初始化;
      }
      return instantiated;
    }
  };
})();
/*调用公有的方法来获取实例:*/
Singleton.getInstance().publicMethord();
/**
* 作用和注意事项
* 模式作用：

模块间通信

系统中某个类的对象只能存在一个

保护自己的属性和方法

注意事项：

注意this的使用

闭包容易造成内存泄露，不需要的要赶快清除

注意new的成本。（继承）

下面就是一个单例的实例
在网页上实现一个登陆弹框，无论我们点击多少次登陆按钮，界面上始终只会显示一个登陆弹框，无法再创建第二个。
*/
//（1）获取DOM对象
let $ = function(id) {
  return typeof id === "string" ? document.getElementById(id) : id;
};

//（2）弹框构造函数
let Modal = function(id, html) {
  this.html = html;
  this.id = id;
  this.open = false;
};
//这里我们声明了一个 Modal 作为弹框的构造函数，并且再其内部定义了公有属性 html、id 和 open。html 用来定义弹框内部的内容，id 用来给弹框定义 id 名称，open 用于判断弹框是否打开。

//（3）open方法
Modal.prototype.create = function() {
  if (!this.open) {
    var modal = document.createElement("div");
    modal.innerHTML = this.html;
    modal.id = this.id;

    document.body.appendChild(modal);

    setTimeout(function() {
      modal.classList.add("show");
    }, 0);

    this.open = true;
  }
};
//在 Modal 的原型链上定义了 create 方法，方法内部我们创建并向 DOM 中插入弹框，同时给弹框加上一个 class 为 “show” 的动画效果。

//（4）close方法
Modal.prototype.delete = function() {
  if (this.open) {
    var modal = $(this.id);
    modal.classList.add("hide");

    setTimeout(function() {
      document.body.removeChild(modal);
    }, 200);

    this.open = false;
  }
};
//定义了 open 方法后我们这里定义关闭弹框的方法，在其内部给弹框对象添加 hide 类动画效果，最后在页面上移除弹框对象。

//（5）创建实例
let createInstance = (function() {
  var instance;
  return function() {
    return instance || (instance = new Modal("modal", "这是一个单例的模态框"));
  };
})();
/**
* 这是实现单例模式的重要部分:
使用闭包封装了 instance 私有变量并返回一个函数
利用 || 语法判断如果 instance 不存在则执行后者的实例化 Modal 方法，存在则直接返回 instance，确保了只存在一个弹框实例
*/
//（6）按钮操作
var operate = {
  setModal: null,
  open: function() {
    this.setModal = createInstance();
    this.setModal.create();
  },
  delete: function() {
    this.setModal ? this.setModal.delete() : "";
  }
};
//这里我们将按钮操作放在 operate 对象里，使得打开和关闭操作可以通过this获取实例setModal。

//绑定事件
$("open").onclick = function() {
  operate.open();
};
$("delete").onclick = function() {
  operate.delete();
};

/**
 * 二
 * 构造函数模式
 * 构造函数用于创建特定类型的对象——不仅声明了使用过的对象，构造函数还可以接受参数以便第一次创建对象的时候设置对象的成员值。你可以自定义自己的构造函数，然后在里面声明自定义类型对象的属性或方法。
 */
/**
* 作用和注意事项

模式作用：

用于创建特定类型的对象

第一次声明的时候给对象赋值

自己声明构造函数，赋予属性和方法

注意事项：

声明函数的时候处理业务逻辑

区分和单例的区别，配合单例实现初始化

构造函数大写字母开头

注意 new 的成本 （继承）
*/
//实例 强制使用new
function ConstructionPattern(name, age, id) {
  if (!(this instanceof ConstructionPattern)) {
    return new ConstructionPattern(name, age, id);
  }

  this.name = name;
  this.age = age;
  this.id = id;
  this.sayId = function() {
    return this.id;
  };
}
var constructionPattern1 = new ConstructionPattern("zhangsan", 55, "001");
var constructionPattern2 = new ConstructionPattern("zhangsan", 55, "002");
console.log(constructionPattern1.sayId());
console.log(constructionPattern2.sayId());

/**
* 三
* 建造者模式
* 建造者模式可以将一个复杂的对象的构建与其表示相分离，使同样的构建过程可以创建不同的表示。如果我们用了建造者模式，那么用户就需要指定需要建造的类型就可以得到它们，而具体建造的过程和细节就不需要知道了。建造者模式实际就是一个指挥者，一个建造者，一个使用指挥者调用具体建造者工作得出结果的客户。主要用于“分步骤构建一个复杂的对象”。

作用和注意事项
模式作用：

分步创建一个复杂的对象

解耦封装过程和具体创建组件

无需关心组件如何组装

注意事项：

一定要一个稳定的算法进行支持（“分步骤”是一个稳定的算法）

加工工艺是暴露的

实例
一个土豪需要建一个别墅，然后直接找包工头，包工头再找工人把别墅建好。这里土豪不用直接一个一个工人的去找。只需包工头知道土豪需求，然后去找工人，工人干活，土豪也不需要知道房子具体怎么建，最后能拿到房就可以了。
*/
//1.产出东西是房子
//2.包工头调用工人进行开工而且他要很清楚工人们具体的某一个大项
//3.工人是盖房子的 工人可以建厨房、卧室、建客厅
//4.包工头只是一个接口而已 他不干活 他只对外说我能建房子
function House() {
  this.kitchen = "";
  this.bedromm = "";
  this.livingroom = "";
}

function Contractor() {
  this.construct = function(worker) {
    worker.construct_kitchen();
    worker.construct_bedroom();
    worker.construct_livingroom();
  };
}

function worker() {
  this.construct_kitchen = function() {
    console.log("厨房建造好了");
  };
  this.construct_bedroom = function() {
    console.log("卧室建造好了");
  };
  this.construct_livingroom = function() {
    console.log("客厅建好了");
  };

  this.submit = function() {
    let _house = new House();
    //房子已经建好 提交时修改房屋的属性
    _house.kitchen = "finished";
    _house.bedromm = "finished";
    _house.livingroom = "finished";

    return _house;
  };
}

let myworker = new worker();
var contractor = new Contractor();
contractor.construct(myworker);
// 主人要房子
var myHouse = myworker.submit();
console.log(myHouse);

/**
* 四工厂模式 
工厂模式定义一个用于创建对象的接口，这个接口由子类决定实例化哪一个类。该模式使一个类的实例化延迟到了子类。
而子类可以重写接口方法以便创建的时候指定自己的对象类型（抽象工厂）。
* 模式作用：

对象构建十分复杂

需要依赖具体的环境创建不同的实例

处理大量具有相同属性的小对象

注意事项：

1、不能滥用工厂，有时候仅仅是给代码增加复杂度
*
*/
//简单工厂模式
var XMLHttpFactory = function() {};
XMLHttpFactory.createXMLHttp = function() {
  let XMLHttp = null;
  // XMLHttpFactory.createXMLHttp()这个方法根据当前环境的具体情况返回一个XHR对象
  if (window.XMLHttpRequest) {
    XMLHttp = new XMLHttpRequest();
  } else if (window.ActiveXObject) {
    XMLHttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  return XMLHttp;
};
var AjaxHandle = function() {
  let XMLHttp = XMLHttpFactory.createXMLHttp();
  /*...具体操作... */
};

//抽象工厂
var abstractXMLHttpFactory = function() {};
abstractXMLHttpFactory.prototype = {
  // 如果真的要调用这个方法会抛出一个错误，它不能被实例化，只能用来派生子类
  createXMLHttp: function() {
    throw new error("This is an abstract class");
  }
};
var XHRHandler = function() {
  abstractXMLHttpFactory.call(this);
};
XHRHandler.prototype = new abstractXMLHttpFactory();
XHRHandler.prototype.constructor = XHRHandler; // 重新定义 createFactory 方法
XHRHandler.prototype.createXMLHttp = function() {
  let XMLHttp = null;
  // abstractXMLHttpFactory.createXMLHttp()这个方法根据当前环境的具体情况返回一个XHR对象
  if (window.XMLHttpRequest) {
    XMLHttp = new XMLHttpRequest();
  } else if (window.ActiveXObject) {
    XMLHttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  return XMLHttp;
};
var abstractAjaxHander = function() {
  var XMLHttp = abstractXMLHttpFactory.createXMLHttp()
  /*...具体操作... */
}

console.warn("------------------------------------这个是JavaScript设计模式Demo end------------------------------------")
