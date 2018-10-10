/*
 * @Author: etongfu 
 * @Date: 2018-10-10 11:58:24 
 * @Last Modified by: etongfu
 * @Last Modified time: 2018-10-10 14:30:12
 * 作为webpack tree-shaking的demo
 */

// 入口代码文件
// tree-shaking无法起作用的地方
import {fun2} from './func'
/**
 * 在func.js文件中fun1 和 fun2 我们用到了fun2 但是fun2并没有用到lodash这个个库 所以这个时候等于引入了无用代码，
 * 这个时候webpack就没有能力把这些代码去除掉
 */
fun2(222)

// webpack 官方tree-shaking demo
import {cube} from './math'

function component () {
  var element = document.createElement('pre')
  element.innerHTML = [
       'Hello webpack!',
       '5 cubed is equal to ' + cube(5)
     ].join('\n\n')
  return element
}

document.body.appendChild(component())
