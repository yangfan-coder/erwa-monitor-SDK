/**
 * @file 资源加载错误
 * @author yangfan19
 * @version 1.0
 */

class ResourceError {
  constructor() {
    this.data = {};

    this.init();
  }
  init() {
    const loadError = function (event) {
      console.log(event);
    };

    window.addEventListener('error', loadError, true);
  }
}

export default ResourceError;
