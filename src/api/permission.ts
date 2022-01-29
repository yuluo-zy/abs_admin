import { httpGet } from '@/utils/httpRequest';

export const getPermission = () => {
  return httpGet('/permission/no-pager');
};
