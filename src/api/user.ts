import { httpDelete, httpGet, httpPost, httpPut } from '@/utils/httpRequest';

export const userInfo = () => {
  return httpGet('/user/info');
};

export const userMenu = () => {
  return httpGet('/user/nav');
};

export const getUserList = (data) => {
  return httpGet('/user', data);
};

export const addUser = (data) => {
  data.roleIds = data.roleIdList?.toString();
  return httpPost('/user', data);
};

export const putUser = (data) => {
  return httpPut('/user', data);
};

export const removeUser = (data) => {
  return httpDelete('/user', data);
};

export const putUserPassword = (id: number, data) => {
  return httpPost('/user/' + id + '/change/password', data);
};

export const putUserLock = (id: number, data) => {
  return httpPut('/user/' + id + '/lock', data);
};
