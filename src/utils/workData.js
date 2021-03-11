/**
 * @file 处理数据结构
 * @author yangfan19
 * @version 1.0
 */

const toString = Object.prototype.toString;

/* 增加对象的前缀 */
export const addObjectPrefix = (objects) => {
  const type = toString.call(objects);

  const filterObjs = {};

  if (type !== '[object Object]') return console.warn(`请传递一个对象，而不是${type}`);
  for (const key in objects) {
    const _key = `$ewra_${key}`;
    filterObjs[_key] = objects[key];
  }

  return filterObjs;
};
