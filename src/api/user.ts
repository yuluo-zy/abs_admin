import { httpGet } from '@/utils/httpRequest';

export const userInfo = () => {
  return httpGet('/user/info');
};
