/**
 * @file ajax请求错误
 * @author yangfan19
 * @version 1.0
 */

import ComonError from '../ComonError';
import axios from 'axios';

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

  _comonError.setError(result);
};

const fetch = function () {
  console.log(arguments);
  // return axios({});
};

const AjaxError = () => {
  window._fetch = fetch;
  // 初始化一个请求
  XMLHttpRequest.prototype.open = function () {
    this.addEventListener('loadend', function () {
      httpResfactory(this);
    });

    originOpen.apply(this, arguments);
  };

  // 发送接口
  XMLHttpRequest.prototype.send = function () {
    originSend.apply(this, arguments);
  };
};

export default AjaxError;
