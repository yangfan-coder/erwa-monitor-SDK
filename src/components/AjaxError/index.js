/**
 * @file ajax请求错误
 * @author yangfan19
 * @version 1.0
 */

import ComonError from '../ComonError';

const originOpen = XMLHttpRequest.prototype.open;
const originSend = XMLHttpRequest.prototype.send;

// 请求
const httpStatus = [404, 500];

/**
 *
 * 根据请求的status 进行统一的报错
 *
 *  */

const httpRequestError = (event) => {
  const { status = 999, statusText: message, responseURL: filename } = event;

  if (status === 200) return;
  const type = httpStatus.includes(status) ? 'httpError' : 'httpTimeout';

  return { type, message, filename, code: status };
};

/**
 * 请求错误处理、统一进行上报
 *
 *  */
const httpResfactory = (event) => {
  const _comonError = new ComonError();
  const result = httpRequestError(event);

  console.log(result);
  _comonError.setError(result);
};

const AjaxError = () => {
  // 重写open
  XMLHttpRequest.prototype.open = function () {
    this.addEventListener('load', function (obj) {
      httpResfactory(this);
    });

    originOpen.apply(this, arguments);
  };

  // 重写send
  XMLHttpRequest.prototype.send = function () {
    originSend.apply(this, arguments);
  };
};

export default AjaxError;
