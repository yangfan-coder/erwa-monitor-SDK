/**
 * @file ajax请求错误
 * @author yangfan19
 * @version 1.0
 */

class AjaxError {
  constructor() {
    this.oldXHR = window.XMLHttpRequest;

    this.ajax = new this.oldXHR();
    this.init();
  }

  init() {
    this.load();
    window.XMLHttpRequest = this.oldXHR;
  }

  load() {
    this.ajax.addEventListener(
      'loadend',
      function (event) {
        console.log(event, 'load');
      },
      true,
    );
  }

  // timeout() {
  //   this[oldXHR].addEventListener(
  //     'timeout',
  //     function (event) {
  //       console.log(event, 'timeout');
  //     },
  //     false,
  //   );
  // }

  // readystatechange() {
  //   this[oldXHR].addEventListener(
  //     'readystatechange',
  //     function (event) {
  //       console.log(event, 'readystatechange');
  //     },
  //     false,
  //   );
  // }
  // get() {
  //   return this[oldXHR];
  // }
}

export default AjaxError;
