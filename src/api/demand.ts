import { httpGet, httpPost } from "@/utils/httpRequest";

export const getProductionDemand = () => {
  return httpGet('/demand');
};

export const PostProductionDemand = () => {
  return httpPost('/demand');
};

export const PostProduction = (data) => {
  return httpPost('/demand/production/save', data);
};



