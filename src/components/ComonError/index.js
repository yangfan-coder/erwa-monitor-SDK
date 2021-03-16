/**
 * @file 统一处理错误进行上报
 * @author yangfan19
 * @version 1.0
 */

// import WrapNavigator from '../WrapNav';
import utils from '../../utils';

const { addObjectPrefix } = utils;

const ErrorType = Symbol('ErrorType');

class ComonError {
  constructor() {
    // this.WrapNavigator = new WrapNavigator();
    this.errors = {};
  }

  // 静态存储获取当前的错误类型、
  [ErrorType](type) {
    const Type = {
      error: 1, // JavaScript的报错
      unhandledrejection: 2, // promise 的报错
      resourceError: 3, // 加载资源报错
      httpError: 4, // http 请求报错
      httpTimeout: 5, // http 请求超时
      default: -99,
    };

    return Type[type] || Type['default'];
  }
  // 收集错误
  setError(event) {
    // const data = this.WrapNavigator.getData();
    const data = {};
    let result = {};

    if (typeof event === 'object' && event.hasOwnProperty('type')) {
      const { lineno = '', filename = '', message = '', type, code = -99 } = event;
      const typeId = this[ErrorType](type);

      // javascript 上报错误
      if (type === 'error') {
        result = Object.assign({}, data, { lineno, filename, message, type, typeId, code });
      }
      // promise reject 上报错误
      else if (type === 'unhandledrejection') {
        result = Object.assign({}, data, { lineno, filename, message, type, typeId, code });
      }
      // 资源加载失败上报
      else if (type === 'loadError') {
        result = Object.assign({}, data, { lineno, filename, message, type, typeId, code });
      }
      // http 请求错误
      else if (type === 'httpError') {
        result = Object.assign({}, data, { lineno, filename, message, type, typeId, code });
      }
    }

    this.errors = addObjectPrefix(result);
    console.log(this.errors);
  }
}

export default ComonError;
