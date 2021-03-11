/**
 * @file 入口文件
 * @author yangfan19
 * @version 1.0
 */

import JsError from './JsError';
import ResourceError from './ResourceError';

class Index {
  constructor(config) {
    new JsError(config);
    new ResourceError();

    this.init();
  }
  init() {}
}

export default Index;
