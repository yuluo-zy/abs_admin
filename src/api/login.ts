import { httpPost } from '@/utils/httpRequest';

export const loginWithUserName = (data) => {
  return httpPost('/auth/login', data);
};

export const loginOut = () => {
  return httpPost('/auth/logout');
};
