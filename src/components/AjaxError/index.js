/**
 * @file ajax请求错误
 * @author yangfan19
 * @version 1.0
 */

import ComonError from '../ComonError';

// ajax prototype
const originOpen = XMLHttpRequest.prototype.open;
const originSend = XMLHttpRequest.prototype.send;

// fetch prototype
const originalFetch = window.fetch;

// 请求
const httpStatus = [404, 500];

/**
 *
 * 根据请求的status 进行统一的报错
 *
 *  */

const httpRequestError = (event, isType) => {
  let data = {};

  if (event.status === 200) return;

  if (isType) {
    const { status = 999, statusText: message, responseURL: filename } = event;
    data = { status, message, filename };
  } else {
    const { status = 999, statusText: message, url: filename } = event;
    data = { status, message, filename };
  }

  const type = httpStatus.includes(data.status) ? 'httpError' : 'httpTimeout';

  return { ...data, type };
};

/**
 * 请求错误处理、统一进行上报
 *
 *  */
const httpResfactory = (event, type = 'ajax') => {
  const _comonError = new ComonError();
  const isType = type === 'ajax';
  const result = httpRequestError(event, isType);

  _comonError.setError(result);
};

/**
 * 重写ajax状态进行上报
 *
 *  */

const AjaxError = () => {
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

/**
 * 重写fetch状态进行上报
 *
 *  */

const FetchError = () => {
  window.fetch = function (input, config = {}) {
    return originalFetch.call(null, input, config).then(
      (response) => {
        httpResfactory(response, 'fetch');
        return response;
      },
      (error) => {
        console.warn('我特喵的真的报错了？');
        throw error;
      },
    );
  };
};

// 初始化
const init = () => {
  AjaxError();
  FetchError();
};

export default init;
