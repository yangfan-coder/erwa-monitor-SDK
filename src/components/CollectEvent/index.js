/**
 * @file 创建一个栈,收集事件 、用于回放当前的动作
 * @author yangfan19
 * @version 1.0
 */

class CollectEvent {
  constructor() {
    this.events = [];
  }

  // 插入事件
  setEvent(event) {
    this.events.push(event);
  }

  // 获取所有的事件
  getEvents() {
    return this.events;
  }
}

export default CollectEvent;
