/**
 * @file 重写console 【数据劫持】
 * @author yangfan19
 * @version 1.0
 */

const _consoe = console.log;

const InitConsole = () => {
  console.log = function () {
    // alert(JSON.stringify(arguments));
    _consoe.apply(this, [...arguments]);
  };
};

export default InitConsole;
