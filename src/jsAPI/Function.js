// 防抖
/**
 * 
 * @param {*Function} fn 目标函数 
 * @param {*Number} wait 等待时长
 * @param {*Boolean} immediate 是否立即执行
 */
function debunce (fn, wait, immediate = true) {
  let timer
  // 稍后执行
  const later = (context, args) => setTimeout(() => {
    timer = null
    if (!immediate) {
      fn.apply(context, args)
      context = args = null
    }
  }, wait)
  // 延迟处理
  let debunced = function (...params) {
    let context = this
    let args = params
    if(!timer) {
      // 如果没有计时器 就创建timer 
      timer = later(context, args)
      // 在需要立即执行的时候先执行一下
      if (immediate) {
        fn.call(context, args)
      }
    } else {
      // 如果有计时器，那么重置计时器
      clearTimeout(timer)
      timer = later(context, args)
    }
  }
  debunced.cancel = function() {
    clearTimeout(timer)
    timer = null
  }

  return debunced
}
// 使用
window.onresize = debunce(() => {
  const time = new Date().getSeconds()
  console.log(time)
}, 2000, false)

// 节流