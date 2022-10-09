export function isArray(val): boolean {
  return Object.prototype.toString.call(val) === "[object Array]";
}

export function isObject(val): boolean {
  return Object.prototype.toString.call(val) === "[object Object]";
}

export function isString(val): boolean {
  return Object.prototype.toString.call(val) === "[object String]";
}

export function isEmptyString(val: string): boolean {
  return val.length === 0;
}

const opt = Object.prototype.toString;

export function isUndefined(obj: any): obj is undefined {
  return obj === undefined;
}

export function isFunction(obj: any): obj is (...args: any[]) => any {
  return typeof obj === "function";
}

export function isEmptyObject(obj: any): boolean {
  return isObject(obj) && Object.keys(obj).length === 0;
}

export function isFile(obj: any): obj is File {
  return opt.call(obj) === "[object File]";
}

export function isBlob(obj: any): obj is Blob {
  return opt.call(obj) === "[object Blob]";
}

export const isSSR = (function() {
  try {
    return !(typeof window !== "undefined" && document !== undefined);
  } catch (e) {
    return true;
  }
})();
