/**
 * @file 捕获全局的浏览器控制台的error信息
 * @author yangfan19
 * @version 1.0
 */

import ComonError from '../ComonError';
import CollectEvent from '../CollectEvent';

class JsError {
  constructor(config) {
    this.comonError = new ComonError();
    this.collectEvent = new CollectEvent();

    // 默认选项
    this.config = {
      url: '',
      https: false,
      post: false,
      record: true,
    };

    this.config = Object.assign({}, this.config, config);

    this.init();
  }

  // 初始化
  init() {
    this.winError();
    this.promiseError();
  }

  // window.error
  winError() {
    const that = this;

    const eventError = function (event) {
      // # lineno => <https://developer.mozilla.org/zh-CN/docs/Web/API/GlobalEventHandlers/onerror>
      const { lineno, filename, message, type } = event;
      const data = Object.assign({}, that.config, { lineno, filename, message, type });
      that.comonError.getError(data);
    };

    window.addEventListener('error', eventError, true);

    this.collectEvent.setEvent({
      name: 'error',
      func: eventError,
    });
  }

  // promise.error
  promiseError() {
    const that = this;

    const unhandledrejection = function (event) {
      const { lineno = '', filename = '', reason: message, type } = event;
      const data = Object.assign({}, that.config, { lineno, filename, message, type });
      that.comonError.getError(data);
    };

    // # https://developer.mozilla.org/zh-CN/docs/Web/API/Window/unhandledrejection_event
    window.addEventListener('unhandledrejection', unhandledrejection, true);

    this.collectEvent.setEvent({
      name: 'unhandledrejection',
      func: unhandledrejection,
    });
  }
}

export default JsError;
