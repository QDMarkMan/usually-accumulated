/**
 * 单例模式简单示例ts 版本
 */
class SingletonTs {
  // 当前实例
  public instanced
  init (): object {
    console.log('init instance');
    return {
      publicMethord() {
        console.log('welcome to singleton')
      },
      publicKey: 'some key'
    }
  }
  // 获取instance
  getInstance () {
    // 主要在这个地方保证只有一个实例
    if(!this.instanced) {
      console.log('instance does not exit');
      this.instanced =  this.init()
    } else {
      console.log('instance already created');
    }
    return this.instanced;
  }
}
// 调取公用方法来获取实例
const singletonTs = new SingletonTs()
singletonTs.getInstance()
singletonTs.getInstance().publicMethord()
