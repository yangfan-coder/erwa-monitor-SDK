/* eslint-disable no-throw-literal */

import React from 'react';
import { Button } from 'antd';
import axios from 'axios';
import initMonitor from '../components';

const Home = () => {
  const config = {
    url: 'localhost:4000/error',
  };

  new initMonitor(config);

  // onclick event
  const JSError = () => {
    // throw '4';
    a;
  };

  // onclick reject
  const PromiseError = () => {
    new Promise((resolve, reject) => {
      reject('我是错误');
    });
  };

  // javscript load error
  const JsLoadError = () => {
    const script = document.createElement('script');
    script.src = `undefined.js`;
    document.body.appendChild(script);
  };

  // css load error
  const CssLoadError = () => {
    const css = document.createElement('link');
    css.type = `text/css`;
    css.rel = 'stylesheet';
    css.href = `undefined.css`;
    document.head.appendChild(css);
  };

  // img load error
  const ImagesLoadError = () => {
    const img = document.createElement('img');
    img.src = `/aaa.png`;
    document.body.appendChild(img);
  };

  const AjaxRequestError = () => {
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.timeout = 3000;
    // xhr.open('POST', '/ajaxerror', true);
    xhr.open('GET', 'http://localhost:3003/ajaxerror1', true);
    xhr.setRequestHeader('Content-type', 'application/json;charset=utf-8');
    xhr.send(JSON.stringify({ email: 'hello@user.com', response: { name: 'Tester' } }));
  };

  const ServerError = () => {
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.timeout = 3000;
    xhr.open('GET', 'http://localhost:3003/serveError', true);
    xhr.setRequestHeader('Content-type', 'application/json;charset=utf-8');
    xhr.send(JSON.stringify({ email: 'hello@user.com', response: { name: 'Tester' } }));
  };

  const AjaxOvertimeError = () => {
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.timeout = 1000;
    xhr.open('GET', 'http://localhost:3003/serveErrorTime', true);
    xhr.setRequestHeader('Content-type', 'application/json;charset=utf-8');
    xhr.send(JSON.stringify({ email: 'hello@user.com', response: { name: 'Tester' } }));
  };

  const AxiosRequestError = () => {
    axios
      .get('http://localhost:3003/ajaxerror1')
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const AxiosServerError = () => {
    axios
      .get('http://localhost:3003/serveError')
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const AxiosOvertimeError = () => {
    axios
      .get('http://localhost:3003/serveErrorTime', {
        timeout: 1000,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const packageFetchRequestError = () => {
    fetch('http://localhost:3003/ajaxerror1', {})
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        console.log(myJson);
      });
  };

  const FetchRequestError = () => {
    fetch('http://localhost:3003/ajaxerror', { method: 'post' })
      .then(function (response) {
        return response.json();
      })
      .then((data) => {
        console.log(data);
      });
  };
  const FetchServerError = () => {};
  const FetchOvertimeError = () => {};

  return (
    <>
      <h1>ajax请求相关错误</h1>
      <Button type='primary' onClick={AjaxRequestError}>
        ajax请求错误
      </Button>
      <Button type='primary' onClick={ServerError}>
        服务器错误
      </Button>
      <Button type='primary' onClick={AjaxOvertimeError}>
        ajax请求超时
      </Button>
      <Button type='primary' className='axios-btn' onClick={AxiosRequestError}>
        axios请求错误
      </Button>
      <Button type='primary' className='axios-btn' onClick={AxiosServerError}>
        axios服务器错误
      </Button>
      <Button type='primary' className='axios-btn' onClick={AxiosOvertimeError}>
        axios请求超时
      </Button>
      <Button type='primary' className='pack-fetch-btn' onClick={packageFetchRequestError}>
        封装fetch请求错误
      </Button>
      <Button type='primary' className='fetch-btn' onClick={FetchRequestError}>
        fetch请求错误
      </Button>
      <Button type='primary' className='fetch-btn' onClick={FetchServerError}>
        fetch请求错误服务器错误
      </Button>
      <Button type='primary' className='fetch-btn' onClick={FetchOvertimeError}>
        fetch请求错误请求超时
      </Button>
      <hr />

      <h1>Javascript相关错误</h1>
      <Button type='primary' onClick={JSError}>
        JS执行报错
      </Button>
      <Button type='primary' onClick={PromiseError}>
        Promise 错误
      </Button>
      <hr />

      <h1>资源加载相关错误</h1>
      <Button type='primary' onClick={JsLoadError}>
        没有加载JavaScript
      </Button>
      <Button type='primary' onClick={CssLoadError}>
        没有加载Css
      </Button>
      <Button type='primary' onClick={ImagesLoadError}>
        没有加载images
      </Button>
      <hr />
    </>
  );
};

export default Home;
