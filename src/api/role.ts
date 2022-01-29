import { httpGet } from '@/utils/httpRequest';

export const getRole = () => {
  return httpGet('/role');
};
