/**
 * @file 资源加载错误
 * @author yangfan19
 * @version 1.0
 */

import ComonError from '../ComonError';
import CollectEvent from '../CollectEvent';
class ResourceError {
  constructor() {
    this.comonError = new ComonError();
    this.collectEvent = new CollectEvent();

    this.init();
  }
  init() {
    const that = this;

    // 捕获当前的 script、link、img
    const resourceError = function (event) {
      const target = event.target || event.srcElement;
      const localName = target.localName;

      const data = { filename: localName, type: 'resourceError' };
      that.comonError.setError(data);
    };

    window.addEventListener('error', resourceError, true);

    this.collectEvent.setEvent({
      name: 'resourceError',
      func: resourceError,
    });
  }
}

export default ResourceError;
