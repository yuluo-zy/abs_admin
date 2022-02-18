import { httpDelete, httpGet, httpPost, httpPut } from '@/utils/httpRequest';

export const getPermission = () => {
  return httpGet('/permission/no-pager');
};

export const postPermission = (data) => {
  return httpPost('/permission', data);
};

export const putPermission = (data) => {
  return httpPut('/permission', data);
};

export const deletePermission = (id) => {
  return httpDelete('/permission/'+ id);
};
