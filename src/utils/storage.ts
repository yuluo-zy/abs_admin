import { isSSR } from './is';

function getStorage() {
  if (!isSSR) {
    return localStorage;
  }

  return {
    getItem: () => '',
    setItem: () => ''
  };
}

export default getStorage();

export function getSessionStorage() {
  if (!isSSR) {
    return sessionStorage;
  }

  return {
    getItem: () => '',
    setItem: () => ''
  };
}
