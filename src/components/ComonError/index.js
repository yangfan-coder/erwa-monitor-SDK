/**
 * @file 统一处理错误进行上报
 * @author yangfan19
 * @version 1.0
 */
import WrapNavigator from '../WrapNav';
import utils from '../../utils';

const { addObjectPrefix } = utils;

const ErrorType = Symbol('ErrorType');

class ComonError {
  constructor() {
    this.WrapNavigator = new WrapNavigator();
    this.errors = {};
  }

  // 静态存储获取当前的错误类型、
  [ErrorType](type) {
    const Type = {
      error: 1,
      unhandledrejection: 2,
      default: -99,
    };

    return Type[type] || Type['default'];
  }
  // 收集错误
  getError(event) {
    const data = this.WrapNavigator.getData();
    let result = {};

    if (typeof event === 'object' && event.hasOwnProperty('type')) {
      const { lineno, filename, message, type } = event;
      const typeId = this[ErrorType](type);

      // javascript 上报错误
      if (type === 'error') {
        result = Object.assign({}, data, { lineno, filename, message, type, typeId });
      }
      // promise reject 上报错误
      else if (type === 'unhandledrejection') {
        result = Object.assign({}, data, { lineno, filename, message, type, typeId });
      }
    }

    this.errors = addObjectPrefix(result);
  }
}

export default ComonError;