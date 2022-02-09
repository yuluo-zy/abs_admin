import { httpDelete, httpGet, httpPost, httpPut } from '@/utils/httpRequest';

export const getRole = () => {
  return httpGet('/role');
};

export const postRole = (data) => {
  return httpPost('/role', data);
};

export const putRole = (data) => {
  return httpPut('/role', data);
};

export const deleteRole = (id) => {
  return httpDelete('/role/' + id);
};

