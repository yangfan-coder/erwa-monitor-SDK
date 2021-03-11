/**
 * @file 定义全局的类型数据结构
 * @url <https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator>
 * @author yangfan19
 * @version 1.0
 */

const data = Symbol('data');

class WrapNavigator {
  constructor() {
    this[data] = {};

    this.init();
  }
  // 初始化
  init() {
    if (window && window.hasOwnProperty('navigator')) {
      const navigator = window.navigator;

      // UA
      this[data].userAgent = navigator.userAgent;

      // appName
      this[data].appName = navigator.appName;

      // appVersion
      this[data].appVersion = navigator.appVersion;

      // CPU
      this[data].cpuClass = navigator.cpuClass;

      // platform
      this[data].platform = navigator.platform;

      // product
      this[data].product = navigator.product;

      // languages
      this[data].language = navigator.language;

      // url
      this[data].url = window.location.href;

      // time
      this[data].time = new Date().getTime();
    } else {
      this[data] = {};
    }
  }
  // 获取数据
  getData() {
    return this[data];
  }
}

export default WrapNavigator;
