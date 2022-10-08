import qs from "query-string";
import { isSSR } from "./is";

export type ParamsType = Record<string, any>;

export default function getUrlParams(): ParamsType {
  const params = qs.parseUrl(!isSSR ? window.location.href : "").query;
  const returnParams: ParamsType = {};
  Object.keys(params).forEach((p) => {
    if (params[p] === "true") {
      returnParams[p] = true;
    }
    if (params[p] === "false") {
      returnParams[p] = false;
    }
  });
  return returnParams;
}

/**
 * 拼接对象为请求字符串
 * @param {Object} obj - 待拼接的对象
 * @returns {string} - 拼接成的请求字符串
 */
export function encodeSearchParams(obj: ParamsType) {
  const params = [];

  Object.keys(obj).forEach((key) => {
    let value = obj[key];
    // 如果值为undefined我们将其置空
    if (typeof value === "undefined") {
      value = "";
    }
    // 对于需要编码的文本（比如说中文）我们要进行编码
    params.push([key, encodeURIComponent(value)].join("="));
  });

  return params.join("&");
}

