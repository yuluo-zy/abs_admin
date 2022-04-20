import { httpGet, httpPost } from "@/utils/httpRequest";

export const getProductionDemand = () => {
  return httpGet('/demand');
};

export const postProductionDemand = () => {
  return httpPost('/demand');
};

export const postProduction = (data) => {
  return httpPost('/demand/production/save', data);
};



export const getProductionCustomDemand = () => {
  return httpGet('/demand/custom/serve');
};

export const postProductionCustomDemand = (data) => {
  return httpPost('/demand/custom/serve/save', data);
};
