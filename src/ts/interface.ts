/**
 * 接口:约定  限制
 * 
 */
console.log('我是ts的部分')
//定义接口
interface Point{
  x:number,
  y:number,
  z?:number
}
// 实例接口
let p:Point
// 赋值
p = {
  x:6,
  y:6
}

interface A{
  x:number,
  y:number
}
interface B{
  x: number,
  y: number,
  z?:number
}
let demo:A|B