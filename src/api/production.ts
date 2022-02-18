import { httpGet } from '@/utils/httpRequest';

export const getProductionInfo = () => {
  return httpGet('/production');
};
