/**
 * @file 入口文件
 * @author yangfan19
 * @version 1.0
 */

import JsError from './JsError';
import ResourceError from './ResourceError';
import AjaxError from './AjaxError';
import InitConsole from '../utils/rewritelog';

class Index {
  constructor(config) {
    new JsError(config);

    this.init();
  }
  init() {
    new ResourceError();
    AjaxError();
    InitConsole();
  }
}

export default Index;
