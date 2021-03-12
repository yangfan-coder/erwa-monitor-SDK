/* eslint-disable no-throw-literal */

import React from 'react';
import { Button } from 'antd';
import initMonitor from '../components';

const Home = () => {
  const config = {
    url: 'localhost:4000/error',
  };

  new initMonitor(config);

  // onclick event
  const JSError = () => {
    throw '4';
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
    console.log(css);
    document.head.appendChild(css);
  };

  // img load error
  const ImagesLoadError = () => {
    const img = document.createElement('img');
    img.src = `/aaa.png`;
    document.body.appendChild(img);
  };

  // iframe load error
  const IframeLoadError = () => {
    const iframe = document.createElement('iframe');
    iframe.src = `/aaa.html`;
    document.body.appendChild(iframe);
  };

  return (
    <>
      <h1>Javascript 错误</h1>
      <Button type='primary' onClick={JSError}>
        JS执行报错
      </Button>
      <Button type='primary' onClick={PromiseError}>
        Promise 错误
      </Button>
      <hr />

      <h1>资源加载错误</h1>
      <Button type='primary' onClick={JsLoadError}>
        没有加载JavaScript
      </Button>
      <Button type='primary' onClick={CssLoadError}>
        没有加载Css
      </Button>
      <Button type='primary' onClick={ImagesLoadError}>
        没有加载images
      </Button>
      <Button type='primary' onClick={IframeLoadError}>
        没有加载iframe
      </Button>
      <hr />
    </>
  );
};

export default Home;
