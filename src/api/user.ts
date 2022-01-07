import { httpGet } from '@/utils/httpRequest';

export const userInfo = () => {
  return httpGet('/user/info');
};

export const userMenu = () => {
  return httpGet('/user/nav');
};
